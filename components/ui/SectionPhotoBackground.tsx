"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import {
  OVERLAY_CLASS,
  type SectionBgConfig,
} from "@/lib/section-backgrounds";

type SectionPhotoBackgroundProps = {
  config: SectionBgConfig;
};

/**
 * Fond photo léger — Image native, pas SoftImage / pas parallax (perf scroll).
 */
export function SectionPhotoBackground({ config }: SectionPhotoBackgroundProps) {
  const reduce = useReducedMotion();
  const photoOpacity = config.photoOpacity ?? 1;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0" style={{ opacity: photoOpacity }}>
        <Image
          src={config.src}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          loading="lazy"
          className="object-cover"
          style={{ objectPosition: config.objectPosition }}
        />
      </div>
      <div className={`absolute inset-0 ${OVERLAY_CLASS[config.overlay]}`} />
      {!reduce ? (
        <div className="media-grain absolute inset-0 opacity-[0.035]" />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,color-mix(in_srgb,var(--papier)_42%,transparent)_100%)]" />
    </div>
  );
}
