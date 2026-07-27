"use client";

import dynamic from "next/dynamic";

export const CrystalShardDynamic = dynamic(
  () => import("@/components/sections/CrystalShard"),
  { ssr: false, loading: () => null },
);
