"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_PREMIUM } from "@/lib/motion";

type BeninMapProps = {
  className?: string;
  /** Compact = mobile hero ; default = desktop showcase */
  size?: "compact" | "default";
};

/**
 * Carte Bénin PNG transparent (drapeau) + pin Cotonou / Midombo.
 * Ratio carré aligné sur le fichier 740×740 ; pin ~51.5% / 88.5%.
 */
export function BeninMap({
  className = "",
  size = "default",
}: BeninMapProps) {
  const reduce = useReducedMotion();
  const compact = size === "compact";

  return (
    <motion.div
      className={`relative ${className}`}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.15 }}
    >
      <div
        className={`relative mx-auto aspect-square w-full ${
          compact ? "max-w-[220px]" : "max-w-[420px] min-[1100px]:max-w-[460px]"
        }`}
      >
        {/* Lueur douce derrière la silhouette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--feu)_28%,transparent),color-mix(in_srgb,var(--bleu)_18%,transparent)_45%,transparent_70%)] blur-2xl"
        />

        <motion.div
          className="relative h-full w-full"
          animate={
            reduce
              ? undefined
              : { y: [0, -6, 0] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Image
            src="/media/benin-map-clear.png"
            alt="Carte du Bénin aux couleurs du drapeau national"
            fill
            sizes={
              compact
                ? "220px"
                : "(min-width: 1100px) 460px, (min-width: 900px) 420px, 0px"
            }
            quality={95}
            className="object-contain object-center drop-shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
            priority
          />

          {/* Pin Cotonou — sud du pays */}
          <motion.div
            className="absolute left-[51.5%] top-[88.5%] z-10 -translate-x-1/2 -translate-y-1/2"
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE_PREMIUM, delay: 0.5 }}
          >
            {!reduce ? (
              <motion.span
                aria-hidden
                className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-feu"
                initial={{ scale: 0.45, opacity: 0.85 }}
                animate={{ scale: 1.85, opacity: 0 }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut" }}
              />
            ) : null}
            <span
              className={`relative flex items-center justify-center rounded-full border-2 border-papier bg-feu shadow-[0_0_0_3px_color-mix(in_srgb,var(--feu)_45%,transparent)] ${
                compact ? "h-3 w-3" : "h-3.5 w-3.5"
              }`}
            >
              <span className="h-1 w-1 rounded-full bg-papier" />
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className={`text-center ${compact ? "mt-2" : "mt-3"}`}>
        <p
          className={`font-mono font-bold uppercase tracking-[0.18em] text-papier ${
            compact ? "text-[0.62rem]" : "text-[0.72rem]"
          }`}
        >
          Cotonou · Midombo
        </p>
        {!compact ? (
          <p className="mt-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-papier/60">
            Terrain du festival
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
