"use client";

import { motion, useReducedMotion } from "framer-motion";

import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type FlameQuoteProps = {
  text: string;
};

/**
 * Citation Mission dans une vraie flamme animée
 * (jaune drapeau → feu logo → braise).
 */
export function FlameQuote({ text }: FlameQuoteProps) {
  const reduce = useReducedMotion();

  return (
    <motion.blockquote
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className="relative mx-auto w-full max-w-[400px] min-[480px]:max-w-[460px]"
    >
      {/* Halo ambiant */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-[-18%] -z-10 bg-[radial-gradient(ellipse_at_50%_70%,color-mix(in_srgb,var(--feu)_55%,transparent),color-mix(in_srgb,var(--jaune)_18%,transparent)_42%,transparent_72%)] blur-2xl ${
          reduce ? "" : "flame-quote-glow"
        }`}
      />

      <div
        className={`relative w-full ${reduce ? "" : "flame-quote-flicker"}`}
        style={{ transformOrigin: "50% 100%" }}
      >
        <svg
          viewBox="0 0 360 540"
          className="block h-auto w-full drop-shadow-[0_18px_40px_color-mix(in_srgb,var(--feu)_45%,transparent)]"
          role="img"
          aria-label={`Citation : ${text}`}
        >
          <defs>
            <linearGradient id="yuna-fire-outer" x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#c44a00" />
              <stop offset="35%" stopColor="#ff6600" />
              <stop offset="70%" stopColor="#ff8a1a" />
              <stop offset="100%" stopColor="#fcd116" />
            </linearGradient>
            <linearGradient id="yuna-fire-mid" x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#ff6600" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#ff9933" />
              <stop offset="100%" stopColor="#ffe566" />
            </linearGradient>
            <radialGradient id="yuna-fire-core" cx="50%" cy="72%" r="48%">
              <stop offset="0%" stopColor="#fff8e7" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#fcd116" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#ff6600" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
            </radialGradient>
            <filter id="yuna-fire-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="yuna-fire-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Aura floue derrière */}
          <path
            filter="url(#yuna-fire-soft)"
            fill="#ff6600"
            opacity="0.45"
            d="M180 28
               C225 85 295 130 300 210
               C305 285 265 340 248 385
               C310 415 295 475 180 528
               C65 475 50 415 112 385
               C95 340 55 285 60 210
               C65 130 135 85 180 28 Z"
          />

          {/* Corps principal */}
          <g filter="url(#yuna-fire-blur)">
            <path
              fill="url(#yuna-fire-outer)"
              d="M180 22
                 C215 78 275 118 286 195
                 C296 265 258 315 242 355
                 C295 385 280 455 180 518
                 C80 455 65 385 118 355
                 C102 315 64 265 74 195
                 C85 118 145 78 180 22 Z"
            />
          </g>

          {/* Langues latérales animées */}
          {!reduce ? (
            <>
              <path
                className="flame-tongue"
                fill="#ff8a1a"
                opacity="0.85"
                d="M95 210
                   C78 175 88 130 118 105
                   C105 145 108 175 118 200
                   C128 225 118 250 95 210 Z"
                style={{ transformOrigin: "110px 200px" }}
              />
              <path
                className="flame-tongue flame-tongue--delay"
                fill="#fcd116"
                opacity="0.8"
                d="M265 200
                   C282 165 272 120 242 95
                   C255 140 252 170 242 195
                   C232 220 248 245 265 200 Z"
                style={{ transformOrigin: "250px 190px" }}
              />
              <path
                className="flame-tongue flame-tongue--fast"
                fill="#ffe566"
                opacity="0.75"
                d="M180 55
                   C198 95 210 125 198 165
                   C215 145 228 115 220 85
                   C212 60 192 48 180 55 Z"
                style={{ transformOrigin: "200px 140px" }}
              />
            </>
          ) : null}

          {/* Cœur chaud */}
          <path
            fill="url(#yuna-fire-mid)"
            opacity="0.92"
            d="M180 95
               C205 135 235 170 232 230
               C230 275 205 310 180 345
               C155 310 130 275 128 230
               C125 170 155 135 180 95 Z"
          />
          <ellipse
            cx="180"
            cy="300"
            rx="72"
            ry="110"
            fill="url(#yuna-fire-core)"
            className={reduce ? undefined : "flame-core-pulse"}
          />

          {/* Étincelles */}
          {!reduce ? (
            <g className="flame-embers" fill="#fcd116">
              <circle cx="120" cy="160" r="2.2" className="flame-ember" />
              <circle cx="240" cy="140" r="1.8" className="flame-ember flame-ember--2" />
              <circle cx="165" cy="90" r="1.5" className="flame-ember flame-ember--3" />
              <circle cx="210" cy="110" r="2" className="flame-ember flame-ember--4" />
              <circle cx="145" cy="200" r="1.4" className="flame-ember flame-ember--5" />
            </g>
          ) : null}

          <foreignObject x="52" y="155" width="256" height="290">
            <div className="flex h-full flex-col justify-center px-3 text-center text-papier">
              <p className="font-display text-[clamp(0.95rem,3.2vw,1.22rem)] font-extrabold uppercase leading-[1.28] [text-shadow:0_2px_12px_rgba(120,30,0,0.55)]">
                {text}
              </p>
              <footer className="mt-5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-papier/90 [text-shadow:0_1px_8px_rgba(120,30,0,0.45)]">
                YUNA · {FESTIVAL.theme}
              </footer>
            </div>
          </foreignObject>
        </svg>
      </div>
    </motion.blockquote>
  );
}
