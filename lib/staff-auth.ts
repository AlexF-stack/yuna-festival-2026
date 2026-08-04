/**
 * Auth staff scan + clés API CRM YUNA.
 */

import { createHash, timingSafeEqual } from "node:crypto";

/** Comparaison constant-time via hash SHA-256 (longueurs variables). */
function secureEquals(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/**
 * Secrets staff acceptés. `YUNA_STAFF_SECRETS` permet plusieurs secrets
 * (séparés par des virgules, format optionnel `label:secret`) — un secret
 * par poste/personne, révocable individuellement en retirant l'entrée.
 * `YUNA_STAFF_SECRET` (unique) reste supporté.
 */
export function getStaffScanSecrets(): string[] {
  const secrets: string[] = [];

  const single = process.env.YUNA_STAFF_SECRET?.trim();
  if (single && single.length >= 8) secrets.push(single);

  const multi = process.env.YUNA_STAFF_SECRETS?.trim();
  if (multi) {
    for (const entry of multi.split(",")) {
      const raw = entry.trim();
      if (!raw) continue;
      const colon = raw.indexOf(":");
      const secret = colon >= 0 ? raw.slice(colon + 1).trim() : raw;
      if (secret.length >= 8) secrets.push(secret);
    }
  }

  return secrets;
}

export function getCrmApiKey(): string | null {
  const v =
    process.env.YUNA_CRM_API_KEY?.trim() || process.env.CRM_API_KEY?.trim();
  return v && v.length >= 8 ? v : null;
}

export function getCrmWebhookUrl(): string | null {
  const v =
    process.env.YUNA_CRM_WEBHOOK_URL?.trim() ||
    process.env.CRM_WEBHOOK_URL?.trim();
  return v && /^https?:\/\//i.test(v) ? v : null;
}

export function extractBearerOrHeader(
  request: Request,
  headerName: string,
): string | null {
  const header = request.headers.get(headerName)?.trim();
  if (header) return header;
  const auth = request.headers.get("authorization");
  if (!auth) return null;
  const m = /^Bearer\s+(.+)$/i.exec(auth.trim());
  return m?.[1]?.trim() || null;
}

export function assertStaffSecret(request: Request): boolean {
  const secrets = getStaffScanSecrets();
  if (secrets.length === 0) return false;
  const provided = extractBearerOrHeader(request, "x-yuna-staff");
  if (!provided) return false;
  return secrets.some((secret) => secureEquals(provided, secret));
}

export function assertCrmApiKey(request: Request): boolean {
  const key = getCrmApiKey();
  if (!key) return false;
  const provided = extractBearerOrHeader(request, "x-yuna-crm");
  if (provided && secureEquals(provided, key)) return true;
  // compat ancien header
  const legacy = extractBearerOrHeader(request, "x-crm-key");
  return Boolean(legacy && secureEquals(legacy, key));
}
