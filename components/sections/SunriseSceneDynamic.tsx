"use client";

import dynamic from "next/dynamic";

/**
 * Signature WebGL discrète — lab `/lab/sunrise` uniquement.
 * Ne pas monter dans le layout de production tant que Lighthouse mobile ≥ 85.
 */
export const SunriseSceneDynamic = dynamic(
  () => import("@/components/sections/SunriseScene"),
  { ssr: false, loading: () => null },
);
