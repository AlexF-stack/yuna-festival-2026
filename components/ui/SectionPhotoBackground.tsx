"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import {
  OVERLAY_CLASS,
  type SectionBgConfig,
} from "@/lib/section-backgrounds";

type SectionPhotoBackgroundProps = {
  config: SectionBgConfig;
  parallax?: boolean;
};

/**
 * Photo de fond avec voile charte + léger parallax au scroll.
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
    reduce || !parallax ? ["0%", "0%"] : ["-6%", "6%"],
  );

  const photoOpacity = config.photoOpacity ?? 1;

  return (
    <div ref={hostRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={reduce || !parallax ? undefined : { y: imageY }}
      >
        <Image
          src={config.src}
          alt={config.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: config.objectPosition, opacity: photoOpacity }}
          priority={false}
        />
      </motion.div>
      <div className={`absolute inset-0 ${OVERLAY_CLASS[config.overlay]}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,color-mix(in_srgb,var(--papier)_50%,transparent)_100%)]" />
    </div>
  );
}
