/**
 * Rate-limit distribué (Upstash Redis) avec repli mémoire si Redis n'est
 * pas configuré. Accepte les noms Upstash classiques (`UPSTASH_REDIS_REST_*`)
 * et ceux injectés par l'intégration Vercel (`KV_REST_API_*`).
 * Le repli mémoire reste utile en local ; en multi-instances Vercel, Upstash
 * est requis avant le jour J.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type LimitResult = { ok: true } | { ok: false; retryAfterSec: number };

type Bucket = { count: number; resetAt: number };

const memoryBuckets = new Map<string, Bucket>();

function memoryRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): LimitResult {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { ok: true };
}

function memoryIsRateLimited(key: string, limit: number): boolean {
  const bucket = memoryBuckets.get(key);
  return !!bucket && Date.now() < bucket.resetAt && bucket.count >= limit;
}

function memoryRecordAttempt(key: string, windowMs: number): void {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  bucket.count += 1;
}

function redisRestUrl(): string | undefined {
  return process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
}

function redisRestToken(): string | undefined {
  return process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
}

function hasUpstashEnv(): boolean {
  return Boolean(redisRestUrl() && redisRestToken());
}

function getRedis(): Redis {
  const url = redisRestUrl();
  const token = redisRestToken();
  if (!url || !token) {
    throw new Error("Upstash Redis env manquantes");
  }
  return new Redis({ url, token });
}

/** Cache des limiters Upstash par (limit, windowMs). */
const limiterCache = new Map<string, Ratelimit>();

function getUpstashLimiter(limit: number, windowMs: number): Ratelimit {
  const cacheKey = `${limit}:${windowMs}`;
  const cached = limiterCache.get(cacheKey);
  if (cached) return cached;

  const windowSec = Math.max(1, Math.round(windowMs / 1000));
  const limiter = new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
    prefix: "yuna:rl",
    analytics: false,
  });
  limiterCache.set(cacheKey, limiter);
  return limiter;
}

const FAIL_PREFIX = "yuna:rl:fail:";

let warnedMemoryFallback = false;

function warnMemoryFallbackOnce(reason: string) {
  if (process.env.NODE_ENV !== "production" || warnedMemoryFallback) return;
  warnedMemoryFallback = true;
  console.warn(
    `[rate-limit] Repli mémoire actif en production (${reason}). Poser KV_REST_API_* / UPSTASH_REDIS_REST_*.`,
  );
}

/**
 * Consomme une tentative (IP / endpoint). À `await` côté routes API.
 */
export async function rateLimit(
  key: string,
  { limit = 8, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): Promise<LimitResult> {
  if (!hasUpstashEnv()) {
    warnMemoryFallbackOnce("env absentes");
    return memoryRateLimit(key, limit, windowMs);
  }

  try {
    const { success, reset } = await getUpstashLimiter(limit, windowMs).limit(
      key,
    );
    if (success) return { ok: true };
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
    };
  } catch (err) {
    console.error("[rate-limit] Upstash indisponible — repli mémoire", err);
    warnMemoryFallbackOnce("erreur Redis");
    return memoryRateLimit(key, limit, windowMs);
  }
}

/**
 * Vrai si la limite d'échecs est déjà atteinte — sans consommer de tentative.
 * Compteur Redis dédié (INCR) distinct des fenêtres glissantes IP.
 */
export async function isRateLimited(
  key: string,
  limit: number,
  // Fenêtre appliquée au premier `recordAttempt` (pexpire) — lue ici pour
  // garder la signature alignée avec les appels recover-pass.
  windowMs = 3_600_000,
): Promise<boolean> {
  void windowMs;
  if (!hasUpstashEnv()) {
    return memoryIsRateLimited(key, limit);
  }

  try {
    const raw = await getRedis().get<number | string>(`${FAIL_PREFIX}${key}`);
    return Number(raw ?? 0) >= limit;
  } catch (err) {
    console.error("[rate-limit] isRateLimited Upstash — repli mémoire", err);
    return memoryIsRateLimited(key, limit);
  }
}

/** Consomme une tentative d'échec (ex. recover-pass mauvais couple). */
export async function recordAttempt(
  key: string,
  windowMs: number,
): Promise<void> {
  if (!hasUpstashEnv()) {
    memoryRecordAttempt(key, windowMs);
    return;
  }

  try {
    const redis = getRedis();
    const redisKey = `${FAIL_PREFIX}${key}`;
    const count = await redis.incr(redisKey);
    if (count === 1) {
      await redis.pexpire(redisKey, windowMs);
    }
  } catch (err) {
    console.error("[rate-limit] recordAttempt Upstash — repli mémoire", err);
    memoryRecordAttempt(key, windowMs);
  }
}

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}
