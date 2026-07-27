"use client";

import dynamic from "next/dynamic";

import { ViewportMount } from "@/components/ui/ViewportMount";

const Scene = dynamic(() => import("@/components/sections/OrbitHalo"), {
  ssr: false,
  loading: () => null,
});

/** Halo programme — monté au scroll uniquement. */
export function OrbitHaloDynamic() {
  return (
    <ViewportMount className="pointer-events-none absolute inset-0">
      <Scene />
    </ViewportMount>
  );
}
