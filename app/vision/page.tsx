import type { Metadata } from "next";

import { Mission } from "@/components/sections/Mission";
import { Vision } from "@/components/sections/Vision";
import { PageIntro } from "@/components/ui/PageIntro";

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
      <PageIntro
        eyebrow="La colombe et le feu"
        title="La vision"
        lead="YUNA — Youth United for New Awakening. En hébreu, יוֹנָה (Yonah) signifie la colombe : l'Esprit qui descend sur une génération qui se lève."
        cta={{ href: "/#inscription", label: "Inscris-toi — pass QR gratuit" }}
      />
      <Vision />
      <Mission />
    </main>
  );
}
