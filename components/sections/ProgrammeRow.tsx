"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ScheduleItem } from "@/types/schedule";

type ProgrammeRowProps = {
  item: ScheduleItem;
  isLast?: boolean;
};

export function ProgrammeRow({ item, isLast }: ProgrammeRowProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className={`grid grid-cols-1 gap-1 px-5 py-4 transition-colors duration-[250ms] hover:bg-ciel/70 motion-reduce:transition-none min-[560px]:grid-cols-[10rem_1fr] min-[560px]:gap-6 min-[560px]:px-6 min-[560px]:py-5 ${
        isLast ? "" : "border-b border-bleu/8"
      }`}
    >
      <time className="font-mono text-[0.88rem] font-bold tabular-nums text-feu">
        {item.time}
      </time>
      <div>
        <p className="text-[1.02rem] font-semibold leading-snug text-encre">
          {item.title}
        </p>
        {item.description ? (
          <p className="mt-0.5 text-[0.84rem] text-charbon">{item.description}</p>
        ) : null}
      </div>
    </motion.li>
  );
}
