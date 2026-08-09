import type { ReactNode } from "react";

import { PageTransition } from "@/components/ui/PageTransition";

/**
 * Remonte à chaque navigation client.
 * Crossfade navigateur via `experimental.viewTransition` + CSS ::view-transition-*.
 * Entrée contenu via Framer (PageTransition).
 */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
