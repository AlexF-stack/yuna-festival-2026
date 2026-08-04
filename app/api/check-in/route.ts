import { after, NextResponse } from "next/server";

import { notifyCrmRegistration } from "@/lib/crm";
import { extractRegistrationId } from "@/lib/registration-id";
import { checkInRegistration } from "@/lib/registrations";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { assertStaffSecret, getStaffScanSecrets } from "@/lib/staff-auth";

export const runtime = "nodejs";

type Body = {
  code?: string;
  staffLabel?: string;
};

/**
 * POST /api/check-in
 * Header: x-yuna-staff: <YUNA_STAFF_SECRET>  ou  Authorization: Bearer …
 * Body: { code: "<uuid|url>", staffLabel?: "porte-1" }
 */
export async function POST(request: Request) {
  if (getStaffScanSecrets().length === 0) {
    return NextResponse.json(
      { error: "Scan non configuré (YUNA_STAFF_SECRET(S) manquant)." },
      { status: 503 },
    );
  }

  if (!assertStaffSecret(request)) {
    return NextResponse.json({ error: "Accès staff refusé." }, { status: 401 });
  }

  const limited = await rateLimit(`checkin:${clientIp(request)}`, {
    limit: 60,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de scans. Patiente une seconde." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const id = extractRegistrationId(body.code ?? "");
  if (!id) {
    return NextResponse.json(
      { error: "QR invalide — UUID d’inscription attendu." },
      { status: 400 },
    );
  }

  const staffLabel =
    typeof body.staffLabel === "string" && body.staffLabel.trim()
      ? body.staffLabel.trim()
      : "staff";

  try {
    const result = await checkInRegistration(id, staffLabel);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.code === "not_found" ? 404 : 500 },
      );
    }

    // Généré avant les retries : clé primaire du journal `scans` côté CRM,
    // pour qu'un retry après timeout ne crée jamais de doublon.
    const scanId = crypto.randomUUID();

    after(async () => {
      await notifyCrmRegistration({
        event: "registration.checked_in",
        id: result.registration.id,
        name: result.registration.name,
        phone: result.registration.phone,
        email: result.registration.email,
        registrationType: result.registration.registrationType,
        createdAt: result.registration.createdAt,
        checkedInAt: result.registration.checkedInAt,
        checkedInBy: staffLabel,
        alreadyCheckedIn: result.alreadyCheckedIn,
        scanId,
      });
    });

    return NextResponse.json({
      ok: true,
      alreadyCheckedIn: result.alreadyCheckedIn,
      registration: result.registration,
    });
  } catch (err) {
    console.error("[check-in]", err);
    return NextResponse.json(
      { error: "Service check-in indisponible." },
      { status: 503 },
    );
  }
}
