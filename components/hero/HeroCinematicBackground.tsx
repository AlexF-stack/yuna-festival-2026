"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type HeroSlide = {
  src: string;
  position: string;
};

const HERO_IMAGES: HeroSlide[] = [
  { src: "/media/crowd.webp", position: "center center" },
  { src: "/media/concert.webp", position: "center 25%" },
  { src: "/media/hero-plate-a.webp", position: "center 40%" },
  { src: "/media/festival.webp", position: "center 35%" },
  { src: "/media/hero-plate-b.webp", position: "center 45%" },
  { src: "/media/worship.webp", position: "center 30%" },
];

const CYCLE_MS = 7000;

/**
 * Fond hero cinématique — slideshow desktop + léger Ken Burns.
 * Seules la slide active et ses voisines (sortante / suivante) sont montées :
 * le mobile ne télécharge qu'une image, le desktop trois au maximum.
 */
export function HeroCinematicBackground() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [canCycle, setCanCycle] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const sync = () => setCanCycle(mq.matches && !reduce);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);

  useEffect(() => {
    if (!canCycle) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO_IMAGES.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [canCycle]);

  const total = HERO_IMAGES.length;
  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((img, i) => {
        const active = canCycle ? i === index : i === 0;
        // Hors cycle (mobile / reduced motion) : uniquement la première image.
        const mounted = canCycle ? i === index || i === prev || i === next : i === 0;
        if (!mounted) return null;
        return (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img.src}
              alt=""
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              sizes="100vw"
              quality={70}
              className={`object-cover object-center ${
                canCycle && active ? "hero-kenburns" : ""
              }`}
              style={{ objectPosition: img.position }}
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-br from-encre/90 via-bleu-fonce/72 to-encre/86" />
      <div className="absolute inset-0 bg-gradient-to-t from-encre via-transparent to-bleu/25" />
      <div className="hero-cinematic-glow absolute inset-x-0 bottom-0 h-[42%]" />
      <div className="media-vignette absolute inset-0" />
      {!reduce ? (
        <div className="media-grain absolute inset-0 opacity-[0.05]" />
      ) : null}
    </div>
  );
}
