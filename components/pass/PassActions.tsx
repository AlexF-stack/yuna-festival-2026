"use client";

import { useEffect, useState } from "react";

type Caps = {
  wallet: { apple: boolean; google: boolean };
  messaging: { whatsapp: boolean; sms: boolean };
};

type PassActionsProps = {
  registrationId: string;
  qrCodeDataUrl: string;
  shortId: string;
};

/**
 * Actions post-inscription : PNG, Apple/Google Wallet, partage natif.
 */
export function PassActions({
  registrationId,
  qrCodeDataUrl,
  shortId,
}: PassActionsProps) {
  const [caps, setCaps] = useState<Caps | null>(null);
  const [shareHint, setShareHint] = useState<string | null>(null);

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

  async function onShare() {
    const url = `${window.location.origin}/confirmation/${registrationId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Pass YUNA Festival 2026",
          text: "Mon pass QR YUNA",
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareHint("Lien copié");
      window.setTimeout(() => setShareHint(null), 2200);
    } catch {
      /* annulé */
    }
  }

  const messagingOn = Boolean(
    caps?.messaging.whatsapp || caps?.messaging.sms,
  );

  return (
    <div className="mt-5 flex w-full max-w-[420px] flex-col gap-3">
      {messagingOn ? (
        <p className="rounded-2xl border border-vert/30 bg-vert/12 px-4 py-3 text-center text-sm leading-relaxed text-encre">
          <span className="font-bold text-vert">Confirmé</span>
          {" — "}
          message envoyé par{" "}
          <strong>
            {caps?.messaging.whatsapp ? "WhatsApp" : "SMS"}
          </strong>
          . Garde aussi ce pass ci-dessous.
        </p>
      ) : (
        <p className="text-center text-sm leading-relaxed text-charbon">
          Enregistre ce pass (Wallet, PNG ou favori). Tu pourras aussi le
          retrouver via{" "}
          <span className="font-semibold text-encre">Mon pass</span>.
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
        <a
          href={qrCodeDataUrl}
          download={`yuna-pass-${shortId}.png`}
          className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-bleu px-4 py-3 text-center text-sm font-bold text-bleu transition-[background-color,color] hover:bg-bleu hover:text-papier focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu min-[420px]:col-span-2"
        >
          Télécharger le PNG
        </a>
        <button
          type="button"
          onClick={() => void onShare()}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-bleu/25 bg-papier px-4 py-3 text-sm font-bold text-bleu min-[420px]:col-span-2"
        >
          {shareHint ?? "Partager / copier le lien"}
        </button>
      </div>

      {caps && !caps.wallet.apple && !caps.wallet.google ? (
        <p className="text-center text-xs text-charbon/80">
          Wallet Apple/Google : active les certificats côté serveur (voir
          .env.example) pour les boutons « ajouter au wallet ».
        </p>
      ) : null}
    </div>
  );
}
