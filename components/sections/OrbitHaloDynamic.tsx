"use client";

import dynamic from "next/dynamic";

export const OrbitHaloDynamic = dynamic(
  () => import("@/components/sections/OrbitHalo"),
  { ssr: false, loading: () => null },
);
