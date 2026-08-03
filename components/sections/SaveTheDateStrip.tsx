"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { FESTIVAL } from "@/lib/festival";
import { EASE_YUNA } from "@/lib/motion";

/**
 * Bandeau ticket Save the Date — visuel affiche généré.
 */
export function SaveTheDateStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Save the date YUNA Festival"
      data-tone="papier"
      data-nav-tone="papier"
      className="relative z-10 overflow-hidden border-y border-bleu/10 bg-papier py-10 min-[760px]:py-12"
    >
      <div className="mx-auto grid max-w-[1100px] items-center gap-8 px-5 min-[800px]:grid-cols-[1.1fr_0.9fr] min-[800px]:gap-12 min-[800px]:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -18 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: EASE_YUNA }}
        >
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.28em] text-feu">
            Ticket officiel
          </p>
          <p className="mt-2 font-display text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold uppercase leading-[0.95] text-bleu">
            {FESTIVAL.datesShort}
          </p>
          <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-charbon">
            {FESTIVAL.venue}, {FESTIVAL.city} — {FESTIVAL.freeEntry}. Garde la
            date, génère ton pass.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[420px]"
          initial={reduce ? false : { opacity: 0, rotate: -2, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE_YUNA }}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-bleu/12 shadow-ombre-bleu">
            <Image
              src="/media/save-the-date.jpg"
              alt="Save the date YUNA — 5 et 6 septembre 2026"
              fill
              sizes="(min-width: 800px) 420px, 90vw"
              quality={80}
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
