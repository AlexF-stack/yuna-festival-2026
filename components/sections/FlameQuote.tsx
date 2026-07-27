"use client";

import { motion, useReducedMotion } from "framer-motion";

import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type FlameQuoteProps = {
  text: string;
};

/**
 * Citation Mission dans une silhouette de flamme animée (bleu logo).
 * Forme SVG + flicker ; texte lisible au cœur de la flamme.
 */
export function FlameQuote({ text }: FlameQuoteProps) {
  const reduce = useReducedMotion();

  return (
    <motion.blockquote
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className="relative mx-auto w-full max-w-[380px] min-[480px]:max-w-[440px]"
    >
      {/* Halo feu */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-[-12%] -z-10 bg-[radial-gradient(ellipse_at_50%_60%,color-mix(in_srgb,var(--feu)_40%,transparent),transparent_68%)] blur-2xl ${
          reduce ? "" : "flame-quote-glow"
        }`}
      />

      <div
        className={`relative w-full ${reduce ? "" : "flame-quote-flicker"}`}
        style={{ transformOrigin: "50% 100%" }}
      >
        <svg
          viewBox="0 0 360 520"
          className="block h-auto w-full"
          role="img"
          aria-label={`Citation : ${text}`}
        >
          <defs>
            <linearGradient id="yuna-flame-fill" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#1a8fd4" />
              <stop offset="45%" stopColor="#0077bb" />
              <stop offset="100%" stopColor="#005a8f" />
            </linearGradient>
            <linearGradient id="yuna-flame-core" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#ff9933" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#ff6600" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0077bb" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Flamme principale */}
          <path
            fill="url(#yuna-flame-fill)"
            d="M180 18
               C210 70 268 110 278 185
               C288 250 255 295 240 330
               C290 355 275 420 180 498
               C85 420 70 355 120 330
               C105 295 72 250 82 185
               C92 110 150 70 180 18 Z"
          />

          {/* Langue intérieure */}
          {!reduce ? (
            <>
              <path
                className="flame-tongue"
                fill="url(#yuna-flame-core)"
                d="M180 70
                   C198 110 230 140 232 190
                   C234 230 210 260 180 300
                   C150 260 126 230 128 190
                   C130 140 162 110 180 70 Z"
                style={{ transformOrigin: "180px 300px" }}
              />
            </>
          ) : null}

          <foreignObject x="58" y="130" width="244" height="300">
            <div className="flex h-full flex-col justify-center px-2 text-center text-papier">
              <p className="font-display text-[clamp(0.95rem,3.2vw,1.2rem)] font-extrabold uppercase leading-[1.28]">
                {text}
              </p>
              <footer className="mt-5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-papier/75">
                YUNA · {FESTIVAL.theme}
              </footer>
            </div>
          </foreignObject>
        </svg>
      </div>
    </motion.blockquote>
  );
}
