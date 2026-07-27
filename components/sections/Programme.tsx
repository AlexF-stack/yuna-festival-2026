import { OrbitHaloDynamic } from "@/components/sections/OrbitHaloDynamic";
import { ProgrammeTabs } from "@/components/sections/ProgrammeTabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { getSchedule } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export async function Programme() {
  const items = await getSchedule();

  return (
    <SectionShell
      id="programme"
      labelledBy="programme-title"
      tone="mesh-bleu"
      overlay={<OrbitHaloDynamic />}
    >
      <SectionHeading
        eyebrow="Programme"
        title="Deux soirées de feu"
        titleId="programme-title"
        description="Samedi 5 et dimanche 6 septembre 2026 — minute par minute sur le Terrain de Midombo."
      />
      <ProgrammeTabs items={items} />
    </SectionShell>
  );
}
