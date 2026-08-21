"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useMessages } from "@/components/i18n/LocaleProvider";
import {
  formatRegistrationsCount,
  usePublicRegistrationsCount,
} from "@/hooks/usePublicRegistrationsCount";
import { EASE_YUNA, rise, staggerContainer } from "@/lib/motion";

export function StatsBar() {
  const reduce = useReducedMotion();
  const t = useMessages();
  const { count } = usePublicRegistrationsCount({ refreshMs: 30_000 });

  const items = [
    {
      value: formatRegistrationsCount(count),
      label: t.statsRegistered.label,
    },
    ...t.stats,
  ];

  return (
    <section
      aria-label={t.countdown.label}
      data-nav-tone="bleu"
      data-tone="bleu"
      className="relative z-10 overflow-hidden bg-bleu"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-bleu" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--jaune)_18%,transparent),transparent_65%)]" />
      </div>

      <div aria-hidden className="flag-stripe relative z-10">
        <span className="bg-vert" />
        <span className="bg-jaune" />
        <span className="bg-rouge" />
      </div>

      <motion.div
        className="relative mx-auto grid max-w-[1240px] grid-cols-2 min-[720px]:grid-cols-4"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.35 }}
      >
        {items.map((stat) => (
          <motion.div
            key={stat.label}
            variants={reduce ? undefined : rise(20)}
            transition={{ duration: 0.7, ease: EASE_YUNA }}
            className="group relative px-4 py-8 text-center text-papier min-[480px]:px-5 min-[480px]:py-9"
          >
            <p
              className="font-display text-[clamp(2.35rem,9vw,2.85rem)] font-extrabold leading-none text-jaune transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
              aria-label={`${stat.value} ${stat.label}`}
            >
              {stat.value}
            </p>
            <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ivoire-froid/85 min-[480px]:text-[0.72rem] min-[480px]:tracking-[0.2em]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
