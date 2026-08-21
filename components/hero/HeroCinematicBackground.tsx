"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

/** Mobile : cycle court (3 slides) pour garder le punch sans saturer le réseau. */
const MOBILE_SLIDES = 3;
const CYCLE_DESKTOP_MS = 8000;
const CYCLE_MOBILE_MS = 6500;

/**
 * Fond hero — slideshow + Ken Burns.
 * Mobile : cycle léger (3 images) + overlays moins opaques pour laisser la photo parler.
 */
export function HeroCinematicBackground() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const canCycle = !reduce;
  const pool = isDesktop ? HERO_IMAGES : HERO_IMAGES.slice(0, MOBILE_SLIDES);
  const total = pool.length;

  useEffect(() => {
    if (!canCycle || !inView) return;
    const ms = isDesktop ? CYCLE_DESKTOP_MS : CYCLE_MOBILE_MS;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % total),
      ms,
    );
    return () => window.clearInterval(id);
  }, [canCycle, inView, isDesktop, total]);

  // Reset index if pool shrinks (desktop → mobile).
  useEffect(() => {
    setIndex((i) => i % total);
  }, [total]);

  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;

  return (
    <div ref={rootRef} aria-hidden className="absolute inset-0 overflow-hidden">
      {pool.map((img, i) => {
        const active = canCycle ? i === index : i === 0;
        const mounted = canCycle
          ? i === index || i === prev || i === next
          : i === 0;
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
              quality={i === 0 ? 80 : 70}
              className={`object-cover object-center ${
                canCycle && active && inView && isDesktop ? "hero-kenburns" : ""
              }`}
              style={{ objectPosition: img.position }}
            />
          </div>
        );
      })}

      {/* Mobile : overlays plus légers pour laisser la foule / lumières visibles */}
      <div className="absolute inset-0 bg-gradient-to-br from-nuit-profonde/62 via-bleu-fonce/40 to-nuit-profonde/70 min-[900px]:from-nuit-profonde/92 min-[900px]:via-bleu-fonce/78 min-[900px]:to-nuit-profonde/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-nuit-profonde/95 via-nuit-profonde/15 to-transparent min-[900px]:from-nuit-profonde min-[900px]:via-transparent min-[900px]:to-bleu-fonce/35" />
      <div className="hero-cinematic-glow absolute inset-x-0 bottom-0 h-[52%] min-[900px]:h-[42%]" />
      <div className="media-vignette absolute inset-0 opacity-55 min-[900px]:opacity-100" />
    </div>
  );
}
