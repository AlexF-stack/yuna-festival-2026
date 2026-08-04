import type { Metadata } from "next";

import { Boutique } from "@/components/sections/Boutique";
import { PageIntro } from "@/components/ui/PageIntro";

/** ISR — même stratégie que la home (produits Supabase). */
export const revalidate = 60;
export const dynamic = "force-static";

const DESCRIPTION =
  "La boutique officielle YUNA 2026 : tee-shirts LED — flamme toujours allumée, sonore réactif ou matrice programmable. Pré-commande ouverte.";

export const metadata: Metadata = {
  title: "Boutique officielle",
  description: DESCRIPTION,
  alternates: { canonical: "/boutique" },
  openGraph: {
    title: "Boutique officielle | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://yunafestival.com/boutique",
  },
};

export default function BoutiquePage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <PageIntro
        eyebrow="Porte le feu"
        title="La boutique"
        lead="Tee-shirts LED YUNA — de la flamme toujours allumée à la matrice pilotée depuis ton téléphone. Pré-commande avant le jour J."
      />
      <Boutique />
    </main>
  );
}
