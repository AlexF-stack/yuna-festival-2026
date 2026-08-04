import { Donate } from "@/components/sections/Donate";
import { ExploreSections } from "@/components/sections/ExploreSections";
import { Hero } from "@/components/sections/Hero";
import { Participate } from "@/components/sections/Participate";
import { QuoteStrip } from "@/components/sections/QuoteStrip";
import { Register } from "@/components/sections/Register";
import { SaveTheDateStrip } from "@/components/sections/SaveTheDateStrip";
import { StatsBar } from "@/components/sections/StatsBar";
import type { Metadata } from "next";

import { getEventStartIso } from "@/lib/festival";
import { getRegistrationsCount } from "@/lib/registrations";

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
  name: "YUNA Festival 2026 — Bénin Debout",
  url: "https://yunafestival.com/",
  startDate: "2026-09-05T18:00:00+01:00",
  endDate: "2026-09-06T22:30:00+01:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Terrain de Midombo",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cotonou",
      addressCountry: "BJ",
    },
  },
  image: ["https://yunafestival.com/opengraph-image"],
  description:
    "YUNA Festival 2026 : Bénin Debout. Une génération non ordinaire se lève. 5–6 septembre 2026, Terrain de Midombo, Cotonou. Entrée libre — line-up dévoilé progressivement.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "XOF",
    availability: "https://schema.org/InStock",
    url: "https://yunafestival.com/#inscription",
    validFrom: "2026-01-01T00:00:00+01:00",
  },
  organizer: {
    "@type": "Organization",
    name: "Global Impact Ministries",
    url: "https://yunafestival.com/",
  },
} as const;

/**
 * Home courte, pensée conversion : accroche → stats → citation → sommaire
 * des pages de section → save the date → inscription → don → participer.
 * Le détail (vision, line-up, journée, lieu, boutique, FAQ) vit sur des
 * pages dédiées pour ne pas rallonger le scroll mobile.
 */
export default async function HomePage() {
  const eventStartIso = getEventStartIso();
  const registrationCount = await getRegistrationsCount();

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
      <QuoteStrip />
      <ExploreSections />
      <SaveTheDateStrip />
      <Register initialCount={registrationCount} />
      <Donate />
      <Participate />
    </main>
  );
}
