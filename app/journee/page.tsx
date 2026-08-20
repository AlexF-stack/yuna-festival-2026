import type { Metadata } from "next";

import { JourneePageContent } from "@/components/sections/JourneePageContent";

const DESCRIPTION =
  "Samedi en journée : Masterclass Entrepreneuriat, pôles gospel, art, danse. Avant les concerts du soir.";

export const metadata: Metadata = {
  title: "La journée d'impact",
  description: DESCRIPTION,
  alternates: { canonical: "/journee" },
  openGraph: {
    title: "La journée d'impact | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://www.festivalyuna.com/journee",
  },
};

export default function JourneePage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <JourneePageContent />
    </main>
  );
}
