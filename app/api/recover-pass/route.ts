import { NextResponse } from "next/server";

import { clientIp, rateLimit } from "@/lib/rate-limit";
import { normalizePhone } from "@/lib/registration";
import { findLatestRegistrationByPhone } from "@/lib/registrations";

export const runtime = "nodejs";

type RecoverBody = {
  phone?: string;
  name?: string;
  website?: string; // honeypot
};

const PHONE_RE = /^[+0-9\s().-]{8,20}$/;

/** Minuscules, sans accents ni espaces multiples — pour comparer les noms. */
function normalizeName(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z]+/g, " ")
    .trim();
}

/** Vrai si le nom fourni correspond au nom enregistré (ordre des mots libre). */
function namesMatch(provided: string, stored: string): boolean {
  const a = normalizeName(provided);
  const b = normalizeName(stored);
  if (a.length < 2 || b.length < 2) return false;
  if (a === b) return true;
  const wordsA = a.split(" ").filter((w) => w.length >= 2);
  const wordsB = new Set(b.split(" "));
  // Tous les mots fournis doivent exister dans le nom enregistré (≥ 1 mot).
  return wordsA.length > 0 && wordsA.every((w) => wordsB.has(w));
}

/**
 * Anti-énumération : nom + téléphone requis, réponse identique quand le
 * couple ne correspond pas (aucune distinction « numéro inconnu » vs
 * « mauvais nom »), et limite dédiée par numéro en plus de la limite par IP.
 */
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
    return NextResponse.json({ ok: true, found: false });
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

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (name.length < 2) {
    return NextResponse.json(
      { error: "Indique le nom utilisé à l'inscription." },
      { status: 400 },
    );
  }

  const phoneLimited = rateLimit(`recover-pass:phone:${phone}`, {
    limit: 3,
    windowMs: 3_600_000,
  });
  if (!phoneLimited.ok) {
    return NextResponse.json(
      { error: "Trop de tentatives pour ce numéro. Réessaie plus tard." },
      {
        status: 429,
        headers: { "Retry-After": String(phoneLimited.retryAfterSec) },
      },
    );
  }

  try {
    const registration = await findLatestRegistrationByPhone(phone);

    // Réponse uniforme : ne révèle pas si le numéro est inscrit ou non.
    if (!registration || !namesMatch(name, registration.name)) {
      return NextResponse.json({ ok: true, found: false });
    }

    return NextResponse.json({ ok: true, found: true, id: registration.id });
  } catch (err) {
    console.error("[recover-pass]", err);
    return NextResponse.json(
      { error: "Récupération impossible pour le moment." },
      { status: 503 },
    );
  }
}
