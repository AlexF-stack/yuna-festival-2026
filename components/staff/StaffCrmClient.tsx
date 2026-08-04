"use client";

import { useCallback, useEffect, useState } from "react";

type Registration = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  pass_type: string;
  qr_token: string;
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
};

type ApiOk = {
  ok: true;
  page: number;
  pageSize: number;
  total: number;
  registrations: Registration[];
};

type ApiErr = { ok: false; error: string };

function formatWhen(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function StaffCrmClient() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiOk | null>(null);

  const fetchPage = useCallback(
    async (nextPage: number, query: string) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: String(nextPage),
          pageSize: "25",
        });
        if (query.trim()) params.set("q", query.trim());

        const res = await fetch(`/api/crm/registrations?${params}`, {
          headers: { "x-api-key": secret.trim() },
        });
        const json = (await res.json()) as ApiOk | ApiErr;
        if (!res.ok || !json.ok) {
          setData(null);
          setError(
            !json.ok
              ? json.error
              : `Erreur HTTP ${res.status}`,
          );
          if (res.status === 401) setUnlocked(false);
          return;
        }
        setData(json);
        setPage(json.page);
        setUnlocked(true);
      } catch {
        setError("Réseau indisponible.");
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [secret],
  );

  useEffect(() => {
    if (!unlocked) return;
    const t = window.setTimeout(() => {
      void fetchPage(1, q);
    }, 280);
    return () => window.clearTimeout(t);
  }, [q, unlocked, fetchPage]);

  async function onUnlock(e: React.FormEvent) {
    e.preventDefault();
    await fetchPage(1, q);
  }

  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / data.pageSize))
    : 1;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pt-6">
      <div className="mb-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-feu">
          Staff
        </p>
        <h1 className="mt-1 font-display text-[clamp(1.75rem,8vw,2.75rem)] font-extrabold uppercase leading-none text-bleu">
          CRM inscriptions
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-charbon">
          Lecture live des inscriptions site. Même secret que le scan QR.
        </p>
      </div>

      {!unlocked ? (
        <form
          onSubmit={onUnlock}
          className="mx-auto max-w-md rounded-[1.5rem] border border-sable/80 bg-papier p-5 shadow-sm sm:p-6"
        >
          <label
            htmlFor="crm-secret"
            className="mb-2 block text-sm font-medium text-encre"
          >
            Secret staff
          </label>
          <input
            id="crm-secret"
            type="password"
            autoComplete="current-password"
            enterKeyHint="go"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="mb-4 w-full rounded-2xl border border-sable bg-nuage px-4 py-3.5 text-base text-encre outline-none focus:border-bleu"
            placeholder="Coller le secret…"
            required
          />
          <button
            type="submit"
            disabled={loading || !secret.trim()}
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-bleu px-6 py-3.5 text-base font-bold text-papier disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Ouvrir le CRM"}
          </button>
          {error ? (
            <p className="mt-3 text-sm font-medium text-feu" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      ) : (
        <>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="crm-q">
              Recherche
            </label>
            <input
              id="crm-q"
              type="search"
              enterKeyHint="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nom, téléphone, e-mail…"
              className="min-h-12 w-full flex-1 rounded-2xl border border-sable bg-papier px-4 py-3 text-base text-encre outline-none focus:border-bleu"
            />
            <button
              type="button"
              onClick={() => void fetchPage(page, q)}
              disabled={loading}
              className="min-h-12 shrink-0 rounded-full border-2 border-bleu/30 bg-papier px-5 py-3 text-sm font-bold text-bleu disabled:opacity-50 sm:w-auto"
            >
              {loading ? "…" : "Actualiser"}
            </button>
          </div>

          {error ? (
            <p className="mb-4 text-sm font-medium text-feu" role="alert">
              {error}
            </p>
          ) : null}

          <p className="mb-3 text-sm text-charbon">
            {data ? (
              <>
                <span className="font-bold text-encre">{data.total}</span>{" "}
                inscription{data.total > 1 ? "s" : ""}
                {q.trim() ? " (filtre)" : ""}
              </>
            ) : (
              "Chargement…"
            )}
          </p>

          {/* Mobile : cartes */}
          <ul className="flex flex-col gap-3 md:hidden">
            {(data?.registrations ?? []).map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-sable/80 bg-papier p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-bold text-encre">{r.name}</p>
                    <a
                      href={`tel:${r.phone}`}
                      className="mt-0.5 block text-sm font-semibold text-bleu"
                    >
                      {r.phone}
                    </a>
                    {r.email ? (
                      <a
                        href={`mailto:${r.email}`}
                        className="mt-0.5 block truncate text-xs text-charbon"
                      >
                        {r.email}
                      </a>
                    ) : null}
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide ${
                      r.checked_in
                        ? "bg-vert/15 text-vert"
                        : "bg-sable/60 text-charbon"
                    }`}
                  >
                    {r.checked_in ? "Entré" : "Attente"}
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-charbon">
                  <div>
                    <dt className="font-semibold text-encre/70">Pass</dt>
                    <dd className="mt-0.5 capitalize">{r.pass_type}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-encre/70">Inscrit</dt>
                    <dd className="mt-0.5">{formatWhen(r.created_at)}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-semibold text-encre/70">Check-in</dt>
                    <dd className="mt-0.5">{formatWhen(r.checked_in_at)}</dd>
                  </div>
                </dl>
              </li>
            ))}
            {data && data.registrations.length === 0 ? (
              <li className="rounded-2xl border border-dashed border-sable bg-papier/60 px-4 py-10 text-center text-sm text-charbon">
                Aucun résultat.
              </li>
            ) : null}
          </ul>

          {/* Desktop : table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-sable/80 bg-papier shadow-sm md:block">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-sable bg-nuage/80 text-[0.7rem] font-bold uppercase tracking-wider text-charbon">
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Téléphone</th>
                  <th className="px-4 py-3">Pass</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Inscrit</th>
                  <th className="px-4 py-3">Check-in</th>
                </tr>
              </thead>
              <tbody>
                {(data?.registrations ?? []).map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-sable/60 last:border-0"
                  >
                    <td className="px-4 py-3 font-semibold text-encre">
                      {r.name}
                      {r.email ? (
                        <span className="mt-0.5 block text-xs font-normal text-charbon">
                          {r.email}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{r.phone}</td>
                    <td className="px-4 py-3 capitalize">{r.pass_type}</td>
                    <td className="px-4 py-3">
                      {r.checked_in ? (
                        <span className="font-bold text-vert">Entré</span>
                      ) : (
                        <span className="text-charbon">En attente</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-charbon">
                      {formatWhen(r.created_at)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-charbon">
                      {formatWhen(r.checked_in_at)}
                    </td>
                  </tr>
                ))}
                {data && data.registrations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-charbon"
                    >
                      Aucun résultat.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          {data && data.total > data.pageSize ? (
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={loading || page <= 1}
                onClick={() => void fetchPage(page - 1, q)}
                className="min-h-11 flex-1 rounded-full border-2 border-bleu/25 bg-papier px-4 py-2.5 text-sm font-bold text-bleu disabled:opacity-40 sm:flex-none"
              >
                Précédent
              </button>
              <span className="shrink-0 text-sm text-charbon">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={loading || page >= totalPages}
                onClick={() => void fetchPage(page + 1, q)}
                className="min-h-11 flex-1 rounded-full border-2 border-bleu/25 bg-papier px-4 py-2.5 text-sm font-bold text-bleu disabled:opacity-40 sm:flex-none"
              >
                Suivant
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
