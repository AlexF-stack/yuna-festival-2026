import type { Metadata } from "next";

import { PhotoFilterClient } from "@/components/filtre/PhotoFilterClient";
import { PageIntro } from "@/components/ui/PageIntro";
import { FESTIVAL } from "@/lib/festival";

const DESCRIPTION =
  "Filtre photo Bénin Debout : prends ta photo avec le cadre officiel du festival — flammes, thème et verset — et partage-la sur tes réseaux.";

export const metadata: Metadata = {
  title: "Filtre photo Bénin Debout",
  description: DESCRIPTION,
  alternates: { canonical: "/filtre" },
  openGraph: {
    title: "Filtre photo Bénin Debout | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://yunafestival.com/filtre",
  },
};

export default function FiltrePage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <PageIntro
        eyebrow="Filtre photo"
        title="Bénin Debout"
        lead={`Prends ta photo avec le cadre officiel du festival — flammes, thème et verset — et partage-la sur tes réseaux. ${FESTIVAL.datesShort} · ${FESTIVAL.venue}.`}
      />

      <section className="section-pad">
        <div className="section-container px-5 min-[760px]:px-6">
          <PhotoFilterClient />
        </div>
      </section>
    </main>
  );
}
