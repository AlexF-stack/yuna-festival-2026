"use client";

import { useReducedMotion } from "framer-motion";

import { ANNOUNCED_ARTISTS } from "@/lib/artists-announced";

type ArtistMarqueeProps = {
  /** Noms à faire défiler — fallback = line-up officiel. */
  revealedNames?: string[];
};

/**
 * Bandeau doré : noms des artistes en boucle.
 * Rotation sur un wrapper externe pour ne pas casser l’animation CSS.
 */
export function ArtistMarquee({ revealedNames }: ArtistMarqueeProps) {
  const reduce = useReducedMotion();
  const source =
    revealedNames && revealedNames.length > 0
      ? revealedNames
      : ANNOUNCED_ARTISTS.map((a) => a.name);

  // Deux copies identiques → translateX(-50%) boucle sans trou.
  const loop = [...source, ...source];

  return (
    <section
      aria-label="Artistes à l'affiche"
      data-tone="papier"
      data-nav-tone="papier"
      className="relative z-10 overflow-hidden bg-gradient-to-r from-jaune via-[#f5c84a] to-jaune py-5"
    >
      <div className="-rotate-[1.5deg] origin-center">
        <div
          className={`flex w-max gap-10 ${reduce ? "" : "marquee-track"}`}
        >
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 font-display text-[clamp(1.4rem,3vw,2rem)] font-extrabold uppercase tracking-wide text-encre"
              aria-hidden={i >= source.length ? true : undefined}
            >
              {name}
              <span className="mx-10 text-feu" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
