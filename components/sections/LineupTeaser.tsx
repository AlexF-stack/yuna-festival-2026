"use client";

import { useMessages } from "@/components/i18n/LocaleProvider";
import { fill } from "@/lib/i18n/index";

type LineupTeaserProps = {
  totalCount: number;
  className?: string;
};

/** Indicateur global — sans date ni compteur de révélés. */
export function LineupTeaser({ totalCount, className = "" }: LineupTeaserProps) {
  const t = useMessages();
  const n = totalCount > 0 ? totalCount : 13;
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-bleu/15 bg-ciel/80 px-4 py-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-bleu ${className}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-feu" aria-hidden />
      {fill(t.lineup.teaser, { n })}
    </p>
  );
}
