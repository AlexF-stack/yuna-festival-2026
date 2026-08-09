"use client";

import { useEffect, useState } from "react";

import { useMessages } from "@/components/i18n/LocaleProvider";
import {
  getCountdownParts,
  padCountdown,
  parseEventStartMs,
  type CountdownParts,
} from "@/lib/countdown";

type HeroCountdownProps = {
  eventStartIso: string;
  variant?: "default" | "dark";
  className?: string;
};

export function HeroCountdown({
  eventStartIso,
  variant = "default",
  className = "",
}: HeroCountdownProps) {
  const t = useMessages();
  const targetMs = parseEventStartMs(eventStartIso);
  const [parts, setParts] = useState<CountdownParts | null>(null);

  const labels = [
    { key: "days" as const, label: t.countdown.days },
    { key: "hours" as const, label: t.countdown.hours },
    { key: "minutes" as const, label: t.countdown.minutes },
    { key: "seconds" as const, label: t.countdown.seconds },
  ];

  useEffect(() => {
    const tick = () => setParts(getCountdownParts(targetMs));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return (
    <div
      className={`mt-10 grid max-w-md grid-cols-4 gap-2 ${className}`}
      aria-live="polite"
      aria-atomic="true"
      aria-label={t.countdown.label}
    >
      {labels.map(({ key, label }) => (
        <div
          key={key}
          className={
            variant === "dark"
              ? "rounded-2xl border border-jaune/25 bg-nuit-profonde/55 px-2 py-3 text-center shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-jaune/15"
              : "rounded-2xl border border-bleu/15 bg-papier px-2 py-3 text-center shadow-[0_8px_24px_rgba(0,90,140,0.06)]"
          }
        >
          <div
            className={`font-mono text-[clamp(1.25rem,3vw,1.65rem)] font-bold leading-none ${
              variant === "dark" ? "text-jaune" : "text-bleu"
            }`}
          >
            {parts ? padCountdown(parts[key]) : "--"}
          </div>
          <div
            className={`mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] ${
              variant === "dark" ? "text-ivoire-froid/70" : "text-gris-bleu"
            }`}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
