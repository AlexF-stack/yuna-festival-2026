"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function RibbonMesh({ reducedMotion }: { reducedMotion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(6.5, 2.2, 48, 16);
    g.rotateX(-Math.PI * 0.18);
    return g;
  }, []);

  useFrame((state) => {
    const m = mesh.current;
    if (!m || reducedMotion) return;
    const t = state.clock.elapsedTime;
    const pos = m.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave =
        Math.sin(x * 1.4 + t * 1.6) * 0.22 +
        Math.cos(y * 2.2 + t * 1.1) * 0.1;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
    m.rotation.z = Math.sin(t * 0.25) * 0.08;
  });

  return (
    <mesh ref={mesh} geometry={geo}>
      <meshBasicMaterial
        color="#ff6600"
        wireframe
        transparent
        opacity={0.45}
        toneMapped={false}
      />
    </mesh>
  );
}

export function WaveRibbon() {
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
      { rootMargin: "80px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  if (!ready) return null;

  return (
    <div
      ref={host}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[70%] opacity-50"
      aria-hidden
    >
      {active ? (
        <Canvas
          dpr={[1, 1.25]}
          frameloop={reducedMotion || !active ? "demand" : "always"}
          camera={{ position: [0, 0.4, 4.8], fov: 40 }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
            stencil: false,
          }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <RibbonMesh reducedMotion={reducedMotion} />
        </Canvas>
      ) : null}
    </div>
  );
}

export default WaveRibbon;
