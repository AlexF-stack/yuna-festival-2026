"use client";

import { MISSION, SPONSORS, VISION } from "@/lib/content-site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { FESTIVAL } from "@/lib/festival";

/**
 * Page Mouvement — storytelling + preuves éditoriales + partenariats.
 * Logos sponsors restent placeholders tant que le client n’a pas fourni les assets.
 */
export function MouvementContent() {
  return (
    <>
      <SectionShell id="mouvement-mission" labelledBy="mouvement-mission-title" tone="papier">
        <SectionHeading
          eyebrow={MISSION.eyebrow}
          title={MISSION.title}
          titleId="mouvement-mission-title"
          description={MISSION.subtitle}
          tone="bleu"
          accentLast
        />
        <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-charbon">
          {MISSION.lead}
        </p>
        <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-charbon/90">
          {MISSION.body}
        </p>
        <blockquote className="mt-8 max-w-2xl border-l-4 border-feu pl-5 text-[1.05rem] font-medium leading-relaxed text-encre">
          {MISSION.highlight}
        </blockquote>
        <ButtonLink href="/#inscription" className="mt-8">
          {MISSION.ctaLabel}
        </ButtonLink>
      </SectionShell>

      <SectionShell id="mouvement-preuves" labelledBy="mouvement-preuves-title" tone="bleu">
        <SectionHeading
          eyebrow="Sur le terrain"
          title="Ce qui rend YUNA unique"
          titleId="mouvement-preuves-title"
          description="Au-delà de la scène : Midombo, masterclass, pass QR et une génération qui se lève."
          variant="light"
        />
        <div className="mt-10 grid gap-4 min-[760px]:grid-cols-3">
          {[
            {
              title: "Action médicale",
              body: "Consultations et dépistages gratuits pour les familles du quartier — la foi en actes avant les concerts.",
            },
            {
              title: "Pass QR moderne",
              body: "Inscription en ligne, pass nominatif sécurisé, scan staff le jour J — une ops digne d’un festival international.",
            },
            {
              title: "Bénin Debout",
              body: `${FESTIVAL.theme} · ${FESTIVAL.datesShort} · ${FESTIVAL.venue}. Entrée libre, génération non ordinaire.`,
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-papier/20 bg-bleu/40 p-5 text-papier"
            >
              <h3 className="font-display text-lg font-extrabold uppercase tracking-wide">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-papier/80">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="mouvement-vision" labelledBy="mouvement-vision-title" tone="papier">
        <SectionHeading
          eyebrow={VISION.eyebrow}
          title={`${VISION.titleLine1} ${VISION.titleLine2}`}
          titleId="mouvement-vision-title"
          tone="feu"
          accentLast
        />
        <p className="mt-5 max-w-3xl text-[1.02rem] leading-relaxed text-charbon">
          {VISION.intro}
        </p>
        <div className="mt-10 grid gap-5 min-[760px]:grid-cols-3">
          {VISION.pillars.map((pillar) => (
            <article
              key={pillar.id}
              className="rounded-2xl border border-bleu/12 bg-papier p-5"
            >
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-feu">
                {pillar.hebrew}
              </p>
              <h3 className="mt-2 font-display text-xl font-extrabold uppercase text-bleu">
                {pillar.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-charbon">{pillar.ref}</p>
              <p className="mt-3 text-sm leading-relaxed text-charbon">
                {pillar.text}
              </p>
            </article>
          ))}
        </div>
        <ButtonLink href="/vision" variant="ghost" className="mt-8 !px-0">
          Approfondir la vision →
        </ButtonLink>
      </SectionShell>

      <SectionShell id="mouvement-partenaires" labelledBy="partenaires-title" tone="bleu-soft">
        <SectionHeading
          eyebrow={SPONSORS.eyebrow}
          title={SPONSORS.title}
          titleId="partenaires-title"
          description={SPONSORS.intro}
          tone="encre"
          accentLast
        />
        <div className="mt-10 grid gap-4 min-[760px]:grid-cols-3">
          {SPONSORS.tiers.map((tier) => (
            <article
              key={tier.id}
              className="rounded-2xl border border-bleu/15 bg-papier p-5"
            >
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-feu">
                {tier.badge}
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold text-bleu">
                {tier.price}{" "}
                <span className="text-sm font-bold text-charbon">
                  {tier.currency}
                </span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-charbon">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-feu" />
                    {perk}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-dashed border-bleu/25 bg-ciel/40 px-3 py-6 text-center text-xs text-charbon">
                Logo partenaire — à fournir
              </p>
            </article>
          ))}
        </div>
        <ButtonLink href="/soutenir#partenariat" className="mt-8">
          Devenir partenaire
        </ButtonLink>
      </SectionShell>
    </>
  );
}
