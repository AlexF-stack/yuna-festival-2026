/**
 * Barre d’urgence publique — deadlines & places limitées.
 * Dates alignées sur l’édition Midombo (content-yuna-2026).
 */

export const PREORDER_DEADLINE_ISO = "2026-09-01T23:59:59+01:00";

/** Capacité indicative masterclass (places limitées, pas de jauge DB encore). */
export const MASTERCLASS_CAPACITY = {
  masterclass_vteam: 80,
  masterclass_entrepreneuriat: 60,
} as const;

export const URGENCY = {
  /** Message court sticky — FR (i18n écrase côté client). */
  preorderLabelFr: "Précommande tee-shirts LED",
  masterclassLabelFr: "Masterclass · places limitées",
  ctaPreorderHref: "/boutique",
  ctaMasterclassHref: "/journee#sessions",
  ctaRegisterHref: "/#inscription",
} as const;

export function msUntil(iso: string, now = Date.now()): number {
  return Math.max(0, new Date(iso).getTime() - now);
}

export function formatCountdown(ms: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
} {
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const totalSec = Math.floor(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds, expired: false };
}
