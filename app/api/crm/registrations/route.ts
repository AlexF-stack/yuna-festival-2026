import { NextResponse } from "next/server";

import { listRegistrationsForCrm } from "@/lib/registrations";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  assertCrmApiKey,
  assertStaffSecret,
  getCrmApiKey,
  getStaffScanSecrets,
} from "@/lib/staff-auth";

export const runtime = "nodejs";

/**
 * GET /api/crm/registrations?limit=200
 * Auth : x-yuna-crm / Bearer (CRM_API_KEY) OU x-yuna-staff (secret porte).
 */
export async function GET(request: Request) {
  const hasCrmKey = Boolean(getCrmApiKey());
  const hasStaff = getStaffScanSecrets().length > 0;

  if (!hasCrmKey && !hasStaff) {
    return NextResponse.json(
      { error: "CRM API non configurée (CRM_API_KEY)." },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  const limited = await rateLimit(`crm-regs:${ip}`, {
    limit: 30,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de requêtes." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  const okCrm = hasCrmKey && assertCrmApiKey(request);
  const okStaff = hasStaff && assertStaffSecret(request);
  if (!okCrm && !okStaff) {
    return NextResponse.json({ error: "Clé CRM ou secret staff invalide." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "200");

  try {
    const registrations = await listRegistrationsForCrm(limit);
    return NextResponse.json({
      ok: true,
      count: registrations.length,
      registrations,
    });
  } catch (err) {
    console.error("[crm/registrations]", err);
    return NextResponse.json(
      { error: "Lecture inscriptions impossible." },
      { status: 500 },
    );
  }
}
