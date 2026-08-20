"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { DONATE, PARTICIPATE } from "@/lib/content-site";
import { SITE_CONTACT } from "@/lib/site";

/**
 * Fin de home — une seule section, deux actions (soutenir + rejoindre).
 * Remplace les bandes Donate / Participate empilées.
 */
export function HomeCoda() {
  return (
    <SectionShell
      id="agir"
      labelledBy="agir-title"
      tone="papier"
      className="border-t border-bleu/10"
    >
      <Reveal>
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-vert">
          Au-delà du pass
        </p>
        <h2
          id="agir-title"
          className="mt-3 max-w-2xl font-display text-[clamp(2rem,5vw,3.2rem)] font-extrabold uppercase leading-[1.02] text-encre"
        >
          Soutiens. <span className="text-vert">Rejoins.</span>
        </h2>
        <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-charbon">
          {DONATE.blurb} {PARTICIPATE.intro}
        </p>
      </Reveal>
      <RevealGroup className="mt-8 flex flex-col gap-3 min-[520px]:flex-row min-[520px]:flex-wrap">
        <RevealItem>
          <ButtonLink href={DONATE.pageHref}>{DONATE.label}</ButtonLink>
        </RevealItem>
        <RevealItem>
          <ButtonLink
            href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent("YUNA 2026, Bénévolat")}`}
            variant="secondary"
          >
            {PARTICIPATE.ctaVolunteer}
          </ButtonLink>
        </RevealItem>
        <RevealItem>
          <ButtonLink href="/partenaires" variant="ghost">
            {PARTICIPATE.ctaPartner}
          </ButtonLink>
        </RevealItem>
        <RevealItem>
          <ButtonLink href="/filtre" variant="ghost">
            Filtre photo
          </ButtonLink>
        </RevealItem>
        <RevealItem>
          <ButtonLink href="/flamme" variant="ghost">
            La flamme chez toi
          </ButtonLink>
        </RevealItem>
      </RevealGroup>
    </SectionShell>
  );
}
