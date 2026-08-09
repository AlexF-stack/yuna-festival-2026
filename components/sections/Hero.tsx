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
import { FESTIVAL, HERO_COPY } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type HeroProps = {
  eventStartIso: string;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_PREMIUM } },
};

/**
 * Hero mobile allégé : logo, eyebrow, dates, titre, support, CTA, countdown.
 * Verset, carte Bénin et tools restent côté desktop (HeroShowcase).
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

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1240px] items-center gap-8 px-5 pb-14 pt-28 min-[900px]:grid-cols-[1.08fr_0.92fr] min-[900px]:gap-10 min-[900px]:px-6 min-[900px]:pb-20 min-[900px]:pt-40">
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
        >
          <motion.div variants={reduceMotion ? undefined : rise} className="mb-5">
            <YunaLogo
              size="hero"
              priority
              className="drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] brightness-110"
            />
          </motion.div>

          <motion.p
            variants={reduceMotion ? undefined : rise}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-jaune/35 bg-papier/10 px-3.5 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-jaune backdrop-blur-md"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.p
            variants={reduceMotion ? undefined : rise}
            className="mb-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-papier/75"
          >
            {hero.datesHero} · {FESTIVAL.city}
          </motion.p>

          <motion.div variants={reduceMotion ? undefined : rise}>
            <AnimatedThemeTitle
              line1={hero.titleLine1}
              line2={hero.titleLine2}
              variant="dark"
            />
          </motion.div>

          <motion.blockquote
            variants={reduceMotion ? undefined : rise}
            className="mt-7 hidden max-w-xl min-[900px]:block"
          >
            <p className="text-[1.02rem] italic leading-relaxed text-papier/88">
              {hero.verse}
            </p>
            <footer className="mt-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-feu">
              {hero.verseRef}
            </footer>
          </motion.blockquote>

          <motion.p
            variants={reduceMotion ? undefined : rise}
            className="mt-5 hidden max-w-lg text-[0.98rem] leading-relaxed text-papier/72 min-[900px]:block"
          >
            {hero.support}
          </motion.p>

          <motion.div
            variants={reduceMotion ? undefined : rise}
            className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap"
          >
            <ButtonLink
              href={HERO_COPY.ctaPrimaryHref}
              className="min-h-12 w-full min-[420px]:w-auto !bg-feu !px-7 font-extrabold uppercase tracking-[0.04em] hover:!bg-braise"
            >
              {hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink
              href={HERO_COPY.ctaSecondaryHref}
              variant="outline-light"
              className="min-h-12 w-full min-[420px]:w-auto"
            >
              {hero.ctaSecondary}
            </ButtonLink>
          </motion.div>

          <motion.div
            variants={reduceMotion ? undefined : rise}
            className="mt-6 min-[900px]:hidden"
          >
            <HeroCountdown eventStartIso={eventStartIso} variant="dark" />
          </motion.div>
        </motion.div>

        <HeroShowcase eventStartIso={eventStartIso} />
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 min-[760px]:bottom-8 min-[760px]:block">
        <span className="scroll-cue" aria-hidden />
      </div>
    </section>
  );
}
