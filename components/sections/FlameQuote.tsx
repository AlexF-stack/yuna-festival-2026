"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Fire5DSceneDynamic } from "@/components/sections/Fire5DSceneDynamic";
import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type FlameQuoteProps = {
  text: string;
};

/**
 * Citation Mission — feu 5D (Three.js) + texte en relief.
 * Fallback SVG simple si reduced-motion.
 */
export function FlameQuote({ text }: FlameQuoteProps) {
  const reduce = useReducedMotion();

  return (
    <motion.blockquote
      initial={reduce ? false : { opacity: 0, y: 22, scale: 0.96 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE_PREMIUM }}
      className="relative mx-auto w-full max-w-[560px] min-[900px]:max-w-none"
      aria-label={`Citation : ${text}`}
    >
      {/* Halos de profondeur */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-[-22%] -z-10 bg-[radial-gradient(ellipse_at_50%_65%,color-mix(in_srgb,var(--feu)_55%,transparent),color-mix(in_srgb,var(--jaune)_18%,transparent)_38%,transparent_70%)] blur-2xl ${
          reduce ? "" : "flame-quote-glow"
        }`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[5%] -z-10 rounded-[40%] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--jaune)_25%,transparent),transparent_65%)] blur-xl"
      />

      <div
        className={`relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] ${
          reduce ? "" : "flame-quote-burn"
        }`}
        style={{ transformOrigin: "50% 100%", perspective: "900px" }}
      >
        {reduce ? (
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,#fff4c2_0%,#ff8a1a_28%,#ff6600_58%,transparent_78%)]"
          />
        ) : (
          <>
            <div className="absolute inset-0 scale-110 [transform:translateZ(0)]">
              <Fire5DSceneDynamic />
            </div>
            {/* Voile chaud pour lisibilité */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(120,30,0,0.15)_0%,rgba(80,15,0,0.35)_55%,rgba(40,8,0,0.55)_100%)]"
            />
          </>
        )}

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center min-[480px]:px-12">
          <p className="max-w-[22rem] font-display text-[clamp(1.1rem,2.8vw,1.45rem)] font-extrabold uppercase leading-[1.28] text-papier [text-shadow:0_2px_20px_rgba(60,10,0,0.85),0_0_40px_rgba(255,102,0,0.35)] min-[480px]:max-w-[26rem]">
            {text}
          </p>
          <footer className="mt-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-papier/95 [text-shadow:0_1px_12px_rgba(60,10,0,0.75)]">
            YUNA · {FESTIVAL.theme}
          </footer>
        </div>
      </div>
    </motion.blockquote>
  );
}
