"use client";

import { FESTIVAL } from "@/lib/festival";
import {
  displayPassName,
  passStubHint,
  passTypeLabel,
  passWhenLine,
} from "@/lib/pass-copy";
import type { RegistrationType } from "@/lib/registration-types";

type PassPreviewProps = {
  name: string;
  registrationType: RegistrationType;
};

function QrPlaceholder() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full text-encre" role="img">
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
        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" fill="currentColor" />
      ))}
    </svg>
  );
}

/** Aperçu live du billet à talon — le vrai QR n’est généré qu’après inscription. */
export function PassPreview({ name, registrationType }: PassPreviewProps) {
  const displayName =
    name.trim().length >= 2 ? displayPassName(name) : "Ton nom";
  const typeLabel = passTypeLabel(registrationType);

  return (
    <aside
      className="pass-ticket w-full max-w-[560px] rounded-[1.25rem] bg-nuit-profonde p-3.5 shadow-[0_20px_48px_rgba(0,20,40,0.28)] sm:p-4"
      aria-live="polite"
      aria-label="Aperçu de ton ticket YUNA"
    >
      <div className="relative flex min-h-[160px] overflow-hidden rounded-[0.9rem] sm:min-h-[184px]">
        <div className="relative flex min-w-0 flex-[1.65] flex-col justify-between bg-gradient-to-br from-bleu-fonce via-bleu to-[#005a94] px-3.5 py-3.5 text-papier sm:px-4 sm:py-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 46%, rgba(255,255,255,0.55) 49%, transparent 52%), linear-gradient(45deg, transparent 46%, rgba(255,255,255,0.35) 49%, transparent 52%)",
              backgroundSize: "16px 18px",
            }}
          />

          <div className="relative z-10 flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/yuna-mark.webp"
              alt=""
              width={32}
              height={32}
              className="h-7 w-7 object-contain"
            />
            <p className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-jaune">
              Aperçu ticket
            </p>
          </div>

          <div className="relative z-10 mt-4">
            <p className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-jaune">
              {typeLabel}
            </p>
            <p className="mt-1 font-display text-[clamp(1.05rem,4.4vw,1.7rem)] font-extrabold leading-[1.08] text-papier break-words">
              {displayName}
            </p>
          </div>

          <p className="relative z-10 mt-3 font-mono text-[0.55rem] font-bold uppercase tracking-[0.12em] text-jaune sm:text-[0.6rem]">
            {passWhenLine(registrationType)}
          </p>
        </div>

        <div
          aria-hidden
          className="relative z-20 w-0 shrink-0 border-l border-dashed border-nuit-profonde/35"
        >
          <span className="absolute left-1/2 top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nuit-profonde" />
          <span className="absolute bottom-0 left-1/2 size-3.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-nuit-profonde" />
        </div>

        <div className="relative flex w-[38%] min-w-[108px] flex-col items-center justify-between bg-papier px-2 py-2.5 text-center sm:min-w-[128px] sm:px-2.5 sm:py-3">
          <div
            className="mx-auto aspect-square w-full max-w-[100px] rounded-md bg-papier p-1 ring-1 ring-bleu/10 sm:max-w-[112px]"
            aria-hidden
          >
            <QrPlaceholder />
          </div>
          <div className="mt-1.5 w-full">
            <p className="font-display text-[0.62rem] font-extrabold uppercase leading-snug text-bleu break-words sm:text-[0.75rem]">
              {typeLabel}
            </p>
            <p className="mt-0.5 text-[0.58rem] text-charbon/70">
              {passStubHint(registrationType)}
            </p>
          </div>
          <div className="mt-1.5 w-full border-t border-bleu/10 pt-1.5">
            <p className="font-mono text-[0.5rem] font-bold uppercase tracking-[0.12em] text-charbon/50">
              YUNA {FESTIVAL.edition} · ····
            </p>
            <p className="mt-0.5 font-mono text-[0.55rem] font-bold uppercase text-vert">
              {FESTIVAL.freeEntry}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
