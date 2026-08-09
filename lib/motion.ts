import type { Variants } from "framer-motion";

export const EASE_YUNA: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Entrée standard sections — montée douce, sans zoom ni blur (perf). */
export function rise(y = 28): Variants {
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0 },
  };
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

/** Grille explorer / cartes — rythme un peu plus serré. */
export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

/** Cartes / grille — même langage que rise, y plus court. */
export const cardRise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

/**
 * Ouverture type « rideau » — pour médias / aside featured uniquement.
 * Pas de scale (évite l'effet zoom incohérent).
 */
export const openReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(10% 0 0 0)" },
  show: { opacity: 1, clipPath: "inset(0% 0 0 0)" },
};

/** Glisse depuis la gauche — listes / aside. */
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0 },
};

/** Glisse depuis la droite — pass preview / médias. */
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0 },
};

/** @deprecated Préférer rise / openReveal — scale coûteux et incohérent. */
export const fadeScale: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};
