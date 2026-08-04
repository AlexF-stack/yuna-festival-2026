"use client";

import { motion, useReducedMotion } from "framer-motion";

import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type FlameQuoteProps = {
  text: string;
};

/**
 * Bloc Mission sobre — typo en relief + zoom doux, sans fond ni scène 5D.
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
      <div className="pointer-events-none absolute inset-[-10%] -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--bleu)_12%,transparent),transparent_70%)] blur-3xl" />

      <motion.div
        className="relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] border border-bleu/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,249,252,0.96)_100%)] shadow-ombre-bleu-lg"
        style={{ transformOrigin: "50% 50%", perspective: "900px" }}
        animate={
          reduce
            ? undefined
            : {
                scale: [1, 1.025, 1],
              }
        }
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: reduce ? 0 : Infinity,
        }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,102,0,0.12),transparent_36%),radial-gradient(circle_at_50%_85%,rgba(0,119,187,0.12),transparent_40%)]"
          animate={reduce ? undefined : { scale: [1, 1.04, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: reduce ? 0 : Infinity }}
        />
        <motion.p
          aria-hidden
          className="absolute inset-x-0 top-4 text-center font-display text-[clamp(4.5rem,18vw,9.5rem)] font-extrabold uppercase leading-none tracking-[0.06em] text-bleu/[0.09]"
          animate={reduce ? undefined : { scale: [1, 1.03, 1], y: [0, 4, 0] }}
          transition={{ duration: 7.5, ease: "easeInOut", repeat: reduce ? 0 : Infinity }}
        >
          YUNA
        </motion.p>
        <motion.p
          aria-hidden
          className="absolute inset-x-0 bottom-3 text-center font-display text-[clamp(2.8rem,10vw,5.6rem)] font-extrabold uppercase leading-none tracking-[0.12em] text-feu/[0.12]"
          animate={reduce ? undefined : { scale: [1, 1.05, 1], y: [0, -4, 0] }}
          transition={{ duration: 8.5, ease: "easeInOut", repeat: reduce ? 0 : Infinity }}
        >
          DEBOUT
        </motion.p>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center min-[480px]:px-12">
          <p className="max-w-[24rem] font-display text-[clamp(1.08rem,2.7vw,1.45rem)] font-extrabold uppercase leading-[1.28] text-bleu [text-shadow:0_1px_0_rgba(255,255,255,0.9),0_6px_18px_rgba(0,119,187,0.14)] min-[480px]:max-w-[26rem]">
            {text}
          </p>
          <footer className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-charbon/80">
            <span className="rounded-full border border-bleu/15 bg-papier px-3 py-1 shadow-[0_8px_24px_rgba(0,119,187,0.08)]">
              {FESTIVAL.brand}
            </span>
            <span className="text-feu">•</span>
            <span
              className="rounded-full border border-feu/15 bg-white/90 px-3 py-1 text-feu shadow-[0_8px_24px_rgba(255,102,0,0.08)]"
              style={{
                textShadow: "0 1px 0 rgba(255,255,255,0.9), 0 3px 10px rgba(255,102,0,0.18)",
              }}
            >
              {FESTIVAL.theme}
            </span>
          </footer>
        </div>
      </motion.div>
    </motion.blockquote>
  );
}
