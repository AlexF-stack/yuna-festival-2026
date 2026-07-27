"use client";

import { motion, useReducedMotion } from "framer-motion";

import { HeroCountdown } from "@/components/sections/HeroCountdown";
import { EVENT_STATS, FESTIVAL, HERO_COPY } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type HeroShowcaseProps = {
  eventStartIso: string;
};

/**
 * Panneau glass desktop — chiffres clés + compte à rebours (Canaan).
 */
export function HeroShowcase({ eventStartIso }: HeroShowcaseProps) {
  const reduce = useReducedMotion();

  return (
    <motion.aside
      initial={reduce ? false : { opacity: 0, x: 28, filter: "blur(8px)" }}
      animate={reduce ? undefined : { opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 0.45 }}
      className="hidden min-[900px]:block"
      aria-label="Informations clés du festival"
    >
      <div className="hero-glass-panel rounded-[1.75rem] border border-papier/15 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-jaune/90">
          Édition {HERO_COPY.edition}
        </p>
        <p className="mt-4 font-display text-[clamp(3.5rem,6vw,4.5rem)] font-extrabold leading-none text-papier">
          2
          <span className="mt-1 block text-2xl font-extrabold uppercase text-feu">
            soirées live
          </span>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-papier/72">
          {FESTIVAL.venue}, {FESTIVAL.city} — {FESTIVAL.freeEntry}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {EVENT_STATS.slice(1).map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-papier/12 bg-papier/8 px-3 py-3 text-center"
            >
              <p className="font-display text-xl font-extrabold text-papier">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-papier/58">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-papier/12 pt-6">
          <p className="mb-3 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-papier/55">
            Compte à rebours
          </p>
          <HeroCountdown eventStartIso={eventStartIso} variant="dark" className="!mt-0 max-w-none" />
        </div>
      </div>
    </motion.aside>
  );
}
