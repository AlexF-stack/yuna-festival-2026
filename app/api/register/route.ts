import { randomUUID } from "node:crypto";

import { after, NextResponse } from "next/server";

import { notifyCrmRegistration, siteOrigin } from "@/lib/crm";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { generateRegistrationQr } from "@/lib/registration-qr";
import { validateRegistrationInput } from "@/lib/registration";
import { REGISTRATION_TYPE_LABELS } from "@/lib/registration-types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type RegisterBody = {
  name?: string;
  phone?: string;
  email?: string;
  registrationType?: string;
  idempotencyKey?: string;
  website?: string; // honeypot
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

  const idempotencyKey =
    typeof body.idempotencyKey === "string" ? body.idempotencyKey.trim() : "";
  if (!UUID_RE.test(idempotencyKey)) {
    return NextResponse.json(
      { error: "Session d'inscription invalide. Recharge la page." },
      { status: 400 },
    );
  }

  try {
    const supabase = createSupabaseAdminClient();

    // Idempotence : même clé = même inscription (double clic / retry)
    const { data: existingByKey } = await supabase
      .from("registrations")
      .select("id, name, qr_code, created_at")
      .eq("idempotency_key", idempotencyKey)
      .maybeSingle();

    if (existingByKey) {
      return NextResponse.json({
        id: existingByKey.id,
        name: existingByKey.name,
        qrCode: existingByKey.qr_code,
        replayed: true,
      });
    }

    const id = randomUUID();
    const qr_code = await generateRegistrationQr(id);

    const { data, error } = await supabase
      .from("registrations")
      .insert({
        id,
        name: parsed.name,
        phone: parsed.phone,
        email: parsed.email,
        registration_type: parsed.registrationType,
        idempotency_key: idempotencyKey,
        qr_code,
      })
      .select("id, name, qr_code, created_at")
      .single();

    if (error) {
      if (error.code === "23505") {
        // Course sur idempotency_key
        const { data: raced } = await supabase
          .from("registrations")
          .select("id, name, qr_code")
          .eq("idempotency_key", idempotencyKey)
          .maybeSingle();
        if (raced) {
          return NextResponse.json({
            id: raced.id,
            name: raced.name,
            qrCode: raced.qr_code,
            replayed: true,
          });
        }

        const typeLabel =
          REGISTRATION_TYPE_LABELS[parsed.registrationType] ?? "cette catégorie";
        return NextResponse.json(
          {
            error: `Tu es déjà inscrit·e à « ${typeLabel} ». Retrouve ton pass via « Retrouver mon pass ».`,
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

    // CRM = listing admin externe, exécuté après la réponse sans être interrompu.
    after(async () => {
      await notifyCrmRegistration({
        id: data.id,
        name: parsed.name,
        phone: parsed.phone,
        email: parsed.email,
        registrationType: parsed.registrationType,
        createdAt: data.created_at,
        confirmationUrl: `${siteOrigin()}/confirmation/${data.id}`,
      });
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
