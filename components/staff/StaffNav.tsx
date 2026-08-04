"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { YunaLogo } from "@/components/brand/YunaLogo";

/**
 * Barre compacte pour /staff/* — logo YUNA visible sans le chrome festival complet.
 */
export function StaffNav() {
  const pathname = usePathname() || "";
  const onScan = pathname.startsWith("/staff/scan");
  const onCrm = pathname.startsWith("/staff/crm");

  return (
    <header className="sticky top-0 z-[110] border-b border-bleu/15 bg-papier/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div aria-hidden className="flex h-1 w-full">
        <span className="flex-1 bg-vert" />
        <span className="flex-1 bg-jaune" />
        <span className="flex-1 bg-rouge" />
      </div>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label="YUNA Festival — site public"
        >
          <YunaLogo
            size="nav"
            priority
            className="!h-9 !w-auto sm:!h-10"
          />
          <span className="hidden min-w-0 truncate font-display text-sm font-extrabold uppercase tracking-wide text-bleu min-[400px]:block">
            YUNA Staff
          </span>
        </Link>

        <nav
          aria-label="Outils staff"
          className="flex shrink-0 items-center gap-1.5 sm:gap-2"
        >
          <Link
            href="/staff/scan"
            className={`inline-flex min-h-10 items-center rounded-full px-3 text-xs font-bold uppercase tracking-wide sm:px-4 sm:text-sm ${
              onScan
                ? "bg-feu text-papier"
                : "border border-bleu/20 bg-papier text-bleu hover:bg-logo-bleu-soft"
            }`}
          >
            Scan
          </Link>
          <Link
            href="/staff/crm"
            className={`inline-flex min-h-10 items-center rounded-full px-3 text-xs font-bold uppercase tracking-wide sm:px-4 sm:text-sm ${
              onCrm
                ? "bg-feu text-papier"
                : "border border-bleu/20 bg-papier text-bleu hover:bg-logo-bleu-soft"
            }`}
          >
            CRM
          </Link>
        </nav>
      </div>
    </header>
  );
}
