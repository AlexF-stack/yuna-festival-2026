import type { Metadata } from "next";

import { ArtistesPageContent } from "@/components/sections/ArtistesPageContent";
import { MediaBand } from "@/components/sections/MediaBand";
import { getArtists } from "@/lib/artists";

export const revalidate = 60;
export const dynamic = "force-static";

const DESCRIPTION =
  "Les artistes du YUNA Festival 2026 se dévoilent progressivement : adoration, louange et scènes fortes, les 5 et 6 septembre à Cotonou.";

export const metadata: Metadata = {
  title: "Artistes",
  description: DESCRIPTION,
  alternates: { canonical: "/artistes" },
  openGraph: {
    title: "Artistes | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://www.festivalyuna.com/artistes",
  },
};

export default async function ArtistesPage() {
  const artists = await getArtists();

  return (
    <main id="contenu" className="bg-papier text-encre">
      <ArtistesPageContent artists={artists} />
      <MediaBand />
    </main>
  );
}
