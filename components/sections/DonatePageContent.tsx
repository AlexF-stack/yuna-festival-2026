"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  DONATE,
  ORGANIZER,
  SUPPORT_FLAMES,
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
      ? `Soutenir YUNA 2026, ${amount} FCFA`
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
 * Page Soutenir — composition festival (pas un widget don générique).
 * Échelle de flammes + bandeau nuit Midombo.
 */
export function DonatePageContent() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(
    SUPPORT_FLAMES[2].amount,
  );
  const [custom, setCustom] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [sendStatus, setSendStatus] = useState<
    "idle" | "sending" | "ok" | "error"
  >("idle");
  const [sendError, setSendError] = useState("");
  const whatsapp = getWhatsAppHref();

  const amount = useMemo(() => {
    const raw = custom.replace(/\D/g, "");
    if (raw) {
      const n = Number(raw);
      return Number.isFinite(n) && n > 0 ? n : null;
    }
    return selected;
  }, [custom, selected]);

  const activeFlame = useMemo(
    () => SUPPORT_FLAMES.find((f) => f.amount === amount) ?? null,
    [amount],
  );

  const seedHref = buildSupportMailto(amount);
  const isMailtoSeed = seedHref.startsWith("mailto:");
  const flameIndex = activeFlame
    ? SUPPORT_FLAMES.findIndex((f) => f.amount === activeFlame.amount)
    : custom
      ? SUPPORT_FLAMES.length - 1
      : -1;

  async function submitSupportIntent() {
    if (!isMailtoSeed) {
      window.location.href = seedHref;
      return;
    }
    if (donorName.trim().length < 2 || !donorEmail.includes("@")) {
      setSendStatus("error");
      setSendError("Indique ton nom et ton e-mail pour que l’équipe te réponde.");
      return;
    }
    setSendStatus("sending");
    setSendError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "support",
          name: donorName.trim(),
          email: donorEmail.trim(),
          phone: donorPhone.trim(),
          amount,
          website: "",
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setSendStatus("error");
        setSendError(
          data.error ||
            "Envoi impossible. Écris à contact@festivalyuna.com.",
        );
        return;
      }
      setSendStatus("ok");
    } catch {
      setSendStatus("error");
      setSendError("Réseau indisponible. Réessaie dans un instant.");
    }
  }

  return (
    <>
      {/* Intro — plein cadre bleu, marque forte */}
      <section
        data-tone="bleu"
        data-nav-tone="bleu"
        className="relative overflow-hidden bg-bleu pb-16 pt-40 text-papier min-[760px]:pb-20 min-[760px]:pt-44"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_srgb,var(--feu)_40%,transparent),transparent_50%),radial-gradient(ellipse_at_100%_100%,color-mix(in_srgb,var(--jaune)_14%,transparent),transparent_45%)]"
        />
        <div
          aria-hidden
          className="flag-stripe absolute inset-x-0 bottom-0 z-10"
        >
          <span className="bg-vert" />
          <span className="bg-jaune" />
          <span className="bg-rouge" />
        </div>
        <div className="section-container relative z-10 px-5 min-[760px]:px-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="max-w-3xl"
          >
            <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-feu-core">
              {FESTIVAL.theme} · {FESTIVAL.edition}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,8vw,4.6rem)] font-extrabold uppercase leading-[0.92]">
              <span className="text-papier">Soutenir</span>{" "}
              <span className="text-feu-core">YUNA</span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-papier/88">
              {DONATE.pageLead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#semer">Allumer une flamme →</ButtonLink>
              <ButtonLink href="/partenaires" variant="outline-light">
                Partenariat
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chemins — liste éditoriale, pas de cartes clones */}
      <section
        data-tone="papier"
        data-nav-tone="papier"
        className="section-pad bg-papier"
      >
        <div className="section-container">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
            Trois portes
          </p>
          <h2 className="mt-3 max-w-lg font-display text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold uppercase leading-[1.02] text-bleu">
            Comment tu <span className="text-feu">rejoins</span>
          </h2>
          <ul className="mt-12 divide-y divide-bleu/12 border-y border-bleu/12">
            {DONATE.paths.map((path, i) => (
              <motion.li
                key={path.id}
                id={path.id === "partenariat" ? "partenariat" : undefined}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  ease: EASE_YUNA,
                  delay: reduce ? 0 : i * 0.05,
                }}
                className="grid gap-4 py-8 min-[720px]:grid-cols-[4.5rem_1fr_auto] min-[720px]:items-center min-[720px]:gap-8"
              >
                <p className="font-mono text-sm font-bold tabular-nums text-feu">
                  0{i + 1}
                </p>
                <div>
                  <h3
                    className={`font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold uppercase leading-tight ${
                      i === 0 ? "text-feu" : i === 1 ? "text-bleu" : "text-encre"
                    }`}
                  >
                    {path.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[1.02rem] leading-relaxed text-charbon">
                    {path.text}
                  </p>
                </div>
                <ButtonLink
                  href={path.href}
                  variant={i === 0 ? "primary" : "secondary"}
                  className="w-full min-[720px]:w-auto"
                >
                  {path.cta}
                </ButtonLink>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Semer — panneau nuit + échelle de flammes */}
      <section
        id="semer"
        data-tone="charbon"
        data-nav-tone="charbon"
        className="relative overflow-hidden bg-nuit-profonde py-16 text-ivoire-froid min-[760px]:py-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,color-mix(in_srgb,var(--feu)_32%,transparent),transparent_55%),radial-gradient(ellipse_50%_40%_at_90%_80%,color-mix(in_srgb,var(--bleu)_28%,transparent),transparent_50%)]"
        />
        <div className="section-container relative z-10 px-5 min-[760px]:px-6">
          <div className="grid items-end gap-12 min-[900px]:grid-cols-[0.95fr_1.05fr] min-[900px]:gap-16">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: EASE_YUNA }}
            >
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu-glow">
                {DONATE.seedEyebrow}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,3.8rem)] font-extrabold uppercase leading-[0.92]">
                <span className="text-ivoire-froid">Allume une</span>
                <br />
                <span className="bg-gradient-to-r from-feu-glow via-feu-core to-feu bg-clip-text text-transparent">
                  flamme
                </span>
              </h2>
              <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ivoire-froid/75">
                {DONATE.seedLead}
              </p>
              <p className="mt-8 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ivoire-froid/45">
                {FESTIVAL.locationLine} · entrée libre
              </p>

              {/* Intensité visuelle — barres de braise */}
              <div
                aria-hidden
                className="mt-10 flex h-28 items-end gap-2"
              >
                {SUPPORT_FLAMES.map((flame, i) => {
                  const lit = flameIndex >= i;
                  const h = 28 + i * 16;
                  return (
                    <div
                      key={flame.amount}
                      className={`w-8 rounded-t-md transition-[height,background,box-shadow] duration-500 ease-yuna min-[480px]:w-10 ${
                        lit
                          ? "bg-gradient-to-t from-braise via-feu to-feu-core shadow-[0_0_24px_color-mix(in_srgb,var(--feu)_55%,transparent)]"
                          : "bg-ivoire-froid/10"
                      }`}
                      style={{ height: `${h}px` }}
                    />
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE_YUNA, delay: 0.08 }}
              className="rounded-[1.75rem] border border-ivoire-froid/12 bg-nuit-profonde/70 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm min-[480px]:p-7"
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-ivoire-froid/10 pb-5">
                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ivoire-froid/50">
                  Intensité
                </p>
                <p className="font-display text-[clamp(2rem,8vw,2.75rem)] font-extrabold leading-none text-feu-core">
                  {amount ? amount.toLocaleString("fr-FR") : "—"}
                  <span className="ml-1.5 font-mono text-sm font-bold tracking-wide text-ivoire-froid/55">
                    FCFA
                  </span>
                </p>
              </div>
              {activeFlame ? (
                <p className="mt-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-feu-glow">
                  {activeFlame.label} · {activeFlame.hint}
                </p>
              ) : custom ? (
                <p className="mt-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-jaune">
                  Montant libre · ta flamme
                </p>
              ) : null}

              <fieldset className="mt-6 space-y-2">
                <legend className="sr-only">Choisir une intensité de flamme</legend>
                {SUPPORT_FLAMES.map((flame, i) => {
                  const active = !custom && selected === flame.amount;
                  return (
                    <button
                      key={flame.amount}
                      type="button"
                      onClick={() => {
                        setSelected(flame.amount);
                        setCustom("");
                      }}
                      className={`group flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-[background,border-color,box-shadow] duration-250 ease-yuna focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-feu ${
                        active
                          ? "border border-feu/50 bg-gradient-to-r from-feu/25 via-feu/15 to-transparent shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--feu-glow)_35%,transparent)]"
                          : "border border-ivoire-froid/10 bg-transparent hover:border-ivoire-froid/25 hover:bg-ivoire-froid/5"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`flex h-9 w-9 shrink-0 items-end justify-center rounded-lg ${
                          active ? "bg-feu/30" : "bg-ivoire-froid/8"
                        }`}
                      >
                        <span
                          className={`w-2.5 rounded-t-sm ${
                            active
                              ? "bg-gradient-to-t from-braise to-feu-core"
                              : "bg-ivoire-froid/25"
                          }`}
                          style={{ height: `${10 + i * 5}px` }}
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-display text-lg font-extrabold uppercase leading-none ${
                            active ? "text-feu-core" : "text-ivoire-froid"
                          }`}
                        >
                          {flame.label}
                        </span>
                        <span className="mt-1 block text-sm text-ivoire-froid/55">
                          {flame.hint}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 font-mono text-sm font-bold tabular-nums ${
                          active ? "text-papier" : "text-ivoire-froid/70"
                        }`}
                      >
                        {formatFcfa(flame.amount)}
                      </span>
                    </button>
                  );
                })}
              </fieldset>

              <label className="mt-5 block">
                <span className="mb-2 block font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ivoire-froid/45">
                  Ou ton montant
                </span>
                <input
                  type="number"
                  min={1}
                  inputMode="numeric"
                  placeholder={DONATE.customAmountPh}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  className="w-full rounded-2xl border border-ivoire-froid/15 bg-nuit-profonde px-4 py-3.5 text-base text-ivoire-froid outline-none placeholder:text-ivoire-froid/35 focus:border-feu focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--feu)_25%,transparent)]"
                />
              </label>

              {isMailtoSeed ? (
                <div className="mt-5 grid gap-3">
                  <input
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Ton nom"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full rounded-2xl border border-ivoire-froid/15 bg-nuit-profonde px-4 py-3.5 text-base text-ivoire-froid outline-none placeholder:text-ivoire-froid/35 focus:border-feu"
                  />
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Ton e-mail"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full rounded-2xl border border-ivoire-froid/15 bg-nuit-profonde px-4 py-3.5 text-base text-ivoire-froid outline-none placeholder:text-ivoire-froid/35 focus:border-feu"
                  />
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="Téléphone (WhatsApp)"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full rounded-2xl border border-ivoire-froid/15 bg-nuit-profonde px-4 py-3.5 text-base text-ivoire-froid outline-none placeholder:text-ivoire-froid/35 focus:border-feu"
                  />
                </div>
              ) : null}

              {isMailtoSeed ? (
                <button
                  type="button"
                  onClick={() => void submitSupportIntent()}
                  disabled={sendStatus === "sending" || sendStatus === "ok"}
                  className="btn-cta-flame mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-4 py-4 text-[1.05rem] font-extrabold uppercase tracking-[0.04em] text-papier ring-2 ring-[color-mix(in_srgb,var(--feu-glow)_50%,transparent)] transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-feu motion-reduce:hover:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sendStatus === "sending"
                    ? "Envoi…"
                    : sendStatus === "ok"
                      ? "Demande envoyée"
                      : DONATE.seedCta}
                  {amount && sendStatus === "idle" ? (
                    <span className="font-mono text-sm font-bold normal-case tracking-normal opacity-90">
                      · {formatFcfa(amount)}
                    </span>
                  ) : null}
                </button>
              ) : (
                <a
                  href={seedHref}
                  className="btn-cta-flame mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-4 py-4 text-[1.05rem] font-extrabold uppercase tracking-[0.04em] text-papier ring-2 ring-[color-mix(in_srgb,var(--feu-glow)_50%,transparent)] transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-feu motion-reduce:hover:translate-y-0"
                >
                  {DONATE.seedCta}
                  {amount ? (
                    <span className="font-mono text-sm font-bold normal-case tracking-normal opacity-90">
                      · {formatFcfa(amount)}
                    </span>
                  ) : null}
                </a>
              )}

              <p className="mt-5 text-center text-sm leading-relaxed text-ivoire-froid/60">
                {sendStatus === "ok" ? (
                  <>
                    Merci. Ta demande part vers {SITE_CONTACT.email}. L’équipe
                    te guide pour Mobile Money / virement.{" "}
                  </>
                ) : sendStatus === "error" ? (
                  <>{sendError} </>
                ) : isMailtoSeed ? (
                  <>
                    Ta demande arrive sur {SITE_CONTACT.email}. L’équipe te guide
                    pour Mobile Money / virement.{" "}
                  </>
                ) : (
                  <>Checkout sécurisé. Confirmation par l’équipe. </>
                )}
                <a
                  href={DONATE.href}
                  className="font-semibold text-feu-core underline decoration-feu/40 underline-offset-4 hover:decoration-feu"
                >
                  {SITE_CONTACT.email}
                </a>
                {whatsapp ? (
                  <>
                    {" "}
                    ·{" "}
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
                . {ORGANIZER.name}.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Budget — éditorial */}
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
                <div
                  aria-hidden
                  className="flag-stripe mb-5 h-1 w-16 overflow-hidden rounded-full"
                >
                  <span className="bg-vert" />
                  <span className="bg-jaune" />
                  <span className="bg-rouge" />
                </div>
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
            {FESTIVAL.datesShort} · {FESTIVAL.locationFull}
          </p>
        </div>
      </section>
    </>
  );
}
