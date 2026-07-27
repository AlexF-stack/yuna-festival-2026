"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Crystal({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    if (reducedMotion) {
      g.rotation.set(0.45, 0.6, 0.15);
      return;
    }
    g.rotation.y = t * 0.55;
    g.rotation.x = Math.sin(t * 0.7) * 0.25 + 0.35;
    g.rotation.z = Math.cos(t * 0.45) * 0.12;
    g.position.y = Math.sin(t * 1.1) * 0.12;
    if (core.current) {
      core.current.opacity = 0.55 + Math.sin(t * 2) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <octahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial
          ref={core}
          color="#ff6600"
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={1.08}>
        <octahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial
          color="#0077bb"
          wireframe
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={0.42} position={[0, 0.15, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ffe0c2" toneMapped={false} />
      </mesh>
    </group>
  );
}

export function CrystalShard() {
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
      className="pointer-events-none absolute -left-6 bottom-0 z-0 h-[min(280px,55vw)] w-[min(280px,55vw)] opacity-60 min-[900px]:left-auto min-[900px]:right-4 min-[900px]:top-8 min-[900px]:opacity-80"
      aria-hidden
    >
      {active ? (
        <Canvas
          dpr={[1, 1.4]}
          frameloop={reducedMotion || !active ? "demand" : "always"}
          camera={{ position: [0, 0, 4.5], fov: 42 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
            stencil: false,
          }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <Crystal reducedMotion={reducedMotion} />
        </Canvas>
      ) : null}
    </div>
  );
}

export default CrystalShard;
