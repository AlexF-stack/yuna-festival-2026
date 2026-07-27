"use client";

import { motion, useReducedMotion } from "framer-motion";

import { TiltCard } from "@/components/motion/TiltCard";
import { EASE_YUNA } from "@/lib/motion";
import type { PublicArtist } from "@/types/artist";

type ArtistCardProps = {
  artist: PublicArtist;
  index: number;
};

function Silhouette({ large }: { large?: boolean }) {
  return (
    <div
      aria-hidden
      className={`relative flex shrink-0 items-end justify-center overflow-hidden rounded-full bg-gradient-to-b from-bleu/25 to-bleu-fonce/40 ${
        large ? "h-28 w-28 min-[760px]:h-36 min-[760px]:w-36" : "h-16 w-16"
      }`}
    >
      <div
        className={`rounded-full bg-bleu-fonce/50 ${
          large ? "mb-10 h-12 w-12 min-[760px]:mb-12 min-[760px]:h-14 min-[760px]:w-14" : "mb-5 h-7 w-7"
        }`}
      />
      <div
        className={`absolute bottom-0 rounded-t-[50%] bg-bleu-fonce/45 ${
          large ? "h-14 w-24 min-[760px]:h-16 min-[760px]:w-28" : "h-8 w-14"
        }`}
      />
    </div>
  );
}

export function ArtistCard({ artist, index }: ArtistCardProps) {
  const reduceMotion = useReducedMotion();

  if (!artist.is_revealed) {
    const isHeadlinerSlot = artist.is_headliner;

    if (isHeadlinerSlot) {
      return (
        <TiltCard className="group col-span-full" maxTilt={5}>
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: EASE_YUNA }}
            className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-bleu to-bleu-fonce p-8 text-papier shadow-ombre-bleu-lg min-[760px]:p-12"
          >
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-feu/25 blur-2xl" />
            <div className="relative flex flex-col gap-6 min-[640px]:flex-row min-[640px]:items-center min-[640px]:gap-10">
              <Silhouette large />
              <div>
                <p className="inline-flex rounded-full bg-feu/20 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-feu">
                  Artiste surprise
                </p>
                <h3 className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-papier/90">
                  Bientôt dévoilé
                </h3>
                <p className="mt-3 max-w-md text-[1.02rem] text-papier/70">
                  Une présence forte sur scène — le line-up se révèle progressivement.
                </p>
              </div>
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
          className="flex h-full items-center gap-4 rounded-2xl border border-bleu/10 bg-papier p-5 shadow-[0_10px_30px_rgb(0_90_140/0.05)]"
        >
          <Silhouette />
          <div>
            <p className="inline-flex rounded-full bg-feu/10 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-feu">
              Artiste surprise
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.25rem,3vw,1.65rem)] font-extrabold uppercase leading-tight text-bleu/80">
              Bientôt dévoilé
            </h3>
          </div>
        </motion.article>
      </TiltCard>
    );
  }

  // Révélé
  if (artist.is_headliner) {
    return (
      <TiltCard className="group col-span-full" maxTilt={5}>
        <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: EASE_YUNA }}
          className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-bleu to-bleu-fonce p-8 text-papier shadow-ombre-bleu-lg min-[760px]:p-12"
        >
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-feu/30 blur-2xl" />
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
            <p className="font-mono text-[0.75rem] font-bold uppercase tracking-[0.2em] text-papier/70">
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
        className="h-full rounded-2xl border border-bleu/10 bg-papier p-6 shadow-[0_10px_30px_rgb(0_90_140/0.05)] transition-[box-shadow,border-color] duration-[250ms] ease-yuna group-hover:border-bleu/25"
      >
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-feu">
          {artist.role}
        </p>
        <h3 className="mt-2 font-display text-[clamp(1.45rem,3.5vw,2rem)] font-extrabold uppercase leading-[1.05] text-bleu">
          {artist.name}
        </h3>
        {artist.bio_short ? (
          <p className="mt-2 text-[0.9rem] text-charbon">{artist.bio_short}</p>
        ) : null}
      </motion.article>
    </TiltCard>
  );
}
