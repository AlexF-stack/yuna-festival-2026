"use client";

import { motion, useReducedMotion } from "framer-motion";

import { WaveRibbonDynamic } from "@/components/sections/WaveRibbonDynamic";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { DONATE } from "@/lib/content-site";
import { EASE_YUNA } from "@/lib/motion";

export function Donate() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="don"
      labelledBy="donate-title"
      tone="don"
      className="py-20 min-[760px]:py-24"
      overlay={<WaveRibbonDynamic />}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.65, ease: EASE_YUNA }}
        className="relative flex flex-col items-start gap-6 text-papier min-[760px]:flex-row min-[760px]:items-center min-[760px]:justify-between"
      >
        <div className="max-w-xl">
          <SectionHeading
            eyebrow="Soutenir"
            title="Allume une flamme de plus"
            titleId="donate-title"
            description={DONATE.blurb}
            variant="light"
          />
        </div>
        <motion.div
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
        >
          <ButtonLink
            href={DONATE.href}
            className="shrink-0 bg-feu hover:bg-braise"
          >
            {DONATE.label}
          </ButtonLink>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
