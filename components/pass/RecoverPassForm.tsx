"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const fieldClass =
  "w-full rounded-xl border border-bleu/15 bg-papier px-4 py-3.5 text-base text-encre outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-charbon/45 focus:border-bleu focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--bleu)_18%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bleu";

type RecoveredPass = { id: string; label: string };

export function RecoverPassForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passes, setPasses] = useState<RecoveredPass[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/api/recover-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, website }),
      });

      if (!res.ok) {
        let message = "Récupération impossible. Réessaie.";
        try {
          const payload = (await res.json()) as { error?: string };
          if (payload.error) message = payload.error;
        } catch {
          /* ignore */
        }
        setError(message);
        return;
      }

      const payload = (await res.json()) as {
        found?: boolean;
        id?: string;
        passes?: RecoveredPass[];
      };
      if (!payload.found || !payload.id) {
        setError(
          "Aucun pass ne correspond à ces informations. Vérifie le nom et le numéro utilisés à l'inscription.",
        );
        return;
      }

      if (payload.passes && payload.passes.length > 1) {
        setPasses(payload.passes);
        return;
      }

      router.push(`/confirmation/${payload.id}`);
    } catch {
      setError("Réseau indisponible. Vérifie ta connexion.");
    } finally {
      setPending(false);
    }
  }

  if (passes.length > 1) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-bleu/12 bg-papier p-6 shadow-ombre-bleu min-[480px]:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase text-bleu">
          Tes pass
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-charbon">
          Plusieurs inscriptions correspondent. Choisis le pass à afficher.
        </p>
        <ul className="mt-5 space-y-2.5">
          {passes.map((p) => (
            <li key={p.id}>
              <Link
                href={`/confirmation/${p.id}`}
                className="flex min-h-11 items-center justify-between rounded-xl border border-bleu/15 px-4 py-3 font-bold text-bleu transition-colors duration-200 hover:bg-bleu hover:text-papier focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bleu"
              >
                {p.label}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-3xl border border-bleu/12 bg-papier p-6 shadow-ombre-bleu min-[480px]:p-8"
      noValidate
    >
      <label htmlFor="recover-name" className="mb-1.5 block text-sm font-medium text-encre">
        Nom complet
      </label>
      <input
        id="recover-name"
        name="name"
        type="text"
        autoComplete="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex : Grâce Ahouansou"
        className={fieldClass}
      />

      <label
        htmlFor="recover-phone"
        className="mb-1.5 mt-4 block text-sm font-medium text-encre"
      >
        Numéro WhatsApp
      </label>
      <input
        id="recover-phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+229 01 XX XX XX XX"
        className={fieldClass}
      />
      <p className="mt-1.5 text-xs text-charbon">
        Celui utilisé lors de ton inscription.
      </p>

      {/* honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="recover-website">Site</label>
        <input
          id="recover-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-sm text-feu">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-feu px-4 py-4 text-[1.02rem] font-bold tracking-[0.02em] text-papier transition-[background-color,transform] duration-[250ms] ease-yuna hover:-translate-y-0.5 hover:bg-braise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {pending ? "Recherche…" : "Retrouver mon pass"}
      </button>
    </form>
  );
}
