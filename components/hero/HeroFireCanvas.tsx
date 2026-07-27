"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  life: number;
  maxLife: number;
  hue: number;
};

/**
 * Braises — desktop only, densité réduite, pause hors onglet.
 */
export function HeroFireCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(min-width: 900px)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let running = true;
    const embers: Ember[] = [];
    const maxEmbers = 28;

    const spawn = () => {
      if (embers.length >= maxEmbers) return;
      embers.push({
        x: Math.random() * width,
        y: height + Math.random() * 40,
        r: 0.6 + Math.random() * 1.8,
        vy: 0.3 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: 80 + Math.random() * 90,
        hue: 18 + Math.random() * 28,
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      if (Math.random() < 0.4) spawn();

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life += 1;
        e.x += e.vx;
        e.y -= e.vy;
        e.vx += (Math.random() - 0.5) * 0.03;

        const t = e.life / e.maxLife;
        const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        if (alpha <= 0 || e.y < -20) {
          embers.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = `hsla(${e.hue}, 95%, ${58 + (1 - t) * 18}%, ${alpha * 0.7})`;
        ctx.arc(e.x, e.y, e.r * (1 - t * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3] mix-blend-screen opacity-70"
      aria-hidden
    />
  );
}
