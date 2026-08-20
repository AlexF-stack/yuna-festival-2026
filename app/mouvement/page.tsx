import type { Metadata } from "next";

import { MouvementPageContent } from "@/components/sections/MouvementPageContent";

const DESCRIPTION =
  "YUNA est un mouvement : foi vivante, masterclass à Midombo, et une génération non ordinaire qui se lève. Bénin Debout 2026.";

export const metadata: Metadata = {
  title: "Le mouvement",
  description: DESCRIPTION,
  alternates: { canonical: "/mouvement" },
  openGraph: {
    title: "Le mouvement | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://www.festivalyuna.com/mouvement",
  },
};

export default function MouvementPage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <MouvementPageContent />
    </main>
  );
}
