"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type HeroSlide = {
  src: string;
  position: string;
};

const HERO_IMAGES: HeroSlide[] = [
  { src: "/media/crowd.jpg", position: "center center" },
  { src: "/media/concert.jpg", position: "center 25%" },
  { src: "/media/hero-plate-a.jpg", position: "center 40%" },
  { src: "/media/festival.jpg", position: "center 35%" },
  { src: "/media/hero-plate-b.jpg", position: "center 45%" },
  { src: "/media/worship.jpg", position: "center 30%" },
];

/** Vidéo optionnelle — déposer `public/media/hero.mp4` pour l’activer. */
const HERO_VIDEO = "/media/hero.mp4";

const CYCLE_MS = 7000;

/**
 * Fond hero style HERNA CinematicMedia — multi-images + vidéo optionnelle + léger Ken Burns desktop.
 */
export function HeroCinematicBackground() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [canCycle, setCanCycle] = useState(false);
  const [videoOk, setVideoOk] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

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

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    void fetch(HERO_VIDEO, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) setVideoOk(true);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((img, i) => {
        const active = canCycle ? i === index : i === 0;
        return (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              active && !videoPlaying ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              quality={70}
              className={`object-cover object-center ${
                canCycle && active && !videoPlaying ? "hero-kenburns" : ""
              }`}
              style={{ objectPosition: img.position }}
            />
          </div>
        );
      })}

      {videoOk && !reduce ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoPlaying ? "opacity-100" : "opacity-0"
          }`}
          src={HERO_VIDEO}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          onPlaying={() => setVideoPlaying(true)}
          onError={() => {
            setVideoOk(false);
            setVideoPlaying(false);
          }}
        />
      ) : null}

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
