"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { SoftImage } from "@/components/ui/SoftImage";
import { VISION } from "@/lib/content-site";
import { EASE_YUNA } from "@/lib/motion";

export function Vision() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="vision" labelledBy="vision-title" background="vision">
      <Reveal>
        <SectionHeading
          eyebrow={VISION.eyebrow}
          title={VISION.title}
          titleId="vision-title"
          description={VISION.intro}
        />
      </Reveal>

      <motion.div
        className="mt-14 grid gap-5 min-[880px]:grid-cols-3"
        variants={
          reduce
            ? undefined
            : { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
        }
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {VISION.pillars.map((pillar) => (
          <motion.article
            key={pillar.id}
            variants={
              reduce
                ? undefined
                : { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }
            }
            transition={{ duration: 0.6, ease: EASE_YUNA }}
            className="surface-card group overflow-hidden"
          >
            <div className="relative h-36 overflow-hidden">
              <SoftImage
                src={pillar.image}
                alt=""
                fill
                sizes="(max-width: 880px) 100vw, 33vw"
                wrapperClassName="absolute inset-0"
                className="transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-encre/80 to-transparent" />
              <p className="absolute bottom-3 left-4 font-mono text-[0.68rem] font-bold tracking-[0.12em] text-papier/80">
                {pillar.hebrew}
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-extrabold uppercase text-bleu">
                {pillar.title}
              </h3>
              <p className="mt-1 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-feu">
                {pillar.ref}
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-charbon">
                {pillar.text}
              </p>
            </div>
            <div
              aria-hidden
              className="h-0.5 origin-left scale-x-0 bg-gradient-to-r from-feu to-bleu transition-transform duration-500 group-hover:scale-x-100"
            />
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
