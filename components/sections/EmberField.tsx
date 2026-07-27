"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const COUNT = 48;

function Embers({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const velocities = useMemo(() => {
    const v = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) v[i] = 0.004 + Math.random() * 0.01;
    return v;
  }, []);

  const positions = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 8;
      p[i * 3 + 1] = (Math.random() - 0.5) * 5;
      p[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return p;
  }, []);

  useFrame((_, dt) => {
    const mesh = points.current;
    if (!mesh || reducedMotion) return;
    const attr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += velocities[i] * (60 * dt);
      arr[i * 3] += Math.sin(i + performance.now() * 0.001) * 0.002;
      if (arr[i * 3 + 1] > 2.8) {
        arr[i * 3 + 1] = -2.8;
        arr[i * 3] = (Math.random() - 0.5) * 8;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.085}
        color="#ff6600"
        transparent
        opacity={0.75}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

export function EmberField() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    setReady(true);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  if (!ready) return null;

  return (
    <div ref={host} className="pointer-events-none absolute inset-0 -z-0" aria-hidden>
      {active ? (
        <Canvas
          dpr={[1, 1.25]}
          frameloop={reducedMotion || !active ? "demand" : "always"}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
            stencil: false,
            depth: false,
          }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <Embers reducedMotion={reducedMotion} />
        </Canvas>
      ) : null}
    </div>
  );
}

export default EmberField;
