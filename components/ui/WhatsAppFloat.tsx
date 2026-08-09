"use client";

import { usePathname } from "next/navigation";

import { useMessages } from "@/components/i18n/LocaleProvider";
import { getWhatsAppHref } from "@/lib/site";

const HIDDEN_PREFIXES = [
  "/staff",
  "/lab",
  "/confirmation",
  "/mon-pass",
] as const;

/** Bouton WhatsApp sticky — affiché seulement si le numéro env est configuré. */
export function WhatsAppFloat() {
  const pathname = usePathname() || "/";
  const t = useMessages();
  const href = getWhatsAppHref();
  if (!href) return null;

  const hidden = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (hidden) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.aria}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-[150] flex min-h-12 items-center gap-2 rounded-full border border-vert/40 bg-vert px-4 py-3 text-[0.85rem] font-bold text-papier shadow-[0_10px_28px_color-mix(in_srgb,var(--vert)_40%,transparent)] transition-[transform] duration-[250ms] ease-yuna hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      {t.whatsapp.label}
    </a>
  );
}
