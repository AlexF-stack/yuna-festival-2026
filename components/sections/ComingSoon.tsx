"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { FESTIVAL, HERO_COPY } from "@/lib/festival";
import { EASE_YUNA } from "@/lib/motion";

/**
 * Accroche visuelle « Coming Soon » — ballon orange/bleu inspiré des affiches.
 */
export function ComingSoon() {
  const reduce = useReducedMotion();

  return (
    <section
      id="coming-soon"
      aria-labelledby="coming-soon-title"
      data-tone="bleu-soft"
      data-nav-tone="bleu-soft"
      className="section-pad relative z-10 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-logo-bleu-soft" />

      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:gap-14 min-[900px]:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: EASE_YUNA }}
        >
          <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.28em] text-feu">
            Save the date
          </p>
          <h2
            id="coming-soon-title"
            className="mt-3 font-display text-[clamp(2.6rem,8vw,4.2rem)] font-extrabold uppercase leading-[0.92] text-bleu"
          >
            {FESTIVAL.brand}
          </h2>
          <p className="mt-2 font-display text-[clamp(1.6rem,4vw,2.2rem)] font-extrabold uppercase leading-none text-feu">
            05 &amp; 06 sept · {FESTIVAL.edition}
          </p>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-charbon">
            Le ballon se gonfle. La génération se lève. Prépare ton pass QR —
            entrée libre à Midombo.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={HERO_COPY.ctaPrimaryHref} variant="primary">
              {HERO_COPY.ctaPrimary}
            </ButtonLink>
            <ButtonLink href="/#journee" variant="ghost">
              Voir la journée
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[520px]"
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: EASE_YUNA, delay: 0.08 }}
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-bleu/15 via-transparent to-feu/20 blur-2xl"
          />
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] shadow-ombre-bleu-lg">
            <Image
              src="/media/coming-soon-balloon.jpg"
              alt="Ballon YUNA Coming Soon — 5 et 6 septembre à Cotonou"
              fill
              sizes="(min-width: 900px) 520px, 100vw"
              quality={78}
              className="object-cover object-center"
            />
          </div>
          {!reduce ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-2 top-6 h-3 w-3 rounded-full bg-feu"
              animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
