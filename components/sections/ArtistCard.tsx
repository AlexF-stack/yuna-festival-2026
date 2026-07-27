"use client";

import { motion, useReducedMotion } from "framer-motion";

import { TiltCard } from "@/components/motion/TiltCard";
import { EASE_YUNA } from "@/lib/motion";
import type { Artist } from "@/types/artist";

type ArtistCardProps = {
  artist: Artist;
  index: number;
};

export function ArtistCard({ artist, index }: ArtistCardProps) {
  const reduceMotion = useReducedMotion();
  const isHeadliner = artist.is_headliner;

  if (isHeadliner) {
    return (
      <TiltCard className="group col-span-full" maxTilt={5}>
        <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: EASE_YUNA }}
          className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-bleu to-bleu-fonce p-8 text-papier shadow-[0_24px_60px_rgba(0,90,140,0.22)] min-[760px]:p-12"
        >
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-feu/30 blur-2xl" />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-papier/10 blur-2xl"
            animate={
              reduceMotion
                ? undefined
                : { scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }
            }
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex flex-col gap-4 min-[760px]:flex-row min-[760px]:items-end min-[760px]:justify-between">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-feu">
                ★ Headliner · {artist.role}
              </p>
              <h3 className="mt-3 font-display text-[clamp(2.6rem,8vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
                {artist.name}
              </h3>
              {artist.bio_short ? (
                <p className="mt-4 max-w-xl text-[1.05rem] text-papier/80">
                  {artist.bio_short}
                </p>
              ) : null}
            </div>
            <p className="font-mono text-[0.75rem] font-bold uppercase tracking-[0.2em] text-papier/55">
              Tête d&apos;affiche
            </p>
          </div>
        </motion.article>
      </TiltCard>
    );
  }

  return (
    <TiltCard className="group h-full" maxTilt={9}>
      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.5,
          delay: reduceMotion ? 0 : index * 0.05,
          ease: EASE_YUNA,
        }}
        className="h-full rounded-2xl border border-bleu/10 bg-papier p-6 shadow-[0_10px_30px_rgba(0,90,140,0.05)] transition-[box-shadow,border-color] duration-[250ms] ease-yuna group-hover:border-bleu/25 group-hover:shadow-[0_18px_40px_rgba(0,90,140,0.1)]"
      >
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-feu">
          {artist.role}
        </p>
        <h3 className="mt-2 font-display text-[clamp(1.45rem,3.5vw,2rem)] font-extrabold uppercase leading-[1.05] text-bleu transition-colors group-hover:text-bleu-fonce">
          {artist.name}
        </h3>
        {artist.bio_short ? (
          <p className="mt-2 text-[0.9rem] text-charbon">{artist.bio_short}</p>
        ) : null}
      </motion.article>
    </TiltCard>
  );
}
