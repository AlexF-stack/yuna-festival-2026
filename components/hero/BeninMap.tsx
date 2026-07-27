"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE_PREMIUM } from "@/lib/motion";

type BeninMapProps = {
  className?: string;
};

/**
 * Carte stylisée du Bénin — drapeau (vert / jaune / rouge) + marqueur Cotonou.
 * Forme simplifiée fidèle au contour (nord large → côte sud).
 */
export function BeninMap({ className = "" }: BeninMapProps) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 280 420"
      role="img"
      aria-label="Carte du Bénin — Cotonou, Terrain de Midombo"
      className={`h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id="benin-flag" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#008751" />
          <stop offset="38%" stopColor="#008751" />
          <stop offset="38%" stopColor="#fcd116" />
          <stop offset="69%" stopColor="#fcd116" />
          <stop offset="69%" stopColor="#e8112d" />
          <stop offset="100%" stopColor="#e8112d" />
        </linearGradient>
        <filter id="benin-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="10"
            floodColor="#0077bb"
            floodOpacity="0.45"
          />
        </filter>
      </defs>

      {/* Ombre / fond carte */}
      <path
        d={BENIN_PATH}
        fill="rgba(255,255,255,0.06)"
        transform="translate(4 6)"
      />

      {/* Contour Bénin — drapeau national en fill */}
      <motion.path
        d={BENIN_PATH}
        fill="url(#benin-flag)"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2.5"
        filter="url(#benin-glow)"
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 0.2 }}
        style={{ transformOrigin: "140px 210px" }}
      />

      {/* Trait côte / accent feu */}
      <path
        d="M118 352 C128 358 148 362 168 355 C178 352 186 348 192 342"
        fill="none"
        stroke="#ff6600"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Pin Cotonou / Midombo (sud) */}
      <motion.g
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE_PREMIUM, delay: 0.55 }}
      >
        {!reduce ? (
          <motion.circle
            cx="148"
            cy="348"
            r="18"
            fill="none"
            stroke="#ff6600"
            strokeWidth="1.5"
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: 1.35, opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            style={{ transformOrigin: "148px 348px" }}
          />
        ) : null}
        <circle cx="148" cy="348" r="7" fill="#ff6600" stroke="#ffffff" strokeWidth="2" />
        <circle cx="148" cy="348" r="2.5" fill="#ffffff" />
      </motion.g>

      <text
        x="148"
        y="378"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="11"
        fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
        fontWeight="700"
        letterSpacing="0.12em"
      >
        COTONOU
      </text>
      <text
        x="148"
        y="394"
        textAnchor="middle"
        fill="rgba(255,255,255,0.7)"
        fontSize="9"
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontWeight="600"
        letterSpacing="0.16em"
      >
        MIDOMBO
      </text>
    </svg>
  );
}

/** Contour simplifié du Bénin (projection stylisée, viewBox 280×420). */
const BENIN_PATH =
  "M92 28 C110 18 150 14 178 22 C198 28 214 42 222 62 C232 88 236 118 234 148 C232 178 228 208 224 238 C220 268 214 298 206 322 C198 346 186 366 168 378 C152 388 132 390 116 382 C98 372 88 352 84 328 C78 298 74 268 72 238 C70 208 72 178 76 148 C80 118 84 88 88 62 C90 48 90 36 92 28 Z";
