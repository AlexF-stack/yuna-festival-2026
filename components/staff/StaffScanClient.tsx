"use client";

import { Html5Qrcode } from "html5-qrcode";
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
  const readerId = "yuna-qr-reader";

  useEffect(() => {
    try {
      const s = sessionStorage.getItem(STAFF_KEY);
      const l = sessionStorage.getItem(STAFF_LABEL_KEY);
      if (s) {
        setSecret(s);
        setUnlocked(true);
      }
      if (l) setStaffLabel(l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    return () => {
      const sc = scannerRef.current;
      if (sc?.isScanning) {
        void sc.stop().catch(() => undefined);
      }
    };
  }, []);

  const unlock = () => {
    const s = secret.trim();
    if (s.length < 8) {
      setError("Secret staff trop court.");
      return;
    }
    try {
      sessionStorage.setItem(STAFF_KEY, s);
      sessionStorage.setItem(STAFF_LABEL_KEY, staffLabel.trim() || "porte-1");
    } catch {
      /* ignore */
    }
    setUnlocked(true);
    setError(null);
  };

  const checkIn = async (code: string) => {
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
      const data = (await res.json()) as {
        error?: string;
        alreadyCheckedIn?: boolean;
        registration?: ScanResult["registration"];
      };
      if (!res.ok || !data.registration) {
        setError(data.error ?? "Scan refusé.");
        setLast(null);
        return;
      }
      setLast({
        alreadyCheckedIn: Boolean(data.alreadyCheckedIn),
        registration: data.registration,
      });
    } catch {
      setError("Réseau indisponible.");
      setLast(null);
    } finally {
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
        { fps: 8, qrbox: { width: 260, height: 260 } },
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
      <div className="mx-auto w-full max-w-md rounded-3xl border border-bleu/15 bg-papier p-6 shadow-[0_16px_40px_rgba(0,90,140,0.1)]">
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
          Staff · Midombo
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold uppercase text-bleu">
          Scan entrée
        </h1>
        <p className="mt-3 text-sm text-charbon">
          Pas d’admin sur le site public — le listing est dans le{" "}
          <strong>CRM YUNA</strong>. Ici : validation des passes à la porte
          uniquement.
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
        <label className="mt-4 block text-sm font-semibold text-bleu">
          Poste
          <input
            type="text"
            value={staffLabel}
            onChange={(e) => setStaffLabel(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-bleu/20 bg-papier px-3 py-3 text-encre outline-none focus:ring-2 focus:ring-feu"
            placeholder="porte-1"
          />
        </label>
        {error ? (
          <p className="mt-3 text-sm text-feu" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          onClick={unlock}
          className="mt-6 w-full rounded-full bg-feu px-4 py-3.5 font-bold text-papier hover:bg-braise"
        >
          Ouvrir le scan
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
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-feu">
            {staffLabel}
          </p>
          <h1 className="font-display text-2xl font-extrabold uppercase text-bleu">
            Scan QR
          </h1>
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-charbon underline"
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
        className="overflow-hidden rounded-2xl border border-bleu/15 bg-charbon/5"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {!scanning ? (
          <button
            type="button"
            onClick={() => void startCamera()}
            disabled={busy}
            className="rounded-full bg-feu px-5 py-3 text-sm font-bold text-papier hover:bg-braise disabled:opacity-50"
          >
            Démarrer la caméra
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void stopCamera()}
            className="rounded-full border border-bleu/25 bg-papier px-5 py-3 text-sm font-bold text-bleu"
          >
            Arrêter la caméra
          </button>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-bleu/15 bg-papier p-4">
        <p className="text-sm font-semibold text-bleu">Saisie manuelle</p>
        <div className="mt-2 flex gap-2">
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="UUID ou URL confirmation"
            className="min-w-0 flex-1 rounded-xl border border-bleu/20 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-feu"
          />
          <button
            type="button"
            disabled={busy || !manual.trim()}
            onClick={() => void checkIn(manual)}
            className="shrink-0 rounded-full bg-bleu px-4 py-2.5 text-sm font-bold text-papier disabled:opacity-50"
          >
            Valider
          </button>
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl bg-feu/10 px-4 py-3 text-sm font-semibold text-feu" role="alert">
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
          <p className="mt-1 font-display text-2xl font-extrabold uppercase">
            {last.registration.name}
          </p>
          <p className="mt-1 text-sm text-papier/90">
            {typeLabel} · {last.registration.phone}
          </p>
          <p className="mt-2 font-mono text-[0.7rem] text-papier/70">
            {new Date(last.registration.checkedInAt).toLocaleString("fr-FR")}
          </p>
        </div>
      ) : null}
    </div>
  );
}
