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

/**
 * Ticket officiel YUNA — généré à l’inscription (QR + identité festival).
 * `id="yuna-pass-ticket"` sert à l’export PNG.
 */
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
      id="yuna-pass-ticket"
      className="pass-ticket relative w-full max-w-[400px] overflow-hidden rounded-[1.35rem] bg-papier text-encre shadow-[0_28px_70px_rgba(0,70,120,0.22)] ring-1 ring-bleu/10"
      aria-label={`Ticket YUNA de ${name}`}
    >
      {/* En-tête marque */}
      <header className="relative overflow-hidden bg-gradient-to-br from-nuit-profonde via-bleu-fonce to-bleu px-5 pb-5 pt-5 text-papier">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-feu/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 left-0 h-32 w-32 rounded-full bg-jaune/20 blur-3xl"
        />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-papier/10 ring-2 ring-feu/50">
              <Image
                src="/brand/yuna-mark.png"
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
                unoptimized
              />
            </span>
            <div>
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-feu-glow">
                Ticket officiel
              </p>
              <h2 className="mt-0.5 font-display text-[1.85rem] font-extrabold uppercase leading-[0.9] tracking-tight">
                YUNA{" "}
                <span className="bg-gradient-to-r from-feu-glow via-feu-core to-feu bg-clip-text text-transparent">
                  {FESTIVAL.edition}
                </span>
              </h2>
            </div>
          </div>
          <div className="shrink-0 rounded-xl border border-papier/20 bg-papier/10 px-2.5 py-2 text-center backdrop-blur-sm">
            <p className="font-mono text-[0.7rem] font-bold tabular-nums leading-none">
              05–06
            </p>
            <p className="mt-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-feu-glow">
              Sept
            </p>
          </div>
        </div>

        <p className="relative z-10 mt-4 font-display text-[1.05rem] font-extrabold uppercase leading-none tracking-wide text-papier">
          {FESTIVAL.theme}
        </p>
        <p className="relative z-10 mt-1.5 text-sm text-papier/75">
          {FESTIVAL.venue}, {FESTIVAL.city} · Ouverture {FESTIVAL.siteOpens}
        </p>
      </header>

      <div
        aria-hidden
        className="flag-stripe flex h-1.5 w-full"
      >
        <span className="flex-1 bg-vert" />
        <span className="flex-1 bg-jaune" />
        <span className="flex-1 bg-rouge" />
      </div>

      {/* Perforation */}
      <div className="relative h-5 bg-papier" aria-hidden>
        <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-bleu/30" />
        <span className="absolute left-0 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nuage" />
        <span className="absolute right-0 top-1/2 size-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-nuage" />
      </div>

      <div className="px-5 pb-2 pt-1">
        <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-charbon/70">
          Titulaire
        </p>
        <p className="mt-1 font-display text-[clamp(1.55rem,6vw,2.05rem)] font-extrabold uppercase leading-[0.95] text-bleu">
          {name}
        </p>
        <p className="mt-3 inline-flex rounded-full bg-gradient-to-r from-feu/15 to-feu/5 px-3.5 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-feu">
          {typeLabel}
        </p>
      </div>

      {/* QR intégré */}
      <div className="mx-5 mt-4 mb-2 rounded-2xl border border-bleu/12 bg-gradient-to-b from-nuage to-papier p-4">
        <div className="mx-auto w-fit rounded-xl bg-papier p-2.5 shadow-[0_8px_24px_rgba(0,90,140,0.1)] ring-1 ring-bleu/8">
          <Image
            src={qrCode}
            alt={`QR code ticket ${name}`}
            width={220}
            height={220}
            unoptimized
            className="h-auto w-[min(58vw,220px)]"
            priority
          />
        </div>
        <p className="mt-3 text-center font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-bleu">
          À scanner à l&apos;entrée
        </p>
      </div>

      <div className="flex items-center justify-between px-5 py-3">
        <div>
          <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-charbon/60">
            N° ticket
          </p>
          <p className="mt-0.5 font-mono text-sm font-bold tracking-wider text-encre">
            YUNA-{shortId}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-charbon/60">
            Accès
          </p>
          <p className="mt-0.5 font-mono text-sm font-bold uppercase tracking-wide text-vert">
            {FESTIVAL.freeEntry}
          </p>
        </div>
      </div>

      <footer className="flex items-center justify-between bg-gradient-to-r from-bleu to-bleu-fonce px-5 py-3.5 text-sm text-papier">
        <span className="font-bold tracking-wide">
          Présente ce ticket · QR
        </span>
        <span className="font-mono text-xs tracking-wider text-papier/80">
          Ésaïe 60:1
        </span>
      </footer>
    </article>
  );
}
