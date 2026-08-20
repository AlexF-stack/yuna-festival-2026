"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { PARTICIPATE } from "@/lib/content-site";
import { SITE_CONTACT } from "@/lib/site";

export function Participate() {
  return (
    <SectionShell id="participer" labelledBy="participer-title" tone="feu">
      <Reveal className="text-center">
        <SectionHeading
          eyebrow={PARTICIPATE.eyebrow}
          title={PARTICIPATE.title}
          titleId="participer-title"
          description={PARTICIPATE.intro}
          align="center"
          variant="light"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink
            href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent("YUNA 2026, Bénévolat")}`}
            className="!bg-papier !text-feu hover:!bg-papier/90"
          >
            {PARTICIPATE.ctaVolunteer}
          </ButtonLink>
          <ButtonLink href="/partenaires" variant="outline-light">
            {PARTICIPATE.ctaPartner}
          </ButtonLink>
        </div>
      </Reveal>
    </SectionShell>
  );
}
