"use client";

import { useEffect, useState } from "react";

import {
  getCountdownParts,
  padCountdown,
  parseEventStartMs,
  type CountdownParts,
} from "@/lib/countdown";

type HeroCountdownProps = {
  eventStartIso: string;
};

const LABELS = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

export function HeroCountdown({ eventStartIso }: HeroCountdownProps) {
  const targetMs = parseEventStartMs(eventStartIso);
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const tick = () => setParts(getCountdownParts(targetMs));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return (
    <div
      className="mt-10 grid max-w-md grid-cols-4 gap-2"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Compte à rebours jusqu'au festival"
    >
      {LABELS.map(({ key, label }) => (
        <div
          key={key}
          className="rounded-2xl border border-bleu/15 bg-papier px-2 py-3 text-center shadow-[0_8px_24px_rgba(0,90,140,0.06)]"
        >
          <div className="font-mono text-[clamp(1.25rem,3vw,1.65rem)] font-bold leading-none text-bleu">
            {parts ? padCountdown(parts[key]) : "--"}
          </div>
          <div className="mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-charbon">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
