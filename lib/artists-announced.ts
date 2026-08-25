/**
 * Artistes annoncés avec affiche officielle.
 * Source : visuels YUNA Festival 2026.
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

const BIO_FR =
  "Moment de louange, d’adoration et d’impaction divine pour les fils et filles du Royaume.";
const BIO_EN =
  "A moment of praise, worship and divine impact for the sons and daughters of the Kingdom.";

export const ANNOUNCED_ARTISTS: AnnouncedArtist[] = [
  {
    name: "Moïse Adounkpè",
    role: "Chantre",
    roleEn: "Worship leader",
    bio_short: BIO_FR,
    bio_short_en: BIO_EN,
    is_headliner: false,
    order: 4,
    portrait_url: "/media/artists/moise-adounkpe.webp",
  },
  {
    name: "Exo Éclat",
    role: "Louange & adoration",
    roleEn: "Praise & worship",
    bio_short: BIO_FR,
    bio_short_en: BIO_EN,
    is_headliner: false,
    order: 5,
    portrait_url: "/media/artists/exo-eclat.webp",
  },
  {
    name: "David Okit",
    role: "Chantre",
    roleEn: "Worship leader",
    bio_short: BIO_FR,
    bio_short_en: BIO_EN,
    is_headliner: false,
    order: 5,
    portrait_url: "/media/artists/david-okit.webp",
  },
  {
    name: "Miracle Agossa",
    role: "Chantre",
    roleEn: "Worship leader",
    bio_short: BIO_FR,
    bio_short_en: BIO_EN,
    is_headliner: false,
    order: 6,
    portrait_url: "/media/artists/miracle-agossa.webp",
  },
  {
    name: "Minister Glory",
    role: "Chantre",
    roleEn: "Worship leader",
    bio_short: BIO_FR,
    bio_short_en: BIO_EN,
    is_headliner: false,
    order: 7,
    portrait_url: "/media/artists/minister-glory.webp",
  },
  {
    name: "Yaziel",
    role: "Chantre",
    roleEn: "Worship leader",
    bio_short: BIO_FR,
    bio_short_en: BIO_EN,
    is_headliner: false,
    order: 8,
    portrait_url: "/media/artists/yaziel.webp",
  },
  {
    name: "Nista Praise",
    role: "Chantre",
    roleEn: "Worship leader",
    bio_short: BIO_FR,
    bio_short_en: BIO_EN,
    is_headliner: false,
    order: 9,
    portrait_url: "/media/artists/nista-praise.webp",
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
    name: "AM RHK",
    role: "Chantre",
    roleEn: "Worship leader",
    bio_short: BIO_FR,
    bio_short_en: BIO_EN,
    is_headliner: false,
    order: 11,
    portrait_url: "/media/artists/am-rhk.webp",
  },
  {
    name: "Samuel Ngolu",
    role: "Chantre",
    roleEn: "Worship leader",
    bio_short: BIO_FR,
    bio_short_en: BIO_EN,
    is_headliner: false,
    order: 12,
    portrait_url: "/media/artists/samuel-ngolu.webp",
  },
  {
    name: "Gildas Zinsou",
    role: "Chantre",
    roleEn: "Worship leader",
    bio_short: BIO_FR,
    bio_short_en: BIO_EN,
    is_headliner: false,
    order: 15,
    portrait_url: "/media/artists/gildas-zinsou.webp",
  },
  {
    name: "Simiane Tatu",
    role: "Chantre · Adoration",
    roleEn: "Worship leader · Adoration",
    bio_short: "Temps fort d'adoration. Louange et impactation divine.",
    bio_short_en: "Key worship set. Praise and divine impact.",
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
  "moïse adounkpè": "Moïse Adounkpè",
  "moise adounkpe": "Moïse Adounkpè",
  "moïse adounkpe": "Moïse Adounkpè",
  "moise adounkpè": "Moïse Adounkpè",
  "miracle agossa": "Miracle Agossa",
  "minister glory": "Minister Glory",
  yaziel: "Yaziel",
  "nista praise": "Nista Praise",
  "am rhk": "AM RHK",
  "amrhk": "AM RHK",
  "samuel ngolu": "Samuel Ngolu",
  "gildas zinsou": "Gildas Zinsou",
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
