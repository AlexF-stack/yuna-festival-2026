import { NextResponse } from "next/server";
import { Resend } from "resend";

import { clientIp, rateLimit } from "@/lib/rate-limit";
import { SITE_CONTACT } from "@/lib/site";

export const runtime = "nodejs";

type ContactKind = "partnership" | "support";

type ContactBody = {
  kind?: ContactKind;
  website?: string;
  organization?: string;
  name?: string;
  email?: string;
  phone?: string;
  mode?: string;
  tier?: string;
  message?: string;
  amount?: number | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function inbox(): string {
  return (
    process.env.CONTACT_INBOX_EMAIL?.trim() ||
    SITE_CONTACT.email
  );
}

function fromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `YUNA Festival <${SITE_CONTACT.email}>`
  );
}

function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const limited = await rateLimit(`contact:${clientIp(request)}`, {
    limit: 6,
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

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 },
    );
  }

  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Envoi indisponible pour le moment. Écris-nous à contact@festivalyuna.com.",
      },
      { status: 503 },
    );
  }

  const kind: ContactKind =
    body.kind === "support" ? "support" : "partnership";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const organization =
    typeof body.organization === "string" ? body.organization.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";
  const mode = typeof body.mode === "string" ? body.mode.trim() : "";
  const tier = typeof body.tier === "string" ? body.tier.trim() : "";
  const amount =
    typeof body.amount === "number" &&
    Number.isFinite(body.amount) &&
    body.amount > 0
      ? Math.round(body.amount)
      : null;

  if (name.length < 2) {
    return NextResponse.json(
      { error: "Indique ton nom." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Indique un e-mail valide." },
      { status: 400 },
    );
  }

  if (kind === "partnership" && organization.length < 2) {
    return NextResponse.json(
      { error: "Indique le nom de l’organisation." },
      { status: 400 },
    );
  }

  const to = inbox();
  const subject =
    kind === "support"
      ? amount
        ? `Soutien YUNA 2026 · ${amount.toLocaleString("fr-FR")} FCFA · ${name}`
        : `Soutien YUNA 2026 · ${name}`
      : `Partenariat YUNA 2026 · ${organization}`;

  const lines =
    kind === "support"
      ? [
          "Nouvelle intention de soutien (montants) depuis festivalyuna.com",
          "",
          `Nom : ${name}`,
          `E-mail : ${email}`,
          `Téléphone : ${phone || "—"}`,
          `Montant envisagé : ${
            amount ? `${amount.toLocaleString("fr-FR")} FCFA` : "non précisé"
          }`,
          "",
          message ? `Message :\n${message}` : "",
        ]
      : [
          "Nouvelle demande de partenariat depuis festivalyuna.com",
          "",
          `Organisation : ${organization}`,
          `Contact : ${name}`,
          `E-mail : ${email}`,
          `Téléphone : ${phone || "—"}`,
          `Type : ${mode || "—"}`,
          `Niveau / palier : ${tier || "—"}`,
          "",
          "Message :",
          message || "(à préciser)",
        ];

  const text = lines.filter(Boolean).join("\n");
  const html = `<pre style="font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;font-size:14px;line-height:1.5;color:#0A1628;">${escape(text)}</pre>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: [to],
      replyTo: email,
      subject,
      text,
      html,
    });
    if (error) {
      console.error("[contact] resend", error);
      return NextResponse.json(
        {
          error:
            "Envoi impossible pour le moment. Réessaie ou écris à contact@festivalyuna.com.",
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      {
        error:
          "Envoi impossible pour le moment. Réessaie ou écris à contact@festivalyuna.com.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, inbox: to });
}
