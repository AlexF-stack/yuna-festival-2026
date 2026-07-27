"use client";

import { useReducedMotion } from "framer-motion";

import { getGoogleCalendarUrl, getShareData } from "@/lib/calendar";

type HeroToolsProps = {
  variant?: "default" | "dark";
};

export function HeroTools({ variant = "default" }: HeroToolsProps) {
  const reduce = useReducedMotion();
  const chipClass =
    variant === "dark"
      ? "border-papier/20 bg-papier/10 text-papier/90 backdrop-blur-md hover:border-papier/40 hover:bg-papier/15"
      : "border-bleu/20 bg-papier/80 text-bleu hover:border-bleu hover:bg-ciel";

  async function onShare() {
    const data = getShareData(window.location.href);
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
    } catch {
      /* annulation utilisateur */
    }
    try {
      await navigator.clipboard.writeText(`${data.text}\n${data.url}`);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <a
        href={getGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.82rem] font-semibold transition-colors motion-reduce:transition-none ${chipClass}`}
      >
        Ajouter au calendrier
      </a>
      <button
        type="button"
        onClick={onShare}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.82rem] font-semibold transition-colors motion-reduce:transition-none ${chipClass}`}
      >
        Partager
      </button>
      {!reduce ? (
        <span className="sr-only">Raccourcis hero</span>
      ) : null}
    </div>
  );
}
