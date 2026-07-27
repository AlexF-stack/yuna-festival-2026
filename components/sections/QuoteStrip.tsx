"use client";

import { motion, useReducedMotion } from "framer-motion";

import { HERO_COPY } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

/**
 * Bande citation pleine largeur — respiration entre hero et contenu.
 */
export function QuoteStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Citation du festival"
      className="quote-strip relative z-10 overflow-hidden py-14 min-[760px]:py-16"
    >
      <div aria-hidden className="quote-strip-glow pointer-events-none absolute inset-0" />
      <motion.blockquote
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE_PREMIUM }}
        className="relative mx-auto max-w-3xl px-5 text-center min-[760px]:px-6"
      >
        <p className="font-display text-[clamp(1.35rem,3.5vw,2rem)] font-bold leading-snug text-papier">
          {HERO_COPY.support}
        </p>
        <footer className="mt-4 font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-jaune/90">
          {HERO_COPY.verseRef} · Joseph · Daniel · David
        </footer>
      </motion.blockquote>
    </section>
  );
}
