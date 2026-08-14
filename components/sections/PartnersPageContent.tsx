"use client";

import { useState, type FormEvent } from "react";

import { PageIntro } from "@/components/ui/PageIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Sponsors } from "@/components/sections/Sponsors";
import { PARTNERS_PAGE } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";
import { SITE_CONTACT } from "@/lib/site";

const fieldClass =
  "w-full rounded-xl border border-bleu/15 bg-papier px-4 py-3.5 text-base text-encre outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-charbon/45 focus:border-bleu focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--bleu)_18%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bleu";

type PartnerMode = "financier" | "materiel" | "les-deux";

function dossierMailto() {
  const subject = encodeURIComponent(PARTNERS_PAGE.dossierMailSubject);
  const body = encodeURIComponent(
    `Bonjour,\n\nJe souhaite recevoir le dossier de sponsoring YUNA Festival ${FESTIVAL.edition}.\nOrganisation :\nContact :\nTéléphone :\n\nMerci.`,
  );
  return `mailto:${SITE_CONTACT.email}?subject=${subject}&body=${body}`;
}

function PartnerList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 max-w-2xl space-y-4 text-[1.05rem] leading-relaxed text-charbon">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-1 font-mono text-feu" aria-hidden>
            —
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
  const [message, setMessage] = useState("");

  const modeLabel =
    mode === "materiel"
      ? copy.formModeInKind
      : mode === "les-deux"
        ? copy.formModeBoth
        : copy.formModeFinancial;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${copy.formMailSubject} — ${org.trim() || "demande"}`,
    );
    const body = encodeURIComponent(
      [
        "Bonjour,",
        "",
        "Je souhaite devenir partenaire de YUNA Festival 2026.",
        "",
        `Organisation : ${org.trim()}`,
        `Contact : ${name.trim()}`,
        `E-mail : ${email.trim()}`,
        `Téléphone : ${phone.trim() || "—"}`,
        `Type : ${modeLabel}`,
        "",
        message.trim() || "(aucun message)",
      ].join("\n"),
    );
    window.location.href = `mailto:${SITE_CONTACT.email}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
        cta={{ href: "#contact-partenaire", label: copy.contactCta }}
      />

      <SectionShell id="pourquoi" labelledBy="pourquoi-title" tone="papier">
        <Reveal>
          <SectionHeading
            eyebrow="Vision"
            title={copy.whyTitle}
            titleId="pourquoi-title"
            tone="bleu"
            accentLast
          />
          <PartnerList items={copy.why} />
        </Reveal>
      </SectionShell>

      <SectionShell id="audience" labelledBy="audience-title" tone="bleu">
        <Reveal>
          <SectionHeading
            eyebrow="Public"
            title={copy.audienceTitle}
            titleId="audience-title"
            variant="light"
          />
          <ul className="mt-8 max-w-2xl space-y-4 text-[1.05rem] leading-relaxed text-papier/88">
            {copy.audience.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 font-mono text-jaune" aria-hidden>
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </SectionShell>

      <SectionShell id="visibilite" labelledBy="visibilite-title" tone="papier">
        <div className="grid gap-14 min-[900px]:grid-cols-2 min-[900px]:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Contreparties"
              title={copy.visibilityTitle}
              titleId="visibilite-title"
              tone="feu"
              accentLast
            />
            <PartnerList items={copy.visibility} />
          </Reveal>
          <Reveal>
            <SectionHeading
              eyebrow="Terrain"
              title={copy.brandingTitle}
              titleId="branding-title"
              tone="encre"
              accentLast
            />
            <PartnerList items={copy.branding} />
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell id="modes" labelledBy="modes-title" tone="feu-soft">
        <Reveal>
          <SectionHeading
            eyebrow="Deux voies"
            title={copy.supportModesTitle}
            titleId="modes-title"
            tone="feu"
            accentLast
          />
          <div className="mt-10 grid gap-10 min-[760px]:grid-cols-2">
            {copy.supportModes.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-2xl font-extrabold uppercase text-bleu">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-charbon">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <div id="paliers">
        <Sponsors />
      </div>

      <SectionShell id="dossier" labelledBy="dossier-title" tone="papier">
        <Reveal>
          <SectionHeading
            eyebrow="Document"
            title={copy.dossierTitle}
            titleId="dossier-title"
            description={
              copy.dossierReady
                ? "Audiences, plans média et contreparties — à transmettre à votre direction."
                : copy.dossierLead
            }
            tone="encre"
            accentLast
          />
          <div className="mt-8">
            {copy.dossierReady ? (
              <ButtonLink href={copy.dossierHref} download>
                {copy.dossierCta}
              </ButtonLink>
            ) : (
              <ButtonLink href={dossierMailto()}>
                {copy.dossierMailCta}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell id="contact-partenaire" labelledBy="contact-title" tone="bleu-soft">
        <Reveal>
          <SectionHeading
            eyebrow="Écrire"
            title={copy.formTitle}
            titleId="contact-title"
            description={copy.formLead}
            tone="bleu"
            accentLast
          />
        </Reveal>

        <form
          onSubmit={onSubmit}
          noValidate
          className="relative mt-10 max-w-xl"
        >
          <div className="mb-4">
            <label htmlFor="partner-org" className="mb-1.5 block text-sm font-medium text-encre">
              {copy.formOrg}
            </label>
            <input
              id="partner-org"
              name="organization"
              type="text"
              required
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="partner-name" className="mb-1.5 block text-sm font-medium text-encre">
              {copy.formName}
            </label>
            <input
              id="partner-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="partner-email" className="mb-1.5 block text-sm font-medium text-encre">
              {copy.formEmail}
            </label>
            <input
              id="partner-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="partner-phone" className="mb-1.5 block text-sm font-medium text-encre">
              {copy.formPhone}
            </label>
            <input
              id="partner-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClass}
            />
          </div>
          <fieldset className="mb-4">
            <legend className="mb-2 text-sm font-medium text-encre">
              {copy.formMode}
            </legend>
            <div className="flex flex-col gap-2">
              {(
                [
                  ["financier", copy.formModeFinancial],
                  ["materiel", copy.formModeInKind],
                  ["les-deux", copy.formModeBoth],
                ] as const
              ).map(([value, label]) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2.5 text-[0.95rem] text-charbon"
                >
                  <input
                    type="radio"
                    name="mode"
                    value={value}
                    checked={mode === value}
                    onChange={() => setMode(value)}
                    className="accent-bleu"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mb-6">
            <label htmlFor="partner-message" className="mb-1.5 block text-sm font-medium text-encre">
              {copy.formMessage}
            </label>
            <textarea
              id="partner-message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={copy.formMessagePh}
              className={`${fieldClass} resize-y`}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-feu px-8 py-3.5 text-[0.95rem] font-bold tracking-[0.02em] text-papier ring-2 ring-[color-mix(in_srgb,var(--feu-glow)_55%,transparent)] transition-[filter,transform] duration-[250ms] ease-yuna hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-feu motion-reduce:hover:translate-y-0"
          >
            {copy.contactCta}
          </button>
        </form>
      </SectionShell>
    </>
  );
}
