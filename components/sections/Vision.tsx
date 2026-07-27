"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { VISION } from "@/lib/content-site";
import { EASE_YUNA } from "@/lib/motion";

export function Vision() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="vision" labelledBy="vision-title" background="vision">
      <SectionHeading
        eyebrow={VISION.eyebrow}
        title={VISION.title}
        titleId="vision-title"
        description={VISION.intro}
      />

      <motion.div
        className="mt-12 grid gap-4 min-[880px]:grid-cols-3"
        variants={
          reduce
            ? undefined
            : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
        }
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.25 }}
      >
        {VISION.pillars.map((pillar) => (
          <motion.article
            key={pillar.id}
            variants={
              reduce ? undefined : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
            }
            transition={{ duration: 0.55, ease: EASE_YUNA }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-bleu/12 bg-papier/90 p-7 shadow-ombre-bleu backdrop-blur-sm"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-feu to-bleu transition-transform duration-500 group-hover:scale-x-100"
            />
            <p className="font-mono text-[0.72rem] font-bold tracking-[0.12em] text-bleu/45">
              {pillar.hebrew}
            </p>
            <h3 className="mt-2 font-display text-2xl font-extrabold uppercase text-bleu">
              {pillar.title}
            </h3>
            <p className="mt-1 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-feu">
              {pillar.ref}
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-charbon">
              {pillar.text}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
