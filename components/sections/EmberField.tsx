"use client";

import { useEffect, useRef } from "react";

const COUNT = 48;

type Ember = {
  x: number; // 0..1 (fraction de largeur)
  y: number; // 0..1 (fraction de hauteur, 0 = haut)
  speed: number; // fraction de hauteur / seconde
  radius: number;
  alpha: number;
  phase: number;
};

function createEmber(random = Math.random): Ember {
  return {
    x: random(),
    y: random(),
    speed: 0.03 + random() * 0.07,
    radius: 1.2 + random() * 2.2,
    alpha: 0.35 + random() * 0.4,
    phase: random() * Math.PI * 2,
  };
}

/**
 * Braises montantes — canvas 2D léger (remplace l'ancienne scène Three.js,
 * seule dépendance qui gardait `three` dans le bundle client).
 */
export function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = mq.matches;
    const syncReduce = () => {
      reduce = mq.matches;
    };
    mq.addEventListener("change", syncReduce);

    const embers = Array.from({ length: COUNT }, () => createEmber());
    let raf = 0;
    let running = false;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.max(1, Math.round(clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(clientHeight * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0.016;
      last = now;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const e of embers) {
        if (!reduce) {
          e.y -= e.speed * dt;
          e.x += Math.sin(e.phase + now * 0.001) * 0.0004;
          if (e.y < -0.05) {
            Object.assign(e, createEmber(), { y: 1.05 });
          }
        }
        const flicker = 0.75 + 0.25 * Math.sin(e.phase + now * 0.004);
        ctx.beginPath();
        ctx.arc(e.x * w, e.y * h, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 102, 0, ${(e.alpha * flicker).toFixed(3)})`;
        ctx.fill();
      }

      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { rootMargin: "120px", threshold: 0.05 },
    );
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mq.removeEventListener("change", syncReduce);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export default EmberField;
