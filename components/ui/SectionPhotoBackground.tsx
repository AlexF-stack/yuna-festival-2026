"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { SoftImage } from "@/components/ui/SoftImage";
import {
  OVERLAY_CLASS,
  type SectionBgConfig,
} from "@/lib/section-backgrounds";

type SectionPhotoBackgroundProps = {
  config: SectionBgConfig;
  parallax?: boolean;
};

/**
 * Photo de fond avec blur-up, voile charte et parallax au scroll.
 */
export function SectionPhotoBackground({
  config,
  parallax = true,
}: SectionPhotoBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce || !parallax ? ["0%", "0%"] : ["-5%", "5%"],
  );

  const photoOpacity = config.photoOpacity ?? 1;

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute inset-[-8%]"
        style={{
          opacity: photoOpacity,
          ...(reduce || !parallax ? {} : { y: imageY }),
        }}
      >
        <SoftImage
          src={config.src}
          alt={config.alt}
          fill
          sizes="100vw"
          wrapperClassName="absolute inset-0"
          objectPosition={config.objectPosition}
          className="object-cover"
        />
      </motion.div>
      <div className={`absolute inset-0 ${OVERLAY_CLASS[config.overlay]}`} />
      <div className="media-grain absolute inset-0 opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,color-mix(in_srgb,var(--papier)_45%,transparent)_100%)]" />
    </div>
  );
}
