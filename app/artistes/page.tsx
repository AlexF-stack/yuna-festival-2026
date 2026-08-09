import type { Metadata } from "next";

import { Lineup } from "@/components/sections/Lineup";
import { MediaBand } from "@/components/sections/MediaBand";
import { ProgrammeSoirees } from "@/components/sections/ProgrammeSoirees";
import { Teaser } from "@/components/sections/Teaser";
import { LocalizedPageIntro } from "@/components/i18n/LocalizedPageIntro";
import { getArtists } from "@/lib/artists";

/** ISR — même stratégie que la home (données artistes Supabase). */
export const revalidate = 60;
export const dynamic = "force-static";

const DESCRIPTION =
  "Le line-up du YUNA Festival 2026 se dévoile progressivement : adoration, louange et scènes fortes, les 5 et 6 septembre au Terrain de Midombo, Cotonou.";

export const metadata: Metadata = {
  title: "Line-up & artistes",
  description: DESCRIPTION,
  alternates: { canonical: "/artistes" },
  openGraph: {
    title: "Line-up & artistes | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://yunafestival.com/artistes",
  },
};

export default async function ArtistesPage() {
  const artists = await getArtists();

  return (
    <main id="contenu" className="bg-papier text-encre">
      <LocalizedPageIntro page="artistes" />
      <Lineup artists={artists} />
      <ProgrammeSoirees />
      <Teaser />
      <MediaBand />
    </main>
  );
}
