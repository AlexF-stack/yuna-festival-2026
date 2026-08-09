"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { useMessages } from "@/components/i18n/LocaleProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EASE_YUNA } from "@/lib/motion";

/**
 * Un seul message « save the date » — citation + date + visuel ticket.
 */
export function SaveTheDateStrip() {
  const reduce = useReducedMotion();
  const t = useMessages();

  return (
    <section
      aria-label={t.saveTheDate.eyebrow}
      data-tone="bleu"
      data-nav-tone="bleu"
      className="relative z-10 overflow-hidden bg-bleu py-14 text-papier min-[760px]:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_srgb,var(--feu)_28%,transparent),transparent_55%),radial-gradient(ellipse_at_90%_100%,color-mix(in_srgb,var(--jaune)_14%,transparent),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-[1100px] items-center gap-10 px-5 min-[800px]:grid-cols-[1.1fr_0.9fr] min-[800px]:gap-12 min-[800px]:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: EASE_YUNA }}
        >
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.28em] text-jaune">
            {t.saveTheDate.eyebrow}
          </p>
          <p className="mt-3 font-display text-[clamp(1.9rem,5vw,2.8rem)] font-extrabold uppercase leading-[0.95]">
            {t.saveTheDate.title}
          </p>
          <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-papier/88">
            {t.saveTheDate.support}
          </p>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-papier/70">
            {t.saveTheDate.venue}
          </p>
          <ButtonLink href="/#inscription" className="mt-7">
            {t.common.registerCta}
          </ButtonLink>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[420px]"
          initial={reduce ? false : { opacity: 0, rotate: -2, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE_YUNA }}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-ombre-bleu-lg">
            <Image
              src="/media/save-the-date.webp"
              alt={t.saveTheDate.title}
              fill
              sizes="(min-width: 800px) 420px, 90vw"
              quality={80}
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
