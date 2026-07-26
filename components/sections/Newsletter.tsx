"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Indique une adresse e-mail valide.");
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, website }),
      });
      const payload = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !payload.ok) {
        setError(payload.error ?? "Inscription impossible. Réessaie.");
        return;
      }
      setOk(true);
      setEmail("");
    } catch {
      setError("Réseau indisponible. Vérifie ta connexion.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-3xl bg-bleu p-6 text-papier min-[480px]:p-7">
      <h3 className="font-display text-2xl font-extrabold uppercase leading-tight">
        Reste dans le feu
      </h3>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-papier/80">
        Annonces exclusives : artistes, masterclass, infos jour J.
      </p>

      {ok ? (
        <p className="mt-4 font-medium text-[#ffd2b0]" role="status">
          C&apos;est noté — tu recevras nos annonces.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-2.5" noValidate>
          <label className="sr-only" htmlFor="nl-website" aria-hidden>
            Site web
          </label>
          <input
            id="nl-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            required
            aria-label="Ton email"
            className="w-full rounded-full border-0 bg-papier px-4 py-3 text-[0.95rem] text-encre outline-none placeholder:text-charbon/45 focus:ring-2 focus:ring-feu"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-feu px-5 py-3 text-[0.9rem] font-bold text-papier transition-colors duration-200 hover:bg-braise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-papier disabled:opacity-60"
          >
            {pending ? "Envoi…" : "Je m'abonne"}
          </button>
        </form>
      )}

      {error ? (
        <p className="mt-2.5 text-sm text-[#ffd2b0]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
