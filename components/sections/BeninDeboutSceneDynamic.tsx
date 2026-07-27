"use client";

import dynamic from "next/dynamic";

import { ViewportMount } from "@/components/ui/ViewportMount";

const Scene = dynamic(() => import("@/components/sections/BeninDeboutScene"), {
  ssr: false,
  loading: () => null,
});

/** 3D Mission — chargé seulement à l’entrée dans le viewport. */
export function BeninDeboutSceneDynamic() {
  return (
    <ViewportMount className="h-full w-full" minHeight="100%">
      <Scene />
    </ViewportMount>
  );
}
