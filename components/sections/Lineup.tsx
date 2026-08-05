"use client";

import { ArtistCard } from "@/components/sections/ArtistCard";
import { ArtistMarquee } from "@/components/sections/ArtistMarquee";
import { EmberFieldDynamic } from "@/components/sections/EmberFieldDynamic";
import { LineupMystery } from "@/components/sections/LineupMystery";
import { LineupTeaser } from "@/components/sections/LineupTeaser";
import { useMessages } from "@/components/i18n/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { LINEUP_TOTAL } from "@/lib/festival";
import type { PublicArtist } from "@/types/artist";

type LineupProps = {
  artists: PublicArtist[];
};

export function Lineup({ artists }: LineupProps) {
  const t = useMessages();
  const revealed = artists.filter((a) => a.is_revealed);
  const totalCount = Math.max(artists.length, LINEUP_TOTAL);
  const mysteryCount = Math.max(0, totalCount - revealed.length);
  const revealedNames = revealed
    .filter((a) => a.name)
    .map((a) => a.name as string);

  const headliner = revealed.find((a) => a.is_headliner);
  const others = revealed.filter((a) => !a.is_headliner);

  return (
    <>
      <ArtistMarquee revealedNames={revealedNames} />
      <SectionShell
        id="artistes"
        labelledBy="lineup-title"
        tone="bleu"
        background="lineup"
        overlay={<EmberFieldDynamic />}
      >
        <div className="flex flex-col gap-5 min-[760px]:flex-row min-[760px]:items-end min-[760px]:justify-between">
          <div>
            <SectionHeading
              eyebrow={t.lineup.eyebrow}
              title={t.lineup.title}
              titleId="lineup-title"
              description={t.lineup.description}
              variant="light"
            />
          </div>
          <LineupTeaser totalCount={totalCount} className="shrink-0" />
        </div>

        {totalCount === 0 ? (
          <p className="mt-14 text-papier/80">{t.lineup.coming}</p>
        ) : (
          <div className="mt-12 space-y-6 min-[760px]:mt-16">
            {headliner ? <ArtistCard artist={headliner} index={0} /> : null}
            {others.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2">
                {others.map((artist, index) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    index={index + 1}
                  />
                ))}
              </div>
            ) : null}
            {mysteryCount > 0 ? (
              <LineupMystery count={mysteryCount} />
            ) : null}
          </div>
        )}
      </SectionShell>
    </>
  );
}
