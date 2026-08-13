"use client";

import { useEffect, useState } from "react";
import { toPng } from "html-to-image";

import { useMessages } from "@/components/i18n/LocaleProvider";
import { fill } from "@/lib/i18n";

type Caps = {
  wallet: { apple: boolean; google: boolean };
  messaging: { whatsapp: boolean; sms: boolean };
};

type PassActionsProps = {
  registrationId: string;
  shortId: string;
  /** Sélecteur CSS du ticket à exporter (défaut #yuna-pass-ticket). */
  ticketSelector?: string;
};

/**
 * Actions post-inscription : télécharger le ticket, Wallet, partage.
 */
export function PassActions({
  registrationId,
  shortId,
  ticketSelector = "#yuna-pass-ticket",
}: PassActionsProps) {
  const t = useMessages();
  const a = t.passActions;
  const [caps, setCaps] = useState<Caps | null>(null);
  const [shareHint, setShareHint] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/wallet/status")
      .then((r) => r.json())
      .then((json: Caps & { ok?: boolean }) => {
        if (!cancelled) {
          setCaps({
            wallet: json.wallet ?? { apple: false, google: false },
            messaging: json.messaging ?? { whatsapp: false, sms: false },
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCaps({
            wallet: { apple: false, google: false },
            messaging: { whatsapp: false, sms: false },
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function onDownloadTicket() {
    const node = document.querySelector(ticketSelector);
    if (!(node instanceof HTMLElement)) return;

    setDownloading(true);
    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#FFF8F1",
      });
      const link = document.createElement("a");
      link.download = `yuna-ticket-${shortId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("[pass] ticket export", err);
    } finally {
      setDownloading(false);
    }
  }

  async function onShare() {
    const url = `${window.location.origin}/confirmation/${registrationId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: a.shareTitle,
          text: a.shareText,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareHint(a.linkCopied);
      window.setTimeout(() => setShareHint(null), 2200);
    } catch {
      /* annulé */
    }
  }

  const messagingOn = Boolean(
    caps?.messaging.whatsapp || caps?.messaging.sms,
  );
  const channel = caps?.messaging.whatsapp ? "WhatsApp" : "SMS";

  return (
    <div className="mt-5 flex w-full max-w-[400px] flex-col gap-3">
      {messagingOn ? (
        <p className="rounded-2xl border border-vert/30 bg-vert/12 px-4 py-3 text-center text-sm leading-relaxed text-encre">
          <span className="font-bold text-vert">{a.confirmed}</span>
          {" — "}
          {fill(a.messageSent, { channel })}
        </p>
      ) : (
        <p className="text-center text-sm leading-relaxed text-charbon">
          {a.savePass}
        </p>
      )}

      <div className="grid gap-2 min-[420px]:grid-cols-2">
        {caps?.wallet.apple ? (
          <a
            href={`/api/wallet/apple/${registrationId}`}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-encre px-4 py-3 text-center text-sm font-bold text-papier transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu"
          >
            Apple Wallet
          </a>
        ) : null}
        {caps?.wallet.google ? (
          <a
            href={`/api/wallet/google/${registrationId}`}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-bleu px-4 py-3 text-center text-sm font-bold text-papier transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu"
          >
            Google Wallet
          </a>
        ) : null}
        <button
          type="button"
          onClick={() => void onDownloadTicket()}
          disabled={downloading}
          className="btn-cta-flame inline-flex min-h-12 items-center justify-center rounded-full px-4 py-3 text-center text-sm font-bold text-papier disabled:opacity-60 min-[420px]:col-span-2"
        >
          {downloading ? "…" : a.downloadPng}
        </button>
        <button
          type="button"
          onClick={() => void onShare()}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-bleu/25 bg-papier px-4 py-3 text-sm font-bold text-bleu min-[420px]:col-span-2"
        >
          {shareHint ?? a.share}
        </button>
      </div>
    </div>
  );
}
