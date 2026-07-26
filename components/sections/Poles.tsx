"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { POLES } from "@/lib/content-site";

const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

export function Poles() {
  const reduce = useReducedMotion();

  return (
    <section
      id="poles"
      aria-labelledby="poles-title"
      className="relative z-10 bg-nuage px-5 py-24 min-[760px]:px-6 min-[760px]:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
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
              transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.07, ease }}
              whileHover={
                reduce
                  ? undefined
                  : { y: -6, transition: { duration: 0.3, ease } }
              }
              className="group relative overflow-hidden rounded-2xl border border-bleu/10 bg-papier p-6 shadow-[0_12px_36px_rgba(0,90,140,0.06)]"
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
      </div>
    </section>
  );
}
