/** Types d'inscription — alignés FAQ / formulaire. */
export const REGISTRATION_TYPES = [
  {
    value: "pass",
    label: "Pass soirées",
    hint: "Entrée libre · QR pour accès prioritaire",
  },
  {
    value: "masterclass_vteam",
    label: "Masterclass VTeam",
    hint: "Samedi 10h–13h · musiciens & chantres",
  },
  {
    value: "masterclass_entrepreneuriat",
    label: "Masterclass Entrepreneuriat",
    hint: "Samedi 15h–17h · places limitées",
  },
  {
    value: "benevole",
    label: "Bénévole",
    hint: "Accueil, sécurité, technique, protocole…",
  },
] as const;

export type RegistrationType =
  (typeof REGISTRATION_TYPES)[number]["value"];

export const REGISTRATION_TYPE_VALUES: RegistrationType[] =
  REGISTRATION_TYPES.map((t) => t.value);

export const REGISTRATION_TYPE_LABELS = Object.fromEntries(
  REGISTRATION_TYPES.map((t) => [t.value, t.label]),
) as Record<RegistrationType, string>;

export function isRegistrationType(v: unknown): v is RegistrationType {
  return (
    typeof v === "string" &&
    (REGISTRATION_TYPE_VALUES as readonly string[]).includes(v)
  );
}
