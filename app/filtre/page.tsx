import type { Metadata } from "next";

import { PhotoFilterClient } from "@/components/filtre/PhotoFilterClient";
import { PageIntro } from "@/components/ui/PageIntro";
import { FESTIVAL } from "@/lib/festival";

const DESCRIPTION =
  "Filtre photo J’y serai : ajoute ta photo au cadre officiel YUNA Festival 2026 et partage-la sur tes réseaux.";

export const metadata: Metadata = {
  title: "Filtre photo J’y serai",
  description: DESCRIPTION,
  alternates: { canonical: "/filtre" },
  openGraph: {
    title: "Filtre photo J’y serai | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://www.festivalyuna.com/filtre",
  },
};

export default function FiltrePage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <PageIntro
        eyebrow="Filtre photo"
        title="J’y serai"
        lead={`Ajoute ta photo au cadre officiel du festival et partage-la sur tes réseaux. ${FESTIVAL.datesShort} · ${FESTIVAL.venue}.`}
        compact
      />

      <section className="px-3 pb-16 pt-6 min-[480px]:px-5 min-[760px]:pb-24 min-[760px]:pt-12">
        <div className="section-container">
          <PhotoFilterClient />
        </div>
      </section>
    </main>
  );
}
