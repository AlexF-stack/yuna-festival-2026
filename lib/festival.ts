/**
 * Réglages festival — source temporaire jusqu’au branchement Supabase
 * (`settings` / countdown). Les composants ne doivent pas hardcoder ces valeurs.
 */
export const FESTIVAL_TIMEZONE = "Africa/Porto-Novo" as const;

/** Début soirée 1 — 5 sept 2026 18h (WAT, UTC+1, pas d’heure d’été). */
export const EVENT_START_ISO = "2026-09-05T18:00:00+01:00";

export function getEventStartIso(): string {
  return EVENT_START_ISO;
}

export const FESTIVAL = {
  brand: "YUNA",
  brandFull: "YUNA Festival",
  edition: "2026",
  theme: "Bénin Debout",
  datesShort: "5–6 septembre 2026",
  datesHero: "5–6 SEP · 2026",
  venue: "Terrain de Midombo",
  city: "Cotonou",
  country: "Bénin",
  freeEntry: "Entrée libre",
  tagline: "Une génération non ordinaire se lève.",
} as const;

export const HERO_COPY = {
  brand: FESTIVAL.brand,
  edition: FESTIVAL.edition,
  titleLine1: "BÉNIN",
  titleLine2: "DEBOUT",
  support:
    "Une génération non ordinaire se lève — concerts, adoration et masterclass à Midombo.",
  meta: `${FESTIVAL.datesShort} · ${FESTIVAL.venue}, ${FESTIVAL.city}`,
  verse:
    "« Lève-toi, sois éclairée, car ta lumière arrive, et la gloire de l'Éternel se lève sur toi. »",
  verseRef: "Ésaïe 60:1",
  ctaPrimary: "Réserver ma place",
  ctaSecondary: "Voir le programme",
  ctaPrimaryHref: "#inscription",
  ctaSecondaryHref: "#programme",
} as const;

export const NAV_LINKS = [
  { href: "#mission", label: "Mission" },
  { href: "#artistes", label: "Line-up" },
  { href: "#programme", label: "Programme" },
  { href: "#inscription", label: "Pass" },
  { href: "#boutique", label: "Boutique" },
  { href: "#faq", label: "FAQ" },
] as const;

export const EVENT_STATS = [
  { value: "2", label: "Soirées" },
  { value: "17", label: "Créneaux" },
  { value: "5", label: "Artistes" },
  { value: "0 F", label: "Entrée" },
] as const;
