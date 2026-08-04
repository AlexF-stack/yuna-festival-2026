/**
 * Fonds de section — palette exacte du logo YUNA (ne pas dériver d’autres hex).
 * Logo : bleu #0077bb · feu #ff6600 · blanc #ffffff · charbon #444444
 */
export type SectionTone =
  | "papier"
  | "bleu-soft"
  | "feu-soft"
  | "bleu"
  | "feu"
  | "charbon";

/** Overlay photo teinté aux couleurs exactes du logo (si une photo est gardée). */
export type SectionBgOverlay = "papier" | "bleu" | "feu" | "nuit";

export type SectionBgKey =
  | "mission"
  | "vision"
  | "lineup"
  | "programme"
  | "journee"
  | "venue"
  | "register"
  | "boutique"
  | "stats";

export type SectionBgConfig = {
  src: string;
  alt: string;
  objectPosition: string;
  overlay: SectionBgOverlay;
  photoOpacity?: number;
};

/** Photos optionnelles — voile toujours en couleur logo exacte. */
export const SECTION_BACKGROUNDS: Record<SectionBgKey, SectionBgConfig> = {
  mission: {
    src: "/media/title-mission.jpg",
    alt: "La mission — YUNA Festival 2026",
    objectPosition: "center center",
    overlay: "nuit",
    photoOpacity: 0.88,
  },
  vision: {
    src: "/media/title-vision.jpg",
    alt: "La vision — YUNA Festival 2026",
    objectPosition: "center center",
    overlay: "nuit",
    photoOpacity: 0.88,
  },
  lineup: {
    src: "/media/title-lineup.jpg",
    alt: "Line-up — YUNA Festival 2026",
    objectPosition: "center center",
    overlay: "nuit",
    photoOpacity: 0.88,
  },
  programme: {
    src: "/media/concert.jpg",
    alt: "Scène de concert",
    objectPosition: "center 20%",
    overlay: "papier",
    photoOpacity: 0.22,
  },
  journee: {
    src: "/media/community.jpg",
    alt: "Actions communautaires",
    objectPosition: "center 40%",
    overlay: "bleu",
    photoOpacity: 0.24,
  },
  venue: {
    src: "/media/stage.jpg",
    alt: "Terrain de Midombo",
    objectPosition: "center 55%",
    overlay: "feu",
    photoOpacity: 0.24,
  },
  register: {
    src: "/media/festival.jpg",
    alt: "Ambiance festival",
    objectPosition: "center 35%",
    overlay: "papier",
    photoOpacity: 0.2,
  },
  boutique: {
    src: "/media/lights.jpg",
    alt: "Lumières de scène",
    objectPosition: "center 30%",
    overlay: "bleu",
    photoOpacity: 0.22,
  },
  stats: {
    src: "/media/dawn.jpg",
    alt: "",
    objectPosition: "center top",
    overlay: "bleu",
    photoOpacity: 0.2,
  },
};

/** Voiles = color-mix sur tokens logo exacts (--bleu / --feu / --papier). */
export const OVERLAY_CLASS: Record<SectionBgOverlay, string> = {
  papier: "bg-papier/94",
  bleu: "bg-[color-mix(in_srgb,var(--bleu)_14%,var(--papier))]",
  feu: "bg-[color-mix(in_srgb,var(--feu)_12%,var(--papier))]",
  nuit: "bg-gradient-to-b from-encre/55 via-bleu-fonce/45 to-encre/70",
};
