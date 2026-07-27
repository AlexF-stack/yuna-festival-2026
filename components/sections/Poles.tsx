"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ImageCard } from "@/components/ui/ImageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { POLES } from "@/lib/content-site";

export function Poles() {
  return (
    <SectionShell id="poles" labelledBy="poles-title" tone="mesh-feu">
      <Reveal>
        <SectionHeading
          eyebrow="Les pôles"
          title="Des activités pour tous"
          titleId="poles-title"
          description="Des activités pour tous les goûts — un seul objectif : glorifier Dieu."
        />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-4">
        {POLES.map((pole, i) => (
          <Reveal key={pole.id} delay={i * 0.05} variant="card">
            <ImageCard
              image={pole.image}
              imageAlt={pole.title}
              title={pole.title}
              description={pole.description}
              accent={pole.accent}
              objectPosition={pole.objectPosition}
            />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
