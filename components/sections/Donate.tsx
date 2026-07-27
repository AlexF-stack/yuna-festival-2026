"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { WaveRibbonDynamic } from "@/components/sections/WaveRibbonDynamic";
import { DONATE } from "@/lib/content-site";
import { EASE_YUNA } from "@/lib/motion";

export function Donate() {
  const reduce = useReducedMotion();

  return (
    <section
      id="don"
      aria-labelledby="donate-title"
      className="relative z-10 overflow-hidden px-5 py-20 min-[760px]:px-6 min-[760px]:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-bleu via-bleu-fonce to-[#003d5c]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-feu/30 blur-3xl"
      />
      <WaveRibbonDynamic />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.65, ease: EASE_YUNA }}
        className="relative z-10 mx-auto flex max-w-[1240px] flex-col items-start gap-6 min-[760px]:flex-row min-[760px]:items-center min-[760px]:justify-between"
      >
        <div className="max-w-xl text-papier">
          <p className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.28em] text-feu">
            Soutenir
          </p>
          <h2
            id="donate-title"
            className="font-display text-[clamp(1.85rem,4vw,2.75rem)] font-extrabold uppercase leading-tight"
          >
            Allume une flamme de plus
          </h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-papier/80">
            {DONATE.blurb}
          </p>
        </div>
        <motion.div
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
        >
          <ButtonLink
            href={DONATE.href}
            className="shrink-0 bg-feu hover:bg-braise"
          >
            {DONATE.label}
          </ButtonLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
