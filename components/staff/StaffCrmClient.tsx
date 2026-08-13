"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  REGISTRATION_TYPE_LABELS,
  REGISTRATION_TYPES,
  isRegistrationType,
} from "@/lib/registration-types";

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
  checkedInBy?: string | null;
  partyId?: string | null;
};

type CrmStats = {
  all: number;
  checkedIn: number;
  pending: number;
};

type ApiOk = {
  ok: true;
  page: number;
  pageSize: number;
  total: number;
  registrations: Registration[];
  stats?: CrmStats;
};

type ApiErr = { ok: false; error: string };

const CRM_KEY = "yuna-crm-api-key";
const LIVE_POLL_MS = 6000;

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

function typeLabel(type: string) {
  return isRegistrationType(type) ? REGISTRATION_TYPE_LABELS[type] : type;
}

function ticketCode(id: string) {
  return `YUNA-${id.slice(0, 8).toUpperCase()}`;
}

function exportCsv(rows: Registration[]) {
  const header = [
    "ticket",
    "id",
    "name",
    "phone",
    "email",
    "type",
    "checked_in",
    "checked_in_at",
    "created_at",
    "party_id",
  ];
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        ticketCode(r.id),
        r.id,
        JSON.stringify(r.name),
        JSON.stringify(r.phone),
        JSON.stringify(r.email ?? ""),
        r.pass_type,
        r.checked_in ? "1" : "0",
        r.checked_in_at ?? "",
        r.created_at,
        r.partyId ?? "",
      ].join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `yuna-tickets-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * CRM tickets — listing ops (clé CRM). Scan porte = outil séparé.
 */
export function StaffCrmClient() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [q, setQ] = useState("");
  const [checkedIn, setCheckedIn] = useState<"all" | "yes" | "no">("all");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiOk | null>(null);
  const [live, setLive] = useState(true);
  const [lastSyncAt, setLastSyncAt] = useState<number | null>(null);
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set());
  const prevCheckedRef = useRef<Map<string, boolean>>(new Map());

  const fetchPage = useCallback(
    async (
      nextPage: number,
      query: string,
      status: "all" | "yes" | "no",
      type: string,
      key = secret,
      opts?: { silent?: boolean },
    ) => {
      const silent = Boolean(opts?.silent);
      if (!silent) {
        setLoading(true);
        setError(null);
      }
      try {
        const params = new URLSearchParams({
          page: String(nextPage),
          pageSize: "25",
          checkedIn: status,
        });
        if (query.trim()) params.set("q", query.trim());
        if (type.trim()) params.set("type", type.trim());

        const res = await fetch(`/api/crm/registrations?${params}`, {
          headers: {
            "x-api-key": key.trim(),
            "x-yuna-crm": key.trim(),
          },
          cache: "no-store",
        });
        const json = (await res.json()) as ApiOk | ApiErr;
        if (!res.ok || !json.ok) {
          if (!silent) {
            setData(null);
            setError(!json.ok ? json.error : `Erreur HTTP ${res.status}`);
          }
          if (res.status === 401) {
            setUnlocked(false);
            try {
              sessionStorage.removeItem(CRM_KEY);
            } catch {
              /* ignore */
            }
          }
          return;
        }

        const newlyIn = new Set<string>();
        for (const row of json.registrations) {
          const was = prevCheckedRef.current.get(row.id);
          if (was === false && row.checked_in) newlyIn.add(row.id);
          prevCheckedRef.current.set(row.id, row.checked_in);
        }
        if (newlyIn.size > 0) {
          setFlashIds((prev) => {
            const next = new Set(prev);
            newlyIn.forEach((id) => next.add(id));
            return next;
          });
          window.setTimeout(() => {
            setFlashIds((prev) => {
              const next = new Set(prev);
              newlyIn.forEach((id) => next.delete(id));
              return next;
            });
          }, 4500);
        }

        setData(json);
        setPage(json.page);
        setUnlocked(true);
        setLastSyncAt(Date.now());
        try {
          sessionStorage.setItem(CRM_KEY, key.trim());
        } catch {
          /* ignore */
        }
      } catch {
        if (!silent) {
          setError("Réseau indisponible.");
          setData(null);
        }
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [secret],
  );

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(CRM_KEY);
      if (!saved) return;
      setSecret(saved);
      void fetchPage(1, "", "all", "", saved);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- unlock once on mount
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    const t = window.setTimeout(() => {
      void fetchPage(1, q, checkedIn, typeFilter);
    }, 280);
    return () => window.clearTimeout(t);
  }, [q, checkedIn, typeFilter, unlocked, fetchPage]);

  useEffect(() => {
    if (!unlocked || !live) return;
    const tick = () => {
      if (document.hidden) return;
      void fetchPage(page, q, checkedIn, typeFilter, secret, { silent: true });
    };
    const id = window.setInterval(tick, LIVE_POLL_MS);
    return () => window.clearInterval(id);
  }, [unlocked, live, page, q, checkedIn, typeFilter, secret, fetchPage]);

  async function onUnlock(e: React.FormEvent) {
    e.preventDefault();
    await fetchPage(1, q, checkedIn, typeFilter);
  }

  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / data.pageSize))
    : 1;
  const stats = data?.stats;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pt-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-feu">
            Ops · Tickets
          </p>
          <h1 className="mt-1 font-display text-[clamp(1.75rem,8vw,2.75rem)] font-extrabold uppercase leading-none text-bleu">
            CRM tickets
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-charbon">
            Inscriptions &amp; tickets QR. L’entrée se gère sur le{" "}
            <Link
              href="/staff/scan"
              className="font-bold text-bleu underline-offset-2 hover:underline"
            >
              scan porte
            </Link>{" "}
            (secret distinct).
          </p>
        </div>
        {unlocked ? (
          <div className="flex flex-col items-end gap-1">
            <button
              type="button"
              onClick={() => setLive((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                live
                  ? "bg-vert/15 text-vert"
                  : "border border-bleu/20 bg-papier text-charbon"
              }`}
              aria-pressed={live}
            >
              <span
                className={`size-2 rounded-full ${
                  live ? "animate-pulse bg-vert" : "bg-charbon/40"
                }`}
                aria-hidden
              />
              {live ? "Live" : "Pause"}
            </button>
            <p className="text-[0.7rem] text-charbon">
              {lastSyncAt
                ? `Maj ${new Date(lastSyncAt).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}`
                : "—"}
            </p>
          </div>
        ) : null}
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
            Clé CRM
          </label>
          <input
            id="crm-secret"
            type="password"
            autoComplete="current-password"
            enterKeyHint="go"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="mb-4 w-full rounded-2xl border border-sable bg-nuage px-4 py-3.5 text-base text-encre outline-none focus:border-bleu"
            placeholder="YUNA_CRM_API_KEY…"
            required
          />
          <button
            type="submit"
            disabled={loading || !secret.trim()}
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-bleu px-6 py-3.5 text-base font-bold text-papier disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Ouvrir le CRM"}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-charbon">
            Distinct du secret scan — la tablette d’entrée n’ouvre pas ce
            listing.
          </p>
          {error ? (
            <p className="mt-3 text-sm font-medium text-feu" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      ) : (
        <>
          {/* KPIs */}
          <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
            {(
              [
                {
                  key: "all" as const,
                  label: "Tickets",
                  value: stats?.all ?? data?.total ?? "—",
                  tone: "text-bleu",
                },
                {
                  key: "no" as const,
                  label: "En attente",
                  value: stats?.pending ?? "—",
                  tone: "text-feu",
                },
                {
                  key: "yes" as const,
                  label: "Entrés",
                  value: stats?.checkedIn ?? "—",
                  tone: "text-vert",
                },
              ] as const
            ).map((kpi) => (
              <button
                key={kpi.key}
                type="button"
                onClick={() => setCheckedIn(kpi.key)}
                className={`rounded-2xl border px-3 py-3 text-left transition-colors sm:px-4 sm:py-4 ${
                  checkedIn === kpi.key
                    ? "border-bleu bg-papier shadow-sm ring-2 ring-bleu/20"
                    : "border-sable/70 bg-papier/80 hover:border-bleu/30"
                }`}
              >
                <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-charbon">
                  {kpi.label}
                </p>
                <p
                  className={`mt-1 font-display text-[clamp(1.5rem,5vw,2rem)] font-extrabold leading-none ${kpi.tone}`}
                >
                  {kpi.value}
                </p>
              </button>
            ))}
          </div>

          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="min-h-12 rounded-2xl border border-sable bg-papier px-4 text-sm font-bold text-bleu sm:max-w-[14rem]"
              aria-label="Type de ticket"
            >
              <option value="">Tous types</option>
              {REGISTRATION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => void fetchPage(page, q, checkedIn, typeFilter)}
              disabled={loading}
              className="min-h-12 shrink-0 rounded-full border-2 border-bleu/30 bg-papier px-5 py-3 text-sm font-bold text-bleu disabled:opacity-50"
            >
              {loading ? "…" : "Actualiser"}
            </button>
            <button
              type="button"
              onClick={() => data && exportCsv(data.registrations)}
              disabled={!data?.registrations.length}
              className="min-h-12 shrink-0 rounded-full bg-feu px-5 py-3 text-sm font-bold text-papier disabled:opacity-50"
            >
              CSV
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
                résultat{data.total > 1 ? "s" : ""}
                {checkedIn !== "all" || typeFilter || q.trim()
                  ? " (filtre actif)"
                  : ""}
              </>
            ) : (
              "Chargement…"
            )}
          </p>

          {/* Mobile cards */}
          <ul className="flex flex-col gap-3 md:hidden">
            {(data?.registrations ?? []).map((r) => (
              <li
                key={r.id}
                className={`rounded-2xl border bg-papier p-4 shadow-sm transition-colors ${
                  flashIds.has(r.id)
                    ? "border-vert bg-vert/10"
                    : "border-sable/80"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[0.65rem] font-bold tracking-wider text-feu">
                      {ticketCode(r.id)}
                    </p>
                    <p className="mt-1 truncate font-bold text-encre">
                      {r.name}
                    </p>
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
                    <dt className="font-semibold text-encre/70">Type</dt>
                    <dd className="mt-0.5">{typeLabel(r.pass_type)}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-encre/70">Inscrit</dt>
                    <dd className="mt-0.5">{formatWhen(r.created_at)}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-semibold text-encre/70">Entrée</dt>
                    <dd className="mt-0.5">
                      {formatWhen(r.checked_in_at)}
                      {r.checkedInBy ? ` · ${r.checkedInBy}` : ""}
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/confirmation/${r.id}`}
                  className="mt-3 inline-block text-xs font-bold text-feu underline-offset-2 hover:underline"
                >
                  Voir le ticket →
                </Link>
              </li>
            ))}
            {data && data.registrations.length === 0 ? (
              <li className="rounded-2xl border border-dashed border-sable bg-papier/60 px-4 py-10 text-center text-sm text-charbon">
                Aucun ticket.
              </li>
            ) : null}
          </ul>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-sable/80 bg-papier shadow-sm md:block">
            <table className="w-full min-w-[800px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-sable bg-nuage/80 text-[0.7rem] font-bold uppercase tracking-wider text-charbon">
                  <th className="px-4 py-3">Ticket</th>
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Téléphone</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Inscrit</th>
                  <th className="px-4 py-3">Entrée</th>
                  <th className="px-4 py-3">Lien</th>
                </tr>
              </thead>
              <tbody>
                {(data?.registrations ?? []).map((r) => (
                  <tr
                    key={r.id}
                    className={`border-b border-sable/60 last:border-0 transition-colors ${
                      flashIds.has(r.id) ? "bg-vert/10" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-bold tracking-wide text-feu">
                      {ticketCode(r.id)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-encre">
                      {r.name}
                      {r.email ? (
                        <span className="mt-0.5 block text-xs font-normal text-charbon">
                          {r.email}
                        </span>
                      ) : null}
                      {r.partyId ? (
                        <span className="mt-0.5 block font-mono text-[0.65rem] text-feu">
                          Groupe {r.partyId.slice(0, 8)}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{r.phone}</td>
                    <td className="px-4 py-3">{typeLabel(r.pass_type)}</td>
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
                      {r.checkedInBy ? (
                        <span className="mt-0.5 block text-xs">
                          {r.checkedInBy}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/confirmation/${r.id}`}
                        className="font-bold text-feu underline-offset-2 hover:underline"
                      >
                        Ticket
                      </Link>
                    </td>
                  </tr>
                ))}
                {data && data.registrations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center text-charbon"
                    >
                      Aucun ticket.
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
                onClick={() =>
                  void fetchPage(page - 1, q, checkedIn, typeFilter)
                }
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
                onClick={() =>
                  void fetchPage(page + 1, q, checkedIn, typeFilter)
                }
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
