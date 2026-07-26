"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { FESTIVAL } from "@/lib/festival";

type FieldErrors = {
  form?: string;
};

export function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ name, phone, email }),
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

  const fieldClass =
    "w-full rounded-xl border border-bleu/15 bg-papier px-4 py-3.5 text-base text-encre outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-charbon/45 focus:border-bleu focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--bleu)_18%,transparent)]";

  return (
    <section
      id="inscription"
      aria-labelledby="register-title"
      className="relative z-10 overflow-hidden px-5 py-24 min-[760px]:px-6 min-[760px]:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/media/concert.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ciel/95 via-papier/92 to-[#fff0e6]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,color-mix(in_srgb,var(--feu)_14%,transparent),transparent_55%)]" />
      </div>

      <div className="mx-auto grid max-w-[1240px] items-start gap-12 min-[900px]:grid-cols-[1fr_minmax(0,26rem)] min-[900px]:gap-16">
        <div>
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu">
            Inscription
          </p>
          <h2
            id="register-title"
            className="font-display text-[clamp(2.6rem,7vw,4.75rem)] font-extrabold uppercase leading-[0.95] text-bleu"
          >
            Réserve
            <br />
            <span className="text-feu">ton pass</span>
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-charbon">
            {FESTIVAL.freeEntry}. Inscris-toi pour recevoir ton pass QR
            personnel — à présenter à l&apos;entrée.
          </p>

          <ul className="mt-8 space-y-3.5 text-sm text-charbon">
            {[
              "Accès prioritaire aux deux soirées",
              "Pass QR généré immédiatement",
              "Ouverture du site à 17h · concerts dès 18h",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-feu" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-3xl border border-bleu/10 bg-papier p-6 shadow-[0_20px_50px_rgba(0,90,140,0.1)] min-[480px]:p-8"
        >
          <h3 className="mb-6 font-display text-xl font-extrabold uppercase tracking-wide text-bleu">
            Tes infos
          </h3>

          <div className="mb-4">
            <label htmlFor="reg-name" className="mb-1.5 block text-sm font-medium text-encre">
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
          </div>

          <div className="mb-4">
            <label htmlFor="reg-phone" className="mb-1.5 block text-sm font-medium text-encre">
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

          <div className="mb-6">
            <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-encre">
              Email <span className="text-charbon/50">(optionnel)</span>
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              className={fieldClass}
            />
          </div>

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
        </form>
      </div>
    </section>
  );
}
