"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import * as THREE from "three";

import { subscribeScrollProgress } from "@/lib/scroll-progress";

/** Disque : 16 segments = footprint GPU négligeable. */
const SUN_SEGMENTS = 16;
const SUN_RADIUS = 1.15;
const Y_START = -3.2;
const Y_END = 1.6;

type TokenColors = {
  nuit: THREE.Color;
  aube: THREE.Color;
  feu: THREE.Color;
};

function readTokenColors(): TokenColors {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    new THREE.Color(styles.getPropertyValue(name).trim() || fallback);

  return {
    nuit: read("--nuit", "#0a0817"),
    aube: read("--aube", "#f7b733"),
    feu: read("--feu", "#ff5a1f"),
  };
}

function colorAtProgress(p: number, tokens: TokenColors, out: THREE.Color) {
  if (p < 0.5) {
    out.copy(tokens.nuit).lerp(tokens.aube, p * 2);
  } else {
    out.copy(tokens.aube).lerp(tokens.feu, (p - 0.5) * 2);
  }
}

function SunDisk({
  progressRef,
  reducedMotion,
}: {
  progressRef: MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = useMemo(() => new THREE.Color(), []);
  const tokens = useMemo(() => readTokenColors(), []);
  const { invalidate } = useThree();

  useEffect(() => {
    if (reducedMotion) {
      progressRef.current = 0.35;
      invalidate();
      return;
    }
    return subscribeScrollProgress((p) => {
      progressRef.current = p;
      invalidate();
    });
  }, [invalidate, progressRef, reducedMotion]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const p = progressRef.current;
    mesh.position.y = THREE.MathUtils.lerp(Y_START, Y_END, p);
    colorAtProgress(p, tokens, color);
    const mat = mesh.material as THREE.MeshBasicMaterial;
    mat.color.copy(color);
  });

  return (
    <mesh ref={meshRef} position={[0, Y_START, 0]}>
      <circleGeometry args={[SUN_RADIUS, SUN_SEGMENTS]} />
      <meshBasicMaterial color={tokens.nuit} toneMapped={false} />
    </mesh>
  );
}

function SunriseCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const progressRef = useRef(reducedMotion ? 0.35 : 0);

  return (
    <Canvas
      dpr={[1, 1.25]}
      frameloop="demand"
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
        stencil: false,
        depth: false,
      }}
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    >
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={48} />
      <SunDisk progressRef={progressRef} reducedMotion={reducedMotion} />
    </Canvas>
  );
}

/**
 * Signature visuelle discrète : disque solaire lié au scroll document.
 * À charger via `next/dynamic` avec `{ ssr: false }` — ne pas monter dans
 * le layout global tant que le lab `/lab/sunrise` n’a pas validé la perf mobile.
 */
export function SunriseScene() {
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
    <div
      className="pointer-events-none absolute inset-x-0 bottom-[-8%] z-0 h-[55%] w-full opacity-50 mix-blend-multiply min-[900px]:opacity-60"
      aria-hidden
    >
      <SunriseCanvas reducedMotion={reducedMotion} />
    </div>
  );
}

export default SunriseScene;
