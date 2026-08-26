import { randomUUID } from "node:crypto";

import { after, NextResponse } from "next/server";

import { sanitizeSource } from "@/lib/attribution";
import { notifyCrmRegistration, siteOrigin } from "@/lib/crm";
import { sendRegistrationConfirmation } from "@/lib/messaging";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { generateRegistrationQr } from "@/lib/registration-qr";
import { validateRegistrationInput } from "@/lib/registration";
import {
  parseOpenRegistrationTypes,
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
  registrationTypes?: string[];
  busWanted?: boolean;
  busLocation?: string;
  idempotencyKey?: string;
  website?: string;
  consent?: boolean;
  guests?: GuestBody[];
  source?: string;
};

type ParsedPerson = {
  name: string;
  phone: string;
  email: string | null;
  registrationType: RegistrationType;
  busWanted: boolean;
  busLocation: string | null;
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

/** Clé stable par catégorie (multi-inscription même personne). */
function deriveCategoryIdempotencyKey(
  parent: string,
  type: RegistrationType,
): string {
  const hex = parent.replace(/-/g, "").toLowerCase();
  let h = 0xc0ff;
  for (let i = 0; i < type.length; i++) {
    h = (h * 31 + type.charCodeAt(i)) >>> 0;
  }
  const suffix = (h & 0xffff).toString(16).padStart(4, "0");
  const next = `${hex.slice(0, 28)}${suffix}`;
  return `${next.slice(0, 8)}-${next.slice(8, 12)}-${next.slice(12, 16)}-${next.slice(16, 20)}-${next.slice(20, 32)}`;
}

async function insertOne(
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  input: ParsedPerson & {
    idempotencyKey: string;
    partyId: string | null;
    source: string | null;
  },
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
    bus_wanted: input.busWanted,
    bus_location: input.busLocation,
  };

  // party_id / bus_* / source ajoutés en migration — cast jusqu’à regen des types.
  const withExtras = {
    ...baseRow,
    ...(input.partyId ? { party_id: input.partyId } : {}),
    ...(input.source ? { source: input.source } : {}),
  };
  let { data, error } = await supabase
    .from("registrations")
    .insert(withExtras as typeof baseRow)
    .select("id, name, qr_code, created_at")
    .single();

  // Migration source pas encore appliquée : retry sans la colonne.
  if (error?.message?.includes("source") && input.source) {
    ({ data, error } = await supabase
      .from("registrations")
      .insert({
        ...baseRow,
        ...(input.partyId ? { party_id: input.partyId } : {}),
      } as typeof baseRow)
      .select("id, name, qr_code, created_at")
      .single());
  }

  // Migration party_id pas encore appliquée : retry sans la colonne.
  if (error?.message?.includes("party_id") && input.partyId) {
    ({ data, error } = await supabase
      .from("registrations")
      .insert(baseRow)
      .select("id, name, qr_code, created_at")
      .single());
  }

  // Migration bus_* pas encore appliquée : retry sans ces colonnes.
  if (
    error?.message?.includes("bus_wanted") ||
    error?.message?.includes("bus_location")
  ) {
    const { bus_wanted: _bw, bus_location: _bl, ...withoutBus } = baseRow;
    void _bw;
    void _bl;
    const retryRow = {
      ...withoutBus,
      ...(input.partyId ? { party_id: input.partyId } : {}),
    };
    ({ data, error } = await supabase
      .from("registrations")
      .insert(retryRow as typeof withoutBus)
      .select("id, name, qr_code, created_at")
      .single());
    if (error?.message?.includes("party_id") && input.partyId) {
      ({ data, error } = await supabase
        .from("registrations")
        .insert(withoutBus)
        .select("id, name, qr_code, created_at")
        .single());
    }
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

  const typesParsed = parseOpenRegistrationTypes(body);
  if ("error" in typesParsed) {
    return NextResponse.json({ error: typesParsed.error }, { status: 400 });
  }
  const selectedTypes = typesParsed;

  const idempotencyKey =
    typeof body.idempotencyKey === "string" ? body.idempotencyKey.trim() : "";
  if (!UUID_RE.test(idempotencyKey)) {
    return NextResponse.json(
      { error: "Session d'inscription invalide. Recharge la page." },
      { status: 400 },
    );
  }

  const source = sanitizeSource(body.source);

  const rawGuests = Array.isArray(body.guests) ? body.guests : [];
  if (rawGuests.length > MAX_PARTY - 1) {
    return NextResponse.json(
      { error: "Maximum 5 pass par inscription (toi + 4 proches)." },
      { status: 400 },
    );
  }

  const includesFestival = selectedTypes.includes("pass");
  const includesAmbassador = selectedTypes.includes("ambassadeur");
  if (rawGuests.length > 0 && !includesFestival && !includesAmbassador) {
    return NextResponse.json(
      {
        error:
          "L'inscription pour autrui est disponible avec Concert / Festival ou Ambassadeur.",
      },
      { status: 400 },
    );
  }

  // Une ligne DB + un QR par catégorie choisie (même personne).
  const party: ParsedPerson[] = [];
  for (const registrationType of selectedTypes) {
    const parsed = validateRegistrationInput({
      ...body,
      registrationType,
    });
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    party.push(parsed);
  }

  // Invités : uniquement le pass Festival (un QR chacun).
  for (let i = 0; i < rawGuests.length; i++) {
    const g = validateRegistrationInput({
      name: rawGuests[i]?.name,
      phone: rawGuests[i]?.phone,
      email: undefined,
      registrationType: "pass",
      requireEmail: false,
      busWanted: party[0]?.busWanted,
      busLocation: party[0]?.busLocation ?? undefined,
    });
    if ("error" in g) {
      return NextResponse.json(
        { error: `Pass n°${i + 2} : ${g.error}` },
        { status: 400 },
      );
    }
    party.push(g);
  }

  // Même téléphone OK entre catégories ; numéros Festival (titulaire + invités) uniques.
  const festivalPhones = party
    .filter((p) => p.registrationType === "pass")
    .map((p) => p.phone);
  if (new Set(festivalPhones).size !== festivalPhones.length) {
    return NextResponse.json(
      {
        error:
          "Chaque pass Festival doit avoir un numéro WhatsApp distinct (y compris le tien).",
      },
      { status: 400 },
    );
  }

  try {
    const supabase = createSupabaseAdminClient();
    const partyId =
      party.length > 1 || selectedTypes.length > 1 ? randomUUID() : null;
    const created: {
      id: string;
      name: string;
      qr_code: string;
      created_at: string;
    }[] = [];
    const crmJobs: Parameters<typeof notifyCrmRegistration>[0][] = [];

    let guestIndex = 0;
    for (let i = 0; i < party.length; i++) {
      const person = party[i];

      let key: string;
      if (i < selectedTypes.length) {
        key =
          i === 0
            ? idempotencyKey
            : deriveCategoryIdempotencyKey(
                idempotencyKey,
                person.registrationType,
              );
      } else {
        guestIndex += 1;
        key = deriveGuestIdempotencyKey(idempotencyKey, guestIndex);
      }

      const result = await insertOne(supabase, {
        ...person,
        idempotencyKey: key,
        partyId,
        source,
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
            error: `Inscription partielle : ${result.error}`,
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
          busWanted: person.busWanted,
          busLocation: person.busLocation,
        });
      }
    }

    const primaryEmail = party[0]?.email ?? null;

    if (crmJobs.length > 0) {
      // CRM : await (skill delivery) — ne pas perdre la sync sous cold start.
      await Promise.all(
        crmJobs.map((job) =>
          notifyCrmRegistration(job).catch((crmErr) => {
            console.error("[register] CRM sync", crmErr);
          }),
        ),
      );
      // Messaging : async (skill backend) — ne jamais bloquer la réponse HTTP.
      after(() => {
        void Promise.all(
          crmJobs.map((job) =>
            sendRegistrationConfirmation({
              id: job.id,
              name: job.name,
              phone: job.phone,
              email: job.email ?? primaryEmail,
              registrationType: job.registrationType,
              confirmationUrl:
                job.confirmationUrl ??
                `${siteOrigin()}/confirmation/${job.id}`,
            }).catch((msgErr) => {
              console.error("[register] messaging", msgErr);
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
      types: selectedTypes,
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
