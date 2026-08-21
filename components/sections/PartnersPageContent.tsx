"use client";

import { useState, type FormEvent } from "react";

import { Sponsors } from "@/components/sections/Sponsors";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { PARTNERS_PAGE } from "@/lib/content-site";
import { FESTIVAL, REGISTRATION_GOAL } from "@/lib/festival";
import { SITE_CONTACT } from "@/lib/site";

const fieldClass =
  "w-full rounded-xl border border-bleu/15 bg-white px-4 py-3.5 text-base text-encre outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-charbon/40 focus:border-bleu focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--bleu)_18%,transparent)]";

type PartnerMode = "financier" | "materiel" | "les-deux";

const PAGE_NAV = [
  { href: "#impact", label: "Impact" },
  { href: "#visibilite", label: "Visibilité" },
  { href: "#paliers", label: "Offres" },
  { href: "#contact-partenaire", label: "Contact" },
] as const;

function dossierMailto() {
  const subject = encodeURIComponent(PARTNERS_PAGE.dossierMailSubject);
  const body = encodeURIComponent(
    `Bonjour,\n\nJe souhaite recevoir le dossier de sponsoring YUNA Festival ${FESTIVAL.edition}.\nOrganisation :\nContact :\nTéléphone :\n\nMerci.`,
  );
  return `mailto:${SITE_CONTACT.email}?subject=${subject}&body=${body}`;
}

function FeatureList({
  items,
  light = false,
}: {
  items: readonly string[];
  light?: boolean;
}) {
  return (
    <ul
      className={`mt-7 space-y-4 text-[1rem] leading-relaxed ${
        light ? "text-papier/88" : "text-charbon"
      }`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={`mt-1 font-mono font-bold ${
              light ? "text-jaune" : "text-feu"
            }`}
            aria-hidden
          >
            +
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PartnersPageContent() {
  const copy = PARTNERS_PAGE;
  const [org, setOrg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState<PartnerMode>("financier");
  const [tier, setTier] = useState<string>(copy.formTierOptions[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const modeLabel =
    mode === "materiel"
      ? copy.formModeInKind
      : mode === "les-deux"
        ? copy.formModeBoth
        : copy.formModeFinancial;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "partnership",
          organization: org.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          mode: modeLabel,
          tier,
          message: message.trim(),
          website: "",
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(
          data.error ||
            "Envoi impossible. Réessaie ou écris à contact@festivalyuna.com.",
        );
        return;
      }
      setStatus("ok");
      setOrg("");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg(
        "Réseau indisponible. Réessaie ou écris à contact@festivalyuna.com.",
      );
    }
  }

  return (
    <>
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
        cta={{ href: "#paliers", label: "Découvrir les offres" }}
      />

      <nav
        aria-label="Navigation de la page partenaires"
        className="sticky top-[4.25rem] z-40 border-b border-bleu/10 bg-papier/95 px-5 py-3 shadow-sm backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1240px] gap-2 overflow-x-auto">
          {PAGE_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-bleu transition-colors hover:bg-logo-bleu-soft hover:text-feu"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <SectionShell id="impact" labelledBy="impact-title" tone="papier">
        <div className="grid gap-12 min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:items-start min-[900px]:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="L’essentiel"
              title="Un partenariat qui a du sens"
              titleId="impact-title"
              description="YUNA réunit impact jeunesse, accès gratuit et présence de marque sur un même terrain."
              tone="bleu"
              accentLast
            />
          </Reveal>

          <Reveal>
            <dl className="grid gap-px overflow-hidden rounded-3xl border border-bleu/10 bg-bleu/10 min-[560px]:grid-cols-3">
              <div className="bg-papier p-6">
                <dt className="text-sm font-medium text-charbon/70">
                  Soirées
                </dt>
                <dd className="mt-2 font-display text-4xl font-extrabold text-feu">
                  2
                </dd>
              </div>
              <div className="bg-papier p-6">
                <dt className="text-sm font-medium text-charbon/70">
                  Objectif pass QR
                </dt>
                <dd className="mt-2 font-display text-4xl font-extrabold text-bleu">
                  {REGISTRATION_GOAL.toLocaleString("fr-FR")}
                </dd>
              </div>
              <div className="bg-papier p-6">
                <dt className="text-sm font-medium text-charbon/70">
                  Entrée
                </dt>
                <dd className="mt-2 font-display text-2xl font-extrabold uppercase text-vert">
                  Libre
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 border-t border-bleu/10 pt-14 min-[900px]:grid-cols-2 min-[900px]:gap-20">
          <Reveal>
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-vert">
              Pourquoi YUNA
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase leading-none text-bleu">
              {copy.whyTitle}
            </h2>
            <FeatureList items={copy.why} />
          </Reveal>
          <Reveal>
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
              Public
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase leading-none text-encre">
              {copy.audienceTitle}
            </h2>
            <FeatureList items={copy.audience} />
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell id="visibilite" labelledBy="visibilite-title" tone="bleu">
        <Reveal>
          <SectionHeading
            eyebrow="Votre marque dans l’expérience"
            title="Visibilité et activation"
            titleId="visibilite-title"
            description="Des points de contact avant, pendant et après le festival, selon le niveau de partenariat retenu."
            variant="light"
          />
        </Reveal>

        <div className="mt-12 grid gap-12 min-[900px]:grid-cols-2 min-[900px]:gap-20">
          <Reveal>
            <h3 className="font-display text-2xl font-extrabold uppercase text-jaune">
              {copy.visibilityTitle}
            </h3>
            <FeatureList items={copy.visibility} light />
          </Reveal>
          <Reveal>
            <h3 className="font-display text-2xl font-extrabold uppercase text-feu-core">
              {copy.brandingTitle}
            </h3>
            <FeatureList items={copy.branding} light />
          </Reveal>
        </div>
      </SectionShell>

      <div id="paliers">
        <Sponsors />
      </div>

      <SectionShell id="sur-mesure" labelledBy="sur-mesure-title" tone="feu-soft">
        <div className="grid gap-12 min-[900px]:grid-cols-[0.8fr_1.2fr] min-[900px]:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Au-delà des paliers"
              title={copy.supportModesTitle}
              titleId="sur-mesure-title"
              tone="feu"
              accentLast
            />
          </Reveal>
          <div className="grid gap-8 min-[620px]:grid-cols-2">
            {copy.supportModes.map((item) => (
              <Reveal key={item.title}>
                <article className="h-full border-l-2 border-feu pl-6">
                  <h3 className="font-display text-2xl font-extrabold uppercase text-bleu">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-charbon">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id="contact-partenaire"
        labelledBy="contact-title"
        tone="papier"
      >
        <div className="grid gap-14 min-[960px]:grid-cols-[0.72fr_1.28fr] min-[960px]:gap-20">
          <Reveal>
            <div className="min-[960px]:sticky min-[960px]:top-32">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
                Prochaine étape
              </p>
              <h2
                id="contact-title"
                className="mt-3 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold uppercase leading-[0.95] text-bleu"
              >
                Parlons de votre{" "}
                <span className="text-feu">partenariat</span>
              </h2>
              <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-charbon">
                {copy.formLead}
              </p>

              <aside className="mt-10 border-t border-bleu/10 pt-8">
                <p className="font-display text-xl font-extrabold uppercase text-encre">
                  {copy.dossierTitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-charbon/75">
                  {copy.dossierLead}
                </p>
                <div className="mt-5">
                  {copy.dossierReady ? (
                    <ButtonLink href={copy.dossierHref} download>
                      {copy.dossierCta}
                    </ButtonLink>
                  ) : (
                    <ButtonLink href={dossierMailto()} variant="secondary">
                      {copy.dossierMailCta}
                    </ButtonLink>
                  )}
                </div>
              </aside>
            </div>
          </Reveal>

          <Reveal>
            <form
              onSubmit={onSubmit}
              className="rounded-[2rem] border border-bleu/10 bg-logo-bleu-soft p-5 shadow-ombre-bleu min-[560px]:p-8"
            >
              <div className="mb-8 border-b border-bleu/10 pb-6">
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-vert">
                  Demande de partenariat
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold uppercase text-encre">
                  Présentez votre projet
                </h3>
              </div>

              <div className="grid gap-5 min-[620px]:grid-cols-2">
                <label className="block min-[620px]:col-span-2">
                  <span className="mb-1.5 block text-sm font-bold text-encre">
                    {copy.formOrg}
                  </span>
                  <input
                    name="organization"
                    type="text"
                    autoComplete="organization"
                    required
                    value={org}
                    onChange={(event) => setOrg(event.target.value)}
                    className={fieldClass}
                    placeholder="Nom de votre organisation"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-encre">
                    {copy.formName}
                  </span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={fieldClass}
                    placeholder="Prénom et nom"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-bold text-encre">
                    {copy.formPhone}
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className={fieldClass}
                    placeholder="+229…"
                  />
                </label>

                <label className="block min-[620px]:col-span-2">
                  <span className="mb-1.5 block text-sm font-bold text-encre">
                    {copy.formEmail}
                  </span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={fieldClass}
                    placeholder="contact@organisation.com"
                  />
                </label>
              </div>

              <fieldset className="mt-7">
                <legend className="mb-3 text-sm font-bold text-encre">
                  {copy.formMode}
                </legend>
                <div className="grid gap-3 min-[620px]:grid-cols-3">
                  {(
                    [
                      ["financier", copy.formModeFinancial],
                      ["materiel", copy.formModeInKind],
                      ["les-deux", copy.formModeBoth],
                    ] as const
                  ).map(([value, label]) => {
                    const selected = mode === value;
                    return (
                      <label
                        key={value}
                        className={`cursor-pointer rounded-xl border px-4 py-4 text-sm font-bold transition-colors ${
                          selected
                            ? "border-bleu bg-bleu text-papier"
                            : "border-bleu/15 bg-white text-charbon hover:border-bleu/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="mode"
                          value={value}
                          checked={selected}
                          onChange={() => setMode(value)}
                          className="sr-only"
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <label className="mt-7 block">
                <span className="mb-1.5 block text-sm font-bold text-encre">
                  {copy.formTier}
                </span>
                <select
                  name="tier"
                  value={tier}
                  onChange={(event) => setTier(event.target.value)}
                  className={fieldClass}
                >
                  {copy.formTierOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-5 block">
                <span className="mb-1.5 block text-sm font-bold text-encre">
                  {copy.formMessage}
                </span>
                <textarea
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={copy.formMessagePh}
                  className={`${fieldClass} resize-y`}
                />
              </label>

              <p className="mt-4 text-xs leading-relaxed text-charbon/65">
                {copy.formPrivacy}
              </p>

              <div className="mt-7 flex flex-col gap-3 min-[560px]:flex-row min-[560px]:items-center">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "ok"}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-feu px-8 py-3.5 text-[0.95rem] font-bold text-papier shadow-lg transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-feu motion-reduce:hover:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending"
                    ? "Envoi…"
                    : status === "ok"
                      ? "Demande envoyée"
                      : copy.contactCta}
                </button>
                <p className="max-w-xs text-xs leading-relaxed text-charbon/60">
                  {status === "ok"
                    ? "Merci. L’équipe partenariat lit ta demande sur contact@festivalyuna.com."
                    : status === "error"
                      ? errorMsg
                      : copy.formSubmitHint}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </SectionShell>
    </>
  );
}
