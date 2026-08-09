"use client";

import { usePathname } from "next/navigation";

import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { StaffNav } from "@/components/staff/StaffNav";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { SiteHeader } from "@/components/ui/SiteHeader";

/**
 * Chrome public (header / footer / CTA flottant) hors outils staff.
 * Sur /staff/* : barre logo YUNA + liens Scan/CRM (FR only).
 * LocaleProvider wraps public chrome for FR | EN.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStaff = pathname.startsWith("/staff");

  if (isStaff) {
    return (
      <>
        <StaffNav />
        {children}
      </>
    );
  }

  return (
    <LocaleProvider>
      <div className="fixed inset-x-0 top-0 z-[160]">
        <SiteHeader />
      </div>
      {children}
      <SiteFooter />
      <FloatingActions />
    </LocaleProvider>
  );
}
