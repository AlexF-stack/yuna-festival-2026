"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const fieldClass =
  "w-full rounded-xl border border-bleu/15 bg-papier px-4 py-3.5 text-base text-encre outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-charbon/45 focus:border-bleu focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--bleu)_18%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bleu";

export function RecoverPassForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/api/recover-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, website }),
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

      const payload = (await res.json()) as { id?: string };
      if (!payload.id) {
        setError("Pass introuvable pour ce numéro.");
        return;
      }

      router.push(`/confirmation/${payload.id}`);
    } catch {
      setError("Réseau indisponible. Vérifie ta connexion.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-3xl border border-bleu/12 bg-papier p-6 shadow-ombre-bleu min-[480px]:p-8"
      noValidate
    >
      <label htmlFor="recover-phone" className="mb-1.5 block text-sm font-medium text-encre">
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
