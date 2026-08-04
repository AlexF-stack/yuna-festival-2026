import { after, NextResponse } from "next/server";

import { syncYunaCrmNewsletter } from "@/lib/crm";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type NewsletterBody = {
  email?: string;
  website?: string; // honeypot
  consent?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const limited = await rateLimit(`newsletter:${clientIp(request)}`, {
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

  let body: NewsletterBody;
  try {
    body = (await request.json()) as NewsletterBody;
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 },
    );
  }

  // Bot honeypot — silent success
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // RGPD : consentement explicite requis
  if (body.consent !== true) {
    return NextResponse.json(
      { error: "Coche la case de consentement pour t'abonner." },
      { status: 400 },
    );
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Indique une adresse e-mail valide." },
      { status: 400 },
    );
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
    });

    if (error) {
      if (error.code === "23505") {
        // Already subscribed — treat as success (idempotent UX)
        after(async () => {
          await syncYunaCrmNewsletter({ email });
        });
        return NextResponse.json({ ok: true, already: true });
      }
      console.error("[newsletter]", error);
      return NextResponse.json(
        { error: "Inscription newsletter impossible pour le moment." },
        { status: 500 },
      );
    }

    after(async () => {
      await syncYunaCrmNewsletter({ email });
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter]", err);
    return NextResponse.json(
      {
        error:
          "Service newsletter indisponible. Vérifie la configuration Supabase.",
      },
      { status: 503 },
    );
  }
}
