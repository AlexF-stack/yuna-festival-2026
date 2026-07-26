import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { getRegistrationById } from "@/lib/registrations";

type ConfirmationPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Ton pass QR",
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage({
  params,
}: ConfirmationPageProps) {
  const { id } = await params;

  let registration;
  try {
    registration = await getRegistrationById(id);
  } catch {
    registration = null;
  }

  if (!registration) notFound();

  const shortId = registration.id.slice(0, 8).toUpperCase();

  return (
    <main className="flex min-h-dvh flex-col items-center bg-nuage px-5 pb-16 pt-28 text-encre">
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu">
        Inscription confirmée
      </p>
      <h1 className="mt-3 text-center font-display text-[clamp(2.4rem,8vw,3.8rem)] font-extrabold uppercase leading-[0.95] text-bleu">
        Ton pass YUNA
      </h1>
      <p className="mt-4 max-w-md text-center text-[1.02rem] leading-relaxed text-charbon">
        Présente ce QR à l&apos;entrée. Garde une capture sur ton téléphone.
      </p>

      <article className="mt-10 w-full max-w-[420px] overflow-hidden rounded-3xl border border-bleu/15 bg-papier shadow-[0_20px_50px_rgba(0,90,140,0.12)]">
        <header className="bg-gradient-to-r from-bleu to-bleu-fonce px-6 py-5 text-papier">
          <p className="font-display text-2xl font-extrabold uppercase leading-none">
            YUNA · 2026
          </p>
          <p className="mt-1.5 text-sm font-medium text-papier/85">
            Bénin Debout · 5–6 sept · Midombo
          </p>
        </header>

        <div className="flex flex-col items-center px-6 py-8">
          <div className="rounded-2xl border border-bleu/10 bg-nuage p-3">
            <Image
              src={registration.qr_code}
              alt={`QR code pass ${registration.name}`}
              width={280}
              height={280}
              unoptimized
              className="h-auto w-[min(70vw,280px)]"
              priority
            />
          </div>

          <p className="mt-5 font-display text-[1.4rem] font-extrabold uppercase text-bleu">
            {registration.name}
          </p>
          <p className="mt-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-feu">
            Entrée libre
          </p>
          <p className="mt-3 font-mono text-sm text-charbon">
            YUNA-{shortId}
          </p>
        </div>

        <footer className="flex items-center justify-between border-t border-bleu/10 px-6 py-4 text-sm text-charbon">
          <span>
            Entrée <strong className="text-feu">LIBRE</strong>
          </span>
          <span className="font-mono text-xs tracking-wider">Ésaïe 60:1</span>
        </footer>
      </article>

      <a
        href={registration.qr_code}
        download={`yuna-pass-${shortId}.png`}
        className="mt-5 inline-flex w-full max-w-[420px] items-center justify-center rounded-full border-2 border-bleu px-4 py-3.5 font-bold text-bleu transition-[background-color,color] duration-200 hover:bg-bleu hover:text-papier focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu"
      >
        Télécharger mon pass (PNG)
      </a>

      <ButtonLink href="/#inscription" variant="ghost" className="mt-6 !px-0">
        ← Retour au site
      </ButtonLink>
    </main>
  );
}
