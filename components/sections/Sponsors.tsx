"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { SPONSORS } from "@/lib/content-site";
import { EASE_YUNA } from "@/lib/motion";
import { SITE_CONTACT } from "@/lib/site";

function tierMailto(subject: string) {
  return `mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}

export function Sponsors() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="sponsors" labelledBy="sponsors-title" tone="bleu-soft">
      <Reveal>
        <SectionHeading
          eyebrow={SPONSORS.eyebrow}
          title={SPONSORS.title}
          titleId="sponsors-title"
          description={SPONSORS.intro}
        />
      </Reveal>

      <div className="mt-14 grid gap-5 min-[1000px]:grid-cols-3">
        {SPONSORS.tiers.map((tier, i) => (
          <motion.article
            key={tier.id}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: reduce ? 0 : i * 0.08,
              ease: EASE_YUNA,
            }}
            className={`surface-card flex flex-col p-7 ${
              tier.featured
                ? "scale-[1.02] border-2 border-jaune bg-papier shadow-ombre-bleu-lg ring-2 ring-feu/25 min-[1000px]:-translate-y-2"
                : "border border-bleu/10"
            }`}
          >
            <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-feu">
              {tier.badge}
            </p>
            <p className="mt-4 font-display text-4xl font-extrabold text-bleu">
              {tier.price}{" "}
              <span className="text-lg font-bold text-charbon">
                {tier.currency}
              </span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5 text-[0.92rem] text-charbon">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex gap-2">
                  <span className="text-feu" aria-hidden>
                    +
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={tierMailto(tier.mailSubject)}
              variant={tier.featured ? "primary" : "secondary"}
              className="mt-8 w-full"
            >
              {tier.cta}
            </ButtonLink>
          </motion.article>
        ))}
      </div>

      <Reveal className="mt-16 text-center">
        <p className="section-eyebrow justify-center">{SPONSORS.logosTitle}</p>
        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 min-[640px]:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 items-center justify-center rounded-xl border border-dashed border-bleu/20 bg-papier text-xs font-semibold uppercase tracking-wider text-charbon/45"
            >
              Votre logo ici
            </div>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
