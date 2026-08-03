"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { REGISTER_COPY } from "@/lib/content-site";
import { REGISTRATION_GOAL } from "@/lib/festival";
import { EASE_YUNA } from "@/lib/motion";

type RegistrationGaugeProps = {
  initialCount: number;
};

export function RegistrationGauge({ initialCount }: RegistrationGaugeProps) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(initialCount);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const pct = Math.min(100, Math.round((count / REGISTRATION_GOAL) * 100));
  const left = Math.max(0, REGISTRATION_GOAL - count);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setVisible(true)}
      transition={{ duration: 0.55, ease: EASE_YUNA }}
      className="mt-10 rounded-2xl border border-bleu/12 bg-papier/90 p-5 shadow-ombre-bleu backdrop-blur-sm min-[640px]:p-6"
      aria-label={`${count} inscrits sur un objectif de ${REGISTRATION_GOAL}`}
    >
      <motion.div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-charbon">
        <span className="inline-flex h-2 w-2 rounded-full bg-feu" aria-hidden />
        <span className="text-bleu">
          {visible ? count.toLocaleString("fr-FR") : initialCount.toLocaleString("fr-FR")}
        </span>
        <span>{REGISTER_COPY.goalLabel}</span>
        <span className="text-charbon/50">· objectif</span>
        <strong className="text-encre">
          {REGISTRATION_GOAL.toLocaleString("fr-FR")}
        </strong>
      </motion.div>

      <div className="h-2.5 overflow-hidden rounded-full bg-ciel">
        <motion.div
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-bleu to-feu"
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: pct / 100 } : undefined}
          transition={{ duration: 1.1, ease: EASE_YUNA }}
        />
      </div>

      <div className="mt-2 flex flex-wrap justify-between gap-2 text-[0.78rem] font-semibold text-charbon">
        <span>{pct}%</span>
        <span>
          {left.toLocaleString("fr-FR")} {REGISTER_COPY.honorPlacesLabel}
        </span>
      </div>
    </motion.div>
  );
}
