import type { Metadata } from "next";

import { FlameAtHomeClient } from "@/components/flamme/FlameAtHomeClient";
import { PageIntro } from "@/components/ui/PageIntro";

const DESCRIPTION =
  "La flamme chez toi : pose l’emblème YUNA en 3D dans ton salon, ta chambre ou ton église, puis filme et partage Bénin Debout.";

export const metadata: Metadata = {
  title: "La flamme chez toi",
  description: DESCRIPTION,
  alternates: { canonical: "/flamme" },
  openGraph: {
    title: "La flamme chez toi | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://yunafestival.com/flamme",
  },
};

export default function FlammePage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <PageIntro
        eyebrow="Expérience 3D"
        title="La flamme chez toi"
        lead="Pose l’emblème YUNA en 3D dans ton salon, ta chambre ou ton église — puis fais tourner la vidéo et partage Bénin Debout."
      />

      <section className="section-pad">
        <div className="section-container px-5 min-[760px]:px-6">
          <FlameAtHomeClient />
        </div>
      </section>
    </main>
  );
}
