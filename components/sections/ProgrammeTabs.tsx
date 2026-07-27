"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

import { ProgrammeRow } from "@/components/sections/ProgrammeRow";
import { EASE_YUNA } from "@/lib/motion";
import type { ScheduleDay, ScheduleItem } from "@/types/schedule";

type ProgrammeTabsProps = {
  items: ScheduleItem[];
};

const TABS: { day: ScheduleDay; label: string; hint: string }[] = [
  { day: 1, label: "Samedi 5", hint: "18h – 23h" },
  { day: 2, label: "Dimanche 6", hint: "18h – 22h30" },
];

export function ProgrammeTabs({ items }: ProgrammeTabsProps) {
  const baseId = useId();
  const reduce = useReducedMotion();
  const [activeDay, setActiveDay] = useState<ScheduleDay>(1);
  const visible = items.filter((item) => item.day === activeDay);

  return (
    <div className="mt-12 min-[760px]:mt-14">
      <div
        className="relative mb-8 flex gap-2 rounded-full bg-nuage p-1.5"
        role="tablist"
        aria-label="Jours du festival"
      >
        {TABS.map((tab) => {
          const selected = activeDay === tab.day;
          return (
            <button
              key={tab.day}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.day}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.day}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveDay(tab.day)}
              className={`relative z-10 flex-1 rounded-full px-4 py-3 text-left transition-colors duration-[250ms] ease-yuna ${
                selected
                  ? "text-papier"
                  : "text-charbon hover:text-bleu"
              }`}
            >
              {selected && !reduce ? (
                <motion.span
                  layoutId="programme-tab-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-bleu shadow-[0_8px_20px_rgba(0,90,140,0.25)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              {selected && reduce ? (
                <span className="absolute inset-0 -z-10 rounded-full bg-bleu shadow-[0_8px_20px_rgba(0,90,140,0.25)]" />
              ) : null}
              <span className="block font-display text-[1.05rem] font-extrabold uppercase leading-none tracking-wide min-[480px]:text-[1.2rem]">
                {tab.label}
              </span>
              <span
                className={`mt-1 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] ${
                  selected ? "text-papier/75" : "text-charbon/70"
                }`}
              >
                {tab.hint}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {TABS.map((tab) => {
          if (activeDay !== tab.day) return null;
          return (
            <motion.div
              key={tab.day}
              role="tabpanel"
              id={`${baseId}-panel-${tab.day}`}
              aria-labelledby={`${baseId}-tab-${tab.day}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE_YUNA }}
            >
              {visible.length === 0 ? (
                <p className="text-charbon">Programme à venir.</p>
              ) : (
                <ol className="m-0 list-none overflow-hidden rounded-2xl border border-bleu/10 bg-papier p-0 shadow-[0_12px_36px_rgba(0,90,140,0.05)]">
                  {visible.map((item, index) => (
                    <ProgrammeRow
                      key={item.id}
                      item={item}
                      isLast={index === visible.length - 1}
                    />
                  ))}
                </ol>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
