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
      className="cta-float fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-[150] flex min-h-12 items-center gap-2 rounded-full bg-feu px-5 py-3 font-display text-[0.95rem] font-extrabold uppercase tracking-[0.04em] text-papier shadow-[0_10px_28px_color-mix(in_srgb,var(--feu)_45%,transparent)] transition-[transform,box-shadow] duration-[250ms] ease-yuna before:pointer-events-none before:absolute before:-inset-1 before:rounded-full before:border before:border-feu before:opacity-50 before:content-[''] hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu motion-reduce:transition-none motion-reduce:before:content-none motion-reduce:hover:scale-100"
    >
      {t.floatCta}
      <span aria-hidden>→</span>
    </Link>
  );
}
