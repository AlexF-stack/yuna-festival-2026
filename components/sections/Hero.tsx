"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { HeroCinematicBackground } from "@/components/hero/HeroCinematicBackground";
import { HeroFireCanvas } from "@/components/hero/HeroFireCanvas";
import { HeroOrbs } from "@/components/hero/HeroOrbs";
import { HeroShowcase } from "@/components/hero/HeroShowcase";
import { YunaLogo } from "@/components/brand/YunaLogo";
import { AnimatedThemeTitle } from "@/components/sections/AnimatedThemeTitle";
import { HeroCountdown } from "@/components/sections/HeroCountdown";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useMessages } from "@/components/i18n/LocaleProvider";
import { HERO_COPY } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type HeroProps = {
  eventStartIso: string;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_PREMIUM } },
};

/**
 * Hero — mobile plein cadre ; desktop texte + carte Bénin côte à côte.
 */
export function Hero({ eventStartIso }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const t = useMessages();
  const hero = t.hero;

  return (
    <section
      id="hero"
      data-nav-surface="hero"
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] overflow-hidden"
    >
      <HeroCinematicBackground />
      {!reduceMotion ? <HeroOrbs /> : null}
      {!reduceMotion ? <HeroFireCanvas /> : null}

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1240px] items-end gap-8 px-5 pb-16 pt-28 min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[900px]:items-center min-[900px]:gap-12 min-[900px]:px-6 min-[900px]:pb-20 min-[900px]:pt-40">
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
          className="pb-2 min-[900px]:pb-0"
        >
          <motion.div variants={reduceMotion ? undefined : rise} className="mb-5">
            <YunaLogo size="hero" priority />
          </motion.div>

          <motion.div
            variants={reduceMotion ? undefined : rise}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-jaune/40 bg-nuit-profonde/35 px-3.5 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-jaune shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
              {hero.eyebrow}
            </p>
            <span
              aria-hidden
              className="flag-stripe h-[3px] w-14 overflow-hidden rounded-full min-[900px]:hidden"
            >
              <span className="bg-vert" />
              <span className="bg-jaune" />
              <span className="bg-rouge" />
            </span>
          </motion.div>

          <motion.p
            variants={reduceMotion ? undefined : rise}
            className="mb-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-ivoire-froid/80"
          >
            {hero.venueLine}
          </motion.p>

          <motion.div variants={reduceMotion ? undefined : rise}>
            <AnimatedThemeTitle
              line1={hero.titleLine1}
              line2={hero.titleLine2}
            />
          </motion.div>

          <motion.blockquote
            variants={reduceMotion ? undefined : rise}
            className="mt-5 max-w-xl min-[900px]:mt-7"
          >
            <p className="text-[0.95rem] italic leading-relaxed text-ivoire-froid/90 min-[900px]:text-[1.02rem] min-[900px]:text-papier/88">
              {hero.verse}
            </p>
            <footer className="mt-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-jaune min-[900px]:text-[0.72rem]">
              {hero.verseRef}
            </footer>
          </motion.blockquote>

          <motion.p
            variants={reduceMotion ? undefined : rise}
            className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ivoire-froid/75 min-[900px]:mt-5 min-[900px]:text-[0.98rem] min-[900px]:text-papier/72"
          >
            {hero.support}
          </motion.p>

          <motion.div
            variants={reduceMotion ? undefined : rise}
            className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap"
          >
            <ButtonLink
              href={HERO_COPY.ctaPrimaryHref}
              className="min-h-[3.25rem] w-full !px-7 text-[1.02rem] font-extrabold uppercase tracking-[0.04em] min-[420px]:w-auto"
            >
              {hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink
              href={HERO_COPY.ctaSecondaryHref}
              variant="outline-light"
              className="min-h-[3.25rem] w-full min-[420px]:w-auto"
            >
              {hero.ctaSecondary}
            </ButtonLink>
          </motion.div>

          <motion.div
            variants={reduceMotion ? undefined : rise}
            className="mt-7 min-[900px]:hidden"
          >
            <HeroCountdown eventStartIso={eventStartIso} variant="dark" />
          </motion.div>
        </motion.div>

        <HeroShowcase eventStartIso={eventStartIso} />
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 min-[900px]:bottom-8">
        <span className="scroll-cue" aria-hidden />
      </div>
    </section>
  );
}
