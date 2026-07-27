"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { EVENT_STATS } from "@/lib/festival";
import { SECTION_BACKGROUNDS } from "@/lib/section-backgrounds";
import { EASE_YUNA, rise, staggerContainer } from "@/lib/motion";

export function StatsBar() {
  const reduce = useReducedMotion();
  const bg = SECTION_BACKGROUNDS.stats;

  return (
    <section
      aria-label="Chiffres clés du festival"
      className="relative z-10 overflow-hidden bg-bleu"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src={bg.src}
          alt={bg.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: bg.objectPosition, opacity: bg.photoOpacity ?? 0.35 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bleu/95 via-bleu-fonce/92 to-bleu/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,102,0,0.2),transparent_65%)]" />
      </div>

      <motion.div
        className="relative mx-auto grid max-w-[1240px] grid-cols-2 min-[720px]:grid-cols-4"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.4 }}
      >
        {EVENT_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={reduce ? undefined : rise(16)}
            transition={{ duration: 0.55, ease: EASE_YUNA }}
            className={`group relative px-5 py-9 text-center text-papier ${
              i < EVENT_STATS.length - 1
                ? "border-b border-papier/15 min-[720px]:border-b-0 min-[720px]:border-r"
                : ""
            } ${i === 1 ? "max-[719px]:border-l max-[719px]:border-papier/15" : ""} ${
              i === 2 ? "max-[719px]:border-r max-[719px]:border-papier/15" : ""
            }`}
          >
            <p
              className="font-display text-[clamp(2rem,5vw,2.85rem)] font-extrabold leading-none text-papier transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
              aria-label={`${stat.value} ${stat.label}`}
            >
              {stat.value}
            </p>
            <p className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-papier/80">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
