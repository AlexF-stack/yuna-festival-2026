import { Boutique } from "@/components/sections/Boutique";
import { Donate } from "@/components/sections/Donate";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Journee } from "@/components/sections/Journee";
import { Lineup } from "@/components/sections/Lineup";
import { Mission } from "@/components/sections/Mission";
import { Participate } from "@/components/sections/Participate";
import { Poles } from "@/components/sections/Poles";
import { Programme } from "@/components/sections/Programme";
import { QuoteStrip } from "@/components/sections/QuoteStrip";
import { Register } from "@/components/sections/Register";
import { Sponsors } from "@/components/sections/Sponsors";
import { StatsBar } from "@/components/sections/StatsBar";
import { Teaser } from "@/components/sections/Teaser";
import { Venue } from "@/components/sections/Venue";
import { Vision } from "@/components/sections/Vision";
import { getArtists } from "@/lib/artists";
import { getEventStartIso } from "@/lib/festival";
import { getRegistrationsCount } from "@/lib/registrations";

/**
 * Parcours aligné sur l'export HTML de référence :
 * Accroche → stats → vision → mission → line-up → programme → journée → lieu
 * → inscription → boutique → teaser → pôles → partenaires → don → participer → FAQ
 */
export default async function HomePage() {
  const eventStartIso = getEventStartIso();
  const [artists, registrationCount] = await Promise.all([
    getArtists(),
    getRegistrationsCount(),
  ]);

  return (
    <main id="contenu" className="bg-papier text-encre">
      <Hero eventStartIso={eventStartIso} />
      <StatsBar />
      <QuoteStrip />
      <Vision />
      <Mission />
      <Lineup artists={artists} />
      <Programme />
      <Journee />
      <Venue />
      <Register initialCount={registrationCount} />
      <Boutique />
      <Teaser />
      <Poles />
      <Sponsors />
      <Donate />
      <Participate />
      <Faq />
    </main>
  );
}
