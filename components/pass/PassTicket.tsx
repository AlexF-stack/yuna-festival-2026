import { FESTIVAL } from "@/lib/festival";
import {
  displayPassName,
  passStubHint,
  passTypeLabel,
  passWhenLine,
} from "@/lib/pass-copy";
import type { RegistrationType } from "@/lib/registration-types";

type PassTicketProps = {
  name: string;
  qrCode: string;
  registrationId: string;
  registrationType: RegistrationType;
};

/**
 * Ticket officiel YUNA — format billet à talon (corps + stub QR).
 * `id="yuna-pass-ticket"` sert à l’export PNG.
 * Images en `<img>` natif : html-to-image rate souvent les wrappers next/image.
 */
export function PassTicket({
  name,
  qrCode,
  registrationId,
  registrationType,
}: PassTicketProps) {
  const shortId = registrationId.slice(0, 8).toUpperCase();
  const typeLabel = passTypeLabel(registrationType);
  const shownName = displayPassName(name);

  return (
    <article
      id="yuna-pass-ticket"
      className="pass-ticket w-full max-w-[560px] rounded-[1.25rem] bg-nuit-profonde p-4 shadow-[0_28px_70px_rgba(0,20,40,0.35)] sm:p-5"
      aria-label={`Ticket YUNA de ${shownName}`}
    >
      <div className="relative flex min-h-[176px] overflow-hidden rounded-[1rem] sm:min-h-[204px]">
        <div className="relative flex min-w-0 flex-[1.65] flex-col justify-between bg-gradient-to-br from-bleu-fonce via-bleu to-[#005a94] px-4 py-4 text-papier sm:px-5 sm:py-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 46%, rgba(255,255,255,0.55) 49%, transparent 52%), linear-gradient(45deg, transparent 46%, rgba(255,255,255,0.35) 49%, transparent 52%)",
              backgroundSize: "18px 18px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-feu/35 blur-3xl"
          />

          <div className="relative z-10 flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/yuna-mark.webp"
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
            />
            <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.22em] text-jaune sm:text-[0.62rem]">
              YUNA Festival
            </p>
          </div>

          <div className="relative z-10 mt-4 sm:mt-5">
            <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-jaune">
              {typeLabel}
            </p>
            <h2 className="mt-1.5 font-display text-[clamp(1.05rem,4.4vw,1.95rem)] font-extrabold leading-[1.08] tracking-tight text-papier break-words">
              {shownName}
            </h2>
          </div>

          <p className="relative z-10 mt-3 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-jaune sm:text-[0.65rem]">
            {passWhenLine(registrationType)}
          </p>
        </div>

        <div
          aria-hidden
          className="relative z-20 w-0 shrink-0 border-l border-dashed border-nuit-profonde/35"
        >
          <span className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nuit-profonde" />
          <span className="absolute bottom-0 left-1/2 size-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-nuit-profonde" />
        </div>

        <div className="relative flex w-[38%] min-w-[108px] flex-col items-center justify-between bg-papier px-2 py-3 text-center sm:min-w-[140px] sm:px-3 sm:py-4">
          <div className="w-full rounded-lg bg-papier p-1.5 ring-1 ring-bleu/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrCode}
              alt={`QR code ticket ${shownName}`}
              width={160}
              height={160}
              className="mx-auto h-auto w-full max-w-[112px] sm:max-w-[128px]"
            />
          </div>

          <div className="mt-2 w-full">
            <p className="font-display text-[0.62rem] font-extrabold uppercase leading-snug text-bleu break-words sm:text-[0.78rem]">
              {typeLabel}
            </p>
            <p className="mt-0.5 text-[0.62rem] leading-snug text-charbon/75 sm:text-[0.68rem]">
              {passStubHint(registrationType)}
            </p>
          </div>

          <div className="mt-2 w-full border-t border-bleu/10 pt-2">
            <p className="font-mono text-[0.52rem] font-bold uppercase tracking-[0.12em] text-charbon/55">
              YUNA {FESTIVAL.edition} · {shortId}
            </p>
            <p className="mt-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-wide text-vert">
              {FESTIVAL.freeEntry}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
