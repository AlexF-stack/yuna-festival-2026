"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { EffectFrame } from "@/components/ui/EffectFrame";
import { Reveal } from "@/components/ui/Reveal";
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
        <EffectFrame soft corners className="rounded-[2rem]">
          <div className="p-7 min-[760px]:p-10">
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
              Au-delà du pass
            </p>
            <h2
              id="agir-title"
              className="mt-3 max-w-2xl font-display text-[clamp(2rem,5vw,3.2rem)] font-extrabold uppercase leading-[1.02] text-encre"
            >
              Soutiens. <span className="text-feu">Rejoins.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-charbon">
              {DONATE.blurb} {PARTICIPATE.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[520px]:flex-row min-[520px]:flex-wrap">
              <ButtonLink
                href={DONATE.pageHref}
                className="!bg-feu hover:!bg-braise"
              >
                {DONATE.label}
              </ButtonLink>
              <ButtonLink
                href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent("YUNA 2026 — Bénévolat")}`}
                variant="secondary"
              >
                {PARTICIPATE.ctaVolunteer}
              </ButtonLink>
              <ButtonLink
                href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent("YUNA 2026 — Partenariat")}`}
                variant="ghost"
              >
                {PARTICIPATE.ctaPartner}
              </ButtonLink>
            </div>
          </div>
        </EffectFrame>
      </Reveal>
    </SectionShell>
  );
}
