/** Types d'inscription — alignés FAQ / formulaire. */

const ALL_REGISTRATION_TYPES = [
  {
    value: "ecole_royale",
    label: "École royale",
    hint: "Formation · places limitées",
    open: true,
  },
  {
    value: "masterclass_entrepreneuriat",
    label: "Masterclass Entrepreneuriat",
    hint: "Samedi 15h–17h · places limitées",
    open: true,
  },
  {
    value: "pass",
    label: "Concert / Festival",
    hint: "Entrée libre · 2 soirées · ticket QR",
    open: true,
  },
  {
    value: "benevole",
    label: "Bénévole / Ambassadeur",
    hint: "Accueil, sécurité, technique… · groupe WhatsApp dédié",
    open: true,
  },
  {
    value: "masterclass_vteam",
    label: "Masterclass VTeam",
    hint: "Samedi 10h–13h · musiciens & chantres",
    /** Retiré du programme public — conservé pour les pass déjà émis. */
    open: false,
  },
] as const;

/** Types proposés sur le formulaire public (ordre d’affichage). */
export const REGISTRATION_TYPES = ALL_REGISTRATION_TYPES.filter(
  (t) => t.open,
);

/** Tous les types connus (lecture CRM / pass historiques). */
export const ALL_KNOWN_REGISTRATION_TYPES = ALL_REGISTRATION_TYPES;

export type RegistrationType =
  (typeof ALL_REGISTRATION_TYPES)[number]["value"];

export const REGISTRATION_TYPE_VALUES: RegistrationType[] =
  ALL_REGISTRATION_TYPES.map((t) => t.value);

export const OPEN_REGISTRATION_TYPE_VALUES = REGISTRATION_TYPES.map(
  (t) => t.value,
) as RegistrationType[];

export const REGISTRATION_TYPE_LABELS = Object.fromEntries(
  ALL_REGISTRATION_TYPES.map((t) => [t.value, t.label]),
) as Record<RegistrationType, string>;

export function isRegistrationType(v: unknown): v is RegistrationType {
  return (
    typeof v === "string" &&
    (REGISTRATION_TYPE_VALUES as readonly string[]).includes(v)
  );
}

/** Accepte uniquement les types encore ouverts à l'inscription. */
export function isOpenRegistrationType(
  v: unknown,
): v is (typeof REGISTRATION_TYPES)[number]["value"] {
  return (
    typeof v === "string" &&
    (OPEN_REGISTRATION_TYPE_VALUES as readonly string[]).includes(v)
  );
}

/**
 * Une ou plusieurs catégories (formulaire multi-choix).
 * Accepte `registrationTypes[]` ou l’ancien champ unique `registrationType`.
 */
export function parseOpenRegistrationTypes(input: {
  registrationType?: unknown;
  registrationTypes?: unknown;
}): RegistrationType[] | { error: string } {
  const raw: unknown[] = [];
  if (Array.isArray(input.registrationTypes)) {
    raw.push(...input.registrationTypes);
  }
  if (typeof input.registrationType === "string") {
    raw.push(input.registrationType);
  }

  const types: RegistrationType[] = [];
  for (const v of raw) {
    if (!isOpenRegistrationType(v)) {
      return { error: "Type d'inscription indisponible." };
    }
    if (!types.includes(v)) types.push(v);
  }

  if (types.length === 0) {
    return {
      error: "Choisis au moins une option (École royale, masterclass ou festival).",
    };
  }

  // Ordre canonique d’affichage / création
  const order = OPEN_REGISTRATION_TYPE_VALUES;
  types.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return types;
}
