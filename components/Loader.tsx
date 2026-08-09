"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const HERO_ASSETS = [
  "/brand/yuna-logo.png",
  "/media/crowd.webp",
] as const;

const MIN_DISPLAY_MS = 280;
const MAX_WAIT_MS = 2200;
const EXIT_MS = 380;

type LoadScores = {
  fonts: number;
  images: number;
};

function computeProgress(scores: LoadScores): number {
  // Ne plus attendre window.load (bloquait sur assets non critiques).
  const raw = scores.fonts * 35 + scores.images * 65;
  return Math.min(100, Math.round(raw));
}

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

/**
 * Écran de démarrage YUNA — fonts + images hero critiques uniquement.
 * Se démonte du DOM après fondu Framer Motion (SEO / a11y).
 * Désactivé sur /staff/* (outils terrain, accès immédiat).
 */
export function Loader() {
  const pathname = usePathname() || "/";
  const isStaff = pathname.startsWith("/staff");
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(!isStaff);
  const [mounted, setMounted] = useState(!isStaff);
  const startedAt = useRef<number>(0);
  const finishedRef = useRef(isStaff);
  const scoresRef = useRef<LoadScores>({ fonts: 0, images: 0 });

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setProgress(100);

    const elapsed = Date.now() - startedAt.current;
    const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);

    window.setTimeout(() => {
      setVisible(false);
    }, wait);
  }, []);

  const bump = useCallback(
    (partial: Partial<LoadScores>) => {
      if (finishedRef.current) return;
      scoresRef.current = { ...scoresRef.current, ...partial };
      const next = computeProgress(scoresRef.current);
      setProgress((prev) => Math.max(prev, next));

      const s = scoresRef.current;
      if (s.fonts >= 1 && s.images >= 1) {
        finish();
      }
    },
    [finish],
  );

  useEffect(() => {
    if (isStaff) {
      finishedRef.current = true;
      setVisible(false);
      setMounted(false);
      return;
    }
  }, [isStaff]);

  useEffect(() => {
    if (isStaff) return;
    startedAt.current = Date.now();

    if (reduceMotion) {
      // Pas de barre : spinner court puis sortie.
      const t = window.setTimeout(() => {
        setProgress(100);
        setVisible(false);
      }, 450);
      return () => window.clearTimeout(t);
    }

    let cancelled = false;

    // Fonts (next/font + document)
    const fontsReady =
      typeof document !== "undefined" && document.fonts?.ready
        ? document.fonts.ready
        : Promise.resolve();
    fontsReady.then(() => {
      if (!cancelled) bump({ fonts: 1 });
    });

    // Images critiques (logo + hero) — progression au fil de chaque asset
    let loadedCount = 0;
    const imageJobs = HERO_ASSETS.map((src) =>
      loadImage(src).then(() => {
        if (cancelled) return;
        loadedCount += 1;
        bump({ images: loadedCount / HERO_ASSETS.length });
      }),
    );
    Promise.all(imageJobs).then(() => {
      if (!cancelled) bump({ images: 1 });
    });

    const hardStop = window.setTimeout(() => {
      if (!cancelled) finish();
    }, MAX_WAIT_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(hardStop);
    };
  }, [bump, finish, isStaff, reduceMotion]);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = visible ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted, visible]);

  if (!mounted) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        setMounted(false);
        document.body.style.overflow = "";
      }}
    >
      {visible ? (
        <motion.div
          key="yuna-loader"
          role="progressbar"
          aria-busy="true"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Chargement YUNA Festival"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-papier via-ciel to-[#d6ebf7] px-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,color-mix(in_srgb,var(--bleu)_14%,transparent),transparent_65%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_90%,color-mix(in_srgb,var(--feu)_12%,transparent),transparent_55%)]"
          />

          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Image
              src="/brand/yuna-logo.png"
              alt="YUNA Festival"
              width={220}
              height={220}
              priority
              className="h-[7.5rem] w-auto object-contain min-[480px]:h-36"
            />

            <p className="mt-6 font-mono text-[0.7rem] font-bold uppercase tracking-[0.32em] text-bleu">
              Bénin Debout · 2026
            </p>

            {reduceMotion ? (
              <div
                className="mt-10 h-9 w-9 animate-spin rounded-full border-2 border-bleu/20 border-t-feu"
                aria-hidden
              />
            ) : (
              <div className="mt-10 w-[min(72vw,280px)]">
                <div className="h-1.5 overflow-hidden rounded-full bg-bleu/15">
                  <motion.div
                    className="h-full w-full origin-left rounded-full bg-gradient-to-r from-bleu via-feu to-feu"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                </div>
                <p className="mt-3 text-center font-mono text-sm font-bold tabular-nums text-charbon">
                  {progress}%
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Loader;
