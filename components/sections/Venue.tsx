"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { SoftImage } from "@/components/ui/SoftImage";
import { VENUE } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";

export function Venue() {
  return (
    <SectionShell id="lieu" labelledBy="lieu-title" tone="feu-soft">
      <div className="grid items-center gap-14 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow={VENUE.eyebrow}
            title={VENUE.title}
            titleId="lieu-title"
            description={VENUE.intro}
            tone="feu"
          />
          <ul className="mt-8 space-y-3.5">
            {VENUE.amenities.map((line) => (
              <li key={line} className="flex gap-3 text-[0.98rem] text-charbon">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-feu" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} variant="open">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] rounded-bl-[0.4rem] border-2 border-jaune/40"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-[0.45rem] shadow-ombre-bleu-lg">
              <SoftImage
                src="/media/venue-midombo-generated.webp"
                alt="Festival en plein air au terrain de Midombo"
                fill
                sizes="(min-width: 900px) 480px, 100vw"
                quality={75}
                wrapperClassName="absolute inset-0"
                objectPosition="center center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-encre/90 via-encre/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-papier">
                <p className="font-display text-[clamp(2.2rem,6vw,3.5rem)] font-extrabold uppercase leading-none">
                  Midombo
                </p>
                <p className="mt-2 font-mono text-sm font-bold uppercase tracking-[0.18em] text-papier/75">
                  {FESTIVAL.city} · {FESTIVAL.country}
                </p>
              </div>
            </div>
            <aside className="absolute -bottom-6 right-0 rounded-2xl border border-papier/20 bg-bleu px-5 py-4 text-center text-papier shadow-ombre-bleu-lg min-[480px]:-right-4 min-[900px]:-right-8">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-papier/65">
                Ouverture
              </p>
              <p className="font-display text-2xl font-extrabold">{FESTIVAL.siteOpens}</p>
            </aside>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
