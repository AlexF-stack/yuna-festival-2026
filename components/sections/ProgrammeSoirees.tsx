"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { EASE_YUNA } from "@/lib/motion";

/**
 * Structure des soirées (sans spoiler les noms non révélés).
 * Renforce la « programmation visible » face à Effuzion.
 */
const SOIREES = [
  {
    day: "Samedi 5 septembre",
    slots: [
      { time: "18:00", label: "Ouverture & prière" },
      { time: "18:15–20:05", label: "Louange & scènes (artistes à dévoiler)" },
      { time: "20:05", label: "Parole prophétique · 45 min" },
      { time: "20:50", label: "Adoration · 1 h" },
      { time: "21:50–23:00", label: "Scènes & clôture" },
    ],
  },
  {
    day: "Dimanche 6 septembre",
    slots: [
      { time: "18:00", label: "Ouverture & prière" },
      { time: "18:10–18:50", label: "Louange (artistes à dévoiler)" },
      { time: "18:50", label: "Exhortation · 30 min" },
      { time: "19:20", label: "Adoration · 1 h" },
      { time: "20:20", label: "Parole · 1 h" },
      { time: "21:20", label: "Tête d’affiche internationale · 1 h" },
      { time: "22:20", label: "Clôture & envoi" },
    ],
  },
] as const;

export function ProgrammeSoirees() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="programme" labelledBy="programme-title" tone="papier">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: EASE_YUNA }}
      >
        <SectionHeading
          eyebrow="Les soirées"
          title="Programme minute"
          titleId="programme-title"
          description="Les noms sortent progressivement — la structure des deux soirs est déjà là."
          tone="feu"
        />
        <div className="mt-10 grid gap-6 min-[880px]:grid-cols-2">
          {SOIREES.map((soir) => (
            <article
              key={soir.day}
              className="rounded-3xl border border-bleu/12 bg-papier p-5 min-[480px]:p-6"
            >
              <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-bleu">
                {soir.day}
              </h3>
              <ol className="mt-5 space-y-3">
                {soir.slots.map((slot) => (
                  <li
                    key={`${soir.day}-${slot.time}`}
                    className="grid grid-cols-[7rem_1fr] gap-3 border-b border-bleu/8 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-[0.72rem] font-bold tabular-nums text-feu">
                      {slot.time}
                    </span>
                    <span className="text-sm text-encre">{slot.label}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}
