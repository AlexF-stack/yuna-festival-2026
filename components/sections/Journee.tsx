"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { JOURNEE } from "@/lib/content-site";
import { EASE_PREMIUM, cardRise, staggerContainer } from "@/lib/motion";

export function Journee() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="journee" labelledBy="journee-title" tone="bleu-soft">
      <Reveal>
        <SectionHeading
          eyebrow={JOURNEE.eyebrow}
          title={JOURNEE.title}
          titleId="journee-title"
          description={JOURNEE.intro}
        />
      </Reveal>

      <motion.div
        className="mt-14 grid gap-5 min-[880px]:grid-cols-3"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {JOURNEE.items.map((item) => (
          <motion.article
            key={item.id}
            variants={reduce ? undefined : cardRise}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="surface-card relative overflow-hidden p-7"
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
              <ul className="mt-4 space-y-1.5 border-t border-bleu/10 pt-4 text-[0.9rem] text-charbon/90">
                {item.speakers.map((name) => (
                  <li key={name} className="flex gap-2">
                    <span className="text-feu" aria-hidden>
                      →
                    </span>
                    {name}
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
