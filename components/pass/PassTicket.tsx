import Image from "next/image";

import { FESTIVAL } from "@/lib/festival";
import {
  REGISTRATION_TYPE_LABELS,
  type RegistrationType,
} from "@/lib/registration-types";

type PassTicketProps = {
  name: string;
  qrCode: string;
  registrationId: string;
  registrationType: RegistrationType;
};

export function PassTicket({
  name,
  qrCode,
  registrationId,
  registrationType,
}: PassTicketProps) {
  const shortId = registrationId.slice(0, 8).toUpperCase();
  const typeLabel = REGISTRATION_TYPE_LABELS[registrationType];

  return (
    <article
      className="pass-ticket relative w-full max-w-[420px] overflow-hidden bg-papier text-encre shadow-[0_24px_60px_rgba(0,90,140,0.14)]"
      aria-label={`Pass YUNA de ${name}`}
    >
      {/* Bandeau type « Save the Date » */}
      <header className="relative bg-papier px-6 pb-4 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] text-feu">
              Pass officiel
            </p>
            <h2 className="mt-1 font-display text-[clamp(1.85rem,7vw,2.45rem)] font-extrabold uppercase leading-[0.9] text-bleu">
              YUNA {FESTIVAL.edition}
            </h2>
          </div>
          <p className="shrink-0 text-right font-mono text-[0.68rem] font-bold uppercase leading-tight tracking-wider text-charbon">
            05 &amp; 06
            <br />
            <span className="text-feu">sept</span>
          </p>
        </div>
        <p className="mt-3 text-sm font-medium text-charbon">
          {FESTIVAL.theme} · {FESTIVAL.venue}, {FESTIVAL.city}
        </p>
      </header>

      {/* Perforation */}
      <div
        className="relative h-4 bg-papier"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-bleu/25" />
        <span className="absolute left-0 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nuage" />
        <span className="absolute right-0 top-1/2 size-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-nuage" />
      </div>

      <div className="flex flex-col items-center px-6 pb-6 pt-2">
        <div className="rounded-xl border border-bleu/12 bg-nuage/60 p-3">
          <Image
            src={qrCode}
            alt={`QR code pass ${name}`}
            width={260}
            height={260}
            unoptimized
            className="h-auto w-[min(68vw,260px)]"
            priority
          />
        </div>

        <p className="mt-5 text-center font-display text-[1.35rem] font-extrabold uppercase leading-tight text-bleu">
          {name}
        </p>
        <p className="mt-2 rounded-full bg-feu/10 px-3 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-feu">
          {typeLabel}
        </p>
        <p className="mt-3 font-mono text-sm tracking-wide text-charbon">
          YUNA-{shortId}
        </p>
      </div>

      <footer className="flex items-center justify-between bg-bleu px-6 py-4 text-sm text-papier">
        <span>
          Entrée <strong className="tracking-wide">{FESTIVAL.freeEntry.toUpperCase()}</strong>
        </span>
        <span className="font-mono text-xs tracking-wider text-papier/80">
          Ésaïe 60:1
        </span>
      </footer>
    </article>
  );
}
