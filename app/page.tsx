import { Boutique } from "@/components/sections/Boutique";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { Donate } from "@/components/sections/Donate";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Journee } from "@/components/sections/Journee";
import { Lineup } from "@/components/sections/Lineup";
import { MediaBand } from "@/components/sections/MediaBand";
import { Mission } from "@/components/sections/Mission";
import { Participate } from "@/components/sections/Participate";
import { Poles } from "@/components/sections/Poles";
import { QuoteStrip } from "@/components/sections/QuoteStrip";
import { Register } from "@/components/sections/Register";
import { SaveTheDateStrip } from "@/components/sections/SaveTheDateStrip";
import { StatsBar } from "@/components/sections/StatsBar";
import { Teaser } from "@/components/sections/Teaser";
import { Venue } from "@/components/sections/Venue";
import { Vision } from "@/components/sections/Vision";
import type { Metadata } from "next";

import { getArtists } from "@/lib/artists";
import { FAQ_ITEMS } from "@/lib/faq";
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

/** JSON-LD FAQPage — généré depuis la FAQ éditoriale affichée sur la page. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/**
 * Accroche → stats → citation → media band → coming soon → vision → mission
 * → line-up → journée → lieu → save the date → inscription → boutique → teaser
 * → pôles → don → participer → FAQ
 */
export default async function HomePage() {
  const eventStartIso = getEventStartIso();
  const [artists, registrationCount] = await Promise.all([
    getArtists(),
    getRegistrationsCount(),
  ]);

  return (
    <main id="contenu" className="bg-papier text-encre">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(festivalJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero eventStartIso={eventStartIso} />
      <StatsBar />
      <QuoteStrip />
      <MediaBand />
      <ComingSoon />
      <Vision />
      <Mission />
      <Lineup artists={artists} />
      <Journee />
      <Venue />
      <SaveTheDateStrip />
      <Register initialCount={registrationCount} />
      <Boutique />
      <Teaser />
      <Poles />
      <Donate />
      <Participate />
      <Faq />
    </main>
  );
}
