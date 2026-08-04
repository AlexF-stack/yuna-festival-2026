"use client";

import { Html5Qrcode } from "html5-qrcode";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  REGISTRATION_TYPE_LABELS,
  isRegistrationType,
} from "@/lib/registration-types";

type ScanResult = {
  alreadyCheckedIn: boolean;
  registration: {
    id: string;
    name: string;
    phone: string;
    registrationType: string;
    checkedInAt: string;
  };
};

const STAFF_KEY = "yuna-staff-secret";
const STAFF_LABEL_KEY = "yuna-staff-label";

export function StaffScanClient() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [staffLabel, setStaffLabel] = useState("porte-1");
  const [manual, setManual] = useState("");
  const [scanning, setScanning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [last, setLast] = useState<ScanResult | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const busyRef = useRef(false);
  const lastScanRef = useRef<{ code: string; at: number }>({ code: "", at: 0 });
  const readerId = "yuna-qr-reader";

  /** Retour haptique terrain : succès court, déjà scanné double, refus long. */
  const buzz = (kind: "ok" | "already" | "error") => {
    if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
    const pattern =
      kind === "ok" ? [90] : kind === "already" ? [50, 70, 50] : [250];
    navigator.vibrate(pattern);
  };

  useEffect(() => {
    let cancelled = false;
    try {
      const s = sessionStorage.getItem(STAFF_KEY);
      const l = sessionStorage.getItem(STAFF_LABEL_KEY);
      if (l) setStaffLabel(l);
      if (!s) return;
      setSecret(s);
      void (async () => {
        try {
          const res = await fetch("/api/staff/unlock", {
            method: "POST",
            headers: { "x-yuna-staff": s },
          });
          if (cancelled) return;
          if (res.ok) {
            setUnlocked(true);
          } else {
            sessionStorage.removeItem(STAFF_KEY);
            setSecret("");
          }
        } catch {
          if (!cancelled) setUnlocked(false);
        }
      })();
    } catch {
      /* ignore */
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      const sc = scannerRef.current;
      if (sc?.isScanning) {
        void sc.stop().catch(() => undefined);
      }
    };
  }, []);

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
        sessionStorage.setItem(STAFF_LABEL_KEY, staffLabel.trim() || "porte-1");
      } catch {
        /* ignore */
      }
      setUnlocked(true);
    } catch {
      setError("Impossible de vérifier le secret. Réessaie.");
    } finally {
      setBusy(false);
    }
  };

  const checkIn = async (code: string) => {
    // Anti-rafale : la caméra décode ~8 fps — on ignore les scans pendant
    // une requête en cours et les re-scans du même code sous 3 secondes.
    if (busyRef.current) return;
    const now = Date.now();
    if (
      code === lastScanRef.current.code &&
      now - lastScanRef.current.at < 3000
    ) {
      return;
    }
    lastScanRef.current = { code, at: now };

    busyRef.current = true;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/check-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-yuna-staff": secret.trim(),
        },
        body: JSON.stringify({
          code,
          staffLabel: staffLabel.trim() || "porte-1",
        }),
      });
      if (!res.ok) {
        let message = "Scan refusé.";
        try {
          const data = (await res.json()) as { error?: string };
          if (data.error) message = data.error;
        } catch {
          /* ignore */
        }
        setError(message);
        setLast(null);
        buzz("error");
        return;
      }
      const data = (await res.json()) as {
        error?: string;
        alreadyCheckedIn?: boolean;
        registration?: ScanResult["registration"];
      };
      if (!data.registration) {
        setError(data.error ?? "Scan refusé.");
        setLast(null);
        buzz("error");
        return;
      }
      setLast({
        alreadyCheckedIn: Boolean(data.alreadyCheckedIn),
        registration: data.registration,
      });
      buzz(data.alreadyCheckedIn ? "already" : "ok");
    } catch {
      setError("Réseau indisponible.");
      setLast(null);
      buzz("error");
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  const startCamera = async () => {
    setError(null);
    try {
      const sc = new Html5Qrcode(readerId);
      scannerRef.current = sc;
      setScanning(true);
      await sc.start(
        { facingMode: "environment" },
        {
          fps: 8,
          // Adapté aux petits écrans : la zone de scan ne déborde jamais.
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const size = Math.max(
              160,
              Math.min(260, viewfinderWidth - 32, viewfinderHeight - 32),
            );
            return { width: size, height: size };
          },
        },
        (decoded) => {
          void checkIn(decoded);
        },
        () => undefined,
      );
    } catch {
      setScanning(false);
      setError(
        "Caméra inaccessible. Autorise l’accès ou saisis le code manuellement.",
      );
    }
  };

  const stopCamera = async () => {
    const sc = scannerRef.current;
    if (sc?.isScanning) {
      await sc.stop().catch(() => undefined);
    }
    scannerRef.current = null;
    setScanning(false);
  };

  if (!unlocked) {
    return (
      <div className="mx-auto w-full max-w-md rounded-[1.5rem] border border-bleu/15 bg-papier p-5 shadow-[0_16px_40px_rgba(0,90,140,0.1)] sm:rounded-3xl sm:p-6">
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
          Staff · Midombo
        </p>
        <h1 className="mt-2 font-display text-[clamp(1.85rem,8vw,2.25rem)] font-extrabold uppercase leading-none text-bleu">
          Scan entrée
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-charbon">
          Validation des passes à la porte. Listing dans le{" "}
          <Link
            href="/staff/crm"
            className="font-bold text-bleu underline-offset-2 hover:underline"
          >
            CRM inscriptions
          </Link>
          .
        </p>
        <label className="mt-6 block text-sm font-semibold text-bleu">
          Secret staff
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="mt-1.5 min-h-12 w-full rounded-xl border border-bleu/20 bg-papier px-3 py-3 text-base text-encre outline-none focus:ring-2 focus:ring-feu"
            autoComplete="current-password"
            enterKeyHint="go"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold text-bleu">
          Poste
          <input
            type="text"
            value={staffLabel}
            onChange={(e) => setStaffLabel(e.target.value)}
            className="mt-1.5 min-h-12 w-full rounded-xl border border-bleu/20 bg-papier px-3 py-3 text-base text-encre outline-none focus:ring-2 focus:ring-feu"
            placeholder="porte-1"
            enterKeyHint="done"
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
          className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-feu px-4 py-3.5 text-base font-bold text-papier hover:bg-braise disabled:opacity-60"
        >
          {busy ? "Vérification…" : "Ouvrir le scan"}
        </button>
        <ButtonLink href="/" variant="ghost" className="mt-3 w-full !px-0">
          Retour site
        </ButtonLink>
      </div>
    );
  }

  const typeLabel =
    last && isRegistrationType(last.registration.registrationType)
      ? REGISTRATION_TYPE_LABELS[last.registration.registrationType]
      : last?.registration.registrationType;

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-feu">
            {staffLabel}
          </p>
          <h1 className="font-display text-[clamp(1.5rem,6vw,1.75rem)] font-extrabold uppercase text-bleu">
            Scan QR
          </h1>
        </div>
        <button
          type="button"
          className="min-h-10 shrink-0 px-1 text-sm font-semibold text-charbon underline"
          onClick={() => {
            void stopCamera();
            sessionStorage.removeItem(STAFF_KEY);
            setUnlocked(false);
          }}
        >
          Quitter
        </button>
      </div>

      <div
        id={readerId}
        className="aspect-[4/3] max-h-[min(52svh,420px)] overflow-hidden rounded-2xl border border-bleu/15 bg-charbon/5 [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
      />

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {!scanning ? (
          <button
            type="button"
            onClick={() => void startCamera()}
            disabled={busy}
            className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-feu px-5 py-3 text-base font-bold text-papier hover:bg-braise disabled:opacity-50"
          >
            Démarrer la caméra
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void stopCamera()}
            className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-bleu/25 bg-papier px-5 py-3 text-base font-bold text-bleu"
          >
            Arrêter la caméra
          </button>
        )}
      </div>

      <div className="mt-5 rounded-2xl border border-bleu/15 bg-papier p-4">
        <label
          htmlFor="staff-manual-code"
          className="text-sm font-semibold text-bleu"
        >
          Saisie manuelle
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="staff-manual-code"
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="UUID ou URL confirmation"
            enterKeyHint="go"
            className="min-h-12 min-w-0 flex-1 rounded-xl border border-bleu/20 px-3 py-3 text-base outline-none focus:ring-2 focus:ring-feu"
          />
          <button
            type="button"
            disabled={busy || !manual.trim()}
            onClick={() => void checkIn(manual)}
            className="flex min-h-12 shrink-0 items-center justify-center rounded-full bg-bleu px-5 py-3 text-base font-bold text-papier disabled:opacity-50 sm:w-auto"
          >
            Valider
          </button>
        </div>
      </div>

      {error ? (
        <p
          className="mt-4 rounded-xl bg-feu/10 px-4 py-3 text-sm font-semibold text-feu"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {last ? (
        <div
          className={`mt-4 rounded-2xl px-5 py-4 text-papier ${
            last.alreadyCheckedIn ? "bg-charbon" : "bg-vert"
          }`}
        >
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-papier/80">
            {last.alreadyCheckedIn ? "Déjà scanné" : "Entrée OK"}
          </p>
          <p className="mt-1 break-words font-display text-[clamp(1.35rem,6vw,1.75rem)] font-extrabold uppercase leading-tight">
            {last.registration.name}
          </p>
          <p className="mt-1 text-sm text-papier/90">
            {typeLabel} ·{" "}
            <a
              href={`tel:${last.registration.phone}`}
              className="underline-offset-2 hover:underline"
            >
              {last.registration.phone}
            </a>
          </p>
          <p className="mt-2 font-mono text-[0.7rem] text-papier/70">
            {new Date(last.registration.checkedInAt).toLocaleString("fr-FR")}
          </p>
        </div>
      ) : null}
    </div>
  );
}
