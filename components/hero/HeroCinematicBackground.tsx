"use client";

import { useEffect, useState } from "react";

import { SoftImage } from "@/components/ui/SoftImage";
import { useReducedMotion } from "framer-motion";

const HERO_IMAGES = [
  { src: "/media/crowd.jpg", position: "center center" },
  { src: "/media/concert.jpg", position: "center 25%" },
  { src: "/media/lights.jpg", position: "center 40%" },
] as const;

const CYCLE_MS = 7000;

/**
 * Fond plein écran — cycle photo + overlays sombres + grain (Herna / Canaan).
 */
export function HeroCinematicBackground() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || HERO_IMAGES.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO_IMAGES.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <SoftImage
            src={img.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            wrapperClassName="absolute inset-0"
            objectPosition={img.position}
            className={`${reduce ? "" : "media-kenburns"}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-encre/92 via-bleu-fonce/78 to-encre/88" />
      <div className="absolute inset-0 bg-gradient-to-t from-encre via-transparent to-bleu/20" />
      <div className="hero-cinematic-glow absolute inset-x-0 bottom-0 h-[42%]" />

      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="media-vignette absolute inset-0" />
      <div className="media-grain absolute inset-0" />
    </div>
  );
}
