import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConfirmationClient } from "@/components/pass/ConfirmationClient";
import { getMessagingCapabilities } from "@/lib/messaging";
import { getRegistrationById } from "@/lib/registrations";

type ConfirmationPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ groupe?: string; wa?: string }>;
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
  const { groupe, wa } = await searchParams;

  let registration;
  try {
    registration = await getRegistrationById(id);
  } catch {
    registration = null;
  }

  if (!registration) notFound();

  const groupIds = (groupe ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x && x !== id);
  const messaging = getMessagingCapabilities();

  // Tout le monde rejoint le canal officiel ; le groupe ambassadeurs reste
  // accessible en lien secondaire depuis la confirmation.
  const whatsappTarget = wa ? ("channel" as const) : null;

  return (
    <ConfirmationClient
      registration={{
        id: registration.id,
        name: registration.name,
        qr_code: registration.qr_code,
        registration_type: registration.registration_type,
      }}
      groupIds={groupIds}
      messagingAny={messaging.any}
      whatsappTarget={whatsappTarget}
    />
  );
}
