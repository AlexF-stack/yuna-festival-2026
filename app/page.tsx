import { Boutique } from "@/components/sections/Boutique";
import { Donate } from "@/components/sections/Donate";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Lineup } from "@/components/sections/Lineup";
import { Mission } from "@/components/sections/Mission";
import { Poles } from "@/components/sections/Poles";
import { Programme } from "@/components/sections/Programme";
import { Register } from "@/components/sections/Register";
import { StatsBar } from "@/components/sections/StatsBar";
import { getArtists } from "@/lib/artists";
import { getEventStartIso } from "@/lib/festival";

/**
 * Parcours clair :
 * Accroche → preuves → mission → line-up → programme → inscription → boutique → pôles → don → FAQ
 */
export default async function HomePage() {
  const eventStartIso = getEventStartIso();
  const artists = await getArtists();

  return (
    <main id="contenu" className="bg-papier text-encre">
      <Hero eventStartIso={eventStartIso} />
      <StatsBar />
      <Mission />
      <Lineup artists={artists} />
      <Programme />
      <Register />
      <Boutique />
      <Poles />
      <Donate />
      <Faq />
    </main>
  );
}
