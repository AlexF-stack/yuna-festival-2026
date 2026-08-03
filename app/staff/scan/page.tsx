import type { Metadata } from "next";

import { StaffScanClient } from "@/components/staff/StaffScanClient";

export const metadata: Metadata = {
  title: "Scan entrée staff",
  robots: { index: false, follow: false },
};

/**
 * Outil porte uniquement — listing / admin = CRM connecté (webhook + API).
 */
export default function StaffScanPage() {
  return (
    <main
      id="contenu"
      className="min-h-dvh bg-logo-bleu-soft px-5 pb-16 pt-28 text-encre"
    >
      <StaffScanClient />
    </main>
  );
}
