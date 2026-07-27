"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_PREMIUM } from "@/lib/motion";

type BeninMapProps = {
  className?: string;
};

/**
 * Carte Bénin sans fond — PNG transparent + pin Cotonou.
 */
export function BeninMap({ className = "" }: BeninMapProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className}`}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.2 }}
    >
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px]">
        <Image
          src="/media/benin-map-clear.png"
          alt="Carte du Bénin aux couleurs du drapeau national"
          fill
          sizes="(min-width: 900px) 340px, 0px"
          quality={92}
          className="object-contain object-center drop-shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
          priority
        />

        <motion.div
          className="absolute left-[48%] top-[78%] z-10 -translate-x-1/2"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_PREMIUM, delay: 0.55 }}
        >
          {!reduce ? (
            <motion.span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-feu"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          ) : null}
          <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-papier bg-feu shadow-[0_0_0_3px_color-mix(in_srgb,var(--feu)_40%,transparent)]">
            <span className="h-1 w-1 rounded-full bg-papier" />
          </span>
        </motion.div>
      </div>

      <div className="mt-3 text-center">
        <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-papier">
          Cotonou
        </p>
        <p className="mt-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-papier/65">
          Midombo
        </p>
      </div>
    </motion.div>
  );
}
