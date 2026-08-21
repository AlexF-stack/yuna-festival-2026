import { getRegistrationsCount } from "@/lib/registrations";
import { PUBLIC_REGISTRATION_BASE } from "@/lib/public-registrations-base";

/**
 * Compteur public affiché : base factice + inscriptions réelles en base.
 * Chaque nouvelle ligne `registrations` incrémente le total visible.
 * Override optionnel : PUBLIC_REGISTRATION_BASE (nombre entier).
 */
function resolveBase(): number {
  const raw = process.env.PUBLIC_REGISTRATION_BASE;
  if (raw && /^\d+$/.test(raw)) return Number(raw);
  return PUBLIC_REGISTRATION_BASE;
}

export async function getPublicRegistrationsDisplayCount(): Promise<number> {
  const real = await getRegistrationsCount();
  return resolveBase() + real;
}

export { PUBLIC_REGISTRATION_BASE };
