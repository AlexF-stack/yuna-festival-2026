"use client";

import { motion, useReducedMotion } from "framer-motion";

type ArtistMarqueeProps = {
  /** Noms révélés uniquement — sinon motif mystère. */
  revealedNames: string[];
};

/**
 * Bandeau : noms révélés, sinon un motif court « ? · Bientôt dévoilé ».
 * Ne jamais passer de noms non révélés.
 */
export function ArtistMarquee({ revealedNames }: ArtistMarqueeProps) {
  const reduce = useReducedMotion();
  const source =
    revealedNames.length > 0
      ? revealedNames
      : ["?", "Bientôt dévoilé", "?", "Line-up YUNA"];
  const loop = [...source, ...source];

  return (
    <section
      aria-label="Artistes à l'affiche"
      data-tone="papier"
      data-nav-tone="papier"
      className="relative z-10 overflow-hidden bg-gradient-to-r from-jaune via-[#f5c84a] to-jaune py-5"
    >
      <div
        className={`flex w-max gap-10 ${reduce ? "" : "marquee-track"} -rotate-[1.5deg] origin-center`}
      >
        {loop.map((name, i) => (
          <motion.span
            key={`${name}-${i}`}
            className="font-display text-[clamp(1.4rem,3vw,2rem)] font-extrabold uppercase tracking-wide text-encre"
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
