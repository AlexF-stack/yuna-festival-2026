"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useMessages } from "@/components/i18n/LocaleProvider";

const HIDDEN_PREFIXES = [
  "/confirmation",
  "/mon-pass",
  "/staff",
  "/lab",
  "/don",
  "/soutenir",
  "/confidentialite",
  "/mentions-legales",
] as const;

/**
 * CTA flottant pass — masqué près de #inscription.
 */
export function FloatingActions() {
  const pathname = usePathname() || "/";
  const t = useMessages();
  const [nearForm, setNearForm] = useState(false);

  const hidden = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  useEffect(() => {
    const el = document.getElementById("inscription");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setNearForm(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  if (hidden || nearForm) return null;

  return (
    <Link
      href="/#inscription"
      aria-label={t.floatAria}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-[150] flex min-h-12 items-center gap-2 rounded-full bg-jaune px-5 py-3.5 font-display text-[0.95rem] font-extrabold uppercase tracking-[0.06em] text-nuit-profonde shadow-ombre-cta ring-2 ring-jaune/50 transition-[transform,box-shadow,background-color] duration-[250ms] ease-yuna hover:scale-105 hover:bg-[var(--or-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-jaune motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      {t.floatCta}
      <span aria-hidden>→</span>
    </Link>
  );
}
