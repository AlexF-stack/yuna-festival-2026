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
import { getArtists } from "@/lib/artists";
import { getEventStartIso } from "@/lib/festival";
import { getRegistrationsCount } from "@/lib/registrations";

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
