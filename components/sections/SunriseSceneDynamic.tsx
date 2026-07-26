"use client";

import dynamic from "next/dynamic";

/**
 * Signature WebGL discrète — homepage (hero) + lab `/lab/sunrise`.
 */
export const SunriseSceneDynamic = dynamic(
  () => import("@/components/sections/SunriseScene"),
  { ssr: false, loading: () => null },
);
