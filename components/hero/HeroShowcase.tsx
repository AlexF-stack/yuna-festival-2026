"use client";

import { motion, useReducedMotion } from "framer-motion";

import { BeninMap } from "@/components/hero/BeninMap";
import { HeroCountdown } from "@/components/sections/HeroCountdown";
import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type HeroShowcaseProps = {
  eventStartIso: string;
};

/**
 * Hero droite — grande carte Bénin (drapeau) + compte à rebours.
 */
export function HeroShowcase({ eventStartIso }: HeroShowcaseProps) {
  const reduce = useReducedMotion();

  return (
    <motion.aside
      initial={reduce ? false : { opacity: 0, x: 24 }}
      animate={reduce ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.3 }}
      className="hidden min-[900px]:block"
      aria-label="Carte du Bénin — lieu du festival"
    >
      <div className="relative flex flex-col items-center px-1 min-[1100px]:px-2">
        <p className="text-center font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-feu">
          Bénin Debout · {FESTIVAL.edition}
        </p>
        <p className="mt-2 max-w-[22rem] text-center text-sm leading-relaxed text-papier/75">
          {FESTIVAL.venue}, {FESTIVAL.city} — {FESTIVAL.freeEntry}
        </p>

        <div className="mt-5 w-full">
          <BeninMap />
        </div>

        <div className="mt-7 w-full max-w-[380px] pt-5">
          <p className="mb-3 text-center font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-papier/55">
            Compte à rebours
          </p>
          <HeroCountdown
            eventStartIso={eventStartIso}
            variant="dark"
            className="!mt-0 mx-auto max-w-none"
          />
        </div>
      </div>
    </motion.aside>
  );
}
