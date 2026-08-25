/**
 * Catalogue sessions journée — source content-yuna-2026.
 * Capacité indicative pour UX (places limitées masterclass).
 */

export type FestivalSession = {
  id: string;
  kind: "action" | "masterclass";
  day: "samedi";
  time: string;
  title: string;
  titleEn: string;
  place: string;
  placeEn: string;
  description: string;
  descriptionEn: string;
  speakers?: string[];
  /** Lien préselection type inscription */
  registerType?: "pass" | "masterclass_entrepreneuriat" | "ambassadeur" | "benevole";
  capacity?: number;
};

export const FESTIVAL_SESSIONS: FestivalSession[] = [
  {
    id: "entrepreneuriat",
    kind: "masterclass",
    day: "samedi",
    time: "15:00 – 17:00",
    title: "Masterclass Entrepreneuriat",
    titleEn: "Entrepreneurship Masterclass",
    place: "Espace masterclass",
    placeEn: "Masterclass space",
    description:
      "Vision, excellence et royaume dans les affaires. Bâtir en jeune non ordinaire.",
    descriptionEn:
      "Vision, excellence and kingdom business. Build as an extraordinary youth.",
    registerType: "masterclass_entrepreneuriat",
    capacity: 60,
  },
];
