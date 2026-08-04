"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [consent, setConsent] = useState(false);
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
    if (!consent) {
      setError("Coche la case de consentement pour t'abonner.");
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, website, consent }),
      });
      if (!res.ok) {
        let message = "Inscription impossible. Réessaie.";
        try {
          const payload = (await res.json()) as { error?: string };
          if (payload.error) message = payload.error;
        } catch {
          /* ignore */
        }
        setError(message);
        return;
      }
      const payload = (await res.json()) as { ok?: boolean; error?: string };
      if (!payload.ok) {
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
        <p className="mt-4 font-medium text-alert-soft" role="status">
          C&apos;est noté — tu recevras nos annonces.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="relative mt-5 flex flex-col gap-2.5" noValidate>
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
          <label htmlFor="newsletter-email" className="text-sm font-medium text-papier/90">
            Ton e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            required
            className="w-full rounded-full border-0 bg-papier px-4 py-3 text-[0.95rem] text-encre outline-none placeholder:text-charbon/45 focus:ring-2 focus:ring-feu focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-papier"
          />
          <label
            htmlFor="newsletter-consent"
            className="flex cursor-pointer items-start gap-2.5 py-1 text-[0.78rem] leading-relaxed text-papier/80"
          >
            <input
              id="newsletter-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-feu"
            />
            <span>
              J&apos;accepte de recevoir les annonces YUNA par e-mail.
              Désinscription à tout moment —{" "}
              <a
                href="/confidentialite"
                className="underline underline-offset-2 hover:text-papier"
              >
                politique de confidentialité
              </a>
              .
            </span>
          </label>
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
        <p className="mt-2.5 text-sm text-alert-soft" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
