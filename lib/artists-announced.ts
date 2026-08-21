/**
 * Artistes annoncés avec affiche officielle.
 * Source : visuels YUNA Festival 2026 (Dany Kasongo, Simiane Tatu, Valère Kouton).
 */

export type AnnouncedArtist = {
  name: string;
  role: string;
  roleEn: string;
  bio_short: string;
  bio_short_en: string;
  is_headliner: boolean;
  order: number;
  portrait_url: string;
};

export const ANNOUNCED_ARTISTS: AnnouncedArtist[] = [
  {
    name: "Exo Éclat",
    role: "Louange & adoration",
    roleEn: "Praise & worship",
    bio_short:
      "Moment de louange, d’adoration et d’impaction divine pour les fils et filles du Royaume.",
    bio_short_en:
      "A moment of praise, worship and divine impact for the sons and daughters of the Kingdom.",
    is_headliner: false,
    order: 5,
    portrait_url: "/media/artists/exo-eclat.webp",
  },
  {
    name: "Valère Kouton",
    role: "Chantre · Bénin",
    roleEn: "Worship leader · Benin",
    bio_short:
      "Louange et adoration. Moment fort pour les fils et filles du Royaume.",
    bio_short_en:
      "Praise and worship. A strong moment for the sons and daughters of the Kingdom.",
    is_headliner: false,
    order: 10,
    portrait_url: "/media/artists/valere-kouton.png",
  },
  {
    name: "Simiane Tatu",
    role: "Chantre · Adoration",
    roleEn: "Worship leader · Adoration",
    bio_short:
      "Temps fort d'adoration. Louange et impactation divine.",
    bio_short_en:
      "Key worship set. Praise and divine impact.",
    is_headliner: false,
    order: 20,
    portrait_url: "/media/artists/simiane-tatu.png",
  },
  {
    name: "Dany Kasongo",
    role: "Chantre",
    roleEn: "Worship leader",
    bio_short:
      "Louange, adoration et présence scénique pour la génération.",
    bio_short_en:
      "Praise, worship and stage presence for the generation.",
    is_headliner: false,
    order: 30,
    portrait_url: "/media/artists/dany-kasongo.png",
  },
];

/** Alias de noms DB historiques → nom d'affiche. */
const NAME_ALIASES: Record<string, string> = {
  "simiane brahi tatu": "Simiane Tatu",
  "simiane tatu": "Simiane Tatu",
  "valère kouton": "Valère Kouton",
  "valere kouton": "Valère Kouton",
  "dany kasongo": "Dany Kasongo",
  "exo éclat": "Exo Éclat",
  "exo eclat": "Exo Éclat",
  "exo éclats": "Exo Éclat",
  "exo eclats": "Exo Éclat",
};

export function canonicalArtistName(name: string): string {
  const key = name.trim().toLowerCase();
  return NAME_ALIASES[key] ?? name.trim();
}

export function portraitForArtist(name: string): string | null {
  const canonical = canonicalArtistName(name);
  return (
    ANNOUNCED_ARTISTS.find((a) => a.name === canonical)?.portrait_url ?? null
  );
}
