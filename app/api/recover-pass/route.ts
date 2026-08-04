import { NextResponse } from "next/server";

import {
  clientIp,
  isRateLimited,
  rateLimit,
  recordAttempt,
} from "@/lib/rate-limit";
import { normalizePhone } from "@/lib/registration";
import { findRegistrationsByPhone } from "@/lib/registrations";
import { REGISTRATION_TYPE_LABELS } from "@/lib/registration-types";

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

/**
 * Vrai si le nom fourni correspond au nom enregistré (ordre des mots libre).
 * Le prénom seul ne suffit pas : il faut autant de mots corrects que le nom
 * enregistré en compte, plafonné à 2 (prénom + nom).
 */
function namesMatch(provided: string, stored: string): boolean {
  const a = normalizeName(provided);
  const b = normalizeName(stored);
  if (a.length < 2 || b.length < 2) return false;
  if (a === b) return true;
  const wordsA = a.split(" ").filter((w) => w.length >= 2);
  const wordsB = b.split(" ").filter((w) => w.length >= 2);
  const storedSet = new Set(wordsB);
  const required = Math.min(2, wordsB.length);
  return (
    wordsA.length >= required && wordsA.every((w) => storedSet.has(w))
  );
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

  // Seuls les ÉCHECS comptent dans la limite par numéro : le propriétaire
  // légitime ne peut pas être bloqué par un tiers qui épuise le quota.
  const phoneKey = `recover-pass:phone-fail:${phone}`;
  if (isRateLimited(phoneKey, 5)) {
    // Réponse uniforme (pas de 429) pour ne rien signaler à l'attaquant.
    return NextResponse.json({ ok: true, found: false });
  }

  try {
    const registrations = await findRegistrationsByPhone(phone);
    const matches = registrations.filter((r) => namesMatch(name, r.name));

    // Réponse uniforme : ne révèle pas si le numéro est inscrit ou non.
    if (matches.length === 0) {
      recordAttempt(phoneKey, 3_600_000);
      return NextResponse.json({ ok: true, found: false });
    }

    return NextResponse.json({
      ok: true,
      found: true,
      id: matches[0].id,
      passes: matches.map((m) => ({
        id: m.id,
        label:
          REGISTRATION_TYPE_LABELS[
            m.registrationType as keyof typeof REGISTRATION_TYPE_LABELS
          ] ?? m.registrationType,
      })),
    });
  } catch (err) {
    console.error("[recover-pass]", err);
    return NextResponse.json(
      { error: "Récupération impossible pour le moment." },
      { status: 503 },
    );
  }
}
