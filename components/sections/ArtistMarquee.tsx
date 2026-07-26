"use client";

import { motion, useReducedMotion } from "framer-motion";

type ArtistMarqueeProps = {
  names: string[];
};

/**
 * Bandeau défilant type festival pro — noms du line-up.
 * Fallback : artistes phares cités sur yunafestival.com si DB vide.
 */
const FALLBACK_NAMES = [
  "Derek Jones",
  "Moses Bliss",
  "Travis Greene",
  "Morijah",
  "Willy Dumbo",
  "Ks Bloom",
];

export function ArtistMarquee({ names }: ArtistMarqueeProps) {
  const reduce = useReducedMotion();
  const source = names.length > 0 ? names : FALLBACK_NAMES;
  const loop = [...source, ...source];

  return (
    <section
      aria-label="Artistes à l'affiche"
      className="relative z-10 overflow-hidden border-y border-bleu/10 bg-bleu py-5"
    >
      <div
        className={`flex w-max gap-10 ${reduce ? "" : "marquee-track"}`}
      >
        {loop.map((name, i) => (
          <motion.span
            key={`${name}-${i}`}
            className="font-display text-[clamp(1.4rem,3vw,2rem)] font-extrabold uppercase tracking-wide text-papier/90"
          >
            {name}
            <span className="mx-10 text-feu" aria-hidden>
              ✦
            </span>
          </motion.span>
        ))}
      </div>
    </section>
  );
}
