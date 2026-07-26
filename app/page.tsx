import { Boutique } from "@/components/sections/Boutique";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Lineup } from "@/components/sections/Lineup";
import { Programme } from "@/components/sections/Programme";
import { Register } from "@/components/sections/Register";
import { StatsBar } from "@/components/sections/StatsBar";
import { getEventStartIso } from "@/lib/festival";

export default function HomePage() {
  const eventStartIso = getEventStartIso();

  return (
    <main id="contenu" className="bg-papier text-encre">
      <Hero eventStartIso={eventStartIso} />
      <StatsBar />
      <Lineup />
      <Programme />
      <Register />
      <Boutique />
      <Faq />
    </main>
  );
}
