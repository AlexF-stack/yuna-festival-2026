"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ViewportMountProps = {
  children: ReactNode;
  /** Marge avant déclenchement (px ou %). Défaut : 120px */
  rootMargin?: string;
  className?: string;
  /** Hauteur min du placeholder pour éviter le layout shift */
  minHeight?: number | string;
};

/**
 * Monte les enfants seulement quand visibles — évite de charger Three.js / canvas hors viewport.
 */
export function ViewportMount({
  children,
  rootMargin = "120px",
  className = "",
  minHeight,
}: ViewportMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, visible]);

  return (
    <div
      ref={ref}
      className={className}
      style={minHeight != null ? { minHeight } : undefined}
    >
      {visible ? children : null}
    </div>
  );
}
