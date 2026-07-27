"use client";

import dynamic from "next/dynamic";

export const WaveRibbonDynamic = dynamic(
  () => import("@/components/sections/WaveRibbon"),
  { ssr: false, loading: () => null },
);
