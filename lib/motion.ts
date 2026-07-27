import type { Variants } from "framer-motion";

export const EASE_YUNA: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

export function rise(y = 28): Variants {
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0 },
  };
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1 },
};
