import { NextResponse } from "next/server";

import { listRegistrationsForCrm } from "@/lib/registrations";
import { assertCrmApiKey, getCrmApiKey } from "@/lib/staff-auth";

export const runtime = "nodejs";

/**
 * GET /api/crm/registrations?limit=200
 * Header: x-crm-key: <CRM_API_KEY>  ou  Authorization: Bearer …
 * Pour synchroniser / lister dans ton CRM — pas d’UI admin sur le site.
 */
export async function GET(request: Request) {
  if (!getCrmApiKey()) {
    return NextResponse.json(
      { error: "CRM API non configurée (CRM_API_KEY)." },
      { status: 503 },
    );
  }

  if (!assertCrmApiKey(request)) {
    return NextResponse.json({ error: "Clé CRM invalide." }, { status: 401 });
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
