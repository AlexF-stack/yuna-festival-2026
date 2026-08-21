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

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: EASE_YUNA }}
      className="mt-6 max-w-xl rounded-2xl border border-bleu/12 bg-papier/90 p-5 shadow-ombre-bleu backdrop-blur-sm min-[640px]:p-6"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={REGISTRATION_GOAL}
      aria-valuenow={count}
      aria-label={`${formatRegistrationsCount(count)} inscrits sur un objectif de ${formatRegistrationsCount(REGISTRATION_GOAL)}`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-charbon">
        <span className="inline-flex h-2 w-2 rounded-full bg-feu" aria-hidden />
        <span className="text-bleu">{formatRegistrationsCount(count)}</span>
        <span>{REGISTER_COPY.goalLabel}</span>
        <span className="text-charbon/50">· objectif</span>
        <strong className="text-encre">
          {formatRegistrationsCount(REGISTRATION_GOAL)}
        </strong>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-ciel">
        <motion.div
          className="h-full origin-left rounded-full bg-gradient-to-r from-bleu to-feu"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: Math.max(pct / 100, pct > 0 ? 0.02 : 0) }}
          transition={{ duration: reduce ? 0 : 1.1, ease: EASE_YUNA }}
          style={{ width: "100%" }}
        />
      </div>

      <div className="mt-2 flex flex-wrap justify-between gap-2 text-[0.78rem] font-semibold text-charbon">
        <span>{pct}%</span>
        <span>
          {formatRegistrationsCount(left)} {REGISTER_COPY.honorPlacesLabel}
        </span>
      </div>
    </motion.div>
  );
}
