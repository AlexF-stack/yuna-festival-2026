"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { JOURNEE } from "@/lib/content-site";
import { EASE_YUNA } from "@/lib/motion";

export function Journee() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="journee" labelledBy="journee-title" background="journee">
      <SectionHeading
        eyebrow={JOURNEE.eyebrow}
        title={JOURNEE.title}
        titleId="journee-title"
        description={JOURNEE.intro}
      />

      <div className="mt-12 grid gap-4 min-[880px]:grid-cols-3">
        {JOURNEE.items.map((item, i) => (
          <motion.article
            key={item.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.07, ease: EASE_YUNA }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="relative overflow-hidden rounded-2xl border border-bleu/10 bg-papier/92 p-7 shadow-ombre-bleu backdrop-blur-sm"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-vert via-jaune to-rouge"
            />
            <p className="font-mono text-[0.78rem] font-bold tracking-[0.1em] text-feu">
              {item.time}
            </p>
            <h3 className="mt-3 font-display text-xl font-extrabold uppercase leading-tight text-bleu">
              {item.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-charbon">
              {item.description}
            </p>
            {"speakers" in item && item.speakers ? (
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[0.9rem] text-charbon/90">
                {item.speakers.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            ) : null}
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
