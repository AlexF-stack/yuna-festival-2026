import { DEFAULT_LOCALE, type Locale, parseLocale } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/messages/en";
import { fr } from "@/lib/i18n/messages/fr";
import type { Messages } from "@/lib/i18n/types";

const DICTS: Record<Locale, Messages> = { fr, en };

export function getMessages(locale: Locale | string | null | undefined): Messages {
  return DICTS[parseLocale(locale ?? DEFAULT_LOCALE)];
}

export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
