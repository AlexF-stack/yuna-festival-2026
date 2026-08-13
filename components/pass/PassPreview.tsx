"use client";

import Image from "next/image";

import { FESTIVAL } from "@/lib/festival";
import {
  REGISTRATION_TYPE_LABELS,
  type RegistrationType,
} from "@/lib/registration-types";

type PassPreviewProps = {
  name: string;
  registrationType: RegistrationType;
};

/** Aperçu live du ticket — le vrai QR n’est généré qu’après inscription. */
export function PassPreview({ name, registrationType }: PassPreviewProps) {
  const displayName = name.trim().length >= 2 ? name.trim() : "Ton nom";
  const typeLabel = REGISTRATION_TYPE_LABELS[registrationType];

  return (
    <aside
      className="pass-ticket relative w-full overflow-hidden rounded-[1.35rem] bg-papier text-encre shadow-[0_20px_48px_rgba(0,90,140,0.14)] ring-1 ring-bleu/10"
      aria-live="polite"
      aria-label="Aperçu de ton ticket YUNA"
    >
      <header className="relative overflow-hidden bg-gradient-to-br from-nuit-profonde via-bleu-fonce to-bleu px-4 pb-4 pt-4 text-papier">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-feu/25 blur-3xl"
        />
        <div className="relative z-10 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-papier/10 ring-2 ring-feu/45">
              <Image
                src="/brand/yuna-mark.png"
                alt=""
                width={32}
                height={32}
                className="h-7 w-7 object-contain"
                unoptimized
              />
            </span>
            <div>
              <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.24em] text-feu-glow">
                Aperçu ticket
              </p>
              <p className="mt-0.5 font-display text-[1.45rem] font-extrabold uppercase leading-[0.9]">
                YUNA{" "}
                <span className="text-feu-core">{FESTIVAL.edition}</span>
              </p>
            </div>
          </div>
          <div className="shrink-0 rounded-lg border border-papier/20 bg-papier/10 px-2 py-1.5 text-center">
            <p className="font-mono text-[0.65rem] font-bold tabular-nums leading-none">
              05–06
            </p>
            <p className="mt-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.12em] text-feu-glow">
              Sept
            </p>
          </div>
        </div>
        <p className="relative z-10 mt-3 font-display text-sm font-extrabold uppercase text-papier">
          {FESTIVAL.theme}
        </p>
        <p className="relative z-10 mt-1 text-xs text-papier/70">
          Midombo · Ouverture {FESTIVAL.siteOpens}
        </p>
      </header>

      <div aria-hidden className="flag-stripe flex h-1 w-full">
        <span className="flex-1 bg-vert" />
        <span className="flex-1 bg-jaune" />
        <span className="flex-1 bg-rouge" />
      </div>

      <div className="relative h-4 bg-papier" aria-hidden>
        <div className="absolute inset-x-3 top-1/2 border-t border-dashed border-bleu/25" />
        <span className="absolute left-0 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nuage" />
        <span className="absolute right-0 top-1/2 size-4 translate-x-1/2 -translate-y-1/2 rounded-full bg-nuage" />
      </div>

      <div className="px-4 pb-1">
        <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-charbon/65">
          Titulaire
        </p>
        <p className="mt-1 font-display text-[1.35rem] font-extrabold uppercase leading-tight text-bleu transition-colors duration-200">
          {displayName}
        </p>
        <p className="mt-2 inline-flex rounded-full bg-feu/10 px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-feu">
          {typeLabel}
        </p>
      </div>

      <div className="mx-4 mt-3 mb-2 rounded-xl border border-bleu/12 bg-nuage/80 p-3">
        <div
          className="mx-auto flex size-[148px] items-center justify-center rounded-lg bg-papier p-2 ring-1 ring-bleu/8"
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
        <p className="mt-2 text-center font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-charbon/70">
          QR généré après validation
        </p>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5">
        <p className="font-mono text-xs font-bold tracking-wider text-encre">
          YUNA-····
        </p>
        <p className="font-mono text-xs font-bold uppercase text-vert">
          {FESTIVAL.freeEntry}
        </p>
      </div>

      <footer className="flex items-center justify-between bg-gradient-to-r from-bleu to-bleu-fonce px-4 py-3 text-sm text-papier">
        <span className="font-bold">Ticket · QR</span>
        <span className="font-mono text-xs tracking-wider text-papier/80">
          Ésaïe 60:1
        </span>
      </footer>
    </aside>
  );
}
