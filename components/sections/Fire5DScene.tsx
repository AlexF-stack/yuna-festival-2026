"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type FireCoreProps = {
  reducedMotion: boolean;
  particleCount: number;
};

/**
 * Feu « 5D » — particules turbulentes + volumes additifs + suivi pointer.
 */
function FireCore({ reducedMotion, particleCount }: FireCoreProps) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const volumes = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { positions, velocities, seeds } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const seeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.55;
      positions[i3] = Math.cos(a) * r;
      positions[i3 + 1] = Math.random() * 1.6 - 0.2;
      positions[i3 + 2] = Math.sin(a) * r * 0.55;
      velocities[i] = 0.012 + Math.random() * 0.028;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, velocities, seeds };
  }, [particleCount]);

  const colors = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    const cHot = new THREE.Color("#fff6c8");
    const cMid = new THREE.Color("#ff6600");
    const cCool = new THREE.Color("#e55a00");
    const tmp = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      if (t < 0.25) tmp.copy(cHot);
      else if (t < 0.7) tmp.copy(cMid);
      else tmp.copy(cCool);
      arr[i * 3] = tmp.r;
      arr[i * 3 + 1] = tmp.g;
      arr[i * 3 + 2] = tmp.b;
    }
    return arr;
  }, [particleCount]);

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (g) {
      if (reducedMotion) {
        g.rotation.set(0.15, 0.2, 0);
        g.position.set(0, -0.15, 0);
      } else {
        g.rotation.y = Math.sin(t * 0.35) * 0.18;
        g.rotation.x = 0.12 + Math.sin(t * 0.5) * 0.06;
        g.position.x = THREE.MathUtils.lerp(
          g.position.x,
          pointer.current.x * 0.28,
          0.04,
        );
        g.position.y = THREE.MathUtils.lerp(
          g.position.y,
          -0.15 + pointer.current.y * 0.12,
          0.04,
        );
      }
    }

    if (volumes.current && !reducedMotion) {
      volumes.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const s = 1 + Math.sin(t * (2.2 + i * 0.4) + i) * (0.08 + i * 0.02);
        mesh.scale.set(s * (1 - i * 0.08), s * (1.15 - i * 0.05), s * (1 - i * 0.08));
        mesh.rotation.y = t * (0.4 + i * 0.15);
        mesh.position.y = -0.35 + Math.sin(t * 1.8 + i) * 0.04;
      });
    }

    const pts = points.current;
    if (!pts || reducedMotion) return;
    const pos = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pos[i3 + 1] += velocities[i];
      pos[i3] += Math.sin(t * 3.2 + seeds[i] + pos[i3 + 1] * 2.5) * 0.008;
      pos[i3 + 2] += Math.cos(t * 2.6 + seeds[i]) * 0.006;
      // Narrow as it rises
      const rise = pos[i3 + 1];
      if (rise > 1.55) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.5;
        pos[i3] = Math.cos(a) * r;
        pos[i3 + 1] = -0.25 + Math.random() * 0.2;
        pos[i3 + 2] = Math.sin(a) * r * 0.5;
      } else if (rise > 0.4) {
        pos[i3] *= 0.992;
        pos[i3 + 2] *= 0.992;
      }
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <pointLight color="#ff6600" intensity={2.4} distance={6} position={[0, 0.4, 1.2]} />
      <pointLight color="#fcd116" intensity={1.4} distance={4} position={[0.3, 0.8, 0.6]} />
      <ambientLight intensity={0.15} />

      <group ref={volumes}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, -0.35, 0]} renderOrder={i}>
            <coneGeometry args={[0.72 - i * 0.14, 1.55 - i * 0.15, 18, 1, true]} />
            <meshBasicMaterial
              color={i === 0 ? "#ff6600" : i === 1 ? "#ff8a1a" : "#fcd116"}
              transparent
              opacity={0.22 - i * 0.04}
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.42, 20, 16]} />
          <meshBasicMaterial
            color="#fff4c2"
            transparent
            opacity={0.35}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={reducedMotion ? 0.05 : 0.075}
          vertexColors
          transparent
          opacity={0.92}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export function Fire5DScene() {
  const [reducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [particleCount] = useState(() => {
    if (typeof window === "undefined") return 900;
    return window.matchMedia("(min-width: 900px)").matches ? 1100 : 550;
  });

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.35, 3.1], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <FireCore reducedMotion={reducedMotion} particleCount={particleCount} />
    </Canvas>
  );
}

export default Fire5DScene;
