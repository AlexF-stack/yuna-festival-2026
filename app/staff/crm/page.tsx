import type { Metadata } from "next";

import { StaffCrmClient } from "@/components/staff/StaffCrmClient";

export const metadata: Metadata = {
  title: "CRM tickets",
  robots: { index: false, follow: false },
};

/** Listing staff — tickets / inscriptions (scan porte = outil séparé). */
export default function StaffCrmPage() {
  return (
    <main id="contenu" className="min-h-dvh bg-logo-bleu-soft text-encre">
      <StaffCrmClient />
    </main>
  );
}
