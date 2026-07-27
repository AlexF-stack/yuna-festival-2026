"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Signature « Bénin Debout » — flamme centrale + anneaux tricolore.
 * Léger, pointer-follow, pensé pour la section Mission.
 */
function BeninDeboutCore({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const flameMat = useRef<THREE.MeshBasicMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const colors = useMemo(
    () => ({
      vert: new THREE.Color("#008751"),
      jaune: new THREE.Color("#fcd116"),
      rouge: new THREE.Color("#e8112d"),
      feu: new THREE.Color("#ff6600"),
      bleu: new THREE.Color("#0077bb"),
    }),
    [],
  );

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
      g.rotation.y = 0.4;
      g.position.set(0, 0, 0);
      g.scale.setScalar(1);
      return;
    }

    g.rotation.y = t * 0.28;
    g.position.x = THREE.MathUtils.lerp(g.position.x, pointer.current.x * 0.35, 0.035);
    g.position.y = THREE.MathUtils.lerp(g.position.y, pointer.current.y * 0.22, 0.035);
    const pulse = 1 + Math.sin(t * 2) * 0.07;
    g.scale.setScalar(pulse);

    if (ringA.current) {
      ringA.current.rotation.x = t * 0.45;
      ringA.current.rotation.z = t * 0.2;
    }
    if (ringB.current) {
      ringB.current.rotation.y = -t * 0.38;
      ringB.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    }
    if (ringC.current) {
      ringC.current.rotation.z = t * 0.52;
      ringC.current.rotation.y = Math.cos(t * 0.4) * 0.25;
    }
    if (flameMat.current) {
      flameMat.current.color
        .copy(colors.feu)
        .lerp(colors.bleu, (Math.sin(t * 1.4) + 1) * 0.12);
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial ref={flameMat} color="#ff6600" toneMapped={false} />
      </mesh>
      <mesh ref={ringA} scale={1.45}>
        <torusGeometry args={[1.1, 0.04, 10, 48]} />
        <meshBasicMaterial color={colors.vert} transparent opacity={0.75} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} scale={1.2}>
        <torusGeometry args={[1.1, 0.035, 10, 40]} />
        <meshBasicMaterial color={colors.jaune} transparent opacity={0.7} toneMapped={false} />
      </mesh>
      <mesh ref={ringC} scale={0.95}>
        <torusGeometry args={[1.1, 0.03, 8, 36]} />
        <meshBasicMaterial color={colors.rouge} transparent opacity={0.65} toneMapped={false} />
      </mesh>
      <mesh scale={1.65}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshBasicMaterial
          color="#0077bb"
          transparent
          opacity={0.28}
          wireframe
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function BeninDeboutScene() {
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
        camera={{ position: [0, 0, 4.5], fov: 40 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
          stencil: false,
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <BeninDeboutCore reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

export default BeninDeboutScene;
