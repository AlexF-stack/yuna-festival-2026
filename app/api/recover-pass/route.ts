import { NextResponse } from "next/server";

import { clientIp, rateLimit } from "@/lib/rate-limit";
import { normalizePhone } from "@/lib/registration";
import { findLatestRegistrationIdByPhone } from "@/lib/registrations";

export const runtime = "nodejs";

type RecoverBody = {
  phone?: string;
  website?: string; // honeypot
};

const PHONE_RE = /^[+0-9\s().-]{8,20}$/;

export async function POST(request: Request) {
  const limited = rateLimit(`recover-pass:${clientIp(request)}`, {
    limit: 5,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessaie dans un instant." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: RecoverBody;
  try {
    body = (await request.json()) as RecoverBody;
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 },
    );
  }

  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const phone = normalizePhone(
    typeof body.phone === "string" ? body.phone : "",
  );
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json(
      {
        error:
          "Indique le numéro WhatsApp utilisé à l'inscription (ex. +229 01 XX XX XX XX).",
      },
      { status: 400 },
    );
  }

  try {
    const id = await findLatestRegistrationIdByPhone(phone);
    if (!id) {
      return NextResponse.json(
        {
          error:
            "Aucun pass trouvé pour ce numéro. Vérifie le format (+229…) ou inscris-toi.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[recover-pass]", err);
    return NextResponse.json(
      { error: "Récupération impossible pour le moment." },
      { status: 503 },
    );
  }
}
