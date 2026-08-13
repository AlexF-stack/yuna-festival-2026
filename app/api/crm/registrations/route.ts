import { NextResponse } from "next/server";

import { listRegistrationsForCrm, getCrmStats } from "@/lib/registrations";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { assertCrmApiKey, getCrmApiKey } from "@/lib/staff-auth";

export const runtime = "nodejs";

/**
 * GET /api/crm/registrations?page=1&pageSize=25&q=&checkedIn=all|yes|no&type=
 * Auth : clé CRM uniquement (`x-yuna-crm` / `x-api-key` / Bearer).
 * Le secret scan porte n’accorde plus l’accès au dump PII.
 */
export async function GET(request: Request) {
  if (!getCrmApiKey()) {
    return NextResponse.json(
      { ok: false, error: "CRM API non configurée (YUNA_CRM_API_KEY manquant)." },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  const limited = await rateLimit(`crm-regs:${ip}`, {
    limit: 60,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Trop de requêtes." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  if (!assertCrmApiKey(request)) {
    return NextResponse.json(
      { ok: false, error: "Clé CRM invalide." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(
    searchParams.get("pageSize") ?? searchParams.get("limit") ?? "25",
  );
  const q = searchParams.get("q") ?? undefined;
  const checkedRaw = searchParams.get("checkedIn") ?? "all";
  const checkedIn =
    checkedRaw === "yes" || checkedRaw === "no" ? checkedRaw : "all";
  const registrationType = searchParams.get("type") ?? undefined;

  try {
    const [result, stats] = await Promise.all([
      listRegistrationsForCrm({
        page: Number.isFinite(page) ? page : 1,
        pageSize: Number.isFinite(pageSize) ? pageSize : 25,
        q,
        checkedIn,
        registrationType,
      }),
      getCrmStats({ q, registrationType }),
    ]);

    return NextResponse.json({
      ok: true,
      ...result,
      stats,
      /** Compat anciens clients */
      count: result.total,
    });
  } catch (err) {
    console.error("[crm/registrations]", err);
    return NextResponse.json(
      { ok: false, error: "Lecture inscriptions impossible." },
      { status: 500 },
    );
  }
}
