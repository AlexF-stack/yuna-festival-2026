import { ArtistCard } from "@/components/sections/ArtistCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { getArtists } from "@/lib/artists";

export const dynamic = "force-dynamic";

export async function Lineup() {
  const artists = await getArtists();
  const headliner = artists.find((a) => a.is_headliner);
  const others = artists.filter((a) => !a.is_headliner);
  const ordered = headliner ? [headliner, ...others] : artists;

  return (
    <SectionShell id="artistes" labelledBy="lineup-title" tone="photo-crowd">
      <SectionHeading
        eyebrow="Line-up"
        title="Les artistes"
        titleId="lineup-title"
        description="Adoration, louange et présence internationale — une génération non ordinaire sur scène."
      />

      {ordered.length === 0 ? (
        <p className="mt-14 text-charbon">Line-up à venir.</p>
      ) : (
        <div className="mt-12 space-y-6 min-[760px]:mt-16">
          {headliner ? <ArtistCard artist={headliner} index={0} /> : null}
          <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2">
            {(headliner ? others : ordered).map((artist, index) => (
              <ArtistCard key={artist.id} artist={artist} index={index + 1} />
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}
