"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef } from "react";

import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type FlameQuoteProps = {
  text: string;
};

/**
 * Feu large (format paysage) — plusieurs langues, morph + braises.
 * viewBox 560×420 pour plus d’espace texte.
 */
const OUTER = [
  "M280 18 C330 55 370 45 400 85 C450 60 500 95 515 155 C540 210 520 270 475 310 C530 340 510 390 280 408 C50 390 30 340 85 310 C40 270 20 210 45 155 C60 95 110 60 160 85 C190 45 230 55 280 18 Z",
  "M280 8 C340 48 385 35 415 80 C465 50 515 90 528 150 C548 205 525 265 485 305 C535 330 515 385 280 408 C45 385 25 330 75 305 C35 265 12 205 32 150 C45 90 95 50 145 80 C175 35 220 48 280 8 Z",
  "M280 28 C320 65 355 55 385 95 C430 75 480 110 500 165 C520 220 505 275 460 315 C510 345 500 395 280 408 C60 395 50 345 100 315 C55 275 40 220 60 165 C80 110 130 75 175 95 C205 55 240 65 280 28 Z",
] as const;

const MID = [
  "M280 95 C330 120 375 130 390 185 C405 235 370 275 280 305 C190 275 155 235 170 185 C185 130 230 120 280 95 Z",
  "M280 80 C340 110 390 115 410 175 C425 230 375 280 280 315 C185 280 135 230 150 175 C170 115 220 110 280 80 Z",
  "M280 105 C325 130 365 140 380 190 C392 240 360 270 280 295 C200 270 168 240 180 190 C195 140 235 130 280 105 Z",
] as const;

export function FlameQuote({ text }: FlameQuoteProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Ember = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
      hue: number;
    };

    let raf = 0;
    let w = 0;
    let h = 0;
    let running = true;
    const embers: Ember[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      if (embers.length > 48) return;
      embers.push({
        x: w * (0.18 + Math.random() * 0.64),
        y: h * (0.48 + Math.random() * 0.32),
        r: 1.2 + Math.random() * 2.8,
        vx: (Math.random() - 0.5) * 0.85,
        vy: -(1 + Math.random() * 1.8),
        life: 0,
        max: 38 + Math.random() * 50,
        hue: 16 + Math.random() * 34,
      });
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      if (Math.random() < 0.65) spawn();

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life += 1;
        e.x += e.vx + Math.sin(e.life * 0.14) * 0.4;
        e.y += e.vy;
        e.vy *= 0.994;
        const t = e.life / e.max;
        if (t >= 1) {
          embers.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${e.hue}, 100%, ${55 + t * 28}%, ${(1 - t) * 0.9})`;
        ctx.arc(e.x, e.y, e.r * (1 - t * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  const gid = (name: string) => `${name}-${uid}`;

  return (
    <motion.blockquote
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className="relative mx-auto w-full max-w-[540px] min-[900px]:max-w-none"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-[-16%] -z-10 bg-[radial-gradient(ellipse_at_50%_70%,color-mix(in_srgb,var(--feu)_58%,transparent),color-mix(in_srgb,var(--jaune)_20%,transparent)_42%,transparent_72%)] blur-2xl ${
          reduce ? "" : "flame-quote-glow"
        }`}
      />

      <div
        className={`relative w-full ${reduce ? "" : "flame-quote-burn"}`}
        style={{ transformOrigin: "50% 100%" }}
      >
        <svg
          viewBox="0 0 560 420"
          className="block h-auto w-full drop-shadow-[0_20px_48px_color-mix(in_srgb,var(--feu)_48%,transparent)]"
          role="img"
          aria-label={`Citation : ${text}`}
        >
          <defs>
            <linearGradient id={gid("outer")} x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#b83d00" />
              <stop offset="22%" stopColor="#ff6600" />
              <stop offset="55%" stopColor="#ff8a1a" />
              <stop offset="100%" stopColor="#fcd116" />
            </linearGradient>
            <linearGradient id={gid("mid")} x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#ff6600" />
              <stop offset="45%" stopColor="#ffaa33" />
              <stop offset="100%" stopColor="#fff1a8" />
            </linearGradient>
            <radialGradient id={gid("core")} cx="50%" cy="72%" r="52%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
              <stop offset="28%" stopColor="#fcd116" stopOpacity="0.88" />
              <stop offset="68%" stopColor="#ff6600" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
            </radialGradient>
            <filter id={gid("blur")} x="-20%" y="-25%" width="140%" height="150%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={gid("soft")} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          <path fill="#ff6600" opacity="0.42" filter={`url(#${gid("soft")})`} d={OUTER[0]}>
            {!reduce ? (
              <animate
                attributeName="d"
                dur="1.05s"
                repeatCount="indefinite"
                values={`${OUTER[0]};${OUTER[1]};${OUTER[2]};${OUTER[0]}`}
              />
            ) : null}
          </path>

          <g filter={`url(#${gid("blur")})`}>
            <path fill={`url(#${gid("outer")})`} d={OUTER[0]}>
              {!reduce ? (
                <animate
                  attributeName="d"
                  dur="0.8s"
                  repeatCount="indefinite"
                  values={`${OUTER[0]};${OUTER[1]};${OUTER[2]};${OUTER[0]}`}
                />
              ) : null}
            </path>
          </g>

          {!reduce ? (
            <>
              <path
                className="flame-tongue"
                fill="#ff8a1a"
                opacity="0.85"
                d="M120 200 C85 150 110 95 160 80 C140 130 145 165 158 195 C170 225 145 245 120 200 Z"
                style={{ transformOrigin: "140px 180px" }}
              />
              <path
                className="flame-tongue flame-tongue--delay"
                fill="#fcd116"
                opacity="0.8"
                d="M440 190 C475 140 450 85 400 70 C420 125 415 160 402 190 C390 220 415 240 440 190 Z"
                style={{ transformOrigin: "420px 170px" }}
              />
              <path
                className="flame-tongue flame-tongue--fast"
                fill="#ffe566"
                opacity="0.78"
                d="M280 35 C310 75 335 100 320 150 C345 120 365 85 350 50 C335 25 295 22 280 35 Z"
                style={{ transformOrigin: "320px 100px" }}
              />
            </>
          ) : null}

          <path fill={`url(#${gid("mid")})`} opacity="0.9" d={MID[0]}>
            {!reduce ? (
              <animate
                attributeName="d"
                dur="0.65s"
                repeatCount="indefinite"
                values={`${MID[0]};${MID[1]};${MID[2]};${MID[0]}`}
              />
            ) : null}
          </path>
          <ellipse
            cx="280"
            cy="250"
            rx="130"
            ry="85"
            fill={`url(#${gid("core")})`}
            className={reduce ? undefined : "flame-core-pulse"}
          />

          <foreignObject x="70" y="115" width="420" height="220">
            <div className="flex h-full flex-col justify-center px-4 text-center text-papier">
              <p className="font-display text-[clamp(1.05rem,2.6vw,1.4rem)] font-extrabold uppercase leading-[1.28] [text-shadow:0_2px_16px_rgba(90,20,0,0.8)]">
                {text}
              </p>
              <footer className="mt-5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-papier/90 [text-shadow:0_1px_10px_rgba(90,20,0,0.6)]">
                YUNA · {FESTIVAL.theme}
              </footer>
            </div>
          </foreignObject>
        </svg>

        {!reduce ? (
          <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        ) : null}
      </div>
    </motion.blockquote>
  );
}
