"use client";

import { motion, useReducedMotion } from "framer-motion";

import { FlameQuote } from "@/components/sections/FlameQuote";
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
      tone="bleu"
      background="mission"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE_YUNA }}
        className="mb-10 min-[900px]:mb-14"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-papier/20 bg-papier/10 px-3.5 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-papier">
          <span className="h-1.5 w-1.5 rounded-full bg-vert" aria-hidden />
          Thème {FESTIVAL.edition} · {FESTIVAL.theme}
        </p>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 22 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: EASE_YUNA }}
        className="grid items-center gap-12 min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:gap-10"
      >
        <div>
          <SectionHeading
            eyebrow={MISSION.eyebrow}
            title={MISSION.title}
            titleId="mission-title"
            description={MISSION.subtitle}
            variant="light"
          />
          <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-papier/90">
            {MISSION.lead}
          </p>
          <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-papier/80">
            {MISSION.body}
          </p>
          <ButtonLink href={MISSION.ctaHref} className="mt-8">
            {MISSION.ctaLabel}
          </ButtonLink>
        </div>

        <div className="relative flex w-full justify-center min-[900px]:justify-end">
          <div
            aria-hidden
            className="section-shape-slash pointer-events-none absolute -inset-4 -z-10 hidden rounded-[2rem] bg-feu/10 min-[900px]:block"
          />
          <FlameQuote text={MISSION.highlight} />
        </div>
      </motion.div>
    </SectionShell>
  );
}
