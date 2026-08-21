import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { SITE_CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payer mon soutien",
  description:
    "Soutiens YUNA Festival 2026 par Mobile Money (MTN ou Moov). Montant libre.",
  alternates: { canonical: "/soutenir/payer" },
  robots: { index: true, follow: true },
};

const PAYMENT_NUMBERS = [
  {
    label: "Moov Money",
    display: "+229 01 45 69 83 91",
    digits: "2290145698391",
  },
  {
    label: "MTN MoMo",
    display: "+229 01 51 49 77 97",
    digits: "2290151497797",
  },
] as const;

const WHATSAPP_HREF = `https://wa.me/${PAYMENT_NUMBERS[1].digits}?text=${encodeURIComponent(
  "Bonjour YUNA Festival, je souhaite soutenir l’édition 2026. Montant : ",
)}`;

/**
 * Paiement soutien par Mobile Money — numéros officiels Moov + MTN.
 */
export default function SoutenirPayerPage() {
  return (
    <main id="contenu" className="min-h-[70svh] bg-papier text-encre">
      <section className="relative overflow-hidden bg-gradient-to-b from-nuit-profonde via-bleu-fonce to-nuit-profonde px-5 py-16 text-ivoire-froid min-[760px]:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_srgb,var(--feu)_28%,transparent),transparent_55%)]"
        />
        <div className="relative z-10 mx-auto max-w-xl">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu-glow">
            Soutenir YUNA
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,2.8rem)] font-extrabold uppercase leading-[1.02] text-papier">
            Envoie ton soutien
          </h1>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ivoire-froid/80">
            Montant libre. Tu paies par Mobile Money, puis tu confirmes à
            l’équipe si tu veux un reçu.
          </p>

          <ol className="mt-10 space-y-5">
            <li className="rounded-2xl border border-ivoire-froid/15 bg-nuit-profonde/50 p-5">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-feu-glow">
                1 · Numéros
              </p>
              <ul className="mt-4 space-y-4">
                {PAYMENT_NUMBERS.map((n) => (
                  <li key={n.digits}>
                    <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ivoire-froid/55">
                      {n.label}
                    </p>
                    <a
                      href={`tel:+${n.digits}`}
                      className="mt-1 block font-display text-[1.55rem] font-extrabold leading-none text-papier underline-offset-4 hover:text-feu-glow hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-feu min-[420px]:text-2xl"
                    >
                      {n.display}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="rounded-2xl border border-ivoire-froid/15 bg-nuit-profonde/50 p-5">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-feu-glow">
                2 · Motif
              </p>
              <p className="mt-2 text-lg font-bold text-papier">
                Soutien YUNA Festival 2026
              </p>
            </li>
            <li className="rounded-2xl border border-ivoire-froid/15 bg-nuit-profonde/50 p-5">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-feu-glow">
                3 · Confirmer (optionnel)
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ivoire-froid/75">
                Envoie une capture ou un message à{" "}
                <a
                  href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent("Soutien YUNA 2026")}`}
                  className="font-semibold text-feu-core underline underline-offset-4"
                >
                  {SITE_CONTACT.email}
                </a>{" "}
                pour le suivi.
              </p>
            </li>
          </ol>

          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <ButtonLink
              href={WHATSAPP_HREF}
              className="min-h-12 w-full !px-6 text-center min-[420px]:w-auto"
            >
              Confirmer via WhatsApp
            </ButtonLink>
            <ButtonLink
              href="/soutenir"
              variant="outline-light"
              className="min-h-12 w-full min-[420px]:w-auto"
            >
              Retour Soutenir
            </ButtonLink>
          </div>

          <p className="mt-8 text-sm text-ivoire-froid/55">
            Global Impact Ministries ·{" "}
            <Link href="/" className="underline underline-offset-4">
              festivalyuna.com
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
