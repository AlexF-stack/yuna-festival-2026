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
 * Hero droite — carte du Bénin (remplace le panneau stats glass).
 */
export function HeroShowcase({ eventStartIso }: HeroShowcaseProps) {
  const reduce = useReducedMotion();

  return (
    <motion.aside
      initial={reduce ? false : { opacity: 0, x: 24 }}
      animate={reduce ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.35 }}
      className="hidden min-[900px]:block"
      aria-label="Carte du Bénin — lieu du festival"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] border border-papier/15 bg-papier/8 p-6 shadow-[0_32px_80px_rgba(0,0,0,0.35)] backdrop-blur-md min-[1100px]:p-8">
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-feu">
          Bénin Debout · {FESTIVAL.edition}
        </p>
        <p className="mt-2 text-sm text-papier/75">
          {FESTIVAL.venue}, {FESTIVAL.city} — {FESTIVAL.freeEntry}
        </p>

        <div className="mx-auto mt-4 aspect-[2/3] w-full max-w-[280px]">
          <BeninMap />
        </div>

        <div className="mt-6 border-t border-papier/12 pt-5">
          <p className="mb-3 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-papier/55">
            Compte à rebours
          </p>
          <HeroCountdown
            eventStartIso={eventStartIso}
            variant="dark"
            className="!mt-0 max-w-none"
          />
        </div>
      </div>
    </motion.aside>
  );
}
