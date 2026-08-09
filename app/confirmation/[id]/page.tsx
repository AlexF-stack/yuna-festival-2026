import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PassActions } from "@/components/pass/PassActions";
import { PassTicket } from "@/components/pass/PassTicket";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getMessagingCapabilities } from "@/lib/messaging";
import { getRegistrationById } from "@/lib/registrations";

type ConfirmationPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ groupe?: string }>;
};

export const metadata: Metadata = {
  title: "Ton pass QR",
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage({
  params,
  searchParams,
}: ConfirmationPageProps) {
  const { id } = await params;
  const { groupe } = await searchParams;

  let registration;
  try {
    registration = await getRegistrationById(id);
  } catch {
    registration = null;
  }

  if (!registration) notFound();

  const shortId = registration.id.slice(0, 8).toUpperCase();
  const groupIds = (groupe ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x && x !== id);
  const messaging = getMessagingCapabilities();

  return (
    <main
      id="contenu"
      className="flex min-h-dvh flex-col items-center bg-nuage px-5 pb-16 pt-28 text-encre"
    >
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu">
        Inscription confirmée
      </p>
      <h1 className="mt-3 text-center font-display text-[clamp(2.4rem,8vw,3.8rem)] font-extrabold uppercase leading-[0.95] text-bleu">
        Ton pass YUNA
      </h1>
      <p className="mt-4 max-w-md text-center text-[1.02rem] leading-relaxed text-charbon">
        Présente ce QR (ou ton Wallet) à l&apos;entrée.
        {messaging.any
          ? " Un message de confirmation part aussi automatiquement sur ton téléphone."
          : " Ajoute-le à ton Wallet ou télécharge le PNG pour le retrouver facilement."}
      </p>

      {groupIds.length > 0 ? (
        <div className="mt-6 w-full max-w-[420px] rounded-2xl border border-bleu/15 bg-papier p-4 text-sm text-charbon">
          <p className="font-semibold text-encre">
            Groupe : {groupIds.length + 1} pass créés
          </p>
          <p className="mt-2">
            Voici ton pass. Les autres pass du groupe :
          </p>
          <ul className="mt-2 space-y-1">
            {groupIds.map((gid, i) => (
              <li key={gid}>
                <Link
                  href={`/confirmation/${gid}`}
                  className="font-bold text-bleu underline-offset-4 hover:underline"
                >
                  Pass n°{i + 2} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-10 w-full max-w-[420px]">
        <PassTicket
          name={registration.name}
          qrCode={registration.qr_code}
          registrationId={registration.id}
          registrationType={registration.registration_type}
        />
      </div>

      <PassActions
        registrationId={registration.id}
        qrCodeDataUrl={registration.qr_code}
        shortId={shortId}
      />

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
