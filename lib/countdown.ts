export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

export function getCountdownParts(
  targetMs: number,
  nowMs: number = Date.now(),
): CountdownParts {
  const diff = Math.max(0, targetMs - nowMs);

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    isComplete: diff === 0,
  };
}

export function padCountdown(value: number): string {
  return String(value).padStart(2, "0");
}

/** Parse une ISO avec offset (ex. +01:00 = Africa/Porto-Novo). */
export function parseEventStartMs(iso: string): number {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) {
    throw new Error(`Date d'événement invalide: ${iso}`);
  }
  return ms;
}
