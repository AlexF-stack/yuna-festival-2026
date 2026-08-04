import type { Metadata } from "next";

import { StaffCrmClient } from "@/components/staff/StaffCrmClient";

export const metadata: Metadata = {
  title: "CRM inscriptions",
  robots: { index: false, follow: false },
};

/** Listing staff — inscriptions site (sync CRM en arrière-plan). */
export default function StaffCrmPage() {
  return (
    <main id="contenu" className="min-h-dvh bg-logo-bleu-soft text-encre">
      <StaffCrmClient />
    </main>
  );
}
