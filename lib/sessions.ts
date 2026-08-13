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
  registerType?: "pass" | "masterclass_vteam" | "masterclass_entrepreneuriat" | "benevole";
  capacity?: number;
};

export const FESTIVAL_SESSIONS: FestivalSession[] = [
  {
    id: "medical",
    kind: "action",
    day: "samedi",
    time: "08:00 – 13:00",
    title: "Action sociale & médicale",
    titleEn: "Social & medical outreach",
    place: "Terrain de Midombo",
    placeEn: "Midombo grounds",
    description:
      "Consultations gratuites, dépistages, dons et assistance aux familles du quartier.",
    descriptionEn:
      "Free consultations, screenings, gifts and support for Midombo families.",
  },
  {
    id: "vteam",
    kind: "masterclass",
    day: "samedi",
    time: "10:00 – 13:00",
    title: "Masterclass VTeam",
    titleEn: "VTeam Masterclass",
    place: "Espace masterclass",
    placeEn: "Masterclass space",
    description:
      "Musiciens & chantres : technique instrumentale, direction de louange, vie d'adorateur.",
    descriptionEn:
      "Musicians & worship leaders: instrument technique, leading worship, the worshipper’s life.",
    registerType: "masterclass_vteam",
    capacity: 80,
  },
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
      "Vision, excellence et royaume dans les affaires — bâtir en jeune non ordinaire.",
    descriptionEn:
      "Vision, excellence and kingdom business — build as an extraordinary youth.",
    registerType: "masterclass_entrepreneuriat",
    capacity: 60,
  },
];
