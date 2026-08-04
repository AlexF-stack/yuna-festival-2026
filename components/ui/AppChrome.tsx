"use client";

import { usePathname } from "next/navigation";

import { RegisterFloat } from "@/components/ui/RegisterFloat";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { SiteHeader } from "@/components/ui/SiteHeader";

/**
 * Chrome public (header / footer / CTA flottant) hors outils staff.
 * Sur /staff/* on laisse l’écran libre pour le scan et le CRM mobile.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStaff = pathname.startsWith("/staff");

  if (isStaff) {
    return <>{children}</>;
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
