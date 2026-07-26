/**
 * Tracker de scroll global (document entier).
 * Une seule source de vérité pour SunriseScene et futurs effets liés au scroll.
 */

type ScrollListener = (progress: number) => void;

let progress = 0;
const listeners = new Set<ScrollListener>();
let attached = false;
let ticking = false;

function measureProgress(): number {
  if (typeof document === "undefined") return 0;
  const el = document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, el.scrollTop / max));
}

function publish() {
  progress = measureProgress();
  listeners.forEach((fn) => fn(progress));
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    publish();
    ticking = false;
  });
}

function attach() {
  if (attached || typeof window === "undefined") return;
  attached = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  publish();
}

function detachIfIdle() {
  if (!attached || listeners.size > 0 || typeof window === "undefined") return;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  attached = false;
}

export function getScrollProgress(): number {
  return progress;
}

export function subscribeScrollProgress(listener: ScrollListener): () => void {
  listeners.add(listener);
  attach();
  listener(progress);
  return () => {
    listeners.delete(listener);
    detachIfIdle();
  };
}
