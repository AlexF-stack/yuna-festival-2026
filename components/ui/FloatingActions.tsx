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
  "/filtre",
  "/flamme",
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
      className="btn-cta-flame cta-register-pulse fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[150] flex min-h-12 max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full px-4 py-3 font-display text-[0.88rem] font-extrabold uppercase tracking-[0.05em] text-papier ring-2 ring-[color-mix(in_srgb,var(--feu-glow)_60%,transparent)] transition-[transform,box-shadow,filter] duration-[250ms] ease-yuna hover:scale-105 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-feu motion-reduce:transition-none motion-reduce:hover:scale-100 min-[400px]:min-h-[3.35rem] min-[400px]:gap-2 min-[400px]:px-6 min-[400px]:py-3.5 min-[400px]:text-[1rem] min-[400px]:tracking-[0.06em]"
    >
      <span className="min-[400px]:hidden">{t.common.registerShort}</span>
      <span className="hidden min-[400px]:inline">{t.floatCta}</span>
      <span aria-hidden>→</span>
    </Link>
  );
}
