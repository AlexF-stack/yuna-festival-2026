import dynamic from "next/dynamic";

export const BeninDeboutSceneDynamic = dynamic(
  () => import("@/components/sections/BeninDeboutScene"),
  { ssr: false },
);
