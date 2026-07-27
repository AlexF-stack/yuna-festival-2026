"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

/**
 * Carte 3D légère au pointer — désactivée si reduced-motion / tactile.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
}: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawY, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(rawX, { stiffness: 180, damping: 22 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), transparent 55%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawX.set((px - 0.5) * maxTilt * 2);
    rawY.set((0.5 - py) * maxTilt * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
    glareX.set(50);
    glareY.set(50);
  }

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  );
}
