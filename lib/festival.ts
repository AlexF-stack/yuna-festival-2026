/**
 * Réglages festival — source temporaire jusqu'au branchement Supabase
 * (`settings` / countdown). Les composants ne doivent pas hardcoder ces valeurs.
 */
export const FESTIVAL_TIMEZONE = "Africa/Porto-Novo" as const;

/** Début soirée 1 — 5 sept 2026 18h (WAT, UTC+1, pas d'heure d'été). */
export const EVENT_START_ISO = "2026-09-05T18:00:00+01:00";

/** Fin dimanche soirée */
export const EVENT_END_ISO = "2026-09-06T22:30:00+01:00";

export const REGISTRATION_GOAL = 5000;

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
  siteOpens: "17h00",
} as const;

export const HERO_COPY = {
  brand: FESTIVAL.brand,
  edition: FESTIVAL.edition,
  eyebrow: "Youth United for New Awakening · יוֹנָה",
  titleLine1: "BÉNIN",
  titleLine2: "DEBOUT",
  support:
    "Une génération non ordinaire se lève — Joseph. Daniel. David. À toi maintenant.",
  meta: `${FESTIVAL.datesShort} · ${FESTIVAL.venue}, ${FESTIVAL.city}`,
  verse:
    "« Lève-toi, sois éclairée, car ta lumière arrive, et la gloire de l'Éternel se lève sur toi. »",
  verseRef: "Ésaïe 60:1",
  ctaPrimary: "Inscris-toi",
  ctaSecondary: "Voir la journée",
  ctaPrimaryHref: "/#inscription",
  ctaSecondaryHref: "/#journee",
} as const;

export const NAV_LINKS = [
  { href: "/#vision", label: "Vision" },
  { href: "/#artistes", label: "Line-up" },
  { href: "/#journee", label: "Journée" },
  { href: "/#lieu", label: "Lieu" },
  { href: "/#inscription", label: "Inscription" },
  { href: "/#boutique", label: "Boutique" },
  { href: "/don", label: "Don" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const FOOTER_LINKS = [
  { href: "/#vision", label: "Vision" },
  { href: "/#artistes", label: "Artistes" },
  { href: "/#journee", label: "Journée" },
  { href: "/#lieu", label: "Lieu" },
  { href: "/mon-pass", label: "Retrouver mon pass" },
  { href: "/don", label: "Faire un don" },
] as const;

export const EVENT_STATS = [
  { value: "2", label: "Jours de festival" },
  { value: "13", label: "Artistes & orateurs" },
  { value: "3", label: "Masterclass & actions" },
  { value: "0 F", label: "Entrée" },
] as const;
