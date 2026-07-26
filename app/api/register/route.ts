import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { generateRegistrationQr } from "@/lib/registration-qr";
import { validateRegistrationInput } from "@/lib/registration";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type RegisterBody = {
  name?: string;
  phone?: string;
  email?: string;
};

export async function POST(request: Request) {
  let body: RegisterBody;
  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 },
    );
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
        qr_code,
      })
      .select("id, name, qr_code")
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
