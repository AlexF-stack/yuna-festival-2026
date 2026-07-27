import { LineupTeaser } from "@/components/sections/LineupTeaser";
import { OrbitHaloDynamic } from "@/components/sections/OrbitHaloDynamic";
import { ProgrammeTabs } from "@/components/sections/ProgrammeTabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { getArtistsCount } from "@/lib/artists";
import { getSchedule } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export async function Programme() {
  const [items, artistsCount] = await Promise.all([
    getSchedule(),
    getArtistsCount(),
  ]);

  return (
    <SectionShell
      id="programme"
      labelledBy="programme-title"
      tone="papier"
      overlay={<OrbitHaloDynamic />}
    >
      <div className="flex flex-col gap-5 min-[760px]:flex-row min-[760px]:items-end min-[760px]:justify-between">
        <SectionHeading
          eyebrow="Programme"
          title="Deux soirées de feu"
          titleId="programme-title"
          description="Samedi 5 et dimanche 6 septembre 2026 — minute par minute sur le Terrain de Midombo."
        />
        <LineupTeaser totalCount={artistsCount} className="shrink-0" />
      </div>
      <ProgrammeTabs items={items} />
    </SectionShell>
  );
}
