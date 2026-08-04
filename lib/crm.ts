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
  /** Résultat journal scans CRM */
  scanResultat?: "ok" | "deja_scanne" | "inconnu" | "refuse";
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
};

export function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://yunafestival.com"
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
  return v && /^https?:\/\//i.test(v) ? v : null;
}

async function upsertInscription(payload: YunaCrmSyncPayload): Promise<void> {
  const crm = createYunaCrmClient();
  if (!crm) return;

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
      created_at: payload.createdAt ?? new Date().toISOString(),
      synced_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("[yuna-crm] inscriptions upsert:", error.message);
  }
}

async function insertScanLog(payload: YunaCrmSyncPayload): Promise<void> {
  if (payload.event !== "inscription.checked_in") return;
  const crm = createYunaCrmClient();
  if (!crm) return;

  const resultat = payload.scanResultat ?? "ok";
  const { error } = await crm.from("scans").insert({
    inscription_id: payload.id,
    resultat,
    poste: payload.checkedInBy ?? "staff",
  });

  if (error) {
    console.error("[yuna-crm] scans insert:", error.message);
  }
}

async function postWebhook(payload: YunaCrmSyncPayload): Promise<void> {
  const url = getWebhookUrl();
  if (!url) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      console.error("[yuna-crm-webhook]", res.status);
    }
  } catch (err) {
    console.error("[yuna-crm-webhook]", err);
  }
}

/** Sync CRM YUNA — ne bloque jamais l’API du site. */
export async function syncYunaCrm(payload: YunaCrmSyncPayload): Promise<void> {
  await Promise.all([
    upsertInscription(payload),
    insertScanLog(payload),
    postWebhook(payload),
  ]);
}

/** Synchronise un abonnement newsletter vers le CRM sans exposer le service role. */
export async function syncYunaCrmNewsletter({
  email,
  source = "site",
}: YunaCrmNewsletterPayload): Promise<void> {
  const crm = createYunaCrmClient();
  if (!crm) return;

  const { error } = await crm.from("newsletter").upsert(
    {
      email,
      source,
    },
    { onConflict: "email", ignoreDuplicates: true },
  );

  if (error) {
    console.error("[yuna-crm] newsletter upsert:", error.message);
  }
}

/**
 * Compat couche register/check-in existante.
 * @deprecated utiliser syncYunaCrm
 */
export async function notifyCrmRegistration(
  payload: Omit<CrmRegistrationPayload, "event"> & {
    event?: CrmRegistrationPayload["event"];
    alreadyCheckedIn?: boolean;
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
    scanResultat:
      event === "inscription.checked_in"
        ? payload.alreadyCheckedIn
          ? "deja_scanne"
          : "ok"
        : undefined,
  });
}
