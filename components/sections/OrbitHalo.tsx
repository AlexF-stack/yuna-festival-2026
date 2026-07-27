"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function HaloRings({ reducedMotion }: { reducedMotion: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (reducedMotion) {
      if (a.current) a.current.rotation.set(0.6, 0.4, 0);
      if (b.current) b.current.rotation.set(-0.4, 0.8, 0.2);
      if (c.current) c.current.rotation.set(0.2, -0.5, 0.6);
      return;
    }
    if (a.current) {
      a.current.rotation.x = t * 0.35;
      a.current.rotation.y = t * 0.22;
    }
    if (b.current) {
      b.current.rotation.x = -t * 0.28;
      b.current.rotation.z = t * 0.4;
    }
    if (c.current) {
      c.current.rotation.y = t * 0.5;
      c.current.rotation.z = -t * 0.18;
      const s = 1 + Math.sin(t * 1.4) * 0.04;
      c.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={a}>
        <torusGeometry args={[1.55, 0.035, 12, 64]} />
        <meshBasicMaterial color="#0077bb" transparent opacity={0.7} toneMapped={false} />
      </mesh>
      <mesh ref={b} scale={0.82}>
        <torusGeometry args={[1.55, 0.028, 10, 48]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.65} toneMapped={false} />
      </mesh>
      <mesh ref={c} scale={0.55}>
        <torusGeometry args={[1.55, 0.045, 10, 40]} />
        <meshBasicMaterial color="#3a9ad4" transparent opacity={0.45} wireframe toneMapped={false} />
      </mesh>
    </group>
  );
}

export function OrbitHalo() {
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
      { rootMargin: "100px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  if (!ready) return null;

  return (
    <div
      ref={host}
      className="pointer-events-none absolute -right-8 top-1/2 z-0 h-[min(420px,70vw)] w-[min(420px,70vw)] -translate-y-1/2 opacity-70 min-[900px]:right-0 min-[900px]:opacity-90"
      aria-hidden
    >
      {active ? (
        <Canvas
          dpr={[1, 1.4]}
          frameloop={reducedMotion || !active ? "demand" : "always"}
          camera={{ position: [0, 0, 5.2], fov: 40 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
            stencil: false,
          }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <HaloRings reducedMotion={reducedMotion} />
        </Canvas>
      ) : null}
    </div>
  );
}

export default OrbitHalo;
