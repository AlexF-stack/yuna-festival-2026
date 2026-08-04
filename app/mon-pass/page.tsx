import type { Metadata } from "next";
import Link from "next/link";

import { RecoverPassForm } from "@/components/pass/RecoverPassForm";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Retrouver mon pass",
  description:
    "Récupère ton pass QR YUNA Festival 2026 avec le numéro WhatsApp de ton inscription.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/mon-pass" },
  openGraph: {
    title: "Retrouver mon pass | YUNA Festival 2026",
    url: "https://yunafestival.com/mon-pass",
  },
};

export default function MonPassPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-nuage px-5 pb-16 pt-28 text-encre">
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu">
        Pass perdu ?
      </p>
      <h1 className="mt-3 text-center font-display text-[clamp(2.2rem,7vw,3.4rem)] font-extrabold uppercase leading-[0.95] text-bleu">
        Retrouver mon pass
      </h1>
      <p className="mt-4 max-w-md text-center text-[1.02rem] leading-relaxed text-charbon">
        Entre ton nom et le numéro WhatsApp utilisés à l&apos;inscription. On
        te réaffiche ton QR.
      </p>

      <div className="relative mt-10 w-full max-w-md">
        <RecoverPassForm />
      </div>

      <p className="mt-8 text-center text-sm text-charbon">
        Pas encore inscrit ?{" "}
        <Link
          href="/#inscription"
          className="font-bold text-bleu underline-offset-4 hover:underline"
        >
          Inscris-toi — pass QR gratuit
        </Link>
      </p>

      <ButtonLink href="/" variant="ghost" className="mt-6 !px-0">
        ← Retour au site
      </ButtonLink>
    </main>
  );
}
