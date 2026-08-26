"use client";

import { ANNOUNCED_ARTISTS } from "@/lib/artists-announced";

type ArtistMarqueeProps = {
  /** Noms optionnels — sinon line-up officiel complet. */
  revealedNames?: string[];
};

/**
 * Bandeau : noms des artistes en défilement continu.
 * Animation CSS pure (pas de transform Framer sur le même nœud).
 */
export function ArtistMarquee({ revealedNames }: ArtistMarqueeProps) {
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
      <div className="origin-center -rotate-[1.5deg]">
        <div className="marquee-track flex w-max gap-10 will-change-transform">
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
