"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { EVENT_STATS } from "@/lib/festival";
import { EASE_YUNA, rise, staggerContainer } from "@/lib/motion";

function AnimatedValue({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const numeric = Number.parseInt(value.replace(/\D/g, ""), 10);
  const isNumeric = !Number.isNaN(numeric) && /^\d/.test(value);
  const suffix = isNumeric ? value.replace(/^\d+/, "") : "";
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 70, damping: 18 });

  useEffect(() => {
    if (!isNumeric || reduce || !inView) return;
    const controls = animate(mv, numeric, { duration: 1.15, ease: EASE_YUNA });
    return () => controls.stop();
  }, [inView, isNumeric, mv, numeric, reduce]);

  useEffect(() => {
    if (!isNumeric || !ref.current) return;
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
  }, [isNumeric, spring, suffix]);

  if (!isNumeric || reduce) {
    return <span ref={ref}>{value}</span>;
  }

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsBar() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Chiffres clés du festival"
      className="relative z-10 overflow-hidden bg-bleu"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,102,0,0.18),transparent_65%)]"
      />
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
            variants={reduce ? undefined : rise(20)}
            transition={{ duration: 0.55, ease: EASE_YUNA }}
            className={`group relative px-5 py-9 text-center text-papier ${
              i < EVENT_STATS.length - 1
                ? "border-b border-papier/15 min-[720px]:border-b-0 min-[720px]:border-r"
                : ""
            } ${i === 1 ? "max-[719px]:border-l max-[719px]:border-papier/15" : ""} ${
              i === 2 ? "max-[719px]:border-r max-[719px]:border-papier/15" : ""
            }`}
          >
            <p className="font-display text-[clamp(2rem,5vw,2.85rem)] font-extrabold leading-none text-papier transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none">
              <AnimatedValue value={stat.value} />
            </p>
            <p className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-papier/75">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
