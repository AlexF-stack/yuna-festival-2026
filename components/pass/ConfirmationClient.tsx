"use client";

import Link from "next/link";

import { PassActions } from "@/components/pass/PassActions";
import { PassTicket } from "@/components/pass/PassTicket";
import { useMessages } from "@/components/i18n/LocaleProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { fill } from "@/lib/i18n";
import type { RegistrationType } from "@/lib/registration-types";
import {
  WHATSAPP_CHANNEL_URL,
  WHATSAPP_VOLUNTEERS_GROUP_URL,
} from "@/lib/site";

type WhatsappTarget = "channel" | "volunteers";

type ConfirmationClientProps = {
  registration: {
    id: string;
    name: string;
    qr_code: string;
    registration_type: RegistrationType;
  };
  groupIds: string[];
  messagingAny: boolean;
  /** Après inscription : CTA WhatsApp mis en avant (sans redirection auto). */
  whatsappTarget?: WhatsappTarget | null;
};

export function ConfirmationClient({
  registration,
  groupIds,
  messagingAny,
  whatsappTarget = null,
}: ConfirmationClientProps) {
  const t = useMessages();
  const c = t.confirmation;
  const shortId = registration.id.slice(0, 8).toUpperCase();
  const highlightWhatsapp = Boolean(whatsappTarget);
  const waUrl =
    whatsappTarget === "volunteers"
      ? WHATSAPP_VOLUNTEERS_GROUP_URL
      : WHATSAPP_CHANNEL_URL;
  const waCta =
    whatsappTarget === "volunteers" ? c.volunteersCta : c.channelCta;
  const isAmbassador =
    registration.registration_type === "ambassadeur" ||
    registration.registration_type === "benevole";

  return (
    <main
      id="contenu"
      className="flex min-h-dvh flex-col items-center bg-papier px-5 pb-16 pt-28 text-encre"
    >
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu">
        {c.eyebrow}
      </p>
      <h1 className="mt-3 text-center font-display text-[clamp(2.4rem,8vw,3.8rem)] font-extrabold uppercase leading-[0.95] text-bleu">
        {c.title}
      </h1>
      <p className="mt-4 max-w-md text-center text-[1.02rem] leading-relaxed text-charbon">
        {messagingAny ? c.leadMessaging : c.leadSave}
      </p>

      {groupIds.length > 0 ? (
        <div className="mt-6 w-full max-w-[560px] rounded-2xl border border-bleu/15 bg-papier p-4 text-sm text-charbon">
          <p className="font-semibold text-encre">
            {fill(c.groupTitle, { n: groupIds.length + 1 })}
          </p>
          <p className="mt-2">{c.groupBody}</p>
          <ul className="mt-2 space-y-1">
            {groupIds.map((gid, i) => (
              <li key={gid}>
                <Link
                  href={`/confirmation/${gid}`}
                  className="font-bold text-bleu underline-offset-4 hover:underline"
                >
                  {fill(c.passN, { n: i + 2 })}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 w-full max-w-[560px]">
        <PassTicket
          name={registration.name}
          qrCode={registration.qr_code}
          registrationId={registration.id}
          registrationType={registration.registration_type}
        />
      </div>

      <PassActions registrationId={registration.id} shortId={shortId} />

      <div
        className={`mt-8 w-full max-w-[560px] rounded-2xl px-4 py-4 text-center ${
          highlightWhatsapp
            ? "border border-vert/30 bg-vert/10"
            : "border border-bleu/12 bg-papier"
        }`}
      >
        <p className="text-sm leading-relaxed text-charbon">
          {c.channelAfterTicket}
        </p>
        <a
          href={waUrl}
          className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-vert/40 bg-vert px-6 text-base font-extrabold uppercase tracking-[0.04em] text-papier"
        >
          {waCta}
        </a>
        {isAmbassador ? (
          <a
            href={WHATSAPP_VOLUNTEERS_GROUP_URL}
            className="mt-3 inline-block text-sm font-bold text-bleu underline underline-offset-4"
          >
            {c.volunteersCta}
          </a>
        ) : null}
      </div>

      <p className="mt-6 text-center text-sm text-charbon">
        {c.lostLink}{" "}
        <Link
          href="/mon-pass"
          className="font-bold text-bleu underline-offset-4 hover:underline"
        >
          {c.recover}
        </Link>
      </p>

      <ButtonLink href="/" variant="ghost" className="mt-6 !px-0">
        {t.common.backHome}
      </ButtonLink>
    </main>
  );
}
