"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { DONATE } from "@/lib/content-site";

const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

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

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.65, ease }}
        className="relative mx-auto flex max-w-[1240px] flex-col items-start gap-6 min-[760px]:flex-row min-[760px]:items-center min-[760px]:justify-between"
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
        <ButtonLink
          href={DONATE.href}
          className="shrink-0 bg-feu hover:bg-braise"
        >
          {DONATE.label}
        </ButtonLink>
      </motion.div>
    </section>
  );
}
