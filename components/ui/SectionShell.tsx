import Image from "next/image";
import type { ReactNode } from "react";

export type SectionTone =
  | "papier"
  | "nuage"
  | "ciel"
  | "photo-concert"
  | "photo-crowd"
  | "photo-dawn"
  | "photo-stage"
  | "mesh-feu"
  | "mesh-bleu";

type SectionShellProps = {
  id?: string;
  tone?: SectionTone;
  labelledBy?: string;
  className?: string;
  /** Calque décoratif (3D, etc.) — positionné sous le contenu. */
  overlay?: ReactNode;
  children: ReactNode;
};

const PHOTO: Partial<Record<SectionTone, { src: string; alt: string }>> = {
  "photo-concert": { src: "/media/concert.jpg", alt: "" },
  "photo-crowd": { src: "/media/crowd.jpg", alt: "" },
  "photo-dawn": { src: "/media/dawn.jpg", alt: "" },
  "photo-stage": { src: "/media/stage.jpg", alt: "" },
};

/**
 * Coquille de section — fonds variés (dégradés, motifs, photos) pour un rythme
 * type festival culturel.
 */
export function SectionShell({
  id,
  tone = "papier",
  labelledBy,
  className = "",
  overlay,
  children,
}: SectionShellProps) {
  const photo = PHOTO[tone];
  const isPhoto = Boolean(photo);

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative z-10 overflow-hidden px-5 py-24 min-[760px]:px-6 min-[760px]:py-28 ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {tone === "papier" ? <div className="absolute inset-0 bg-papier" /> : null}
        {tone === "nuage" ? <div className="absolute inset-0 bg-nuage" /> : null}
        {tone === "ciel" ? (
          <div className="absolute inset-0 bg-gradient-to-br from-ciel via-papier to-[#fff3e8]" />
        ) : null}
        {tone === "mesh-bleu" ? (
          <>
            <div className="absolute inset-0 bg-nuage" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,color-mix(in_srgb,var(--bleu)_18%,transparent),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_100%,color-mix(in_srgb,var(--feu)_10%,transparent),transparent_50%)]" />
            <div className="section-dots absolute inset-0 opacity-[0.35]" />
          </>
        ) : null}
        {tone === "mesh-feu" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff8f2] via-papier to-ciel" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_90%_10%,color-mix(in_srgb,var(--feu)_16%,transparent),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_90%,color-mix(in_srgb,var(--bleu)_12%,transparent),transparent_50%)]" />
          </>
        ) : null}
        {photo ? (
          <>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-papier/92 via-papier/88 to-papier/94" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,color-mix(in_srgb,var(--papier)_55%,transparent)_100%)]" />
          </>
        ) : null}
        {!isPhoto && tone !== "mesh-bleu" ? (
          <div className="section-grain absolute inset-0 opacity-[0.04]" />
        ) : null}
      </div>

      {overlay}

      <div className="relative z-10 mx-auto max-w-[1240px]">{children}</div>
    </section>
  );
}
