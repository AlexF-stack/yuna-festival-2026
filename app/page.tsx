import { ExploreSections } from "@/components/sections/ExploreSections";
import { FestivalExperiences } from "@/components/sections/FestivalExperiences";
import { Hero } from "@/components/sections/Hero";
import { HomeCoda } from "@/components/sections/HomeCoda";
import { Register } from "@/components/sections/Register";
import { StatsBar } from "@/components/sections/StatsBar";
import { Venue } from "@/components/sections/Venue";
import type { Metadata } from "next";
import { Suspense } from "react";

import { getEventStartIso } from "@/lib/festival";

/**
 * ISR : la home est régénérée au plus toutes les 60 s au lieu d'un rendu
 * dynamique par requête. `force-static` est requis car les requêtes
 * Supabase (fetch no-store) forceraient sinon le rendu dynamique.
 */
export const revalidate = 60;
export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** JSON-LD Festival — scopé à la home uniquement, sans noms d'artistes tant qu'ils ne sont pas révélés. */
const festivalJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Event", "Festival"],
  name: "YUNA Festival 2026, Bénin Debout",
  url: "https://www.festivalyuna.com/",
  startDate: "2026-09-05T18:00:00+01:00",
  endDate: "2026-09-06T22:30:00+01:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Terrain de Midombo",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Terrain de Midombo, Akpakpa",
      addressLocality: "Cotonou",
      addressRegion: "Littoral",
      addressCountry: "BJ",
    },
  },
  image: ["https://www.festivalyuna.com/opengraph-image"],
  description:
    "YUNA Festival 2026 : Bénin Debout. Une génération non ordinaire se lève. 5–6 septembre 2026, Terrain de Midombo, Cotonou. Entrée libre, artistes dévoilés progressivement.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "XOF",
    availability: "https://schema.org/InStock",
    url: "https://www.festivalyuna.com/#inscription",
    validFrom: "2026-01-01T00:00:00+01:00",
  },
  organizer: {
    "@type": "Organization",
    name: "Global Impact Ministries",
    url: "https://www.festivalyuna.com/",
  },
} as const;

/**
 * Home conversion : hero → preuve → explorer → lieu → inscription → coda.
 * Détail (vision, line-up, journée, FAQ) sur pages dédiées.
 */
export default async function HomePage() {
  const eventStartIso = getEventStartIso();

  return (
    <main id="contenu" className="bg-papier text-encre">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(festivalJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero eventStartIso={eventStartIso} />
      <StatsBar />
      <FestivalExperiences />
      <ExploreSections />
      <Venue />
      <Suspense fallback={null}>
        <Register />
      </Suspense>
      <HomeCoda />
    </main>
  );
}
