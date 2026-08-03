import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PassTicket } from "@/components/pass/PassTicket";
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

      <div className="mt-10 w-full max-w-[420px]">
        <PassTicket
          name={registration.name}
          qrCode={registration.qr_code}
          registrationId={registration.id}
          registrationType={registration.registration_type}
        />
      </div>

      <a
        href={registration.qr_code}
        download={`yuna-pass-${shortId}.png`}
        className="mt-5 inline-flex w-full max-w-[420px] items-center justify-center rounded-full border-2 border-bleu px-4 py-3.5 font-bold text-bleu transition-[background-color,color] duration-200 hover:bg-bleu hover:text-papier focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu"
      >
        Télécharger mon pass (PNG)
      </a>

      <p className="mt-6 text-center text-sm text-charbon">
        Tu perds ce lien ?{" "}
        <Link
          href="/mon-pass"
          className="font-bold text-bleu underline-offset-4 hover:underline"
        >
          Retrouve ton pass
        </Link>
      </p>

      <ButtonLink href="/#inscription" variant="ghost" className="mt-6 !px-0">
        ← Retour au site
      </ButtonLink>
    </main>
  );
}
