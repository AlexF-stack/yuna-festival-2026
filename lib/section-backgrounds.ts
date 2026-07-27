/**
 * Fond unique par section — une image, un cadrage, un voile.
 * Évite les doublons visuels entre blocs de la page.
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
  | "poles"
  | "sponsors"
  | "teaser"
  | "faq"
  | "stats";

export type SectionBgOverlay = "light" | "cool" | "warm" | "deep" | "brand";

export type SectionBgConfig = {
  src: string;
  alt: string;
  objectPosition: string;
  overlay: SectionBgOverlay;
  /** Voile plus léger pour laisser respirer la photo */
  photoOpacity?: number;
};

export const SECTION_BACKGROUNDS: Record<SectionBgKey, SectionBgConfig> = {
  mission: {
    src: "/media/worship.jpg",
    alt: "",
    objectPosition: "center 30%",
    overlay: "brand",
    photoOpacity: 0.55,
  },
  vision: {
    src: "/media/dawn.jpg",
    alt: "",
    objectPosition: "center 20%",
    overlay: "warm",
    photoOpacity: 0.5,
  },
  lineup: {
    src: "/media/crowd.jpg",
    alt: "",
    objectPosition: "center center",
    overlay: "cool",
  },
  programme: {
    src: "/media/concert.jpg",
    alt: "",
    objectPosition: "center 20%",
    overlay: "cool",
  },
  journee: {
    src: "/media/community.jpg",
    alt: "",
    objectPosition: "center 40%",
    overlay: "light",
  },
  venue: {
    src: "/media/stage.jpg",
    alt: "",
    objectPosition: "center 60%",
    overlay: "cool",
    photoOpacity: 0.45,
  },
  register: {
    src: "/media/stage.jpg",
    alt: "",
    objectPosition: "center 40%",
    overlay: "warm",
  },
  boutique: {
    src: "/media/festival.jpg",
    alt: "",
    objectPosition: "center center",
    overlay: "warm",
  },
  poles: {
    src: "/media/festival.jpg",
    alt: "",
    objectPosition: "center 25%",
    overlay: "light",
  },
  sponsors: {
    src: "/media/lights.jpg",
    alt: "",
    objectPosition: "center 30%",
    overlay: "deep",
    photoOpacity: 0.4,
  },
  teaser: {
    src: "/media/concert.jpg",
    alt: "",
    objectPosition: "center 70%",
    overlay: "brand",
    photoOpacity: 0.35,
  },
  faq: {
    src: "/media/lights.jpg",
    alt: "",
    objectPosition: "center 60%",
    overlay: "deep",
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
    "bg-gradient-to-b from-papier/94 via-papier/90 to-papier/96",
  cool:
    "bg-gradient-to-b from-ciel/93 via-papier/88 to-papier/95",
  warm:
    "bg-gradient-to-b from-peach-wash/92 via-papier/86 to-ciel/92",
  deep:
    "bg-gradient-to-b from-papier/90 via-papier/84 to-peach-soft/92",
  brand:
    "bg-gradient-to-br from-papier/88 via-ciel/80 to-peach-wash/90",
};
