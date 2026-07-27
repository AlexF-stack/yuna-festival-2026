/**
 * Fond unique par section — chaque JPG n'est utilisé qu'une fois en arrière-plan.
 * Les cartes (Vision, Pôles) réutilisent des crops en vignette, pas en plein écran.
 */
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

export type SectionBgOverlay = "light" | "cool" | "warm" | "deep" | "brand";

export type SectionBgConfig = {
  src: string;
  alt: string;
  objectPosition: string;
  overlay: SectionBgOverlay;
  photoOpacity?: number;
};

/** 8 photos → 8 sections photo (rythme alterné clair / texture) */
export const SECTION_BACKGROUNDS: Record<SectionBgKey, SectionBgConfig> = {
  mission: {
    src: "/media/worship.jpg",
    alt: "Adoration collective",
    objectPosition: "center 30%",
    overlay: "brand",
    photoOpacity: 0.52,
  },
  vision: {
    src: "/media/dawn.jpg",
    alt: "Aube sur le festival",
    objectPosition: "center 20%",
    overlay: "warm",
    photoOpacity: 0.48,
  },
  lineup: {
    src: "/media/crowd.jpg",
    alt: "Foule en liesse",
    objectPosition: "center center",
    overlay: "cool",
    photoOpacity: 0.42,
  },
  programme: {
    src: "/media/concert.jpg",
    alt: "Scène de concert",
    objectPosition: "center 20%",
    overlay: "cool",
    photoOpacity: 0.4,
  },
  journee: {
    src: "/media/community.jpg",
    alt: "Actions communautaires",
    objectPosition: "center 40%",
    overlay: "light",
    photoOpacity: 0.45,
  },
  venue: {
    src: "/media/stage.jpg",
    alt: "Terrain de Midombo",
    objectPosition: "center 55%",
    overlay: "cool",
    photoOpacity: 0.42,
  },
  register: {
    src: "/media/festival.jpg",
    alt: "Ambiance festival",
    objectPosition: "center 35%",
    overlay: "warm",
    photoOpacity: 0.38,
  },
  boutique: {
    src: "/media/lights.jpg",
    alt: "Lumières de scène",
    objectPosition: "center 30%",
    overlay: "deep",
    photoOpacity: 0.35,
  },
  stats: {
    src: "/media/dawn.jpg",
    alt: "",
    objectPosition: "center top",
    overlay: "brand",
    photoOpacity: 0.35,
  },
};

export const OVERLAY_CLASS: Record<SectionBgOverlay, string> = {
  light:
    "bg-gradient-to-b from-papier/95 via-papier/91 to-papier/97",
  cool:
    "bg-gradient-to-b from-ciel/94 via-papier/89 to-papier/96",
  warm:
    "bg-gradient-to-b from-peach-wash/93 via-papier/87 to-ciel/93",
  deep:
    "bg-gradient-to-b from-papier/92 via-papier/86 to-peach-soft/94",
  brand:
    "bg-gradient-to-br from-papier/90 via-ciel/82 to-peach-wash/92",
};
