import type { Metadata } from "next";

import { Venue } from "@/components/sections/Venue";
import { PageIntro } from "@/components/ui/PageIntro";

const DESCRIPTION =
  "Terrain de Midombo, Cotonou : entrée libre, site ouvert dès 17h00, accès facile en zém, taxi et bus. Le festival vient à la rencontre de la jeunesse.";

export const metadata: Metadata = {
  title: "Le lieu — Terrain de Midombo",
  description: DESCRIPTION,
  alternates: { canonical: "/lieu" },
  openGraph: {
    title: "Le lieu — Terrain de Midombo | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://yunafestival.com/lieu",
  },
};

export default function LieuPage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <PageIntro
        eyebrow="Cotonou · Midombo"
        title="Le lieu"
        lead="Un espace ouvert au cœur de Cotonou, accessible à tous — entrée libre, ouverture à 17h00 chaque soir."
        cta={{ href: "/#inscription", label: "Inscris-toi — pass QR gratuit" }}
      />
      <Venue />
    </main>
  );
}
