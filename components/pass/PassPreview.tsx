"use client";

import { EffectFrame } from "@/components/ui/EffectFrame";
import { FESTIVAL } from "@/lib/festival";
import {
  REGISTRATION_TYPE_LABELS,
  type RegistrationType,
} from "@/lib/registration-types";

type PassPreviewProps = {
  name: string;
  registrationType: RegistrationType;
};

/** Aperçu client du pass — le vrai QR n’est généré que côté serveur. */
export function PassPreview({ name, registrationType }: PassPreviewProps) {
  const displayName = name.trim().length >= 2 ? name.trim() : "Ton nom";
  const typeLabel = REGISTRATION_TYPE_LABELS[registrationType];

  return (
    <EffectFrame className="w-full rounded-[1.25rem] shadow-[0_20px_48px_rgba(0,90,140,0.12)]">
    <aside
      className="pass-ticket relative w-full overflow-hidden bg-papier text-encre"
      aria-live="polite"
      aria-label="Aperçu de ton pass YUNA"
    >
      <header className="relative bg-papier px-5 pb-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-feu">
              Aperçu pass
            </p>
            <p className="mt-1 font-display text-[1.65rem] font-extrabold uppercase leading-[0.9] text-bleu">
              YUNA {FESTIVAL.edition}
            </p>
          </div>
          <p className="shrink-0 text-right font-mono text-[0.65rem] font-bold uppercase leading-tight tracking-wider text-charbon">
            05 &amp; 06
            <br />
            <span className="text-feu">sept</span>
          </p>
        </div>
        <p className="mt-2 text-sm text-charbon">
          {FESTIVAL.theme} · Midombo
        </p>
      </header>

      <div className="relative h-3.5 bg-papier" aria-hidden>
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-bleu/25" />
        <span className="absolute left-0 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nuage" />
        <span className="absolute right-0 top-1/2 size-4 translate-x-1/2 -translate-y-1/2 rounded-full bg-nuage" />
      </div>

      <div className="flex flex-col items-center px-5 pb-5 pt-1">
        <div
          className="flex size-[180px] items-center justify-center rounded-xl border border-bleu/12 bg-nuage/70 p-3"
          aria-hidden
        >
          <svg viewBox="0 0 120 120" className="h-full w-full text-bleu" role="img">
            <title>Emplacement QR</title>
            <rect width="120" height="120" fill="white" />
            <rect x="8" y="8" width="28" height="28" fill="currentColor" />
            <rect x="14" y="14" width="16" height="16" fill="white" />
            <rect x="18" y="18" width="8" height="8" fill="currentColor" />
            <rect x="84" y="8" width="28" height="28" fill="currentColor" />
            <rect x="90" y="14" width="16" height="16" fill="white" />
            <rect x="94" y="18" width="8" height="8" fill="currentColor" />
            <rect x="8" y="84" width="28" height="28" fill="currentColor" />
            <rect x="14" y="90" width="16" height="16" fill="white" />
            <rect x="18" y="94" width="8" height="8" fill="currentColor" />
            {[
              [44, 12],
              [56, 12],
              [68, 20],
              [44, 32],
              [60, 36],
              [48, 48],
              [64, 52],
              [76, 48],
              [44, 64],
              [56, 68],
              [72, 64],
              [88, 56],
              [96, 68],
              [48, 84],
              [64, 88],
              [80, 84],
              [92, 92],
              [104, 80],
            ].map(([x, y]) => (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width="8"
                height="8"
                fill="currentColor"
              />
            ))}
          </svg>
        </div>
        <p className="mt-1.5 text-center font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-charbon/70">
          QR généré après inscription
        </p>

        <p className="mt-4 text-center font-display text-[1.2rem] font-extrabold uppercase leading-tight text-bleu transition-colors duration-200">
          {displayName}
        </p>
        <p className="mt-2 rounded-full bg-feu/10 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-feu">
          {typeLabel}
        </p>
        <p className="mt-2 font-mono text-xs tracking-wide text-charbon">
          YUNA-····
        </p>
      </div>

      <footer className="flex items-center justify-between bg-bleu px-5 py-3.5 text-sm text-papier">
        <span>
          Entrée <strong>{FESTIVAL.freeEntry.toUpperCase()}</strong>
        </span>
        <span className="font-mono text-xs tracking-wider text-papier/80">
          Ésaïe 60:1
        </span>
      </footer>
    </aside>
    </EffectFrame>
  );
}
