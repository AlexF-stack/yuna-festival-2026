"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { REGISTER_COPY } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";
import { EASE_YUNA } from "@/lib/motion";
import {
  REGISTRATION_TYPES,
  type RegistrationType,
} from "@/lib/registration-types";
import { RegistrationGauge } from "@/components/sections/RegistrationGauge";

type RegisterProps = {
  initialCount?: number;
};

type FieldErrors = {
  form?: string;
};

const fieldClass =
  "w-full rounded-xl border border-bleu/15 bg-papier px-4 py-3.5 text-base text-encre outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-charbon/45 focus:border-bleu focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--bleu)_18%,transparent)]";

export function Register({ initialCount = 0 }: RegisterProps) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [registrationType, setRegistrationType] =
    useState<RegistrationType>("pass");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setPending(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          registrationType,
          website,
        }),
      });

      const payload = (await res.json()) as {
        id?: string;
        error?: string;
      };

      if (!res.ok || !payload.id) {
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
      background="register"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: EASE_YUNA }}
        className="relative z-10 grid items-start gap-12 min-[900px]:grid-cols-[1fr_minmax(0,26rem)] min-[900px]:gap-16"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: EASE_YUNA }}
        >
          <SectionHeading
            eyebrow="Inscription"
            title="Réserve ton pass"
            titleId="register-title"
            description={REGISTER_COPY.intro}
          />

          <RegistrationGauge initialCount={initialCount} />

          <ul className="mt-8 space-y-3.5 text-sm text-charbon">
            {[
              "Pass QR généré immédiatement",
              "Masterclass : places limitées, QR obligatoire",
              `Ouverture du site à ${FESTIVAL.siteOpens} · concerts dès 18h`,
              "Même sans mail de confirmation, ton inscription est enregistrée",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-feu" />
                {line}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          noValidate
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE_YUNA, delay: 0.06 }}
          className="relative rounded-3xl border border-bleu/10 bg-papier/95 p-6 shadow-ombre-bleu backdrop-blur-sm min-[480px]:p-8"
        >
          <h3 className="mb-5 font-display text-xl font-extrabold uppercase tracking-wide text-bleu">
            Tes infos
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
              Type d&apos;inscription *
            </legend>
            <motion.div
              className="grid gap-2"
              variants={
                reduce
                  ? undefined
                  : { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
              }
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true, amount: 0.5 }}
            >
              {REGISTRATION_TYPES.map((type) => {
                const selected = registrationType === type.value;
                return (
                  <motion.label
                    key={type.value}
                    variants={
                      reduce ? undefined : { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }
                    }
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
                        {type.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-charbon">
                        {type.hint}
                      </span>
                    </span>
                  </motion.label>
                );
              })}
            </motion.div>
          </fieldset>

          <motion.div
            key={registrationType}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE_YUNA }}
          >
            <motion.div
              className="mb-4"
              initial={false}
              animate={reduce ? undefined : { opacity: 1 }}
            >
              <label
                htmlFor="reg-name"
                className="mb-1.5 block text-sm font-medium text-encre"
              >
                Nom complet *
              </label>
              <input
                id="reg-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Grâce Ahouansou"
                className={fieldClass}
              />
            </motion.div>

            <div className="mb-4">
              <label
                htmlFor="reg-phone"
                className="mb-1.5 block text-sm font-medium text-encre"
              >
                Téléphone (WhatsApp) *
              </label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+229 01 XX XX XX XX"
                className={fieldClass}
              />
            </div>

            <motion.div
              className="mb-6"
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={
                registrationType !== "pass"
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 1, height: "auto" }
              }
            >
              <label
                htmlFor="reg-email"
                className="mb-1.5 block text-sm font-medium text-encre"
              >
                Email{" "}
                {registrationType === "benevole" ? (
                  <span className="text-charbon">*</span>
                ) : (
                  <span className="text-charbon/50">(optionnel)</span>
                )}
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                autoComplete="email"
                required={registrationType === "benevole"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                className={fieldClass}
              />
              {registrationType === "benevole" ? (
                <p className="mt-1.5 text-xs text-charbon">
                  Pour te recontacter sur WhatsApp.
                </p>
              ) : null}
            </motion.div>

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
              {pending ? "Génération du pass…" : "Générer mon pass QR"}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </SectionShell>
  );
}
