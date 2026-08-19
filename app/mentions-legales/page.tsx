import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { ORGANIZER } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";
import { SITE_CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site officiel du YUNA Festival 2026.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <main
      id="contenu"
      className="flex min-h-dvh flex-col items-center bg-nuage px-5 pb-16 pt-28 text-encre"
    >
      <h1 className="text-center font-display text-[clamp(2rem,6vw,3.2rem)] font-extrabold uppercase leading-[0.95] text-bleu">
        Mentions légales
      </h1>

      <div className="mt-10 w-full max-w-2xl space-y-8">
        <section>
          <h2 className="font-display text-xl font-extrabold uppercase text-bleu">
            Éditeur du site
          </h2>
          <p className="mt-3 leading-relaxed text-charbon">
            Le site festivalyuna.com est édité par {ORGANIZER.name},
            organisateur du {FESTIVAL.brandFull} — {FESTIVAL.theme}, qui se
            tient les {FESTIVAL.datesShort} au Terrain de Midombo,{" "}
            {FESTIVAL.city}, {FESTIVAL.country}.
          </p>
          <p className="mt-3 leading-relaxed text-charbon">
            Contact : {SITE_CONTACT.email}
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold uppercase text-bleu">
            Hébergement
          </h2>
          <p className="mt-3 leading-relaxed text-charbon">
            Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, États-Unis. Les données des formulaires sont
            hébergées par Supabase.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold uppercase text-bleu">
            Propriété intellectuelle
          </h2>
          <p className="mt-3 leading-relaxed text-charbon">
            L&apos;ensemble des contenus du site (textes, visuels, logo YUNA)
            est la propriété de {ORGANIZER.name}. Toute reproduction sans
            autorisation préalable est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold uppercase text-bleu">
            Données personnelles
          </h2>
          <p className="mt-3 leading-relaxed text-charbon">
            Le traitement des données collectées via les formulaires du site
            est détaillé dans notre{" "}
            <Link
              href="/confidentialite"
              className="font-bold text-bleu underline-offset-4 hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </section>
      </div>

      <ButtonLink href="/" variant="ghost" className="mt-12 !px-0">
        ← Retour au site
      </ButtonLink>
    </main>
  );
}
