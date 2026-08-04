import { NextResponse } from "next/server";

import { getCrmApiKey, getStaffScanSecrets } from "@/lib/staff-auth";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export const runtime = "nodejs";

function redisConfigured(): boolean {
  return Boolean(
    (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) &&
      (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN),
  );
}

/**
 * GET /api/health — état ops (pas de secrets). Public volontairement.
 */
export async function GET() {
  const staffSecrets = getStaffScanSecrets().length;
  const checks = {
    ok: true as boolean,
    siteDb: hasSupabaseEnv() && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    crmDb: Boolean(
      (process.env.YUNA_CRM_SUPABASE_URL || process.env.CRM_SUPABASE_URL) &&
        (process.env.YUNA_CRM_SERVICE_ROLE_KEY ||
          process.env.CRM_SUPABASE_SERVICE_ROLE_KEY),
    ),
    crmApiKey: Boolean(getCrmApiKey()),
    staffSecret: staffSecrets > 0,
    rateLimitRedis: redisConfigured(),
    siteUrl: Boolean(
      process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL,
    ),
  };

  checks.ok =
    checks.siteDb &&
    checks.crmDb &&
    checks.crmApiKey &&
    checks.staffSecret &&
    checks.rateLimitRedis;

  return NextResponse.json(
    {
      service: "yuna-festival-2026",
      checks,
      staffSecretsConfigured: staffSecrets,
    },
    { status: checks.ok ? 200 : 503 },
  );
}
