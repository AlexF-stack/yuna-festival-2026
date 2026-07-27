"use client";

import dynamic from "next/dynamic";

import { ViewportMount } from "@/components/ui/ViewportMount";

const Scene = dynamic(() => import("@/components/sections/Fire5DScene"), {
  ssr: false,
  loading: () => null,
});

/** Feu 5D — monté uniquement dans le viewport. */
export function Fire5DSceneDynamic() {
  return (
    <ViewportMount className="absolute inset-0 h-full w-full" minHeight="100%">
      <Scene />
    </ViewportMount>
  );
}
