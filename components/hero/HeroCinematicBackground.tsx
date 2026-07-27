"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const HERO_IMAGES = [
  { src: "/media/crowd.jpg", position: "center center" },
  { src: "/media/concert.jpg", position: "center 25%" },
] as const;

const CYCLE_MS = 9000;

/**
 * Fond hero — 2 images max, crossfade opacity, pas SoftImage ni Ken Burns (perf).
 */
export function HeroCinematicBackground() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [canCycle, setCanCycle] = useState(false);

  useEffect(() => {
    /* Pas de cycle sur mobile / reduced-motion */
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

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((img, i) => {
        const active = canCycle ? i === index : i === 0;
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
              sizes="100vw"
              quality={68}
              className="object-cover object-center"
              style={{ objectPosition: img.position }}
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-br from-encre/92 via-bleu-fonce/78 to-encre/88" />
      <div className="absolute inset-0 bg-gradient-to-t from-encre via-transparent to-bleu/20" />
      <div className="hero-cinematic-glow absolute inset-x-0 bottom-0 h-[42%]" />
      <div className="media-vignette absolute inset-0" />
      {!reduce ? <div className="media-grain absolute inset-0 opacity-[0.05]" /> : null}
    </div>
  );
}
