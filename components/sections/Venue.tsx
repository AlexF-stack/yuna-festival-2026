"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { SoftImage } from "@/components/ui/SoftImage";
import { VENUE } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";

/**
 * Lieu — sur mobile : photo Midombo d’abord (plein impact), puis texte.
 */
export function Venue() {
  return (
    <SectionShell id="lieu" labelledBy="lieu-title" tone="feu-soft">
      <div className="grid items-center gap-10 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:gap-16">
        <Reveal variant="left" className="order-2 min-[900px]:order-1">
          <SectionHeading
            eyebrow={VENUE.eyebrow}
            title={VENUE.title}
            titleId="lieu-title"
            description={VENUE.intro}
            tone="feu"
          />
          <RevealGroup as="ul" className="mt-8 space-y-3.5" fast>
            {VENUE.amenities.map((line) => (
              <RevealItem
                key={line}
                as="li"
                variant="rise"
                className="flex gap-3 text-[0.98rem] text-charbon"
              >
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-vert"
                  aria-hidden
                />
                {line}
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal
          delay={0.06}
          variant="open"
          className="order-1 -mx-5 min-[900px]:order-2 min-[900px]:mx-0"
        >
          <div className="relative px-5 min-[900px]:px-0">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[1.75rem] rounded-tr-[0.4rem] shadow-ombre-bleu-lg min-[560px]:aspect-[4/5] min-[900px]:rounded-[2rem] min-[900px]:rounded-tr-[0.45rem]">
              <SoftImage
                src="/media/venue-localisation-akpakpa.webp"
                alt="YUNA Festival 2026 — Terrain de Midombo, Akpakpa, Cotonou"
                fill
                sizes="(min-width: 900px) 520px, 100vw"
                quality={90}
                priority
                wrapperClassName="absolute inset-0"
                objectPosition="center center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nuit-profonde/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-ivoire-froid min-[480px]:p-8">
                <p className="font-display text-[clamp(2.2rem,10vw,3.2rem)] font-extrabold uppercase leading-none tracking-tight">
                  Akpakpa
                </p>
                <p className="mt-2 font-mono text-sm font-bold uppercase tracking-[0.14em] text-ivoire-froid/80">
                  Terrain de Midombo · {FESTIVAL.city}
                </p>
              </div>
            </div>
            <aside className="absolute -bottom-5 right-5 w-fit rounded-2xl border border-jaune/30 bg-bleu px-4 py-3.5 text-center text-papier shadow-ombre-bleu-lg min-[480px]:-bottom-6 min-[480px]:right-8 min-[480px]:px-5 min-[480px]:py-4 min-[900px]:-right-8">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-jaune">
                Ouverture
              </p>
              <p className="font-display text-2xl font-extrabold">
                {FESTIVAL.siteOpens}
              </p>
            </aside>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
