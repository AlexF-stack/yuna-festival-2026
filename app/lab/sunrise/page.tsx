"use client";

import { useEffect, useRef, useState } from "react";

import { SunriseSceneDynamic } from "@/components/sections/SunriseSceneDynamic";
import { useScrollProgress } from "@/lib/use-scroll-progress";

/**
 * Lab perf mobile — ne pas indexer.
 * Viewport cible : 375px. Mesure FPS pendant le scroll avant intégration layout.
 */
export default function SunriseLabPage() {
  const progress = useScrollProgress();
  const [fps, setFps] = useState(0);
  const [avgFps, setAvgFps] = useState(0);
  const [minFps, setMinFps] = useState(60);
  const samplesRef = useRef<number[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();

    const loop = (now: number) => {
      frames += 1;
      const elapsed = now - last;
      if (elapsed >= 500) {
        const current = Math.round((frames * 1000) / elapsed);
        setFps(current);
        samplesRef.current.push(current);
        if (samplesRef.current.length > 40) samplesRef.current.shift();
        const samples = samplesRef.current;
        setAvgFps(Math.round(samples.reduce((a, b) => a + b, 0) / samples.length));
        setMinFps(Math.min(...samples));
        frames = 0;
        last = now;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const verdict =
    avgFps >= 50 && minFps >= 40
      ? "OK — candidat layout"
      : avgFps >= 40
        ? "Limite — alléger encore avant layout"
        : "Trop lourd — ne pas intégrer";

  return (
    <main id="contenu" className="relative min-h-[300vh] bg-nuit text-ivoire">
      <SunriseSceneDynamic />

      <div className="relative z-10 mx-auto flex max-w-md flex-col gap-6 px-4 py-10">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aube">
            Lab · SunriseScene
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold uppercase">
            Perf mobile 375px
          </h1>
          <p className="mt-2 text-sm text-ivoire/75">
            Scrolle toute la page. Le disque doit monter et passer nuit → aube →
            feu. Pas d’intégration layout tant que le verdict n’est pas OK.
          </p>
        </header>

        <aside
          className="sticky top-4 rounded-lg border border-aube/30 bg-nuit2/90 p-4 font-mono text-sm backdrop-blur-md"
          aria-live="polite"
        >
          <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
            <dt className="text-ivoire/55">Scroll</dt>
            <dd className="text-aube">{(progress * 100).toFixed(0)}%</dd>
            <dt className="text-ivoire/55">FPS</dt>
            <dd className="text-aube">{fps}</dd>
            <dt className="text-ivoire/55">FPS moy.</dt>
            <dd className="text-aube">{avgFps}</dd>
            <dt className="text-ivoire/55">FPS min</dt>
            <dd className="text-aube">{minFps}</dd>
          </dl>
          <p className="mt-3 border-t border-ivoire/10 pt-3 text-xs text-ivoire/80">
            Verdict : <span className="font-bold text-aube">{verdict}</span>
          </p>
        </aside>

        {Array.from({ length: 8 }, (_, i) => (
          <section
            key={i}
            className="rounded-lg border border-ivoire/10 bg-ivoire/5 p-6"
          >
            <h2 className="font-display text-xl uppercase text-aube">
              Section {i + 1}
            </h2>
            <p className="mt-2 text-sm text-ivoire/70">
              Contenu factice pour allonger le document et exercer le tracker de
              scroll global + le lever du soleil WebGL.
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
