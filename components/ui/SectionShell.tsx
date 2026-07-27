import type { ReactNode } from "react";

import { SectionPhotoBackground } from "@/components/ui/SectionPhotoBackground";
import {
  SECTION_BACKGROUNDS,
  type SectionBgKey,
  type SectionTone,
} from "@/lib/section-backgrounds";

export type { SectionTone };

type SectionShellProps = {
  id?: string;
  /** Fond charte logo — couleurs exactes uniquement. */
  tone?: SectionTone;
  background?: SectionBgKey;
  labelledBy?: string;
  className?: string;
  overlay?: ReactNode;
  children: ReactNode;
};

const SOLID_LIGHT: SectionTone[] = ["bleu", "feu", "charbon"];

/**
 * Fonds section = palette logo exacte (#0077bb / #ff6600 / #fff / #444).
 * Le fichier logo n’est jamais modifié ici.
 */
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
  const isSolidLight = !isPhoto && SOLID_LIGHT.includes(tone);

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      className={`section-pad relative z-10 ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {background ? (
          <SectionPhotoBackground config={SECTION_BACKGROUNDS[background]} />
        ) : null}

        {!background && tone === "papier" ? (
          <div className="absolute inset-0 bg-papier" />
        ) : null}
        {!background && tone === "bleu-soft" ? (
          <div className="absolute inset-0 bg-logo-bleu-soft" />
        ) : null}
        {!background && tone === "feu-soft" ? (
          <div className="absolute inset-0 bg-logo-feu-soft" />
        ) : null}
        {!background && tone === "bleu" ? (
          <div className="absolute inset-0 bg-bleu" />
        ) : null}
        {!background && tone === "feu" ? (
          <div className="absolute inset-0 bg-feu" />
        ) : null}
        {!background && tone === "charbon" ? (
          <div className="absolute inset-0 bg-charbon" />
        ) : null}
      </div>

      {overlay}

      <div
        className={`section-container relative z-10 ${
          isSolidLight ? "text-papier" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}
