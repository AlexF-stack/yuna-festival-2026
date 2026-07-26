"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Orbe / flamme 3D légère — pointer-follow + pulsation.
 * Low-power, demand frameloop, alpha — pour sections Mission / Register.
 */
function FlameCore({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const matA = useRef<THREE.MeshBasicMaterial>(null);
  const matB = useRef<THREE.MeshBasicMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const colorFeu = useMemo(() => new THREE.Color("#ff6600"), []);
  const colorBleu = useMemo(() => new THREE.Color("#0077bb"), []);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    if (reducedMotion) {
      g.rotation.y = 0.35;
      g.position.set(0, 0, 0);
      return;
    }
    g.rotation.y = t * 0.35;
    g.rotation.x = Math.sin(t * 0.6) * 0.12;
    g.position.x = THREE.MathUtils.lerp(g.position.x, pointer.current.x * 0.45, 0.04);
    g.position.y = THREE.MathUtils.lerp(g.position.y, pointer.current.y * 0.3, 0.04);
    const pulse = 1 + Math.sin(t * 2.2) * 0.06;
    g.scale.setScalar(pulse);
    if (matA.current) {
      matA.current.color.copy(colorFeu).lerp(colorBleu, (Math.sin(t) + 1) * 0.15);
    }
    if (matB.current) {
      matB.current.opacity = 0.35 + Math.sin(t * 1.8) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial ref={matA} color="#ff6600" toneMapped={false} />
      </mesh>
      <mesh scale={1.35}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshBasicMaterial
          ref={matB}
          color="#0077bb"
          transparent
          opacity={0.35}
          wireframe
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function TorchScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    setReady(true);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!ready) return null;

  return (
    <div className="h-full w-full" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
          stencil: false,
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <FlameCore reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

export default TorchScene;
