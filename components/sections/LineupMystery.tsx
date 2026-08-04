"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE_YUNA } from "@/lib/motion";

type LineupMysteryProps = {
  /** Nombre total d'artistes encore sous emballage (pour le texte). */
  count: number;
};

/**
 * Remplace la grille de N cartes « Artiste surprise » par une seule
 * composition : trois ombres de silhouettes + « ? ».
 */
export function LineupMystery({ count }: LineupMysteryProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: EASE_YUNA }}
      className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-bleu to-bleu-fonce px-6 py-12 text-center text-papier shadow-ombre-bleu-lg min-[640px]:px-10 min-[640px]:py-14"
      aria-label={`${count} artistes encore à dévoiler`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-feu/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-jaune/15 blur-3xl"
      />

      {/* Trois silhouettes qui se chevauchent */}
      <div
        aria-hidden
        className="relative mx-auto flex h-40 w-full max-w-sm items-end justify-center min-[640px]:h-48"
      >
        <SilhouetteShadow className="z-[1] -mr-6 scale-90 opacity-70 min-[640px]:-mr-8" />
        <SilhouetteShadow className="z-[3] -mx-1" featured />
        <SilhouetteShadow className="z-[2] -ml-6 scale-90 opacity-70 min-[640px]:-ml-8" />
      </div>

      <p className="mt-8 font-mono text-[0.72rem] font-bold uppercase tracking-[0.28em] text-jaune">
        Line-up en construction
      </p>
      <h3 className="mt-3 font-display text-[clamp(1.8rem,5vw,2.8rem)] font-extrabold uppercase leading-[0.95]">
        Bientôt dévoilés
      </h3>
      <p className="mx-auto mt-4 max-w-md text-[1.02rem] leading-relaxed text-papier/75">
        {count} artiste{count > 1 ? "s" : ""} encore sous emballage — les noms
        sortent progressivement. Reste connecté.
      </p>
    </motion.div>
  );
}

function SilhouetteShadow({
  className = "",
  featured = false,
}: {
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col items-center ${
        featured ? "h-36 w-28 min-[640px]:h-44 min-[640px]:w-32" : "h-28 w-24 min-[640px]:h-36 min-[640px]:w-28"
      } ${className}`}
    >
      {/* Ombre humaine (tête + buste) */}
      <div className="relative flex h-full w-full flex-col items-center justify-end">
        <div
          className={`rounded-full bg-encre/55 ${
            featured
              ? "mb-[-0.35rem] h-14 w-14 min-[640px]:h-16 min-[640px]:w-16"
              : "mb-[-0.25rem] h-11 w-11 min-[640px]:h-12 min-[640px]:w-12"
          }`}
        />
        <div
          className={`rounded-t-[45%] bg-encre/50 ${
            featured
              ? "h-[4.5rem] w-[5.5rem] min-[640px]:h-20 min-[640px]:w-24"
              : "h-14 w-[4.25rem] min-[640px]:h-16 min-[640px]:w-[4.75rem]"
          }`}
        />
      </div>
      {/* Badge « ? » */}
      <span
        className={`absolute left-1/2 top-[38%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-feu font-display font-extrabold text-papier shadow-[0_8px_24px_color-mix(in_srgb,var(--feu)_45%,transparent)] ${
          featured
            ? "h-11 w-11 text-2xl min-[640px]:h-12 min-[640px]:w-12 min-[640px]:text-[1.65rem]"
            : "h-9 w-9 text-xl"
        }`}
      >
        ?
      </span>
    </div>
  );
}
