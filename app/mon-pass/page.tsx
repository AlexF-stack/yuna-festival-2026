import type { Metadata } from "next";

import { MonPassContent } from "@/components/pass/MonPassContent";

export const metadata: Metadata = {
  title: "Retrouver mon pass",
  description:
    "Récupère ton pass QR YUNA Festival 2026 avec ton nom et le numéro WhatsApp de ton inscription.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/mon-pass" },
  openGraph: {
    title: "Retrouver mon pass | YUNA Festival 2026",
    url: "https://yunafestival.com/mon-pass",
  },
};

export default function MonPassPage() {
  return (
    <main
      id="contenu"
      className="flex min-h-dvh flex-col items-center bg-nuage px-5 pb-16 pt-28 text-encre"
    >
      <MonPassContent />
    </main>
  );
}
