"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  DONATE,
  ORGANIZER,
  SUPPORT_AMOUNTS_FCFA,
} from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM, EASE_YUNA } from "@/lib/motion";
import { SITE_CONTACT, getWhatsAppHref } from "@/lib/site";

function formatFcfa(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

function buildSupportMailto(amount: number | null): string {
  const fedapay = process.env.NEXT_PUBLIC_FEDAPAY_DONATE_URL?.trim();
  if (fedapay) return fedapay;
  const subject = encodeURIComponent(
    amount
      ? `Soutenir YUNA 2026 — ${amount} FCFA`
      : "Soutenir YUNA Festival 2026",
  );
  const body = encodeURIComponent(
    amount
      ? `Bonjour,\n\nJe souhaite soutenir YUNA Festival 2026 à hauteur de ${amount} FCFA.\nNom :\nTéléphone :\n\nMerci.`
      : `Bonjour,\n\nJe souhaite soutenir YUNA Festival 2026.\nMontant :\nNom :\nTéléphone :\n\nMerci.`,
  );
  return `mailto:${SITE_CONTACT.email}?subject=${subject}&body=${body}`;
}

/**
 * Page Soutenir — charte YUNA (PageIntro bleu + CTA feu),
 * avec chemins de soutien + montants libres.
 */
export function DonatePageContent() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(
    SUPPORT_AMOUNTS_FCFA[2],
  );
  const [custom, setCustom] = useState("");
  const whatsapp = getWhatsAppHref();

  const amount = useMemo(() => {
    const raw = custom.replace(/\D/g, "");
    if (raw) {
      const n = Number(raw);
      return Number.isFinite(n) && n > 0 ? n : null;
    }
    return selected;
  }, [custom, selected]);

  const seedHref = buildSupportMailto(amount);

  return (
    <>
      <section
        data-tone="bleu"
        data-nav-tone="bleu"
        className="relative overflow-hidden bg-bleu pb-16 pt-40 text-papier min-[760px]:pb-20 min-[760px]:pt-44"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--feu)_35%,transparent),transparent_55%),radial-gradient(ellipse_at_90%_80%,color-mix(in_srgb,var(--jaune)_18%,transparent),transparent_50%)]"
        />
        <div className="section-container relative z-10 px-5 min-[760px]:px-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="max-w-2xl"
          >
            <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-jaune">
              Soutenir · {FESTIVAL.brandFull} {FESTIVAL.edition}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.2rem)] font-extrabold uppercase leading-[0.95] text-papier">
              {DONATE.pageTitle.replace(/\s+(\S+)$/, "")}{" "}
              <span className="text-jaune">
                {DONATE.pageTitle.match(/\S+$/)?.[0] ?? ""}
              </span>
            </h1>
            <p className="mt-6 text-[1.12rem] leading-relaxed text-papier/88">
              {DONATE.pageLead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#semer">
                Soutenir maintenant →
              </ButtonLink>
              <ButtonLink href="#partenariat-grille" variant="outline-light">
                Partenariat
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        data-tone="papier"
        data-nav-tone="papier"
        className="section-pad bg-papier"
      >
        <div className="section-container">
          <div className="grid gap-5 min-[880px]:grid-cols-3">
            {DONATE.paths.map((path, i) => (
              <motion.article
                key={path.id}
                id={path.id === "partenariat" ? "partenariat" : undefined}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.5,
                  ease: EASE_YUNA,
                  delay: reduce ? 0 : i * 0.06,
                }}
                className="flex flex-col rounded-3xl border border-bleu/12 bg-papier p-6 shadow-[0_14px_40px_rgba(255,77,0,0.06)]"
              >
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-feu">
                  0{i + 1}
                </p>
                <h2
                  className={`mt-3 font-display text-2xl font-extrabold uppercase ${
                    i % 3 === 0
                      ? "text-bleu"
                      : i % 3 === 1
                        ? "text-feu"
                        : "text-encre"
                  }`}
                >
                  {path.title}
                </h2>
                <p className="mt-3 flex-1 text-[1.02rem] leading-relaxed text-charbon">
                  {path.text}
                </p>
                <ButtonLink href={path.href} className="mt-6 w-full">
                  {path.cta}
                </ButtonLink>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="semer"
        data-tone="feu-soft"
        data-nav-tone="feu-soft"
        className="section-pad bg-logo-feu-soft"
      >
        <div className="section-container">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: EASE_YUNA }}
            className="mx-auto max-w-xl"
          >
            <p className="text-center font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
              Don libre
            </p>
            <h2 className="mt-3 text-center font-display text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold uppercase leading-[1.05] text-encre">
              {DONATE.seedTitle.replace(/\s+(\S+)$/, "")}{" "}
              <span className="text-feu">
                {DONATE.seedTitle.match(/\S+$/)?.[0] ?? ""}
              </span>
            </h2>
            <p className="mt-3 text-center text-[1.05rem] text-charbon">
              {DONATE.seedLead}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {SUPPORT_AMOUNTS_FCFA.map((value) => {
                const active = !custom && selected === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setSelected(value);
                      setCustom("");
                    }}
                    className={`min-h-11 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                      active
                        ? "btn-cta-flame text-papier"
                        : "border border-bleu/20 bg-papier text-encre hover:border-feu/50"
                    }`}
                  >
                    {formatFcfa(value)}
                  </button>
                );
              })}
            </div>

            <label className="mt-5 block">
              <span className="sr-only">{DONATE.customAmountPh}</span>
              <input
                type="number"
                min={1}
                inputMode="numeric"
                placeholder={DONATE.customAmountPh}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                className="w-full rounded-2xl border border-bleu/15 bg-papier px-4 py-3.5 text-base text-encre outline-none focus:border-feu focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--feu)_18%,transparent)]"
              />
            </label>

            <a
              href={seedHref}
              className="btn-cta-flame mt-6 flex min-h-12 w-full items-center justify-center rounded-full px-4 py-3.5 text-[1.02rem] font-bold text-papier ring-2 ring-[color-mix(in_srgb,var(--feu-glow)_50%,transparent)] transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-feu"
            >
              {DONATE.seedCta}
              {amount ? ` · ${formatFcfa(amount)}` : ""}
            </a>

            <p className="mt-4 text-center text-sm text-charbon">
              Mobile Money / virement : écris à{" "}
              <a
                href={DONATE.href}
                className="font-semibold text-feu underline decoration-feu/40 underline-offset-4 hover:decoration-feu"
              >
                {SITE_CONTACT.email}
              </a>
              {whatsapp ? (
                <>
                  {" "}
                  ou{" "}
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-vert underline underline-offset-4"
                  >
                    WhatsApp
                  </a>
                </>
              ) : null}
              . L&apos;équipe {ORGANIZER.name} te guide.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        data-tone="papier"
        data-nav-tone="papier"
        className="section-pad bg-papier"
      >
        <div className="section-container">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: EASE_YUNA }}
          >
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
              Budget réel · Midombo 2026
            </p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold uppercase leading-[1.05] text-bleu">
              Où va chaque <span className="text-feu">franc</span>
            </h2>
          </motion.div>

          <ul className="mt-12 grid gap-10 min-[760px]:grid-cols-3 min-[760px]:gap-8">
            {DONATE.pillars.map((pillar, i) => (
              <motion.li
                key={pillar.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  ease: EASE_YUNA,
                  delay: reduce ? 0 : i * 0.08,
                }}
              >
                <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-feu">
                  0{i + 1}
                </p>
                <h3
                  className={`mt-3 font-display text-2xl font-extrabold uppercase ${
                    i % 3 === 0
                      ? "text-bleu"
                      : i % 3 === 1
                        ? "text-feu"
                        : "text-encre"
                  }`}
                >
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-charbon">
                  {pillar.text}
                </p>
              </motion.li>
            ))}
          </ul>

          <p className="mt-12 text-center text-sm text-charbon/80">
            {FESTIVAL.datesShort} · {FESTIVAL.venue}, {FESTIVAL.city}
          </p>
        </div>
      </section>
    </>
  );
}
