"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/config";

const OPTIONS: { value: Locale; short: string }[] = [
  { value: "fr", short: "FR" },
  { value: "en", short: "EN" },
];

type LanguageSwitcherProps = {
  /** Styles adaptés au fond du header (clair / sombre). */
  light?: boolean;
  /** Surface header — pour contraste FR/EN (opposé au fond). */
  surface?: "hero" | "bleu" | "feu" | "papier";
  className?: string;
};

/** Sélecteur FR | EN — site public uniquement. */
export function LanguageSwitcher({
  light = false,
  surface = "papier",
  className = "",
}: LanguageSwitcherProps) {
  const { locale, setLocale, messages } = useLocale();
  const onFeu = surface === "feu";

  return (
    <div
      role="group"
      aria-label={messages.langSwitch}
      className={`inline-flex items-center rounded-full border p-0.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] ${
        light
          ? onFeu
            ? "border-papier/50 text-papier"
            : "border-papier/35 text-papier"
          : "border-bleu/25 text-bleu"
      } ${className}`}
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLocale(opt.value)}
            aria-pressed={active}
            className={`min-h-8 min-w-9 rounded-full px-2.5 transition-colors ${
              active
                ? light
                  ? onFeu
                    ? "bg-papier text-feu"
                    : "bg-papier text-bleu"
                  : "bg-bleu text-papier"
                : light
                  ? "text-papier/80 hover:bg-papier/10"
                  : "text-bleu/70 hover:bg-logo-bleu-soft"
            }`}
          >
            {opt.short}
          </button>
        );
      })}
    </div>
  );
}
