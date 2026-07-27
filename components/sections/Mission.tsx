"use client";

import { motion, useReducedMotion } from "framer-motion";

import { AnimatedThemeTitle } from "@/components/sections/AnimatedThemeTitle";
import { BeninDeboutSceneDynamic } from "@/components/sections/BeninDeboutSceneDynamic";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { MISSION } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";
import { EASE_YUNA } from "@/lib/motion";

export function Mission() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="mission"
      labelledBy="mission-title"
      background="mission"
      overlay={
        <>
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE_YUNA }}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center opacity-45 min-[900px]:justify-end min-[900px]:pr-[4%] min-[900px]:opacity-95"
          >
            <motion.div className="h-[min(320px,80vw)] w-[min(320px,80vw)] min-[900px]:h-[min(480px,70vw)] min-[900px]:w-[min(480px,70vw)]">
              <BeninDeboutSceneDynamic />
            </motion.div>
          </motion.div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-feu/10 blur-3xl"
            animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      }
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease: EASE_YUNA }}
        className="relative z-10 mb-10 min-[900px]:mb-14"
      >
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-bleu/15 bg-papier/80 px-3.5 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-bleu backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-vert" aria-hidden />
          Thème {FESTIVAL.edition} · {FESTIVAL.theme}
        </p>
        <AnimatedThemeTitle
          line1="BÉNIN"
          line2="DEBOUT"
          id="mission-theme-title"
        />
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: EASE_YUNA }}
        className="relative z-10 grid items-center gap-12 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:gap-16"
      >
        <div>
          <SectionHeading
            eyebrow={MISSION.eyebrow}
            title={MISSION.title}
            titleId="mission-title"
            description={MISSION.subtitle}
          />
          <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-charbon">
            {MISSION.lead}
          </p>
          <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-charbon/90">
            {MISSION.body}
          </p>
          <ButtonLink href={MISSION.ctaHref} className="mt-8">
            {MISSION.ctaLabel}
          </ButtonLink>
        </div>

        <motion.blockquote
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: EASE_YUNA, delay: 0.08 }}
          className="relative rounded-[1.75rem] border border-bleu/15 bg-bleu/92 p-8 text-papier shadow-ombre-bleu-lg backdrop-blur-md min-[760px]:p-10"
        >
          <motion.div
            aria-hidden
            className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-feu/35 blur-2xl"
            animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="relative font-display text-[clamp(1.35rem,3vw,1.85rem)] font-extrabold uppercase leading-snug">
            {MISSION.highlight}
          </p>
          <footer className="relative mt-6 font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-papier/70">
            YUNA · {FESTIVAL.theme}
          </footer>
        </motion.blockquote>
      </motion.div>
    </SectionShell>
  );
}
