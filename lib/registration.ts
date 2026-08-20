import {
  isOpenRegistrationType,
  type RegistrationType,
} from "@/lib/registration-types";

export type Registration = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  registration_type: RegistrationType;
  created_at: string;
  qr_code: string;
  checked_in_at?: string | null;
  checked_in_by?: string | null;
};

const PHONE_RE = /^\+?[0-9]{8,15}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Canonicalise en E.164 : chiffres seuls, préfixe `+` (`00` converti).
 * Les saisies locales béninoises sans indicatif sont ramenées à `+229…`
 * (plan de numérotation 2024 : mobiles à 10 chiffres commençant par 01,
 * les anciens numéros à 8 chiffres reçoivent le préfixe 01). Ainsi
 * « 01 97 XX XX XX » et « +229 01 97 XX XX XX » désignent la même personne.
 */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const international = trimmed.startsWith("+") || trimmed.startsWith("00");
  const digits = trimmed.replace(/\D/g, "").replace(/^00/, "");
  if (!digits) return "";
  if (international) return `+${digits}`;
  if (digits.length === 10 && digits.startsWith("01")) return `+229${digits}`;
  if (digits.length === 8) return `+22901${digits}`;
  if (digits.length >= 11 && digits.startsWith("229")) return `+${digits}`;
  return digits;
}

export function validateRegistrationInput(input: {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  registrationType?: unknown;
}):
  | {
      name: string;
      phone: string;
      email: string | null;
      registrationType: RegistrationType;
    }
  | { error: string } {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const phoneRaw = typeof input.phone === "string" ? input.phone : "";
  const phone = normalizePhone(phoneRaw);
  const emailRaw =
    typeof input.email === "string" ? input.email.trim() : "";
  if (!isOpenRegistrationType(input.registrationType)) {
    return { error: "Type d'inscription indisponible." };
  }
  const registrationType = input.registrationType;

  if (name.length < 2) {
    return { error: "Indique ton nom complet (2 caractères minimum)." };
  }
  if (!PHONE_RE.test(phone)) {
    return {
      error: "Indique un numéro WhatsApp valide (ex. +229 01 XX XX XX XX).",
    };
  }
  if (emailRaw && !EMAIL_RE.test(emailRaw)) {
    return { error: "L'adresse e-mail n'est pas valide." };
  }
  if (registrationType === "benevole" && !emailRaw) {
    return {
      error: "Indique ton e-mail pour le suivi bénévole.",
    };
  }

  return {
    name,
    phone,
    email: emailRaw.length > 0 ? emailRaw : null,
    registrationType,
  };
}
