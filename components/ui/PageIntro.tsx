"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM, rise, staggerContainer } from "@/lib/motion";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  cta?: { href: string; label: string };
};

function accentLastWord(title: string) {
  const trimmed = title.trim();
  const i = trimmed.lastIndexOf(" ");
  if (i <= 0) return trimmed;
  return (
    <>
      {trimmed.slice(0, i)}{" "}
      <span className="text-jaune">{trimmed.slice(i + 1)}</span>
    </>
  );
}

/**
 * Bandeau d'intro des pages de section — entrée staggered type prototype.
 */
export function PageIntro({ eyebrow, title, lead, cta }: PageIntroProps) {
  const reduce = useReducedMotion();

  return (
    <section
      data-tone="bleu"
      data-nav-tone="bleu"
      className="relative overflow-hidden bg-bleu pb-16 pt-40 text-papier min-[760px]:pb-20 min-[760px]:pt-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--feu)_35%,transparent),transparent_55%),radial-gradient(ellipse_at_90%_80%,color-mix(in_srgb,var(--jaune)_18%,transparent),transparent_50%)]"
      />
      <motion.div
        className="section-container relative z-10 px-5 min-[760px]:px-6"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "show"}
      >
        <div className="max-w-2xl">
          <motion.p
            variants={reduce ? undefined : rise(18)}
            transition={{ duration: 0.65, ease: EASE_PREMIUM }}
            className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-jaune"
          >
            {eyebrow} · {FESTIVAL.brandFull} {FESTIVAL.edition}
          </motion.p>
          <motion.h1
            variants={reduce ? undefined : rise(26)}
            transition={{ duration: 0.75, ease: EASE_PREMIUM }}
            className="mt-4 font-display text-[clamp(2.4rem,7vw,4.2rem)] font-extrabold uppercase leading-[0.95] text-papier"
          >
            {accentLastWord(title)}
          </motion.h1>
          <motion.p
            variants={reduce ? undefined : rise(20)}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="mt-6 text-[1.12rem] leading-relaxed text-papier/88"
          >
            {lead}
          </motion.p>
          {cta ? (
            <motion.div
              variants={reduce ? undefined : rise(16)}
              transition={{ duration: 0.65, ease: EASE_PREMIUM }}
              className="mt-8"
            >
              <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
