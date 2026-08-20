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
          <motion.div variants={reduceMotion ? undefined : rise} className="mb-4">
            <YunaLogo size="hero" priority />
          </motion.div>

          <motion.p
            variants={reduceMotion ? undefined : rise}
            className="mb-3 font-mono text-[0.78rem] font-bold uppercase tracking-[0.22em] text-jaune"
          >
            {FESTIVAL.brand} {FESTIVAL.edition}
          </motion.p>

          <motion.div variants={reduceMotion ? undefined : rise}>
            <AnimatedThemeTitle
              line1={hero.titleLine1}
              line2={hero.titleLine2}
            />
          </motion.div>

          <motion.dl
            variants={reduceMotion ? undefined : rise}
            className="mt-5 space-y-1.5 font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-papier/90 min-[900px]:mt-6 min-[900px]:text-[0.82rem]"
          >
            <div>
              <dt className="sr-only">Dates</dt>
              <dd>{FESTIVAL.datesShort}</dd>
            </div>
            <div>
              <dt className="sr-only">Lieu</dt>
              <dd>
                {FESTIVAL.locationLine}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Entrée</dt>
              <dd className="text-jaune">{FESTIVAL.freeEntry}</dd>
            </div>
          </motion.dl>

          <motion.p
            variants={reduceMotion ? undefined : rise}
            className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ivoire-froid/80 min-[900px]:text-[1.02rem] min-[900px]:text-papier/78"
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

          <motion.blockquote
            variants={reduceMotion ? undefined : rise}
            className="mt-6 max-w-xl border-l border-jaune/35 pl-4"
          >
            <p className="text-[0.88rem] italic leading-relaxed text-ivoire-froid/70 min-[900px]:text-[0.92rem] min-[900px]:text-papier/68">
              {hero.verse}
            </p>
            <footer className="mt-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-jaune/85">
              {hero.verseRef}
            </footer>
          </motion.blockquote>

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
