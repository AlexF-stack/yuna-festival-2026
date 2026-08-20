/**
 * Sync vers le CRM YUNA Festival (projet Supabase dédié).
 * Listing / admin = CRM — pas d’espace admin sur le site public.
 */

import { createClient } from "@supabase/supabase-js";

import type { RegistrationType } from "@/lib/registration-types";

export type YunaCrmSyncPayload = {
  event: "inscription.created" | "inscription.checked_in";
  id: string;
  nom: string;
  telephone: string;
  email: string | null;
  typePass: RegistrationType | string;
  createdAt?: string;
  urlConfirmation?: string;
  checkedInAt?: string | null;
  checkedInBy?: string | null;
  /** Demande de navette bus + point de prise en charge */
  busWanted?: boolean;
  busLocation?: string | null;
  /** Résultat journal scans CRM */
  scanResultat?: "ok" | "deja_scanne" | "inconnu" | "refuse";
  /**
   * UUID généré par l'appelant pour cet événement de scan : sert de clé
   * primaire du journal `scans` et de clé d'idempotence webhook, pour que
   * les retries ne créent jamais de doublons.
   */
  scanId?: string;
};

export type YunaCrmNewsletterPayload = {
  email: string;
  source?: string;
};

/** @deprecated alias — préférer YunaCrmSyncPayload */
export type CrmRegistrationPayload = {
  event: "registration.created" | "registration.checked_in";
  id: string;
  name: string;
  phone: string;
  email: string | null;
  registrationType: RegistrationType | string;
  createdAt?: string;
  confirmationUrl?: string;
  checkedInAt?: string | null;
  checkedInBy?: string | null;
  busWanted?: boolean;
  busLocation?: string | null;
};

export function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.festivalyuna.com"
  );
}

function createYunaCrmClient() {
  const url =
    process.env.YUNA_CRM_SUPABASE_URL?.trim() ||
    process.env.CRM_SUPABASE_URL?.trim();
  const key =
    process.env.YUNA_CRM_SERVICE_ROLE_KEY?.trim() ||
    process.env.CRM_SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getWebhookUrl(): string | null {
  const v =
    process.env.YUNA_CRM_WEBHOOK_URL?.trim() ||
    process.env.CRM_WEBHOOK_URL?.trim();
  return v && /^https:\/\//i.test(v) ? v : null;
}

/**
 * Réessaie une opération CRM avec backoff (1 s puis 3 s) : la sync tourne
 * dans `after()` après la réponse HTTP, donc les retries ne coûtent rien à
 * l'utilisateur. Une indisponibilité brève du CRM ne perd plus la donnée.
 */
async function withRetry(
  label: string,
  fn: () => Promise<void>,
): Promise<void> {
  // Backoff court : 0 → 400ms → 1200ms (total <2s) pour rester dans la
  // requête HTTP sans bloquer l'utilisateur trop longtemps.
  const delaysMs = [0, 400, 1200];
  let lastError: unknown;
  for (const delay of delaysMs) {
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    try {
      await fn();
      return;
    } catch (err) {
      lastError = err;
    }
  }
  console.error(
    `[yuna-crm] ${label} — échec après ${delaysMs.length} tentatives:`,
    lastError,
  );
  throw lastError instanceof Error
    ? lastError
    : new Error(`[yuna-crm] ${label} failed`);
}

async function upsertInscription(payload: YunaCrmSyncPayload): Promise<void> {
  const crm = createYunaCrmClient();
  if (!crm) return;

  // Check-in : mise à jour ciblée pour ne jamais réécrire created_at.
  if (payload.event === "inscription.checked_in") {
    const { data, error } = await crm
      .from("inscriptions")
      .update({
        checked_in_at: payload.checkedInAt ?? new Date().toISOString(),
        checked_in_by: payload.checkedInBy ?? null,
        synced_at: new Date().toISOString(),
      })
      .eq("id", payload.id)
      .select("id");

    if (error) throw new Error(`inscriptions update: ${error.message}`);
    if (data && data.length > 0) return;
    // Inscription jamais synchronisée : on retombe sur l'upsert complet.
  }

  const { error } = await crm.from("inscriptions").upsert(
    {
      id: payload.id,
      nom: payload.nom,
      telephone: payload.telephone,
      email: payload.email,
      type_pass: payload.typePass,
      url_confirmation:
        payload.urlConfirmation ?? `${siteOrigin()}/confirmation/${payload.id}`,
      checked_in_at: payload.checkedInAt ?? null,
      checked_in_by: payload.checkedInBy ?? null,
      bus_wanted: payload.busWanted ?? false,
      bus_location: payload.busLocation ?? null,
      created_at: payload.createdAt ?? new Date().toISOString(),
      synced_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  // Colonnes bus absentes côté CRM : retry sans elles.
  if (
    error &&
    (error.message.includes("bus_wanted") ||
      error.message.includes("bus_location"))
  ) {
    const { error: retryError } = await crm.from("inscriptions").upsert(
      {
        id: payload.id,
        nom: payload.nom,
        telephone: payload.telephone,
        email: payload.email,
        type_pass: payload.typePass,
        url_confirmation:
          payload.urlConfirmation ??
          `${siteOrigin()}/confirmation/${payload.id}`,
        checked_in_at: payload.checkedInAt ?? null,
        checked_in_by: payload.checkedInBy ?? null,
        created_at: payload.createdAt ?? new Date().toISOString(),
        synced_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
    if (retryError) throw new Error(`inscriptions upsert: ${retryError.message}`);
    return;
  }

  if (error) throw new Error(`inscriptions upsert: ${error.message}`);
}

async function insertScanLog(payload: YunaCrmSyncPayload): Promise<void> {
  if (payload.event !== "inscription.checked_in") return;
  const crm = createYunaCrmClient();
  if (!crm) return;

  const resultat = payload.scanResultat ?? "ok";
  const { error } = await crm.from("scans").insert({
    ...(payload.scanId ? { id: payload.scanId } : {}),
    inscription_id: payload.id,
    resultat,
    poste: payload.checkedInBy ?? "staff",
  });

  // 23505 = le scan a déjà été journalisé par une tentative précédente
  // (timeout après insert réussi) : le retry est un succès, pas un doublon.
  if (error && error.code === "23505") return;
  if (error) throw new Error(`scans insert: ${error.message}`);
}

async function postWebhook(payload: YunaCrmSyncPayload): Promise<void> {
  const url = getWebhookUrl();
  if (!url) return;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Même clé à chaque retry : le consommateur peut dédupliquer.
      "Idempotency-Key": `${payload.event}:${payload.scanId ?? payload.id}`,
      ...(process.env.YUNA_CRM_API_KEY || process.env.CRM_API_KEY
        ? {
            Authorization: `Bearer ${process.env.YUNA_CRM_API_KEY || process.env.CRM_API_KEY}`,
          }
        : {}),
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    throw new Error(`webhook HTTP ${res.status}`);
  }
}

/** Sync CRM YUNA — ne bloque jamais l’API du site, réessaie en cas d'échec. */
export async function syncYunaCrm(payload: YunaCrmSyncPayload): Promise<void> {
  // L'inscription d'abord : le journal `scans` porte une FK vers elle.
  await withRetry("inscriptions", () => upsertInscription(payload));
  await Promise.all([
    withRetry("scans", () => insertScanLog(payload)),
    withRetry("webhook", () => postWebhook(payload)),
  ]);
}

/** Synchronise un abonnement newsletter vers le CRM sans exposer le service role. */
export async function syncYunaCrmNewsletter({
  email,
  source = "site",
}: YunaCrmNewsletterPayload): Promise<void> {
  const crm = createYunaCrmClient();
  if (!crm) return;

  await withRetry("newsletter", async () => {
    const { error } = await crm.from("newsletter").upsert(
      {
        email,
        source,
      },
      { onConflict: "email", ignoreDuplicates: true },
    );

    if (error) throw new Error(`newsletter upsert: ${error.message}`);
  });
}

/**
 * Compat couche register/check-in existante.
 * @deprecated utiliser syncYunaCrm
 */
export async function notifyCrmRegistration(
  payload: Omit<CrmRegistrationPayload, "event"> & {
    event?: CrmRegistrationPayload["event"];
    alreadyCheckedIn?: boolean;
    scanId?: string;
  },
): Promise<void> {
  const event: YunaCrmSyncPayload["event"] =
    payload.event === "registration.checked_in"
      ? "inscription.checked_in"
      : "inscription.created";

  await syncYunaCrm({
    event,
    id: payload.id,
    nom: payload.name,
    telephone: payload.phone,
    email: payload.email,
    typePass: payload.registrationType,
    createdAt: payload.createdAt,
    urlConfirmation: payload.confirmationUrl,
    checkedInAt: payload.checkedInAt,
    checkedInBy: payload.checkedInBy,
    busWanted: payload.busWanted,
    busLocation: payload.busLocation,
    scanId: payload.scanId,
    scanResultat:
      event === "inscription.checked_in"
        ? payload.alreadyCheckedIn
          ? "deja_scanne"
          : "ok"
        : undefined,
  });
}
