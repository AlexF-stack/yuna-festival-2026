"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import { YunaLogo } from "@/components/brand/YunaLogo";
import { TiltCard } from "@/components/motion/TiltCard";
import { AnimatedThemeTitle } from "@/components/sections/AnimatedThemeTitle";
import { HeroCountdown } from "@/components/sections/HeroCountdown";
import { SunriseSceneDynamic } from "@/components/sections/SunriseSceneDynamic";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FESTIVAL, HERO_COPY } from "@/lib/festival";

type HeroProps = {
  eventStartIso: string;
};

const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

export function Hero({ eventStartIso }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const dawnOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 0.55],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 56],
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative h-[130vh]"
    >
      <div className="sticky top-0 flex min-h-svh flex-col justify-center overflow-hidden pb-12 pt-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/media/dawn.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-sky-night opacity-90" />
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-sky-dawn"
          style={{ opacity: dawnOpacity }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-24 -z-10 h-72 w-72 rounded-full bg-bleu/15 blur-2xl min-[760px]:right-10 min-[760px]:h-[28rem] min-[760px]:w-[28rem]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-10 left-[-10%] -z-10 h-64 w-64 rounded-full bg-feu/15 blur-2xl"
        />
        <div
          aria-hidden
          className="hero-sparks pointer-events-none absolute inset-0 -z-10"
        />
        <div
          aria-hidden
          className="hero-horizon pointer-events-none absolute bottom-[12%] left-1/2 -z-10 h-px w-[min(92vw,880px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-bleu/50 to-transparent"
        />

        <SunriseSceneDynamic />

        <motion.div
          style={{ y: contentY }}
          className="relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 min-[900px]:grid-cols-[1.15fr_0.85fr] min-[900px]:gap-12 min-[900px]:px-6"
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
        >
          <div>
            <motion.div
              variants={reduceMotion ? undefined : rise}
              className="mb-6"
            >
              <YunaLogo size="hero" priority />
            </motion.div>

            <motion.p
              variants={reduceMotion ? undefined : rise}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-bleu/10 px-3.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-bleu"
            >
              {FESTIVAL.datesShort} · {FESTIVAL.city}
            </motion.p>

            <AnimatedThemeTitle
              line1={HERO_COPY.titleLine1}
              line2={HERO_COPY.titleLine2}
            />

            <motion.p
              variants={reduceMotion ? undefined : rise}
              className="mt-5 max-w-md text-[1.12rem] leading-relaxed text-charbon"
            >
              {HERO_COPY.support}
            </motion.p>

            <motion.p
              variants={reduceMotion ? undefined : rise}
              className="mt-2 text-[0.95rem] font-medium text-bleu-fonce"
            >
              {FESTIVAL.venue} · {FESTIVAL.freeEntry}
            </motion.p>

            <motion.div
              variants={reduceMotion ? undefined : rise}
              className="mt-8 flex flex-wrap gap-3"
            >
              <ButtonLink href={HERO_COPY.ctaPrimaryHref}>
                {HERO_COPY.ctaPrimary}
              </ButtonLink>
              <ButtonLink href={HERO_COPY.ctaSecondaryHref} variant="secondary">
                {HERO_COPY.ctaSecondary}
              </ButtonLink>
            </motion.div>

            <motion.div variants={reduceMotion ? undefined : rise}>
              <HeroCountdown eventStartIso={eventStartIso} />
            </motion.div>
          </div>

          <motion.aside
            variants={reduceMotion ? undefined : rise}
            className="relative hidden min-[900px]:block"
          >
            <TiltCard maxTilt={6} className="group">
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(0,90,140,0.28)]"
              >
                <Image
                  src="/media/stage.jpg"
                  alt="Scène de festival — ambiance live"
                  fill
                  sizes="(min-width: 900px) 420px, 0px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bleu-fonce/90 via-bleu/35 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,102,0,0.35),transparent_45%)]" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-papier">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-papier/70">
                    Édition {HERO_COPY.edition}
                  </p>
                  <p className="mt-3 font-display text-5xl font-extrabold uppercase leading-none">
                    2
                    <span className="mt-1 block text-2xl text-feu">soirées</span>
                  </p>
                  <p className="mt-4 max-w-[14rem] text-sm leading-relaxed text-papier/85">
                    Adorations, parole et génération qui se lève — Midombo.
                  </p>
                </div>
              </motion.div>
            </TiltCard>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
