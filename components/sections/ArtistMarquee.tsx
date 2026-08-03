"use client";

import { motion, useReducedMotion } from "framer-motion";

type ArtistMarqueeProps = {
  /** Noms révélés uniquement — sinon placeholders. */
  revealedNames: string[];
  totalCount: number;
};

/**
 * Bandeau : noms révélés, sinon « Artiste surprise » répété.
 * Ne jamais passer de noms non révélés.
 */
export function ArtistMarquee({ revealedNames, totalCount }: ArtistMarqueeProps) {
  const reduce = useReducedMotion();
  const count = Math.max(totalCount, 5);
  const source =
    revealedNames.length > 0
      ? revealedNames
      : Array.from({ length: count }, () => "Artiste surprise");
  const loop = [...source, ...source];

  return (
    <section
      aria-label="Artistes à l'affiche"
      data-tone="papier"
      data-nav-tone="papier"
      className="relative z-10 overflow-hidden border-y border-jaune/40 bg-gradient-to-r from-jaune via-[#f5c84a] to-jaune py-5"
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
