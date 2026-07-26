"use client";

import dynamic from "next/dynamic";

export const TorchSceneDynamic = dynamic(
  () => import("@/components/sections/TorchScene"),
  { ssr: false, loading: () => null },
);
