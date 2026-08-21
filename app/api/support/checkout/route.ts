import { NextResponse } from "next/server";

import {
  createSupportCheckout,
  isFedaPayConfigured,
  splitPersonName,
} from "@/lib/fedapay";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getSupportPaymentUrl } from "@/lib/site";

export const runtime = "nodejs";

type Body = {
  amount?: number;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 5_000_000;

export async function GET() {
  return NextResponse.json({
    ok: true,
    fedapay: isFedaPayConfigured(),
    paymentLink: Boolean(getSupportPaymentUrl()),
    currency: "XOF",
    minAmount: MIN_AMOUNT,
  });
}

export async function POST(request: Request) {
  if (!isFedaPayConfigured()) {
    return NextResponse.json(
      {
        error:
          "Paiement FedaPay pas encore configuré. Écris à contact@festivalyuna.com.",
        code: "fedapay_unconfigured",
      },
      { status: 503 },
    );
  }

  const limited = await rateLimit(`support-checkout:${clientIp(request)}`, {
    limit: 8,
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

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 },
    );
  }

  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, url: "/" });
  }

  const amount = Math.round(Number(body.amount));
  if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    return NextResponse.json(
      {
        error: `Montant invalide (entre ${MIN_AMOUNT.toLocaleString("fr-FR")} et ${MAX_AMOUNT.toLocaleString("fr-FR")} FCFA).`,
      },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  if (name.length < 2) {
    return NextResponse.json({ error: "Indique ton nom." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Indique un e-mail valide." },
      { status: 400 },
    );
  }

  const { firstname, lastname } = splitPersonName(name);

  try {
    const checkout = await createSupportCheckout({
      amount,
      customer: {
        firstname,
        lastname,
        email,
        phone: phone || undefined,
      },
    });
    return NextResponse.json({
      ok: true,
      url: checkout.url,
      transactionId: checkout.transactionId,
    });
  } catch (err) {
    console.error("[support/checkout]", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Paiement indisponible. Réessaie ou contacte l’équipe.",
      },
      { status: 502 },
    );
  }
}
