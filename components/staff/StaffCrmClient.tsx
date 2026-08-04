"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  REGISTRATION_TYPE_LABELS,
  isRegistrationType,
} from "@/lib/registration-types";

type RegistrationRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  registrationType: string;
  createdAt: string;
  checkedInAt: string | null;
};

const STAFF_KEY = "yuna-staff-secret";

function typeLabel(value: string): string {
  if (isRegistrationType(value)) return REGISTRATION_TYPE_LABELS[value];
  return value;
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Africa/Porto-Novo",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function StaffCrmClient() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<RegistrationRow[]>([]);
  const [query, setQuery] = useState("");

  const load = useCallback(async (token: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/crm/registrations?limit=500", {
        headers: { "x-yuna-staff": token },
      });
      if (!res.ok) {
        let message = "Chargement impossible.";
        try {
          const data = (await res.json()) as { error?: string };
          if (data.error) message = data.error;
        } catch {
          /* ignore */
        }
        setError(message);
        setUnlocked(false);
        return;
      }
      const data = (await res.json()) as {
        registrations?: RegistrationRow[];
      };
      setRows(data.registrations ?? []);
      setUnlocked(true);
    } catch {
      setError("Réseau indisponible. Réessaie.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem(STAFF_KEY);
      if (!s) return;
      setSecret(s);
      void load(s);
    } catch {
      /* ignore */
    }
  }, [load]);

  const unlock = async () => {
    const s = secret.trim();
    if (s.length < 8) {
      setError("Secret staff trop court.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/staff/unlock", {
        method: "POST",
        headers: { "x-yuna-staff": s },
      });
      if (!res.ok) {
        let message = "Secret invalide.";
        try {
          const data = (await res.json()) as { error?: string };
          if (data.error) message = data.error;
        } catch {
          /* ignore */
        }
        setError(message);
        return;
      }
      try {
        sessionStorage.setItem(STAFF_KEY, s);
      } catch {
        /* ignore */
      }
      await load(s);
    } catch {
      setError("Impossible de vérifier le secret.");
    } finally {
      setBusy(false);
    }
  };

  const filtered = rows.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      r.name.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      (r.email ?? "").toLowerCase().includes(q) ||
      typeLabel(r.registrationType).toLowerCase().includes(q)
    );
  });

  const checkedIn = rows.filter((r) => r.checkedInAt).length;

  if (!unlocked) {
    return (
      <div className="mx-auto w-full max-w-md rounded-3xl border border-bleu/15 bg-papier p-6 shadow-[0_16px_40px_rgba(0,90,140,0.1)]">
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
          Staff · CRM
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase text-bleu">
          Inscriptions
        </h1>
        <p className="mt-3 text-sm text-charbon">
          Listing des passes QR. Même secret que le scan porte. La sync vers la
          base CRM tourne en arrière-plan à chaque inscription / check-in.
        </p>
        <label className="mt-6 block text-sm font-semibold text-bleu">
          Secret staff
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-bleu/20 bg-papier px-3 py-3 text-encre outline-none focus:ring-2 focus:ring-feu"
            autoComplete="off"
          />
        </label>
        {error ? (
          <p className="mt-3 text-sm text-feu" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => void unlock()}
          disabled={busy}
          className="mt-6 w-full rounded-full bg-feu px-4 py-3.5 font-bold text-papier hover:bg-braise disabled:opacity-60"
        >
          {busy ? "Ouverture…" : "Ouvrir le CRM"}
        </button>
        <ButtonLink href="/staff/scan" variant="ghost" className="mt-3 w-full !px-0">
          Aller au scan porte
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
            Staff · CRM
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold uppercase text-bleu">
            Inscriptions
          </h1>
          <p className="mt-2 text-sm text-charbon">
            {rows.length} inscrits · {checkedIn} déjà scannés
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void load(secret.trim())}
            disabled={busy}
            className="rounded-full border border-bleu/25 bg-papier px-4 py-2 text-sm font-bold text-bleu hover:bg-ciel disabled:opacity-60"
          >
            {busy ? "…" : "Rafraîchir"}
          </button>
          <Link
            href="/staff/scan"
            className="rounded-full bg-feu px-4 py-2 text-sm font-bold text-papier hover:bg-braise"
          >
            Scan porte
          </Link>
        </div>
      </div>

      <label className="mt-6 block text-sm font-semibold text-bleu">
        Rechercher
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nom, téléphone, e-mail, type…"
          className="mt-1.5 w-full rounded-xl border border-bleu/20 bg-papier px-3 py-3 text-encre outline-none focus:ring-2 focus:ring-feu"
        />
      </label>

      {error ? (
        <p className="mt-4 text-sm text-feu" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-bleu/15 bg-papier">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-bleu/10 bg-ciel/50 font-mono text-[0.68rem] uppercase tracking-wider text-bleu">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Inscrit le</th>
              <th className="px-4 py-3">Entrée</th>
              <th className="px-4 py-3">Pass</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-charbon">
                  Aucune inscription pour l’instant.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b border-bleu/8 last:border-0">
                  <td className="px-4 py-3 font-semibold text-encre">{r.name}</td>
                  <td className="px-4 py-3 font-mono text-[0.85rem]">{r.phone}</td>
                  <td className="px-4 py-3">{typeLabel(r.registrationType)}</td>
                  <td className="px-4 py-3 text-charbon">
                    {formatDate(r.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    {r.checkedInAt ? (
                      <span className="font-semibold text-vert">
                        {formatDate(r.checkedInAt)}
                      </span>
                    ) : (
                      <span className="text-charbon/60">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/confirmation/${r.id}`}
                      className="font-bold text-bleu underline-offset-2 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Voir
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
