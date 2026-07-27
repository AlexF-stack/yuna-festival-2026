"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef } from "react";

import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM } from "@/lib/motion";

type FlameQuoteProps = {
  text: string;
};

/** Silhouettes morphées — même topologie, langues qui dansent. */
const OUTER = [
  "M180 22 C215 78 275 118 286 195 C296 265 258 315 242 355 C295 385 280 455 180 518 C80 455 65 385 118 355 C102 315 64 265 74 195 C85 118 145 78 180 22 Z",
  "M180 12 C230 70 290 105 298 185 C308 260 268 305 250 350 C305 375 288 450 180 518 C72 450 55 375 110 350 C92 305 52 260 62 185 C70 105 130 70 180 12 Z",
  "M180 28 C200 85 255 125 278 200 C290 270 250 320 235 360 C285 390 270 460 180 518 C90 460 75 390 125 360 C110 320 70 270 82 200 C105 125 160 85 180 28 Z",
] as const;

const MID = [
  "M180 95 C205 135 235 170 232 230 C230 275 205 310 180 345 C155 310 130 275 128 230 C125 170 155 135 180 95 Z",
  "M180 78 C215 125 248 160 242 225 C238 275 210 315 180 355 C150 315 122 275 118 225 C112 160 145 125 180 78 Z",
  "M180 105 C198 145 225 175 228 235 C226 280 200 305 180 335 C160 305 134 280 132 235 C135 175 162 145 180 105 Z",
] as const;

/**
 * Citation Mission — feu qui brûle (morph SVG + braises canvas).
 */
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
      if (embers.length > 36) return;
      embers.push({
        x: w * (0.28 + Math.random() * 0.44),
        y: h * (0.55 + Math.random() * 0.28),
        r: 1 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -(0.8 + Math.random() * 1.6),
        life: 0,
        max: 40 + Math.random() * 55,
        hue: 18 + Math.random() * 32,
      });
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      if (Math.random() < 0.55) spawn();

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life += 1;
        e.x += e.vx + Math.sin(e.life * 0.12) * 0.35;
        e.y += e.vy;
        e.vy *= 0.995;
        const t = e.life / e.max;
        if (t >= 1) {
          embers.splice(i, 1);
          continue;
        }
        const alpha = (1 - t) * 0.9;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${e.hue}, 100%, ${55 + t * 25}%, ${alpha})`;
        ctx.arc(e.x, e.y, e.r * (1 - t * 0.4), 0, Math.PI * 2);
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
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className="relative mx-auto w-full max-w-[400px] min-[480px]:max-w-[460px]"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-[-20%] -z-10 bg-[radial-gradient(ellipse_at_50%_70%,color-mix(in_srgb,var(--feu)_60%,transparent),color-mix(in_srgb,var(--jaune)_22%,transparent)_40%,transparent_72%)] blur-2xl ${
          reduce ? "" : "flame-quote-glow"
        }`}
      />

      <div
        className={`relative w-full ${reduce ? "" : "flame-quote-burn"}`}
        style={{ transformOrigin: "50% 100%" }}
      >
        <svg
          viewBox="0 0 360 540"
          className="block h-auto w-full drop-shadow-[0_18px_44px_color-mix(in_srgb,var(--feu)_50%,transparent)]"
          role="img"
          aria-label={`Citation : ${text}`}
        >
          <defs>
            <linearGradient id={gid("outer")} x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#b83d00" />
              <stop offset="25%" stopColor="#ff6600" />
              <stop offset="58%" stopColor="#ff8a1a" />
              <stop offset="100%" stopColor="#fcd116" />
            </linearGradient>
            <linearGradient id={gid("mid")} x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#ff6600" />
              <stop offset="45%" stopColor="#ffaa33" />
              <stop offset="100%" stopColor="#fff1a8" />
            </linearGradient>
            <radialGradient id={gid("core")} cx="50%" cy="75%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#fcd116" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#ff6600" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
            </radialGradient>
            <filter id={gid("blur")} x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={gid("soft")} x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          {/* Aura */}
          <path fill="#ff6600" opacity="0.45" filter={`url(#${gid("soft")})`} d={OUTER[0]}>
            {!reduce ? (
              <animate
                attributeName="d"
                dur="1.1s"
                repeatCount="indefinite"
                values={`${OUTER[0]};${OUTER[1]};${OUTER[2]};${OUTER[0]}`}
                calcMode="spline"
                keyTimes="0;0.33;0.66;1"
                keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"
              />
            ) : null}
          </path>

          {/* Corps principal qui brûle */}
          <g filter={`url(#${gid("blur")})`}>
            <path fill={`url(#${gid("outer")})`} d={OUTER[0]}>
              {!reduce ? (
                <animate
                  attributeName="d"
                  dur="0.85s"
                  repeatCount="indefinite"
                  values={`${OUTER[0]};${OUTER[1]};${OUTER[2]};${OUTER[0]}`}
                  calcMode="spline"
                  keyTimes="0;0.35;0.7;1"
                  keySplines="0.37 0 0.63 1;0.37 0 0.63 1;0.37 0 0.63 1"
                />
              ) : null}
            </path>
          </g>

          {/* Langues secondaires */}
          {!reduce ? (
            <>
              <path
                className="flame-tongue"
                fill="#ff8a1a"
                opacity="0.85"
                d="M100 220 C70 170 95 115 130 95 C112 145 115 180 128 210 C140 240 122 260 100 220 Z"
                style={{ transformOrigin: "115px 200px" }}
              />
              <path
                className="flame-tongue flame-tongue--delay"
                fill="#fcd116"
                opacity="0.8"
                d="M260 210 C290 160 265 105 230 85 C248 140 245 175 232 205 C220 235 242 255 260 210 Z"
                style={{ transformOrigin: "245px 190px" }}
              />
              <path
                className="flame-tongue flame-tongue--fast"
                fill="#ffe566"
                opacity="0.75"
                d="M180 40 C205 85 225 120 210 170 C230 145 248 105 238 70 C228 40 195 30 180 40 Z"
                style={{ transformOrigin: "210px 120px" }}
              />
            </>
          ) : null}

          {/* Cœur chaud */}
          <path fill={`url(#${gid("mid")})`} opacity="0.92" d={MID[0]}>
            {!reduce ? (
              <animate
                attributeName="d"
                dur="0.7s"
                repeatCount="indefinite"
                values={`${MID[0]};${MID[1]};${MID[2]};${MID[0]}`}
              />
            ) : null}
          </path>
          <ellipse
            cx="180"
            cy="305"
            rx="70"
            ry="105"
            fill={`url(#${gid("core")})`}
            className={reduce ? undefined : "flame-core-pulse"}
          />

          <foreignObject x="52" y="155" width="256" height="290">
            <div className="flex h-full flex-col justify-center px-3 text-center text-papier">
              <p className="font-display text-[clamp(0.95rem,3.2vw,1.22rem)] font-extrabold uppercase leading-[1.28] [text-shadow:0_2px_14px_rgba(90,20,0,0.75)]">
                {text}
              </p>
              <footer className="mt-5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-papier/90 [text-shadow:0_1px_8px_rgba(90,20,0,0.55)]">
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
