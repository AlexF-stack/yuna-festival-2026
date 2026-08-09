"use client";

import { motion, useReducedMotion } from "framer-motion";

type AnimatedThemeTitleProps = {
  line1: string;
  line2: string;
  id?: string;
  variant?: "default" | "dark";
};

const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

/**
 * « BÉNIN » shimmer bleu + « DEBOUT » shimmer feu (même effet).
 */
export function AnimatedThemeTitle({
  line1,
  line2,
  id = "hero-title",
  variant = "default",
}: AnimatedThemeTitleProps) {
  const reduceMotion = useReducedMotion();

  const titleClass =
    "font-display text-[clamp(3.35rem,14vw,6.75rem)] font-extrabold uppercase leading-[0.88] tracking-tight min-[900px]:text-[clamp(3rem,10vw,6.75rem)] min-[900px]:leading-[0.9]";

  if (reduceMotion) {
    return (
      <h1 id={id} className={titleClass}>
        <span
          className={`block ${variant === "dark" ? "text-ivoire-froid" : "text-bleu"}`}
        >
          {line1}
        </span>
        <span
          className={`block ${variant === "dark" ? "text-jaune" : "text-feu"}`}
        >
          {line2}
        </span>
      </h1>
    );
  }

  return (
    <h1 id={id} className={titleClass}>
      <motion.span
        className={`theme-benin relative block origin-bottom-left bg-gradient-to-r bg-[length:200%_100%] bg-clip-text text-transparent ${
          variant === "dark"
            ? "from-ivoire-froid via-ciel to-ivoire-froid"
            : "from-bleu via-sky-horizon to-bleu"
        }`}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.12 }}
      >
        {line1}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -bottom-3 -z-10 h-8 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--bleu)_50%,transparent),transparent_72%)] blur-md"
        />
      </motion.span>
      <motion.span
        className={`theme-debout relative mt-1 block origin-bottom-left bg-gradient-to-r bg-[length:200%_100%] bg-clip-text text-transparent ${
          variant === "dark"
            ? "from-jaune via-[#fff3a0] to-jaune"
            : "from-feu via-alert-soft to-feu"
        }`}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.26 }}
      >
        {line2}
        <span
          aria-hidden
          className={`pointer-events-none absolute -inset-x-6 -bottom-3 -z-10 h-8 blur-md ${
            variant === "dark"
              ? "bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--jaune)_55%,transparent),transparent_72%)]"
              : "bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--feu)_45%,transparent),transparent_72%)]"
          }`}
        />
      </motion.span>
    </h1>
  );
}
