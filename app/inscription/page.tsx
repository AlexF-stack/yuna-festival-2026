import type { Metadata } from "next";
import { Suspense } from "react";

import { Register } from "@/components/sections/Register";
import { FESTIVAL } from "@/lib/festival";

const DESCRIPTION =
  "Génère ton pass QR gratuit pour le YUNA Festival 2026, les 5 et 6 septembre au Terrain de Midombo à Cotonou. Entrée libre, pass obligatoire, une minute suffit.";

/**
 * Rendu dynamique volontaire : `Register` lit les paramètres d'URL, ce qui en
 * prérendu statique renvoie le formulaire côté client uniquement. Les visiteurs
 * arriveraient sur un titre suivi d'un vide le temps du chargement JS.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prendre ma place",
  description: DESCRIPTION,
  alternates: { canonical: "/inscription" },
  openGraph: {
    title: "Prendre ma place | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://www.festivalyuna.com/inscription",
  },
};

const FACTS = [
  { label: "Quand", value: `${FESTIVAL.datesShort}` },
  { label: "Où", value: FESTIVAL.locationFull },
  { label: "Portes", value: `${FESTIVAL.siteOpens} · scène dès 18h` },
  { label: "Tarif", value: FESTIVAL.freeEntry },
] as const;

/**
 * Page d'atterrissage des campagnes : le formulaire est le premier bloc utile.
 * La home place l'inscription après cinq sections, ce qui coûtait la conversion
 * des liens email et WhatsApp.
 */
export default function InscriptionPage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <section className="relative overflow-hidden bg-bleu px-5 pb-10 pt-28 text-papier min-[720px]:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,color-mix(in_srgb,var(--feu)_22%,transparent),transparent_70%)]"
        />
        <div className="section-container relative z-10">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.28em] text-jaune">
            {FESTIVAL.brandFull} {FESTIVAL.edition} · {FESTIVAL.theme}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold uppercase leading-[1.1] tracking-tight min-[720px]:text-5xl">
            Ton pass est gratuit,
            <br />
            mais il est obligatoire
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-papier/85 min-[720px]:text-lg">
            Remplis le formulaire ci-dessous et tu reçois ton code QR
            immédiatement. C&apos;est lui qu&apos;on scanne à l&apos;entrée, et
            c&apos;est lui qui garantit ta place.
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-4 min-[560px]:grid-cols-2 min-[960px]:grid-cols-4">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-papier/60">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-snug text-papier">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Suspense fallback={null}>
        <Register />
      </Suspense>
    </main>
  );
}
