import type { Metadata } from "next";
import Link from "next/link";

import { SITE_CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merci pour ton soutien · YUNA 2026",
  description: "Ton soutien à YUNA Festival 2026 a bien été enregistré.",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function SoutenirMerciPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const statusRaw = params.status;
  const status = Array.isArray(statusRaw) ? statusRaw[0] : statusRaw;
  const approved =
    !status ||
    status === "approved" ||
    status === "approved_partially" ||
    status === "transferred";

  return (
    <main className="section-pad min-h-[70vh] bg-bleu text-papier">
      <div className="section-container max-w-xl px-5 pt-32">
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu-core">
          Soutenir · YUNA 2026
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.2rem,6vw,3.4rem)] font-extrabold uppercase leading-none">
          {approved ? "Merci" : "Paiement interrompu"}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-papier/80">
          {approved
            ? "Ton flamme est allumée. Chaque franc va sur le terrain — sono, scène, masterclass. On te recontacte si besoin sur ton e-mail."
            : "Le paiement n’a pas été finalisé. Tu peux réessayer quand tu veux, ou écrire à l’équipe."}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/soutenir"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-feu px-7 py-3 text-sm font-bold uppercase tracking-wide text-papier"
          >
            {approved ? "Retour soutenir" : "Réessayer"}
          </Link>
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-papier/25 px-7 py-3 text-sm font-bold uppercase tracking-wide text-papier"
          >
            {SITE_CONTACT.email}
          </a>
        </div>
      </div>
    </main>
  );
}
