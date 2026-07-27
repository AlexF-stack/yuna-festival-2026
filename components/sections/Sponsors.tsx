"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { SPONSORS } from "@/lib/content-site";
import { SITE_CONTACT } from "@/lib/site";
import { EASE_YUNA } from "@/lib/motion";

function tierMailto(subject: string) {
  return `mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}

export function Sponsors() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="sponsors" labelledBy="sponsors-title" background="sponsors">
      <SectionHeading
        eyebrow={SPONSORS.eyebrow}
        title={SPONSORS.title}
        titleId="sponsors-title"
        description={SPONSORS.intro}
      />

      <div className="mt-12 grid gap-4 min-[1000px]:grid-cols-3">
        {SPONSORS.tiers.map((tier, i) => (
          <motion.article
            key={tier.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.08, ease: EASE_YUNA }}
            className={`flex flex-col rounded-2xl border p-7 ${
              tier.featured
                ? "border-feu/40 bg-gradient-to-b from-peach-wash to-papier shadow-ombre-bleu-lg"
                : "border-bleu/12 bg-papier/92"
            }`}
          >
            <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-feu">
              {tier.badge}
            </p>
            <p className="mt-4 font-display text-4xl font-extrabold text-bleu">
              {tier.price}{" "}
              <span className="text-lg font-bold text-charbon">{tier.currency}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5 text-[0.92rem] text-charbon">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex gap-2">
                  <span className="text-feu" aria-hidden>
                    ✓
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

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease: EASE_YUNA }}
        className="mt-14 text-center"
      >
        <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-charbon/70">
          {SPONSORS.logosTitle}
        </p>
        <motion.div
          className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 min-[640px]:grid-cols-4"
          variants={
            reduce
              ? undefined
              : { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
          }
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.5 }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              variants={
                reduce ? undefined : { hidden: { opacity: 0 }, show: { opacity: 1 } }
              }
              className="flex h-16 items-center justify-center rounded-xl border border-dashed border-bleu/20 bg-papier/70 text-xs font-semibold uppercase tracking-wider text-charbon/45"
            >
              Votre logo ici
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
