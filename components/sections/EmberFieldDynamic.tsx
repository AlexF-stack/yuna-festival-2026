"use client";

import dynamic from "next/dynamic";

export const EmberFieldDynamic = dynamic(
  () => import("@/components/sections/EmberField"),
  { ssr: false, loading: () => null },
);
