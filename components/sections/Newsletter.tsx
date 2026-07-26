"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Indique une adresse e-mail valide.");
      return;
    }

    setOk(true);
    setEmail("");
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
            className="rounded-full bg-feu px-5 py-3 text-[0.9rem] font-bold text-papier transition-colors duration-200 hover:bg-braise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-papier"
          >
            Je m&apos;abonne
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
