"use client";

import { motion, useReducedMotion } from "framer-motion";

import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionTitleArt } from "@/components/ui/SectionTitleArt";
import { SoftImage } from "@/components/ui/SoftImage";
import { VISION } from "@/lib/content-site";
import { EASE_PREMIUM, cardRise, staggerContainer } from "@/lib/motion";

const SHAPE: Record<string, string> = {
  joseph: "rounded-[1.75rem] rounded-br-[0.35rem]",
  daniel: "rounded-[1.75rem] bg-bleu text-papier",
  david: "rounded-[1.75rem] rounded-tl-[0.35rem]",
};

export function Vision() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="vision"
      labelledBy="vision-title"
      tone="papier"
      background="vision"
    >
      <Reveal>
        <header className="max-w-3xl">
          <p className="section-eyebrow mb-3">
            <span aria-hidden className="h-0.5 w-8 shrink-0 bg-feu" />
            {VISION.eyebrow}
          </p>
          <h2 id="vision-title" className="section-title text-bleu">
            <span className="block">{VISION.titleLine1}</span>
            <span className="mt-1 block text-feu">{VISION.titleLine2}</span>
          </h2>
          <p className="section-lead max-w-2xl text-charbon">{VISION.intro}</p>
          <SectionTitleArt
            src="/media/title-vision.jpg"
            alt="La vision — YUNA Festival 2026"
          />
        </header>
      </Reveal>

      {/* Grille asymétrique style HERNA Identity + variants de formes */}
      <motion.div
        className="mt-14 grid items-stretch gap-5 min-[880px]:grid-cols-12 min-[880px]:gap-5"
        variants={reduce ? undefined : staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.12 }}
      >
        {VISION.pillars.map((pillar, i) => {
          const isDark = pillar.id === "daniel";
          const span =
            i === 1
              ? "min-[880px]:col-span-4 min-[880px]:-translate-y-3"
              : "min-[880px]:col-span-4";

          return (
            <motion.div
              key={pillar.id}
              variants={reduce ? undefined : cardRise}
              transition={{ duration: 0.55, ease: EASE_PREMIUM }}
              className={span}
            >
              <TiltCard className="group h-full" maxTilt={9}>
                <article
                  className={`surface-card h-full overflow-hidden border border-jaune/35 ${SHAPE[pillar.id] ?? "rounded-[1.75rem]"} ${
                    isDark ? "!bg-bleu !text-papier border-bleu" : ""
                  }`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <SoftImage
                      src={pillar.image}
                      alt={`${pillar.title} — ${pillar.ref}`}
                      fill
                      sizes="(max-width: 880px) 100vw, 33vw"
                      quality={65}
                      wrapperClassName="absolute inset-0"
                      className="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        isDark
                          ? "from-bleu/95 to-transparent"
                          : "from-encre/80 to-transparent"
                      }`}
                    />
                    <p className="absolute bottom-3 left-4 font-mono text-[0.68rem] font-bold tracking-[0.12em] text-papier/85">
                      {pillar.hebrew}
                    </p>
                  </div>
                  <div className="p-6">
                    <h3
                      className={`font-display text-2xl font-extrabold uppercase ${
                        isDark ? "text-papier" : "text-bleu"
                      }`}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className={`mt-1 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] ${
                        isDark ? "text-jaune" : "text-feu"
                      }`}
                    >
                      {pillar.ref}
                    </p>
                    <p
                      className={`mt-4 text-[0.95rem] leading-relaxed ${
                        isDark ? "text-papier/80" : "text-charbon"
                      }`}
                    >
                      {pillar.text}
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className={`h-1 origin-left scale-x-0 bg-gradient-to-r from-feu to-jaune transition-transform duration-400 group-hover:scale-x-100`}
                  />
                </article>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
