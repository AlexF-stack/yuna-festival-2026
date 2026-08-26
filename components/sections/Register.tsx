"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { PassPreview } from "@/components/pass/PassPreview";
import { RegistrationGauge } from "@/components/sections/RegistrationGauge";
import { useMessages } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { resolveAttribution } from "@/lib/attribution";
import { FESTIVAL } from "@/lib/festival";
import {
  isOpenRegistrationType,
  REGISTRATION_TYPES,
  type RegistrationType,
} from "@/lib/registration-types";

type FieldErrors = {
  form?: string;
};

type Guest = { name: string; phone: string };

const MAX_GUESTS = 4; // + primary = 5

const fieldClass =
  "w-full rounded-xl border border-bleu/15 bg-papier px-4 py-3.5 text-base text-encre outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-charbon/45 focus:border-bleu focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--bleu)_18%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bleu";

function createIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useMessages();
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [registrationTypes, setRegistrationTypes] = useState<
    RegistrationType[]
  >(["pass"]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [busWanted, setBusWanted] = useState<boolean | null>(null);
  const [busLocation, setBusLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    setIdempotencyKey(createIdempotencyKey());
    setSource(resolveAttribution());
  }, []);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && isOpenRegistrationType(type)) {
      setRegistrationTypes([type]);
    }
  }, [searchParams]);

  function toggleType(type: RegistrationType) {
    setRegistrationTypes((prev) => {
      if (prev.includes(type)) {
        if (type === "pass") setGuests([]);
        return prev.filter((t) => t !== type);
      }
      return [...prev, type];
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    if (registrationTypes.length === 0) {
      setErrors({
        form: t.register.typesRequired,
      });
      return;
    }

    if (!consent) {
      setErrors({
        form: "Coche la case de consentement pour générer ton pass.",
      });
      return;
    }

    for (let i = 0; i < guests.length; i++) {
      if (guests[i].name.trim().length < 2 || guests[i].phone.trim().length < 8) {
        setErrors({
          form: `Complète le nom et le téléphone du pass n°${i + 2}.`,
        });
        return;
      }
    }

    if (busWanted === null) {
      setErrors({
        form: t.register.busRequired,
      });
      return;
    }
    if (busWanted && busLocation.trim().length < 2) {
      setErrors({
        form: t.register.busLocationRequired,
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
          registrationTypes,
          busWanted,
          busLocation: busWanted ? busLocation.trim() : null,
          idempotencyKey: key,
          website,
          consent,
          source: source ?? resolveAttribution(),
          guests: guests.map((g) => ({
            name: g.name.trim(),
            phone: g.phone.trim(),
          })),
        }),
      });

      if (!res.ok) {
        let message = "Inscription impossible. Réessaie.";
        let partialId: string | undefined;
        let partialIds: string[] | undefined;
        try {
          const payload = (await res.json()) as {
            error?: string;
            id?: string;
            ids?: string[];
          };
          if (payload.error) message = payload.error;
          partialId = payload.id;
          partialIds = payload.ids;
        } catch {
          /* ignore */
        }
        const wa = "1";
        // Échec partiel : au moins un pass existe — on oriente vers la confirmation.
        if (partialId) {
          if (partialIds && partialIds.length > 1) {
            router.push(
              `/confirmation/${partialId}?wa=${wa}&groupe=${partialIds.join(",")}`,
            );
          } else {
            router.push(`/confirmation/${partialId}?wa=${wa}`);
          }
          return;
        }
        setErrors({ form: message });
        return;
      }

      const payload = (await res.json()) as {
        id?: string;
        ids?: string[];
        error?: string;
      };

      if (!payload.id) {
        setErrors({
          form: payload.error ?? "Inscription impossible. Réessaie.",
        });
        return;
      }

      const wa = "1";
      if (payload.ids && payload.ids.length > 1) {
        router.push(
          `/confirmation/${payload.id}?wa=${wa}&groupe=${payload.ids.join(",")}`,
        );
      } else {
        router.push(`/confirmation/${payload.id}?wa=${wa}`);
      }
    } catch {
      setErrors({
        form: "Réseau indisponible. Vérifie ta connexion et réessaie.",
      });
    } finally {
      setPending(false);
    }
  }

  const includesFestival = registrationTypes.includes("pass");
  const includesAmbassador = registrationTypes.includes("ambassadeur");
  const canRegisterOthers = includesFestival || includesAmbassador;
  const canAddGuest = canRegisterOthers && guests.length < MAX_GUESTS;
  const previewType = registrationTypes[0] ?? "pass";
  const submitLabel =
    guests.length > 0 || registrationTypes.length > 1
      ? t.registerExtras.submitMulti
      : t.register.submit;

  return (
    <SectionShell
      id="inscription"
      labelledBy="register-title"
      tone="papier"
      background="register"
    >
      <div className="relative z-10">
        <Reveal className="max-w-2xl">
          <SectionHeading
            eyebrow={t.register.eyebrow}
            title={t.register.title}
            titleId="register-title"
            description={t.register.lead}
            tone="encre"
            accentLast
          />
          <RegistrationGauge />
        </Reveal>

        <div className="mt-12 grid items-start gap-10 min-[960px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[960px]:gap-12">
          <Reveal variant="left" className="mx-auto w-full max-w-xl min-[960px]:mx-0 min-[960px]:max-w-none">
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative rounded-3xl border border-bleu/10 bg-papier/95 p-6 shadow-ombre-bleu min-[480px]:p-8"
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
              <legend className="mb-1 text-sm font-medium text-encre">
                {t.register.typesLegend} *
              </legend>
              <p className="mb-3 text-xs leading-relaxed text-charbon">
                {t.register.typesHint}
              </p>
              <div className="grid gap-2">
                {REGISTRATION_TYPES.map((type) => {
                  const selected = registrationTypes.includes(type.value);
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
                        type="checkbox"
                        name="registrationTypes"
                        value={type.value}
                        checked={selected}
                        onChange={() => toggleType(type.value)}
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

            <div className="mb-5">
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.register.emailPh}
                className={fieldClass}
              />
            </div>

            <fieldset className="mb-5">
              <legend className="mb-2 block text-sm font-medium text-encre">
                {t.register.busQuestion}
              </legend>
              <p className="mb-3 text-xs leading-relaxed text-charbon">
                {t.register.busHint}
              </p>
              <div className="flex flex-wrap gap-3">
                <label
                  className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                    busWanted === true
                      ? "border-bleu bg-bleu text-papier"
                      : "border-sable bg-papier text-encre hover:border-bleu/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="busWanted"
                    className="sr-only"
                    checked={busWanted === true}
                    onChange={() => setBusWanted(true)}
                  />
                  {t.register.busYes}
                </label>
                <label
                  className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                    busWanted === false
                      ? "border-bleu bg-bleu text-papier"
                      : "border-sable bg-papier text-encre hover:border-bleu/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="busWanted"
                    className="sr-only"
                    checked={busWanted === false}
                    onChange={() => {
                      setBusWanted(false);
                      setBusLocation("");
                    }}
                  />
                  {t.register.busNo}
                </label>
              </div>
              {busWanted ? (
                <div className="mt-4">
                  <label
                    htmlFor="reg-bus-location"
                    className="mb-1.5 block text-sm font-medium text-encre"
                  >
                    {t.register.busLocation}
                  </label>
                  <input
                    id="reg-bus-location"
                    name="busLocation"
                    type="text"
                    required
                    value={busLocation}
                    onChange={(e) => setBusLocation(e.target.value)}
                    placeholder={t.register.busLocationPh}
                    className={fieldClass}
                    maxLength={200}
                  />
                </div>
              ) : null}
            </fieldset>

            {canRegisterOthers ? (
              <div className="mb-6 rounded-2xl border border-bleu/10 bg-ciel/30 p-4">
                <p className="text-xs leading-relaxed text-charbon">
                  {includesAmbassador && !includesFestival
                    ? t.registerExtras.ambassadeurGuestsHint
                    : t.registerExtras.guestsHint}
                </p>
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="mt-4 border-t border-bleu/10 pt-4 first:mt-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-bleu">
                        {t.registerExtras.guestLabel.replace(
                          "{n}",
                          String(index + 2),
                        )}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setGuests((prev) => prev.filter((_, i) => i !== index))
                        }
                        className="text-xs font-bold text-feu underline-offset-2 hover:underline"
                      >
                        {t.registerExtras.removeGuest}
                      </button>
                    </div>
                    <div className="mb-3">
                      <label className="mb-1.5 block text-sm font-medium text-encre">
                        {t.registerExtras.guestName}
                      </label>
                      <input
                        type="text"
                        required
                        value={guest.name}
                        onChange={(e) =>
                          setGuests((prev) =>
                            prev.map((g, i) =>
                              i === index ? { ...g, name: e.target.value } : g,
                            ),
                          )
                        }
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-encre">
                        {t.registerExtras.guestPhone}
                      </label>
                      <input
                        type="tel"
                        required
                        value={guest.phone}
                        onChange={(e) =>
                          setGuests((prev) =>
                            prev.map((g, i) =>
                              i === index ? { ...g, phone: e.target.value } : g,
                            ),
                          )
                        }
                        placeholder={t.register.phonePh}
                        className={fieldClass}
                      />
                    </div>
                  </div>
                ))}
                {canAddGuest ? (
                  <button
                    type="button"
                    onClick={() =>
                      setGuests((prev) => [...prev, { name: "", phone: "" }])
                    }
                    className="mt-4 w-full rounded-xl border border-dashed border-bleu/35 bg-papier px-3 py-3 text-sm font-bold text-bleu transition-colors hover:border-bleu hover:bg-ciel/50"
                  >
                    {t.registerExtras.addGuest}
                  </button>
                ) : guests.length >= MAX_GUESTS ? (
                  <p className="mt-3 text-xs text-charbon">
                    {t.registerExtras.maxGuests}
                  </p>
                ) : null}
              </div>
            ) : null}

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
              className="btn-cta-flame w-full rounded-full px-4 py-4 text-[1.02rem] font-bold tracking-[0.02em] text-papier ring-2 ring-[color-mix(in_srgb,var(--feu-glow)_50%,transparent)] transition-[transform,filter] duration-[250ms] ease-yuna hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-feu disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {pending ? "…" : submitLabel}
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
          </form>
          </Reveal>

          <Reveal
            variant="right"
            delay={0.08}
            className="hidden min-[960px]:sticky min-[960px]:top-28 min-[960px]:block"
          >
            <p className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-charbon">
              {t.register.previewLabel}
            </p>
            <PassPreview name={name} registrationType={previewType} />
            <p className="mt-4 text-sm leading-relaxed text-charbon">
              {t.register.previewHint}
            </p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
