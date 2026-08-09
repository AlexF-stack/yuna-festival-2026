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
 * Braises — mobile léger + desktop, pause hors viewport / onglet.
 */
export function HeroFireCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (reduce) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
    const mq = window.matchMedia("(min-width: 900px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let running = true;
    let inView = true;
    const embers: Ember[] = [];
    const maxEmbers = isDesktop ? 16 : 8;
    const spawnChance = isDesktop ? 0.28 : 0.14;

    const spawn = () => {
      if (embers.length >= maxEmbers) return;
      embers.push({
        x: Math.random() * width,
        y: height + Math.random() * 40,
        r: 0.6 + Math.random() * (isDesktop ? 1.6 : 1.2),
        vy: 0.3 + Math.random() * 0.85,
        vx: (Math.random() - 0.5) * 0.28,
        life: 0,
        maxLife: 70 + Math.random() * 80,
        hue: 18 + Math.random() * 28,
      });
    };

    const resize = () => {
      const section = canvas.parentElement;
      width = section?.clientWidth || window.innerWidth;
      height = section?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, isDesktop ? 1.25 : 1.1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      if (!running || !inView) return;
      ctx.clearRect(0, 0, width, height);
      if (Math.random() < spawnChance) spawn();

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life += 1;
        e.x += e.vx;
        e.y -= e.vy;
        e.vx += (Math.random() - 0.5) * 0.02;

        const t = e.life / e.maxLife;
        const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        if (alpha <= 0 || e.y < -20) {
          embers.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = `hsla(${e.hue}, 95%, ${58 + (1 - t) * 18}%, ${alpha * 0.65})`;
        ctx.arc(e.x, e.y, e.r * (1 - t * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running || !inView || document.hidden) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      ctx.clearRect(0, 0, width, height);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(canvas.parentElement || canvas);

    resize();
    start();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, isDesktop]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-[3] mix-blend-screen ${
        isDesktop ? "opacity-65" : "opacity-45"
      }`}
      aria-hidden
    />
  );
}
