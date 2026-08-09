import type { Metadata } from "next";

import { DonatePageContent } from "@/components/sections/DonatePageContent";
import { Sponsors } from "@/components/sections/Sponsors";
import { DONATE } from "@/lib/content-site";

export const metadata: Metadata = {
  title: "Soutenir",
  description: DONATE.pageLead,
  alternates: { canonical: "/soutenir" },
  openGraph: {
    title: "Soutenir | YUNA Festival 2026",
    description: DONATE.pageLead,
    url: "https://yunafestival.com/soutenir",
  },
};

export default function SoutenirPage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <DonatePageContent />
      <div id="partenariat-grille">
        <Sponsors />
      </div>
    </main>
  );
}
