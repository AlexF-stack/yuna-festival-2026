import type { ReactNode } from "react";

/** Lettres + points-voyelles hébreux (niqqud). */
const HEBREW_CHUNK =
  /([\u0590-\u05FF\uFB1D-\uFB4F]+(?:\s+[\u0590-\u05FF\uFB1D-\uFB4F]+)*)/g;

type HebrewTextProps = {
  children: string;
  className?: string;
};

/**
 * Affiche l’hébreu avec une police dédiée — évite le rectangle jaune
 * (glyphes absents de Space Grotesk / Baloo + correcteur FR).
 */
export function HebrewText({ children, className = "" }: HebrewTextProps) {
  const parts = children.split(HEBREW_CHUNK);
  const nodes: ReactNode[] = [];

  parts.forEach((part, i) => {
    if (!part) return;
    if (/[\u0590-\u05FF]/.test(part)) {
      nodes.push(
        <span
          key={`he-${i}`}
          lang="he"
          dir="rtl"
          translate="no"
          className="hebrew-inline"
        >
          {part}
        </span>,
      );
      return;
    }
    nodes.push(part);
  });

  if (className) {
    return <span className={className}>{nodes}</span>;
  }
  return <>{nodes}</>;
}
