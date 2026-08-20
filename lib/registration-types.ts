/** Types d'inscription — alignés FAQ / formulaire. */

const ALL_REGISTRATION_TYPES = [
  {
    value: "pass",
    label: "Festival, 2 soirées",
    hint: "Entrée libre · QR pour accès prioritaire",
    open: true,
  },
  {
    value: "masterclass_vteam",
    label: "Masterclass VTeam",
    hint: "Samedi 10h–13h · musiciens & chantres",
    /** Retiré du programme public — conservé pour les pass déjà émis. */
    open: false,
  },
  {
    value: "masterclass_entrepreneuriat",
    label: "Masterclass Entrepreneuriat",
    hint: "Samedi 15h–17h · places limitées",
    open: true,
  },
  {
    value: "benevole",
    label: "Bénévole",
    hint: "Accueil, sécurité, technique, protocole…",
    open: true,
  },
] as const;

/** Types proposés sur le formulaire public. */
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
