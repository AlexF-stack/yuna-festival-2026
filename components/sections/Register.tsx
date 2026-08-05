"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { PassPreview } from "@/components/pass/PassPreview";
import { RegistrationGauge } from "@/components/sections/RegistrationGauge";
import { useMessages } from "@/components/i18n/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { FESTIVAL } from "@/lib/festival";
import { EASE_YUNA } from "@/lib/motion";
import {
  REGISTRATION_TYPES,
  type RegistrationType,
} from "@/lib/registration-types";

type RegisterProps = {
  initialCount?: number;
};

type FieldErrors = {
  form?: string;
};

const fieldClass =
  "w-full rounded-xl border border-bleu/15 bg-papier px-4 py-3.5 text-base text-encre outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-charbon/45 focus:border-bleu focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--bleu)_18%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bleu";

function createIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // UUID v4 manuel — le serveur exige un UUID valide.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function Register({ initialCount = 0 }: RegisterProps) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const t = useMessages();
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [registrationType, setRegistrationType] =
    useState<RegistrationType>("pass");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setIdempotencyKey(createIdempotencyKey());
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    if (!consent) {
      setErrors({
        form: "Coche la case de consentement pour générer ton pass.",
      });
      return;
    }

    setPending(true);

    const key = idempotencyKey || createIdempotencyKey();
    if (!idempotencyKey) setIdempotencyKey(key);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          registrationType,
          idempotencyKey: key,
          website,
          consent,
        }),
      });

      if (!res.ok) {
        let message = "Inscription impossible. Réessaie.";
        try {
          const payload = (await res.json()) as { error?: string };
          if (payload.error) message = payload.error;
        } catch {
          /* ignore */
        }
        setErrors({ form: message });
        return;
      }

      const payload = (await res.json()) as {
        id?: string;
        error?: string;
      };

      if (!payload.id) {
        setErrors({
          form: payload.error ?? "Inscription impossible. Réessaie.",
        });
        return;
      }

      router.push(`/confirmation/${payload.id}`);
    } catch {
      setErrors({
        form: "Réseau indisponible. Vérifie ta connexion et réessaie.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <SectionShell
      id="inscription"
      labelledBy="register-title"
      tone="papier"
      background="register"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: EASE_YUNA }}
        className="relative z-10"
      >
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow={t.register.eyebrow}
            title={t.register.title}
            titleId="register-title"
            description={t.register.lead}
          />
          <RegistrationGauge initialCount={initialCount} />
        </div>

        {/* Skill design-system : formulaire gauche + aperçu pass droite */}
        <div className="mt-12 grid items-start gap-10 min-[960px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[960px]:gap-12">
          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: EASE_YUNA }}
            className="relative rounded-3xl border border-bleu/10 bg-papier/95 p-6 shadow-ombre-bleu backdrop-blur-sm min-[480px]:p-8"
          >
            <h3 className="mb-5 font-display text-xl font-extrabold uppercase tracking-wide text-bleu">
              {t.register.formTitle}
            </h3>

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="absolute left-[-9999px] h-px w-px opacity-0"
              aria-hidden
            />

            <fieldset className="mb-5">
              <legend className="mb-3 text-sm font-medium text-encre">
                {t.register.eyebrow} *
              </legend>
              <div className="grid gap-2">
                {REGISTRATION_TYPES.map((type) => {
                  const selected = registrationType === type.value;
                  const localized = t.registerTypes[type.value] ?? type;
                  return (
                    <label
                      key={type.value}
                      className={`flex cursor-pointer gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-200 ${
                        selected
                          ? "border-bleu bg-ciel/60"
                          : "border-bleu/12 bg-papier hover:border-bleu/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="registrationType"
                        value={type.value}
                        checked={selected}
                        onChange={() => setRegistrationType(type.value)}
                        className="mt-1 shrink-0 accent-bleu"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-encre">
                          {localized.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-charbon">
                          {localized.hint}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mb-4">
              <label
                htmlFor="reg-name"
                className="mb-1.5 block text-sm font-medium text-encre"
              >
                {t.register.name}
              </label>
              <input
                id="reg-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.register.namePh}
                className={fieldClass}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="reg-phone"
                className="mb-1.5 block text-sm font-medium text-encre"
              >
                {t.register.phone}
              </label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.register.phonePh}
                className={fieldClass}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="reg-email"
                className="mb-1.5 block text-sm font-medium text-encre"
              >
                {t.register.email}
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                autoComplete="email"
                required={registrationType === "benevole"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.register.emailPh}
                className={fieldClass}
              />
              {registrationType === "benevole" ? (
                <p className="mt-1.5 text-xs text-charbon">
                  WhatsApp follow-up.
                </p>
              ) : null}
            </div>

            <label className="mb-5 flex cursor-pointer gap-3 text-sm leading-relaxed text-charbon">
              <input
                type="checkbox"
                name="consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-bleu"
              />
              <span>
                {t.register.consent}{" "}
                <a
                  href="/confidentialite"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-bleu underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bleu"
                >
                  {t.register.privacy}
                </a>
                . *
              </span>
            </label>

            {errors.form ? (
              <p role="alert" className="mb-4 text-sm text-feu">
                {errors.form}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-feu px-4 py-4 text-[1.02rem] font-bold tracking-[0.02em] text-papier transition-[background-color,transform] duration-[250ms] ease-yuna hover:-translate-y-0.5 hover:bg-braise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {pending ? "…" : t.register.submit}
            </button>

            <p className="mt-4 text-center text-sm text-charbon">
              {t.register.already}{" "}
              <a
                href="/mon-pass"
                className="font-bold text-bleu underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bleu"
              >
                {t.register.recoverLink}
              </a>
            </p>

            <ul className="mt-6 space-y-2 pt-5 text-xs text-charbon">
              {[
                "Pass QR généré côté serveur (sécurisé)",
                "Masterclass : places limitées, QR obligatoire",
                `Ouverture du site à ${FESTIVAL.siteOpens} · concerts dès 18h`,
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-feu" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.form>

          <motion.div
            className="min-[960px]:sticky min-[960px]:top-28"
            initial={reduce ? false : { opacity: 0, x: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_YUNA, delay: 0.06 }}
          >
            <p className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-charbon">
              {t.register.previewLabel}
            </p>
            <PassPreview name={name} registrationType={registrationType} />
            <p className="mt-4 text-sm leading-relaxed text-charbon">
              {t.register.previewHint}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
