"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type FlameQuoteProps = {
  text: string;
};

/**
 * Citation Mission sur flamme réaliste (asset PNG) + léger flicker.
 */
export function FlameQuote({ text }: FlameQuoteProps) {
  const reduce = useReducedMotion();

  return (
    <motion.blockquote
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className="relative mx-auto w-full max-w-[420px] min-[480px]:max-w-[500px]"
      aria-label={`Citation : ${text}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-[-12%] -z-10 bg-[radial-gradient(ellipse_at_50%_65%,color-mix(in_srgb,var(--feu)_50%,transparent),transparent_70%)] blur-2xl ${
          reduce ? "" : "flame-quote-glow"
        }`}
      />

      <div
        className={`relative aspect-square w-full ${reduce ? "" : "flame-quote-flicker"}`}
        style={{ transformOrigin: "50% 100%" }}
      >
        <Image
          src="/media/flame-quote.png"
          alt=""
          fill
          sizes="(min-width: 480px) 500px, 420px"
          quality={92}
          className="object-contain object-center drop-shadow-[0_20px_48px_color-mix(in_srgb,var(--feu)_40%,transparent)]"
          priority
        />

        <div className="absolute inset-[18%_16%_22%] flex flex-col items-center justify-center px-3 text-center">
          <p className="font-display text-[clamp(0.88rem,2.8vw,1.15rem)] font-extrabold uppercase leading-[1.28] text-papier [text-shadow:0_2px_14px_rgba(80,20,0,0.75),0_0_2px_rgba(0,0,0,0.45)]">
            {text}
          </p>
          <footer className="mt-4 font-mono text-[0.6rem] font-bold uppercase tracking-[0.18em] text-papier/95 [text-shadow:0_1px_10px_rgba(80,20,0,0.7)]">
            YUNA · {FESTIVAL.theme}
          </footer>
        </div>
      </div>
    </motion.blockquote>
  );
}
