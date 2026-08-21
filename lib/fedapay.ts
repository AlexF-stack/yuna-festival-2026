/**
 * Client FedaPay (collectes / soutiens) — API REST v1.
 * Secret key serveur uniquement.
 */

export type FedaPayCustomer = {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
};

export type FedaPayCheckoutResult = {
  transactionId: number;
  url: string;
  token: string;
};

function apiBase(): string {
  const env = (process.env.FEDAPAY_ENVIRONMENT || "live").toLowerCase();
  if (env === "sandbox" || env === "test" || env === "dev") {
    return "https://sandbox-api.fedapay.com/v1";
  }
  return "https://api.fedapay.com/v1";
}

export function isFedaPayConfigured(): boolean {
  return Boolean(process.env.FEDAPAY_SECRET_KEY?.trim());
}

function secretKey(): string {
  const key = process.env.FEDAPAY_SECRET_KEY?.trim();
  if (!key) throw new Error("FEDAPAY_SECRET_KEY manquant");
  return key;
}

function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.festivalyuna.com"
  );
}

/** Découpe un nom complet en prénom / nom pour FedaPay. */
export function splitPersonName(fullName: string): {
  firstname: string;
  lastname: string;
} {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstname: "Soutien", lastname: "YUNA" };
  if (parts.length === 1) return { firstname: parts[0], lastname: "YUNA" };
  return {
    firstname: parts[0],
    lastname: parts.slice(1).join(" "),
  };
}

/** Normalise un numéro BJ pour FedaPay (chiffres sans indicatif si possible). */
export function normalizeBjPhone(raw: string): {
  number: string;
  country: string;
} | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 8) return null;
  let local = digits;
  if (local.startsWith("229") && local.length >= 11) {
    local = local.slice(3);
  }
  if (local.startsWith("00229")) local = local.slice(5);
  // FedaPay attend souvent 8–10 chiffres locaux
  if (local.length < 8 || local.length > 12) return null;
  return { number: local, country: "bj" };
}

async function fedapayFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  return fetch(`${apiBase()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers || {}),
    },
  });
}

/**
 * Crée une collecte + lien de paiement pour un soutien YUNA.
 */
export async function createSupportCheckout(input: {
  amount: number;
  customer: FedaPayCustomer;
}): Promise<FedaPayCheckoutResult> {
  const amount = Math.round(input.amount);
  if (!Number.isFinite(amount) || amount < 100) {
    throw new Error("Montant minimum : 100 FCFA");
  }

  const { firstname, lastname } = splitPersonName(
    `${input.customer.firstname} ${input.customer.lastname}`.trim(),
  );
  const phone = input.customer.phone
    ? normalizeBjPhone(input.customer.phone)
    : null;

  const payload: Record<string, unknown> = {
    description: `Soutien YUNA Festival 2026 · ${amount.toLocaleString("fr-FR")} FCFA`,
    amount,
    currency: { iso: "XOF" },
    callback_url: `${siteOrigin()}/soutenir/merci`,
    custom_metadata: {
      source: "festivalyuna.com",
      kind: "support",
      edition: "2026",
    },
    customer: {
      firstname,
      lastname,
      email: input.customer.email,
      ...(phone
        ? {
            phone_number: {
              number: phone.number,
              country: phone.country,
            },
          }
        : {}),
    },
  };

  const createRes = await fedapayFetch("/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const createBody = (await createRes.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;

  if (!createRes.ok) {
    const errObj = createBody.error as { message?: string } | undefined;
    const msg =
      errObj?.message ||
      (typeof createBody.message === "string" ? createBody.message : null) ||
      `FedaPay create ${createRes.status}`;
    throw new Error(msg);
  }

  const transactionId = extractId(createBody);
  if (!transactionId) {
    throw new Error("FedaPay : id transaction manquant");
  }

  const tokenRes = await fedapayFetch(`/transactions/${transactionId}/token`, {
    method: "POST",
    body: "{}",
  });
  const tokenBody = (await tokenRes.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;

  if (!tokenRes.ok) {
    throw new Error(
      (typeof tokenBody.message === "string" && tokenBody.message) ||
        `FedaPay token ${tokenRes.status}`,
    );
  }

  const { token, url } = extractToken(tokenBody);
  if (!url || !token) {
    throw new Error("FedaPay : lien de paiement manquant");
  }

  return { transactionId, url, token };
}

function extractId(body: Record<string, unknown>): number | null {
  if (typeof body.id === "number") return body.id;
  const v1 = body.v1;
  if (v1 && typeof v1 === "object" && typeof (v1 as { id?: number }).id === "number") {
    return (v1 as { id: number }).id;
  }
  for (const [key, value] of Object.entries(body)) {
    if (!/transaction/i.test(key)) continue;
    if (value && typeof value === "object" && typeof (value as { id?: number }).id === "number") {
      return (value as { id: number }).id;
    }
  }
  const data = body.data;
  if (data && typeof data === "object" && typeof (data as { id?: number }).id === "number") {
    return (data as { id: number }).id;
  }
  return null;
}

function extractToken(body: Record<string, unknown>): {
  token?: string;
  url?: string;
} {
  if (typeof body.token === "string" && typeof body.url === "string") {
    return { token: body.token, url: body.url };
  }
  const v1 = body.v1;
  if (v1 && typeof v1 === "object") {
    const o = v1 as { token?: string; url?: string };
    if (o.token && o.url) return { token: o.token, url: o.url };
  }
  for (const value of Object.values(body)) {
    if (!value || typeof value !== "object") continue;
    const o = value as { token?: string; url?: string };
    if (typeof o.token === "string" && typeof o.url === "string") {
      return { token: o.token, url: o.url };
    }
  }
  return {};
}
