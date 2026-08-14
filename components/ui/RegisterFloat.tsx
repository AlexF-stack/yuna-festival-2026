"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMessages } from "@/components/i18n/LocaleProvider";

const HIDDEN_PREFIXES = [
  "/confirmation",
  "/mon-pass",
  "/staff",
  "/lab",
  "/don",
  "/soutenir",
  "/filtre",
  "/flamme",
  "/confidentialite",
  "/mentions-legales",
] as const;

/** CTA flottant — masqué sur pass, staff, don et pages légales. */
export function RegisterFloat() {
  const pathname = usePathname() || "/";
  const t = useMessages();
  const hidden = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (hidden) return null;

  return (
    <Link
      href="/#inscription"
      aria-label={t.floatAria}
      className="btn-cta-flame cta-float fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-[150] flex min-h-12 items-center gap-2 rounded-full px-5 py-3.5 font-display text-[0.95rem] font-extrabold uppercase tracking-[0.06em] text-papier ring-2 ring-[color-mix(in_srgb,var(--feu-glow)_55%,transparent)] transition-[transform,box-shadow,filter] duration-[250ms] ease-yuna hover:scale-105 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-feu motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      {t.floatCta}
      <span aria-hidden>→</span>
    </Link>
  );
}
