"use client";

import { motion, useReducedMotion } from "framer-motion";

type OrbProps = {
  cx: string;
  cy: string;
  r: number;
  color: string;
  delay: number;
};

function Orb({ cx, cy, r, color, delay }: OrbProps) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full blur-3xl ${color}`}
      style={{
        left: cx,
        top: cy,
        width: r * 2,
        height: r * 2,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ scale: [1, 1.16, 1], opacity: [0.22, 0.42, 0.22] }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/** Orbes flottants — desktop uniquement. */
export function HeroOrbs() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] hidden overflow-hidden min-[900px]:block"
    >
      <Orb cx="12%" cy="28%" r={200} color="bg-feu/18" delay={0} />
      <Orb cx="82%" cy="18%" r={160} color="bg-bleu/20" delay={1.4} />
    </div>
  );
}
