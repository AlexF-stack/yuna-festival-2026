import { randomUUID } from "node:crypto";

import { after, NextResponse } from "next/server";

import { notifyCrmRegistration, siteOrigin } from "@/lib/crm";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { generateRegistrationQr } from "@/lib/registration-qr";
import { validateRegistrationInput } from "@/lib/registration";
import {
  REGISTRATION_TYPE_LABELS,
  type RegistrationType,
} from "@/lib/registration-types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type GuestBody = { name?: string; phone?: string };

type RegisterBody = {
  name?: string;
  phone?: string;
  email?: string;
  registrationType?: string;
  idempotencyKey?: string;
  website?: string;
  consent?: boolean;
  guests?: GuestBody[];
};

type ParsedPerson = {
  name: string;
  phone: string;
  email: string | null;
  registrationType: RegistrationType;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const MAX_PARTY = 5;

/** Dérive une clé UUID déterministe par invité (parent + index). */
function deriveGuestIdempotencyKey(parent: string, index: number): string {
  const hex = parent.replace(/-/g, "").toLowerCase();
  const suffix = (index + 1).toString(16).padStart(4, "0");
  const next = `${hex.slice(0, 28)}${suffix}`;
  return `${next.slice(0, 8)}-${next.slice(8, 12)}-${next.slice(12, 16)}-${next.slice(16, 20)}-${next.slice(20, 32)}`;
}

async function insertOne(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  input: ParsedPerson & { idempotencyKey: string; partyId: string | null },
) {
  const { data: existingByKey } = await supabase
    .from("registrations")
    .select("id, name, qr_code, created_at")
    .eq("idempotency_key", input.idempotencyKey)
    .maybeSingle();

  if (existingByKey) {
    return { ok: true as const, data: existingByKey, replayed: true };
  }

  const id = randomUUID();
  const qr_code = await generateRegistrationQr(id);

  const baseRow = {
    id,
    name: input.name,
    phone: input.phone,
    email: input.email,
    registration_type: input.registrationType,
    idempotency_key: input.idempotencyKey,
    qr_code,
  };

  // party_id ajouté en migration — cast jusqu’à regen des types Supabase.
  const withParty = {
    ...baseRow,
    ...(input.partyId ? { party_id: input.partyId } : {}),
  };
  let { data, error } = await supabase
    .from("registrations")
    .insert(withParty as typeof baseRow)
    .select("id, name, qr_code, created_at")
    .single();

  // Migration party_id pas encore appliquée : retry sans la colonne.
  if (error?.message?.includes("party_id") && input.partyId) {
    ({ data, error } = await supabase
      .from("registrations")
      .insert(baseRow)
      .select("id, name, qr_code, created_at")
      .single());
  }

  if (error) {
    if (error.code === "23505") {
      const { data: raced } = await supabase
        .from("registrations")
        .select("id, name, qr_code, created_at")
        .eq("idempotency_key", input.idempotencyKey)
        .maybeSingle();
      if (raced) {
        return { ok: true as const, data: raced, replayed: true };
      }
      const typeLabel =
        REGISTRATION_TYPE_LABELS[input.registrationType] ?? "cette catégorie";
      return {
        ok: false as const,
        status: 409 as const,
        error: `Tu es déjà inscrit·e à « ${typeLabel} ». Retrouve ton pass via « Retrouver mon pass ».`,
      };
    }
    console.error("[register]", error);
    return {
      ok: false as const,
      status: 500 as const,
      error: "Inscription impossible pour le moment. Réessaie.",
    };
  }

  return { ok: true as const, data, replayed: false };
}

export async function POST(request: Request) {
  const limited = await rateLimit(`register:${clientIp(request)}`, {
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

  let body: RegisterBody;
  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide." },
      { status: 400 },
    );
  }

  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({
      id: randomUUID(),
      name: typeof body.name === "string" ? body.name : "",
      qrCode: "",
    });
  }

  if (body.consent !== true) {
    return NextResponse.json(
      { error: "Le consentement au traitement des données est requis." },
      { status: 400 },
    );
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

  const rawGuests = Array.isArray(body.guests) ? body.guests : [];
  if (rawGuests.length > MAX_PARTY - 1) {
    return NextResponse.json(
      { error: "Maximum 5 pass par inscription (toi + 4 proches)." },
      { status: 400 },
    );
  }

  if (rawGuests.length > 0 && parsed.registrationType !== "pass") {
    return NextResponse.json(
      {
        error:
          "L'inscription groupe n'est disponible que pour le Pass Festival.",
      },
      { status: 400 },
    );
  }

  const party: ParsedPerson[] = [parsed];

  for (let i = 0; i < rawGuests.length; i++) {
    const g = validateRegistrationInput({
      name: rawGuests[i]?.name,
      phone: rawGuests[i]?.phone,
      email: undefined,
      registrationType: parsed.registrationType,
    });
    if ("error" in g) {
      return NextResponse.json(
        { error: `Pass n°${i + 2} : ${g.error}` },
        { status: 400 },
      );
    }
    party.push(g);
  }

  const phones = party.map((p) => p.phone);
  if (new Set(phones).size !== phones.length) {
    return NextResponse.json(
      {
        error:
          "Chaque pass doit avoir un numéro WhatsApp distinct (y compris le tien).",
      },
      { status: 400 },
    );
  }

  try {
    const supabase = createSupabaseAdminClient();
    const partyId = party.length > 1 ? randomUUID() : null;
    const created: {
      id: string;
      name: string;
      qr_code: string;
      created_at: string;
    }[] = [];
    const crmJobs: Parameters<typeof notifyCrmRegistration>[0][] = [];

    for (let i = 0; i < party.length; i++) {
      const person = party[i];
      const key =
        i === 0 ? idempotencyKey : deriveGuestIdempotencyKey(idempotencyKey, i);
      const result = await insertOne(supabase, {
        ...person,
        idempotencyKey: key,
        partyId,
      });

      if (!result.ok) {
        if (created.length === 0) {
          return NextResponse.json(
            { error: result.error },
            { status: result.status },
          );
        }
        return NextResponse.json(
          {
            error: `Pass principal créé, mais le pass n°${i + 1} a échoué : ${result.error}`,
            id: created[0].id,
            ids: created.map((r) => r.id),
          },
          { status: result.status },
        );
      }

      const row = result.data;
      if (!row) {
        return NextResponse.json(
          { error: "Inscription impossible pour le moment. Réessaie." },
          { status: 500 },
        );
      }
      created.push(row);
      if (!result.replayed) {
        crmJobs.push({
          id: row.id,
          name: person.name,
          phone: person.phone,
          email: person.email,
          registrationType: person.registrationType,
          createdAt: row.created_at,
          confirmationUrl: `${siteOrigin()}/confirmation/${row.id}`,
        });
      }
    }

    if (crmJobs.length > 0) {
      after(() => {
        void Promise.all(
          crmJobs.map((job) =>
            notifyCrmRegistration(job).catch((crmErr) => {
              console.error("[register] CRM sync", crmErr);
            }),
          ),
        );
      });
    }

    return NextResponse.json({
      id: created[0].id,
      name: created[0].name,
      qrCode: created[0].qr_code,
      ids: created.map((r) => r.id),
      count: created.length,
      partyId,
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
