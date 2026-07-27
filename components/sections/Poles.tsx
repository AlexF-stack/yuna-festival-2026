"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { POLES } from "@/lib/content-site";
import { EASE_YUNA } from "@/lib/motion";

export function Poles() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="poles" labelledBy="poles-title" background="poles">
      <SectionHeading
        eyebrow="Les pôles"
        title="Des activités pour tous"
        titleId="poles-title"
        description="Des activités pour tous les goûts — un seul objectif : glorifier Dieu."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-4">
        {POLES.map((pole, i) => (
          <motion.article
            key={pole.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.55,
              delay: reduce ? 0 : i * 0.07,
              ease: EASE_YUNA,
            }}
            whileHover={
              reduce
                ? undefined
                : { y: -6, transition: { duration: 0.3, ease: EASE_YUNA } }
            }
            className="group relative overflow-hidden rounded-2xl border border-bleu/10 bg-papier p-6 shadow-[0_12px_36px_rgb(0_90_140/0.06)]"
          >
            <span
              aria-hidden
              className={`mb-5 block h-1.5 w-12 rounded-full ${
                pole.accent === "feu" ? "bg-feu" : "bg-bleu"
              }`}
            />
            <h3 className="font-display text-xl font-extrabold uppercase leading-tight text-encre transition-colors group-hover:text-bleu">
              {pole.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-charbon">
              {pole.description}
            </p>
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-feu/0 blur-2xl transition-[background-color] duration-500 group-hover:bg-feu/15"
            />
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
