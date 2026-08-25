"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  /** Après inscription : redirection WhatsApp (canal ou groupe bénévoles). */
  whatsappTarget?: WhatsappTarget | null;
};

const WA_REDIRECT_MS = 2800;

export function ConfirmationClient({
  registration,
  groupIds,
  messagingAny,
  whatsappTarget = null,
}: ConfirmationClientProps) {
  const t = useMessages();
  const c = t.confirmation;
  const shortId = registration.id.slice(0, 8).toUpperCase();
  const joinWhatsapp = Boolean(whatsappTarget);
  const waUrl =
    whatsappTarget === "volunteers"
      ? WHATSAPP_VOLUNTEERS_GROUP_URL
      : WHATSAPP_CHANNEL_URL;
  const waCta =
    whatsappTarget === "volunteers" ? c.volunteersCta : c.channelCta;
  const waRedirect =
    whatsappTarget === "volunteers"
      ? c.volunteersRedirect
      : c.channelRedirect;

  const [secondsLeft, setSecondsLeft] = useState(
    joinWhatsapp ? Math.ceil(WA_REDIRECT_MS / 1000) : 0,
  );

  useEffect(() => {
    if (!joinWhatsapp) return;

    const started = Date.now();
    const tick = window.setInterval(() => {
      const left = Math.max(
        0,
        Math.ceil((WA_REDIRECT_MS - (Date.now() - started)) / 1000),
      );
      setSecondsLeft(left);
    }, 200);

    const redirect = window.setTimeout(() => {
      window.location.assign(waUrl);
    }, WA_REDIRECT_MS);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(redirect);
    };
  }, [joinWhatsapp, waUrl]);

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

      {joinWhatsapp ? (
        <div className="mt-6 w-full max-w-[420px] rounded-2xl border border-vert/30 bg-vert/10 px-4 py-4 text-center">
          <p className="text-sm font-semibold text-encre">{waRedirect}</p>
          {secondsLeft > 0 ? (
            <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wide text-charbon">
              {fill(c.channelCountdown, { n: secondsLeft })}
            </p>
          ) : null}
          <a
            href={waUrl}
            className="btn-cta-flame mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-base font-extrabold uppercase tracking-[0.04em] text-papier"
          >
            {waCta}
          </a>
        </div>
      ) : (
        <a
          href={
            registration.registration_type === "ambassadeur" ||
            registration.registration_type === "benevole"
              ? WHATSAPP_VOLUNTEERS_GROUP_URL
              : WHATSAPP_CHANNEL_URL
          }
          className="btn-cta-flame mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-7 text-base font-extrabold uppercase tracking-[0.04em] text-papier"
        >
          {registration.registration_type === "ambassadeur" ||
          registration.registration_type === "benevole"
            ? c.volunteersCta
            : c.channelCta}
        </a>
      )}

      {groupIds.length > 0 ? (
        <div className="mt-6 w-full max-w-[420px] rounded-2xl border border-bleu/15 bg-papier p-4 text-sm text-charbon">
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

      <div className="mt-10 w-full max-w-[560px]">
        <PassTicket
          name={registration.name}
          qrCode={registration.qr_code}
          registrationId={registration.id}
          registrationType={registration.registration_type}
        />
      </div>

      <PassActions
        registrationId={registration.id}
        shortId={shortId}
      />

      <p className="mt-6 text-center text-sm text-charbon">
        {c.lostLink}{" "}
        <Link
          href="/mon-pass"
          className="font-bold text-bleu underline-offset-4 hover:underline"
        >
          {c.recover}
        </Link>
      </p>

      <ButtonLink href="/#inscription" variant="ghost" className="mt-6 !px-0">
        {t.common.backHome}
      </ButtonLink>
    </main>
  );
}
