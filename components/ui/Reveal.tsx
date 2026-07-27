"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { EASE_PREMIUM, cardRise, openReveal, rise } from "@/lib/motion";

type RevealVariant = "rise" | "card" | "open";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** rise = titres ; card = grilles ; open = médias (rideau, pas zoom) */
  variant?: RevealVariant;
};

/**
 * Entrées scroll unifiées — sans filter:blur (coûteux) ni scale zoom.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
  variant = "rise",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const variants =
    variant === "open" ? openReveal : variant === "card" ? cardRise : rise(y);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      variants={variants}
      transition={{ duration: variant === "open" ? 0.85 : 0.55, ease: EASE_PREMIUM, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
