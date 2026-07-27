"use client";

import { useReducedMotion } from "framer-motion";

import { getGoogleCalendarUrl, getShareData } from "@/lib/calendar";

export function HeroTools() {
  const reduce = useReducedMotion();

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
        className="inline-flex items-center gap-2 rounded-full border border-bleu/20 bg-papier/80 px-4 py-2 text-[0.82rem] font-semibold text-bleu transition-colors hover:border-bleu hover:bg-ciel motion-reduce:transition-none"
      >
        Ajouter au calendrier
      </a>
      <button
        type="button"
        onClick={onShare}
        className="inline-flex items-center gap-2 rounded-full border border-bleu/20 bg-papier/80 px-4 py-2 text-[0.82rem] font-semibold text-bleu transition-colors hover:border-bleu hover:bg-ciel motion-reduce:transition-none"
      >
        Partager
      </button>
      {!reduce ? (
        <span className="sr-only">Raccourcis hero</span>
      ) : null}
    </div>
  );
}
