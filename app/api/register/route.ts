import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { notifyCrmRegistration, siteOrigin } from "@/lib/crm";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { generateRegistrationQr } from "@/lib/registration-qr";
import { validateRegistrationInput } from "@/lib/registration";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type RegisterBody = {
  name?: string;
  phone?: string;
  email?: string;
  registrationType?: string;
  website?: string; // honeypot
};

export async function POST(request: Request) {
  const limited = rateLimit(`register:${clientIp(request)}`, {
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

  let body: RegisterBody;
  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 },
    );
  }

  // Bot honeypot — silent success without creating a real registration
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = validateRegistrationInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const id = randomUUID();
    const qr_code = await generateRegistrationQr(id);
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("registrations")
      .insert({
        id,
        name: parsed.name,
        phone: parsed.phone,
        email: parsed.email,
        registration_type: parsed.registrationType,
        qr_code,
      })
      .select("id, name, qr_code, created_at")
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          {
            error:
              "Ce numéro est déjà inscrit. Présente le QR reçu lors de ta première inscription.",
          },
          { status: 409 },
        );
      }
      console.error("[register]", error);
      return NextResponse.json(
        { error: "Inscription impossible pour le moment. Réessaie." },
        { status: 500 },
      );
    }

    // CRM = listing admin externe (ne bloque pas l’inscription)
    void notifyCrmRegistration({
      id: data.id,
      name: parsed.name,
      phone: parsed.phone,
      email: parsed.email,
      registrationType: parsed.registrationType,
      createdAt: data.created_at,
      confirmationUrl: `${siteOrigin()}/confirmation/${data.id}`,
    });

    return NextResponse.json({
      id: data.id,
      name: data.name,
      qrCode: data.qr_code,
    });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json(
      {
        error:
          "Service d'inscription indisponible. Vérifie la configuration Supabase.",
      },
      { status: 503 },
    );
  }
}
