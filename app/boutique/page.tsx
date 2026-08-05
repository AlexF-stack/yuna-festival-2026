import type { Metadata } from "next";

import { Boutique } from "@/components/sections/Boutique";
import { LocalizedPageIntro } from "@/components/i18n/LocalizedPageIntro";

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
      <LocalizedPageIntro page="boutique" showCta={false} />
      <Boutique />
    </main>
  );
}
