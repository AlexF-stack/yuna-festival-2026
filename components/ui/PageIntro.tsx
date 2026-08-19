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
  compact?: boolean;
};

function accentLastWord(title: string) {
  const trimmed = title.trim();
  const i = trimmed.lastIndexOf(" ");
  if (i <= 0) return trimmed;
  return (
    <>
      {trimmed.slice(0, i)}{" "}
      <span className="text-feu">{trimmed.slice(i + 1)}</span>
    </>
  );
}

/**
 * Bandeau d'intro des pages de section — entrée staggered type prototype.
 */
export function PageIntro({
  eyebrow,
  title,
  lead,
  cta,
  compact = false,
}: PageIntroProps) {
  const reduce = useReducedMotion();

  return (
    <section
      data-tone="bleu"
      data-nav-tone="bleu"
      className={`relative overflow-hidden bg-bleu text-papier ${
        compact
          ? "pb-10 pt-32 min-[760px]:pb-16 min-[760px]:pt-40"
          : "pb-16 pt-40 min-[760px]:pb-20 min-[760px]:pt-44"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,color-mix(in_srgb,var(--feu)_42%,transparent),transparent_52%),radial-gradient(ellipse_at_88%_70%,color-mix(in_srgb,var(--bleu)_28%,transparent),transparent_48%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--vert)_0%,var(--jaune)_50%,var(--rouge)_100%)]"
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
            className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-feu"
          >
            {eyebrow} · {FESTIVAL.brandFull} {FESTIVAL.edition}
          </motion.p>
          <motion.h1
            variants={reduce ? undefined : rise(26)}
            transition={{ duration: 0.75, ease: EASE_PREMIUM }}
            className={`mt-4 font-display font-extrabold uppercase leading-[0.95] text-papier ${
              compact
                ? "text-[clamp(2.15rem,7vw,3.8rem)]"
                : "text-[clamp(2.4rem,7vw,4.2rem)]"
            }`}
          >
            {accentLastWord(title)}
          </motion.h1>
          <motion.p
            variants={reduce ? undefined : rise(20)}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className={`leading-relaxed text-papier/88 ${
              compact ? "mt-4 text-base min-[760px]:mt-6 min-[760px]:text-[1.12rem]" : "mt-6 text-[1.12rem]"
            }`}
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
