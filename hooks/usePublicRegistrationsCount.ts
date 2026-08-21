"use client";

import { useEffect, useState } from "react";

import { PUBLIC_REGISTRATION_BASE } from "@/lib/public-registrations-base";

type Options = {
  /** Rafraîchir périodiquement (ms). 0 = une seule fois. */
  refreshMs?: number;
};

/**
 * Compteur public affiché (base factice + inscriptions réelles).
 * Fallback immédiat à la base pour éviter un flash vide.
 */
export function usePublicRegistrationsCount(options: Options = {}) {
  const refreshMs = options.refreshMs ?? 0;
  const [count, setCount] = useState(PUBLIC_REGISTRATION_BASE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/registrations/count", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const json = (await res.json()) as { count?: number };
        if (
          !cancelled &&
          typeof json.count === "number" &&
          Number.isFinite(json.count)
        ) {
          setCount(Math.max(PUBLIC_REGISTRATION_BASE, Math.floor(json.count)));
          setReady(true);
        }
      } catch {
        /* garde le fallback */
      }
    }

    void load();

    if (refreshMs <= 0) {
      return () => {
        cancelled = true;
      };
    }

    const id = window.setInterval(() => {
      void load();
    }, refreshMs);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [refreshMs]);

  return { count, ready };
}

export function formatRegistrationsCount(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}
