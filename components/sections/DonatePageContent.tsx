"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { DONATE, ORGANIZER } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM, EASE_YUNA } from "@/lib/motion";
import { SITE_CONTACT } from "@/lib/site";

export function DonatePageContent() {
  const reduce = useReducedMotion();

  return (
    <>
      <section
        data-tone="bleu"
        data-nav-tone="bleu"
        className="relative overflow-hidden bg-bleu pb-20 pt-32 text-papier min-[760px]:pb-24 min-[760px]:pt-36"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--feu)_35%,transparent),transparent_55%),radial-gradient(ellipse_at_90%_80%,color-mix(in_srgb,var(--jaune)_18%,transparent),transparent_50%)]"
        />
        <div className="section-container relative z-10 px-5 min-[760px]:px-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="max-w-2xl"
          >
            <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-jaune">
              Soutenir · {FESTIVAL.brandFull}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.2rem)] font-extrabold uppercase leading-[0.95]">
              {DONATE.pageTitle}
            </h1>
            <p className="mt-6 text-[1.12rem] leading-relaxed text-papier/88">
              {DONATE.pageLead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={DONATE.href} className="!bg-feu hover:!bg-braise">
                {DONATE.ctaEmail}
              </ButtonLink>
              <ButtonLink href="/" variant="outline-light">
                {DONATE.ctaHome}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        data-tone="papier"
        data-nav-tone="papier"
        className="section-pad bg-papier"
      >
        <div className="section-container">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: EASE_YUNA }}
          >
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
              À quoi sert ton don
            </p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold uppercase leading-[1.05] text-bleu">
              Trois flammes à allumer
            </h2>
          </motion.div>

          <ul className="mt-12 grid gap-10 min-[760px]:grid-cols-3 min-[760px]:gap-8">
            {DONATE.pillars.map((pillar, i) => (
              <motion.li
                key={pillar.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  ease: EASE_YUNA,
                  delay: reduce ? 0 : i * 0.08,
                }}
              >
                <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-feu">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold uppercase text-bleu">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-charbon">
                  {pillar.text}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section
        data-tone="feu-soft"
        data-nav-tone="feu-soft"
        className="section-pad bg-logo-feu-soft"
      >
        <div className="section-container">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: EASE_YUNA }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold uppercase leading-[1.05] text-bleu">
              Comment donner
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-charbon">
              Écris-nous à{" "}
              <a
                href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent("Don YUNA Festival 2026")}`}
                className="font-semibold text-feu underline decoration-feu/40 underline-offset-4 hover:decoration-feu"
              >
                {SITE_CONTACT.email}
              </a>{" "}
              — l&apos;équipe {ORGANIZER.name} te répond avec les modalités
              (mobile money, virement ou sur place).
            </p>
            <p className="mt-3 text-sm text-charbon/80">
              {FESTIVAL.datesShort} · {FESTIVAL.venue}, {FESTIVAL.city}
            </p>
            <ButtonLink href={DONATE.href} className="mt-8 !bg-feu hover:!bg-braise">
              {DONATE.label}
            </ButtonLink>
          </motion.div>
        </div>
      </section>
    </>
  );
}
