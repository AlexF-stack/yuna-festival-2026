"use client";

import { usePathname } from "next/navigation";

import { StaffNav } from "@/components/staff/StaffNav";
import { RegisterFloat } from "@/components/ui/RegisterFloat";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { SiteHeader } from "@/components/ui/SiteHeader";

/**
 * Chrome public (header / footer / CTA flottant) hors outils staff.
 * Sur /staff/* : barre logo YUNA + liens Scan/CRM (sans footer ni CTA flottant).
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
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <RegisterFloat />
    </>
  );
}
