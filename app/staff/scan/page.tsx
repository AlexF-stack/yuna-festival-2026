import type { Metadata } from "next";

import { StaffScanClient } from "@/components/staff/StaffScanClient";

export const metadata: Metadata = {
  title: "Scan entrée staff",
  robots: { index: false, follow: false },
};

/**
 * Outil porte uniquement — listing / admin = CRM connecté (webhook + API).
 * Plein écran mobile (pas de chrome site) pour la caméra.
 */
export default function StaffScanPage() {
  return (
    <main
      id="contenu"
      className="min-h-dvh bg-logo-bleu-soft px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 text-encre sm:px-5 sm:pt-6"
    >
      <StaffScanClient />
    </main>
  );
}
