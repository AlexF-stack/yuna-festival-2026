import type { Metadata } from "next";

import { Venue } from "@/components/sections/Venue";
import { LocalizedPageIntro } from "@/components/i18n/LocalizedPageIntro";

const DESCRIPTION =
  "Terrain de Midombo, Cotonou : entrée libre, site ouvert dès 16h00, accès facile en zém, taxi et bus. Le festival vient à la rencontre de la jeunesse.";

export const metadata: Metadata = {
  title: "Le lieu — Terrain de Midombo",
  description: DESCRIPTION,
  alternates: { canonical: "/lieu" },
  openGraph: {
    title: "Le lieu — Terrain de Midombo | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://festivalyuna.com/lieu",
  },
};

export default function LieuPage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <LocalizedPageIntro page="lieu" />
      <Venue />
    </main>
  );
}
