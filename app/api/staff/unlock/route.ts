import { NextResponse } from "next/server";

import { clientIp, rateLimit } from "@/lib/rate-limit";
import { assertStaffSecret, getStaffScanSecrets } from "@/lib/staff-auth";

export const runtime = "nodejs";

/**
 * POST /api/staff/unlock
 * Valide le secret staff côté serveur avant que le scanner s'ouvre.
 * Header: x-yuna-staff ou Authorization: Bearer
 */
export async function POST(request: Request) {
  if (getStaffScanSecrets().length === 0) {
    return NextResponse.json(
      { error: "Scan staff non configuré." },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  const limited = await rateLimit(`staff-unlock:${ip}`, {
    limit: 10,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessaie plus tard." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  if (!assertStaffSecret(request)) {
    return NextResponse.json({ error: "Secret invalide." }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
