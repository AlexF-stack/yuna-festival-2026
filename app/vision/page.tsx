import type { Metadata } from "next";

import { Mission } from "@/components/sections/Mission";
import { Vision } from "@/components/sections/Vision";
import { LocalizedPageIntro } from "@/components/i18n/LocalizedPageIntro";

const DESCRIPTION =
  "La vision YUNA 2026 : une génération non ordinaire se lève — Joseph, Daniel, David. La colombe et le feu, l'Esprit sur toute une génération.";

export const metadata: Metadata = {
  title: "La vision",
  description: DESCRIPTION,
  alternates: { canonical: "/vision" },
  openGraph: {
    title: "La vision | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://yunafestival.com/vision",
  },
};

export default function VisionPage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <LocalizedPageIntro page="vision" />
      <Vision />
      <Mission />
    </main>
  );
}
