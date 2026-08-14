import type { Metadata } from "next";

import { PartnersPageContent } from "@/components/sections/PartnersPageContent";
import { PARTNERS_PAGE } from "@/lib/content-site";

export const metadata: Metadata = {
  title: "Devenir partenaire",
  description: PARTNERS_PAGE.lead,
  alternates: { canonical: "/partenaires" },
  openGraph: {
    title: "Devenir partenaire de YUNA | Festival 2026",
    description: PARTNERS_PAGE.lead,
    url: "https://yunafestival.com/partenaires",
  },
};

export default function PartenairesPage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <PartnersPageContent />
    </main>
  );
}
