import {
  isRegistrationType,
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

const PHONE_RE = /^[+0-9\s().-]{8,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizePhone(raw: string): string {
  return raw.trim().replace(/\s+/g, " ");
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
  const registrationType = isRegistrationType(input.registrationType)
    ? input.registrationType
    : "pass";

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
