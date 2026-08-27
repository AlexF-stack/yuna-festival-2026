/**
 * Attribution des inscriptions.
 *
 * Le canal est résolu une fois par session et mémorisé : une personne qui arrive
 * par la campagne email puis navigue avant de s'inscrire reste attribuée à l'email.
 */

const STORAGE_KEY = "yuna-attribution";
const MAX_LENGTH = 120;

/** Référents connus → libellé de canal stable. */
const KNOWN_REFERRERS: [RegExp, string][] = [
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)facebook\.com$/, "facebook"],
  [/(^|\.)fb\.(com|me)$/, "facebook"],
  [/(^|\.)tiktok\.com$/, "tiktok"],
  [/(^|\.)youtube\.com$/, "youtube"],
  [/(^|\.)whatsapp\.com$/, "whatsapp"],
  [/(^|\.)wa\.me$/, "whatsapp"],
  [/(^|\.)t\.co$/, "twitter"],
  [/(^|\.)linkedin\.com$/, "linkedin"],
  [/(^|\.)google\./, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)mail\.google\.com$/, "email"],
];

function slug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function fromReferrer(referrer: string, ownHost: string): string | null {
  if (!referrer) return null;
  let host: string;
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
  if (!host || host === ownHost) return null;
  for (const [pattern, label] of KNOWN_REFERRERS) {
    if (pattern.test(host)) return label;
  }
  return `referent/${slug(host)}`;
}

/**
 * Résout le canal depuis l'URL courante, puis le mémorise pour la session.
 * Renvoie null hors navigateur.
 */
export function resolveAttribution(): string | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");

  // Un paramètre de campagne explicite prime toujours sur la valeur mémorisée :
  // sinon une visite antérieure dans la même session ferait passer un clic
  // d'email pour du trafic direct.
  if (!utmSource) {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    } catch {
      /* sessionStorage indisponible (navigation privée stricte) */
    }
  }

  let resolved: string;
  if (utmSource) {
    resolved = [utmSource, params.get("utm_medium"), params.get("utm_campaign")]
      .filter((part): part is string => Boolean(part && part.trim()))
      .map(slug)
      .filter(Boolean)
      .join("/");
  } else {
    resolved =
      fromReferrer(document.referrer, window.location.hostname) ?? "direct";
  }

  resolved = (resolved || "direct").slice(0, MAX_LENGTH);

  try {
    sessionStorage.setItem(STORAGE_KEY, resolved);
  } catch {
    /* ignore */
  }
  return resolved;
}

/** Normalisation côté serveur — ne jamais faire confiance à la valeur reçue. */
export function sanitizeSource(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9/_-]+/g, "")
    .slice(0, MAX_LENGTH);
  return cleaned.length > 0 ? cleaned : null;
}
