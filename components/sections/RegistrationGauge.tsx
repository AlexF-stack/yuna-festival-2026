"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  formatRegistrationsCount,
  usePublicRegistrationsCount,
} from "@/hooks/usePublicRegistrationsCount";
import { REGISTER_COPY } from "@/lib/content-site";
import { REGISTRATION_GOAL } from "@/lib/festival";
import { EASE_YUNA } from "@/lib/motion";

/**
 * Jauge factice d’inscrits — objectif 5 000 (base + inscriptions réelles).
 */
export function RegistrationGauge() {
  const reduce = useReducedMotion();
  const { count } = usePublicRegistrationsCount({ refreshMs: 45_000 });
  const pct = Math.min(100, Math.round((count / REGISTRATION_GOAL) * 100));
  const left = Math.max(0, REGISTRATION_GOAL - count);
  const fill = Math.max(pct / 100, pct > 0 ? 0.035 : 0);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.55, ease: EASE_YUNA }}
      className="mt-6 w-full max-w-xl rounded-2xl border border-bleu/12 bg-gradient-to-br from-papier via-papier to-ciel/40 p-4 shadow-ombre-bleu min-[480px]:p-5 min-[640px]:p-6"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={REGISTRATION_GOAL}
      aria-valuenow={count}
      aria-label={`${formatRegistrationsCount(count)} inscrits sur un objectif de ${formatRegistrationsCount(REGISTRATION_GOAL)}`}
    >
      <div className="mb-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-charbon/70">
            Objectif génération
          </p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-display text-[1.85rem] font-extrabold leading-none text-bleu min-[480px]:text-[2.1rem]">
              {formatRegistrationsCount(count)}
            </span>
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em] text-charbon">
              {REGISTER_COPY.goalLabel}
            </span>
          </p>
        </div>
        <p className="shrink-0 text-right font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-encre/70">
          <span className="block text-charbon/55">sur</span>
          <span className="text-[1.05rem] text-encre min-[480px]:text-[1.15rem]">
            {formatRegistrationsCount(REGISTRATION_GOAL)}
          </span>
        </p>
      </div>

      <div className="relative h-3 overflow-hidden rounded-full bg-ciel/90 ring-1 ring-bleu/10 min-[480px]:h-3.5">
        <motion.div
          className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-bleu via-feu to-feu-glow shadow-[0_0_18px_color-mix(in_srgb,var(--feu)_45%,transparent)]"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: fill }}
          transition={{ duration: reduce ? 0 : 1.15, ease: EASE_YUNA }}
          style={{ width: "100%" }}
        />
      </div>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[0.75rem] font-semibold text-charbon">
        <span className="font-mono text-feu">{pct}%</span>
        <span className="text-right leading-snug">
          <span className="tabular-nums">{formatRegistrationsCount(left)}</span>{" "}
          <span className="hidden min-[420px]:inline">
            {REGISTER_COPY.honorPlacesLabel}
          </span>
          <span className="min-[420px]:hidden">places restantes</span>
        </span>
      </div>
    </motion.div>
  );
}
