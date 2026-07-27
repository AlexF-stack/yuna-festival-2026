"use client";

import dynamic from "next/dynamic";

import { ViewportMount } from "@/components/ui/ViewportMount";

const Scene = dynamic(() => import("@/components/sections/EmberField"), {
  ssr: false,
  loading: () => null,
});

/** Particules line-up — montées au scroll uniquement. */
export function EmberFieldDynamic() {
  return (
    <ViewportMount className="pointer-events-none absolute inset-0">
      <Scene />
    </ViewportMount>
  );
}
