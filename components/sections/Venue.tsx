"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { VENUE } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";
import { EASE_YUNA } from "@/lib/motion";

export function Venue() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="lieu" labelledBy="lieu-title" background="venue">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: EASE_YUNA }}
        className="grid items-center gap-12 min-[900px]:grid-cols-[1.1fr_0.9fr]"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_YUNA }}
        >
          <SectionHeading
            eyebrow={VENUE.eyebrow}
            title={VENUE.title}
            titleId="lieu-title"
            description={VENUE.intro}
          />
          <ul className="mt-8 space-y-3.5">
            {VENUE.amenities.map((line) => (
              <li key={line} className="flex gap-3 text-[0.98rem] text-charbon">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-feu" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.aside
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_YUNA, delay: 0.06 }}
          className="rounded-[1.75rem] border border-bleu/15 bg-bleu/92 p-10 text-center text-papier shadow-ombre-bleu-lg"
        >
          <p className="font-display text-[clamp(2.5rem,8vw,4rem)] font-extrabold uppercase leading-none">
            Midombo
          </p>
          <p className="mt-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-papier/75">
            {FESTIVAL.city} · {FESTIVAL.country}
          </p>
          <p className="mt-6 text-lg font-bold text-feu">{FESTIVAL.datesShort}</p>
          <p className="mt-2 text-sm text-papier/80">{FESTIVAL.freeEntry}</p>
          <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-papier/55">
            Ouverture {FESTIVAL.siteOpens} · Concerts dès 18h
          </p>
        </motion.aside>
      </motion.div>
    </SectionShell>
  );
}
