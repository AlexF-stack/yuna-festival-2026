"use client";

import { motion, useReducedMotion } from "framer-motion";

import { TorchSceneDynamic } from "@/components/sections/TorchSceneDynamic";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MISSION } from "@/lib/content-site";

const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

export function Mission() {
  const reduce = useReducedMotion();

  return (
    <section
      id="mission"
      aria-labelledby="mission-title"
      className="relative z-10 overflow-hidden px-5 py-24 min-[760px]:px-6 min-[760px]:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-ciel via-papier to-[#fff4eb]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-bleu/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 -z-10 h-64 w-64 rounded-full bg-feu/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-[1240px] items-center gap-12 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu">
            {MISSION.eyebrow}
          </p>
          <h2
            id="mission-title"
            className="font-display text-[clamp(2.2rem,5.5vw,3.8rem)] font-extrabold uppercase leading-[1.02] text-bleu"
          >
            {MISSION.title}
          </h2>
          <p className="mt-3 font-mono text-[0.75rem] font-bold uppercase tracking-[0.2em] text-bleu-fonce/70">
            {MISSION.subtitle}
          </p>
          <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-charbon">
            {MISSION.lead}
          </p>
          <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-charbon/90">
            {MISSION.body}
          </p>
          <ButtonLink href={MISSION.ctaHref} className="mt-8">
            {MISSION.ctaLabel}
          </ButtonLink>
        </motion.div>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0 flex items-center justify-center"
          >
            <div className="h-[min(420px,55vw)] w-[min(420px,55vw)] opacity-80">
              <TorchSceneDynamic />
            </div>
          </div>

          <motion.blockquote
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
            className="relative z-10 rounded-[1.75rem] bg-bleu/92 p-8 text-papier shadow-[0_28px_70px_rgba(0,90,140,0.22)] backdrop-blur-sm min-[760px]:p-10"
          >
            <div
              aria-hidden
              className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-feu/35 blur-2xl"
            />
            <p className="relative font-display text-[clamp(1.35rem,3vw,1.85rem)] font-extrabold uppercase leading-snug">
              {MISSION.highlight}
            </p>
            <footer className="relative mt-6 font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-papier/55">
              YUNA · Bénin Debout
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
