import { ArtistCard } from "@/components/sections/ArtistCard";
import { ArtistMarquee } from "@/components/sections/ArtistMarquee";
import { EmberFieldDynamic } from "@/components/sections/EmberFieldDynamic";
import { LineupTeaser } from "@/components/sections/LineupTeaser";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import type { PublicArtist } from "@/types/artist";

type LineupProps = {
  artists: PublicArtist[];
};

export function Lineup({ artists }: LineupProps) {
  const headliner = artists.find((a) => a.is_headliner);
  const others = artists.filter((a) => !a.is_headliner);
  const revealedNames = artists
    .filter((a) => a.is_revealed && a.name)
    .map((a) => a.name as string);

  return (
    <>
      <ArtistMarquee
        revealedNames={revealedNames}
        totalCount={artists.length}
      />
      <SectionShell
        id="artistes"
        labelledBy="lineup-title"
        background="lineup"
        overlay={<EmberFieldDynamic />}
      >
        <div className="flex flex-col gap-5 min-[760px]:flex-row min-[760px]:items-end min-[760px]:justify-between">
          <SectionHeading
            eyebrow="Line-up"
            title="Les artistes"
            titleId="lineup-title"
            description="Adoration, louange et scènes fortes — le line-up se dévoile progressivement."
          />
          <LineupTeaser totalCount={artists.length} className="shrink-0" />
        </div>

        {artists.length === 0 ? (
          <p className="mt-14 text-charbon">Line-up à venir.</p>
        ) : (
          <div className="mt-12 space-y-6 min-[760px]:mt-16">
            {headliner ? <ArtistCard artist={headliner} index={0} /> : null}
            <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2">
              {(headliner ? others : artists).map((artist, index) => (
                <ArtistCard key={artist.id} artist={artist} index={index + 1} />
              ))}
            </div>
          </div>
        )}
      </SectionShell>
    </>
  );
}
