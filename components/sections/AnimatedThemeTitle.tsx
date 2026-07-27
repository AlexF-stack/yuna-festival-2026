"use client";

import { motion, useReducedMotion } from "framer-motion";

type AnimatedThemeTitleProps = {
  line1: string;
  line2: string;
  id?: string;
  /** Texte clair sur fond sombre (hero cinématique). */
  variant?: "default" | "dark";
};

const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

/**
 * « Bénin Debout » — entrée staggered + shimmer flamme sur Debout.
 */
export function AnimatedThemeTitle({
  line1,
  line2,
  id = "hero-title",
  variant = "default",
}: AnimatedThemeTitleProps) {
  const reduceMotion = useReducedMotion();
  const line1Class =
    variant === "dark" ? "text-papier drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]" : "text-bleu";

  if (reduceMotion) {
    return (
      <h1
        id={id}
        className="font-display text-[clamp(3rem,10vw,6.75rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
      >
        <span className={`block ${line1Class}`}>{line1}</span>
        <span className="block text-feu">{line2}</span>
      </h1>
    );
  }

  return (
    <h1
      id={id}
      className="font-display text-[clamp(3rem,10vw,6.75rem)] font-extrabold uppercase leading-[0.9] tracking-tight [perspective:900px]"
    >
      <motion.span
        className={`block origin-bottom-left ${line1Class}`}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.12 }}
      >
        {line1}
      </motion.span>
      <motion.span
        className="theme-debout relative mt-1 block origin-bottom-left bg-gradient-to-r from-feu via-alert-soft to-feu bg-[length:200%_100%] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.26 }}
      >
        {line2}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -bottom-3 -z-10 h-8 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--feu)_45%,transparent),transparent_72%)] blur-md"
        />
      </motion.span>
    </h1>
  );
}
