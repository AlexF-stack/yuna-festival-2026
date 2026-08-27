import { FESTIVAL } from "@/lib/festival";
import {
  REGISTRATION_TYPE_LABELS,
  type RegistrationType,
} from "@/lib/registration-types";

/** Hint du talon — ce que le staff lit d’un coup d’œil. */
export function passStubHint(type: RegistrationType): string {
  switch (type) {
    case "ecole_royale":
      return "Formation · places limitées";
    case "masterclass_vteam":
      return "Samedi 10h–13h";
    case "masterclass_entrepreneuriat":
      return "Samedi 15h–17h";
    case "benevole":
      return "Staff · jour J";
    case "ambassadeur":
      return "Ambassadeur YUNA";
    default:
      return "Entrée libre · 2 soirées";
  }
}

/**
 * Ligne date/lieu du corps. Les masterclass n’ont lieu que le samedi :
 * afficher « 5–6 septembre » sur ce billet faisait croire à deux jours.
 */
export function passWhenLine(type: RegistrationType): string {
  switch (type) {
    case "masterclass_vteam":
      return `Samedi 5 sept · 10h–13h · ${FESTIVAL.locationLine}`;
    case "masterclass_entrepreneuriat":
      return `Samedi 5 sept · 15h–17h · ${FESTIVAL.locationLine}`;
    default:
      return `${FESTIVAL.datesShort} · ${FESTIVAL.locationLine}`;
  }
}

export function passTypeLabel(type: RegistrationType): string {
  return REGISTRATION_TYPE_LABELS[type];
}

/** Espaces multiples / collés venus du formulaire. */
export function displayPassName(name: string): string {
  return name.replace(/\s+/g, " ").trim();
}
