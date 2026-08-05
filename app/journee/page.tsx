import type { Metadata } from "next";

import { Journee } from "@/components/sections/Journee";
import { Poles } from "@/components/sections/Poles";
import { LocalizedPageIntro } from "@/components/i18n/LocalizedPageIntro";

const DESCRIPTION =
  "Samedi en journée : action sociale et médicale gratuite, Masterclass VTeam et Entrepreneuriat, pôles gospel, art, danse — le réveil commence par le service.";

export const metadata: Metadata = {
  title: "La journée d'impact",
  description: DESCRIPTION,
  alternates: { canonical: "/journee" },
  openGraph: {
    title: "La journée d'impact | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://yunafestival.com/journee",
  },
};

export default function JourneePage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <LocalizedPageIntro page="journee" />
      <Journee />
      <Poles />
    </main>
  );
}
