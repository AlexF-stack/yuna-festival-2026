import type { ReactNode } from "react";

import { SectionPhotoBackground } from "@/components/ui/SectionPhotoBackground";
import {
  SECTION_BACKGROUNDS,
  type SectionBgKey,
} from "@/lib/section-backgrounds";

export type SectionTone = "papier" | "nuage" | "ciel" | "don" | "mesh-feu" | "accent";

type SectionShellProps = {
  id?: string;
  tone?: SectionTone;
  background?: SectionBgKey;
  labelledBy?: string;
  className?: string;
  overlay?: ReactNode;
  children: ReactNode;
};

export function SectionShell({
  id,
  tone = "papier",
  background,
  labelledBy,
  className = "",
  overlay,
  children,
}: SectionShellProps) {
  const isPhoto = Boolean(background);
  const skipGrain = isPhoto || tone === "don" || tone === "accent";

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section-pad relative z-10 overflow-x-hidden ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {background ? (
          <SectionPhotoBackground config={SECTION_BACKGROUNDS[background]} />
        ) : null}

        {!background && tone === "papier" ? (
          <div className="absolute inset-0 bg-papier" />
        ) : null}
        {!background && tone === "nuage" ? (
          <div className="absolute inset-0 bg-nuage" />
        ) : null}
        {!background && tone === "ciel" ? (
          <div className="absolute inset-0 bg-gradient-to-br from-ciel via-papier to-peach-wash" />
        ) : null}
        {!background && tone === "don" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-bleu via-bleu-fonce to-don-deep" />
            <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-feu/30 blur-3xl" />
          </>
        ) : null}
        {!background && tone === "mesh-feu" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-peach-soft via-papier to-ciel" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_90%_10%,color-mix(in_srgb,var(--feu)_16%,transparent),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_90%,color-mix(in_srgb,var(--bleu)_12%,transparent),transparent_50%)]" />
          </>
        ) : null}
        {!background && tone === "accent" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-bleu-fonce via-bleu to-don-deep" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,color-mix(in_srgb,var(--feu)_22%,transparent),transparent_55%)]" />
          </>
        ) : null}

        {!skipGrain ? (
          <div className="section-grain absolute inset-0 opacity-[0.04]" />
        ) : null}
      </div>

      {overlay}

      <div className="section-container relative z-10">{children}</div>
    </section>
  );
}
