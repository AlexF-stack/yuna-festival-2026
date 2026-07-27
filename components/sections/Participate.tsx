"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { PARTICIPATE } from "@/lib/content-site";
import { SITE_CONTACT } from "@/lib/site";
import { EASE_YUNA } from "@/lib/motion";

export function Participate() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="participer" labelledBy="participer-title" tone="ciel">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.65, ease: EASE_YUNA }}
        className="text-center"
      >
        <SectionHeading
          eyebrow={PARTICIPATE.eyebrow}
          title={PARTICIPATE.title}
          titleId="participer-title"
          description={PARTICIPATE.intro}
          align="center"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink
            href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent("YUNA 2026 — Bénévolat")}`}
          >
            {PARTICIPATE.ctaVolunteer}
          </ButtonLink>
          <ButtonLink
            href={`mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent("YUNA 2026 — Partenariat")}`}
            variant="secondary"
          >
            {PARTICIPATE.ctaPartner}
          </ButtonLink>
        </div>
      </motion.div>
    </SectionShell>
  );
}
