import type { Metadata } from "next";

import { DonatePageContent } from "@/components/sections/DonatePageContent";
import { DONATE } from "@/lib/content-site";

export const metadata: Metadata = {
  title: "Faire un don",
  description: DONATE.pageLead,
  alternates: { canonical: "https://yunafestival.com/don" },
  openGraph: {
    title: "Faire un don | YUNA Festival 2026",
    description: DONATE.pageLead,
    url: "https://yunafestival.com/don",
  },
};

export default function DonPage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <DonatePageContent />
    </main>
  );
}
