"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useLocale, useMessages } from "@/components/i18n/LocaleProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HebrewText } from "@/components/ui/HebrewText";
import { SoftImage } from "@/components/ui/SoftImage";
import { MISSION, SPONSORS, VISION } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";
import { EASE_PREMIUM, EASE_YUNA } from "@/lib/motion";

const PREUVES = {
  fr: [
    {
      n: "01",
      title: "Masterclass",
      body: "VTeam pour musiciens et chantres, Entrepreneuriat pour bâtir en jeune non ordinaire — avant les concerts du soir.",
    },
    {
      n: "02",
      title: "Pass QR moderne",
      body: "Inscription en ligne, pass nominatif sécurisé, scan staff le jour J — une ops digne d’un festival international.",
    },
    {
      n: "03",
      title: "Bénin Debout",
      body: `${FESTIVAL.theme} · ${FESTIVAL.datesShort} · ${FESTIVAL.venue}. Entrée libre, génération non ordinaire.`,
    },
  ],
  en: [
    {
      n: "01",
      title: "Masterclasses",
      body: "VTeam for musicians and worship leaders, Entrepreneurship to build as an extraordinary youth — before the evening concerts.",
    },
    {
      n: "02",
      title: "Modern QR pass",
      body: "Online registration, named secure pass, staff scan on the day — ops worthy of an international festival.",
    },
    {
      n: "03",
      title: "Bénin Debout",
      body: `${FESTIVAL.theme} · ${FESTIVAL.datesShort} · ${FESTIVAL.venue}. Free entry, an extraordinary generation.`,
    },
  ],
} as const;

/**
 * Page Mouvement — manifeste éditorial (pas 3×3 cartes génériques).
 */
export function MouvementPageContent() {
  const reduce = useReducedMotion();
  const t = useMessages();
  const { locale } = useLocale();
  const isEn = locale === "en";
  const intro = t.pages.mouvement;
  const preuves = PREUVES[isEn ? "en" : "fr"];

  return (
    <>
      <section
        data-tone="bleu"
        data-nav-tone="bleu"
        className="relative overflow-hidden bg-bleu pb-16 pt-40 text-papier min-[760px]:pb-20 min-[760px]:pt-44"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,color-mix(in_srgb,var(--feu)_35%,transparent),transparent_50%),radial-gradient(ellipse_at_100%_80%,color-mix(in_srgb,var(--jaune)_16%,transparent),transparent_45%)]"
        />
        <div aria-hidden className="flag-stripe absolute inset-x-0 bottom-0 z-10">
          <span className="bg-vert" />
          <span className="bg-jaune" />
          <span className="bg-rouge" />
        </div>
        <div className="section-container relative z-10 px-5 min-[760px]:px-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="max-w-3xl"
          >
            <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-jaune">
              {intro.eyebrow} · {FESTIVAL.edition}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,8vw,4.6rem)] font-extrabold uppercase leading-[0.92]">
              {(() => {
                const parts = intro.title.trim().split(/\s+/);
                const last = parts.pop() ?? "";
                return (
                  <>
                    <span className="text-papier">{parts.join(" ")} </span>
                    <span className="bg-gradient-to-r from-feu-glow via-feu-core to-feu bg-clip-text text-transparent">
                      {last}
                    </span>
                  </>
                );
              })()}
            </h1>
            <p className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-papier/88">
              {intro.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/#inscription">{MISSION.ctaLabel}</ButtonLink>
              <ButtonLink href="#vision" variant="outline-light">
                {t.pages.vision.title} →
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission — prose pleine largeur */}
      <section
        id="mission"
        data-tone="papier"
        data-nav-tone="papier"
        className="section-pad bg-papier"
      >
        <div className="section-container px-5 min-[760px]:px-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: EASE_YUNA }}
            className="max-w-3xl"
          >
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
              {MISSION.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.2rem)] font-extrabold uppercase leading-[0.98] text-bleu">
              Un festival, une génération en{" "}
              <span className="text-feu">feu</span>
            </h2>
            <p className="mt-5 text-[1.08rem] leading-relaxed text-charbon">
              {MISSION.lead}
            </p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-charbon/90">
              {MISSION.body}
            </p>
            <blockquote className="mt-10 border-l-4 border-feu bg-gradient-to-r from-[color-mix(in_srgb,var(--feu)_8%,transparent)] to-transparent py-4 pl-5 pr-4 text-[1.08rem] font-medium leading-relaxed text-encre">
              {MISSION.highlight}
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Preuves — liste éditoriale */}
      <section
        data-tone="charbon"
        data-nav-tone="charbon"
        className="relative overflow-hidden bg-nuit-profonde py-16 text-ivoire-froid min-[760px]:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_srgb,var(--bleu)_30%,transparent),transparent_50%)]"
        />
        <div className="section-container relative z-10 px-5 min-[760px]:px-6">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu-glow">
            {isEn ? "On the ground" : "Sur le terrain"}
          </p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold uppercase leading-[1.02]">
            {isEn ? (
              <>
                What makes YUNA{" "}
                <span className="text-feu-core">unique</span>
              </>
            ) : (
              <>
                Ce qui rend YUNA{" "}
                <span className="text-feu-core">unique</span>
              </>
            )}
          </h2>
          <ul className="mt-12 divide-y divide-ivoire-froid/10 border-y border-ivoire-froid/10">
            {preuves.map((item, i) => (
              <motion.li
                key={item.title}
                initial={reduce ? false : { opacity: 0, x: -14 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  ease: EASE_YUNA,
                  delay: reduce ? 0 : i * 0.05,
                }}
                className="grid gap-3 py-8 min-[720px]:grid-cols-[5rem_1fr] min-[720px]:gap-10"
              >
                <p className="font-mono text-sm font-bold text-feu-glow">
                  {item.n}
                </p>
                <div>
                  <h3 className="font-display text-[clamp(1.4rem,3vw,1.85rem)] font-extrabold uppercase text-papier">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[1.02rem] leading-relaxed text-ivoire-froid/75">
                    {item.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vision — chapitres Joseph / Daniel / David */}
      <section
        id="vision"
        data-tone="papier"
        data-nav-tone="papier"
        className="bg-papier"
      >
        <div className="section-container px-5 pb-8 pt-16 min-[760px]:px-6 min-[760px]:pt-20">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
            {VISION.eyebrow}
          </p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,5vw,3.2rem)] font-extrabold uppercase leading-[0.98] text-bleu">
            {VISION.titleLine1}{" "}
            <span className="text-feu">{VISION.titleLine2}</span>
          </h2>
          <p
            className="mt-5 max-w-3xl text-[1.05rem] leading-relaxed text-charbon"
            spellCheck={false}
          >
            <HebrewText>{VISION.intro}</HebrewText>
          </p>
        </div>

        <div className="mt-6 space-y-0">
          {VISION.pillars.map((pillar, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={pillar.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: EASE_YUNA }}
                className={`grid min-h-[260px] min-[900px]:min-h-[300px] min-[900px]:grid-cols-2 ${
                  reverse ? "min-[900px]:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] min-[900px]:aspect-auto">
                  <SoftImage
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(min-width: 900px) 50vw, 100vw"
                    quality={86}
                    wrapperClassName="absolute inset-0"
                    objectPosition="center 30%"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nuit-profonde/60 to-transparent" />
                </div>
                <div
                  className={`flex flex-col justify-center bg-nuit-profonde px-6 py-10 text-ivoire-froid min-[480px]:px-10 min-[900px]:px-14 ${
                    reverse ? "min-[900px]:items-end min-[900px]:text-right" : ""
                  }`}
                >
                  <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-feu-glow">
                    <HebrewText>{pillar.hebrew}</HebrewText>
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase leading-none text-feu-core">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs font-bold tracking-[0.14em] text-ivoire-froid/50">
                    {pillar.ref}
                  </p>
                  <p
                    className={`mt-4 max-w-md text-[1.02rem] leading-relaxed text-ivoire-froid/75 ${
                      reverse ? "min-[900px]:ml-auto" : ""
                    }`}
                  >
                    {pillar.text}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="section-container px-5 py-12 min-[760px]:px-6">
          <ButtonLink href="/vision" variant="secondary">
            Approfondir la vision →
          </ButtonLink>
        </div>
      </section>

      {/* Partenaires — rangées, pas pricing cards */}
      <section
        id="partenaires"
        data-tone="bleu"
        data-nav-tone="bleu"
        className="relative overflow-hidden bg-bleu py-16 text-papier min-[760px]:py-20"
      >
        <div className="section-container relative z-10 px-5 min-[760px]:px-6">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-jaune">
            {SPONSORS.eyebrow}
          </p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold uppercase leading-[1.02]">
            Devenez partenaire du{" "}
            <span className="text-feu-core">réveil</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-papier/85">
            {SPONSORS.intro}
          </p>

          <ul className="mt-12 divide-y divide-papier/15 border-y border-papier/15">
            {SPONSORS.tiers.map((tier, i) => (
              <motion.li
                key={tier.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.45,
                  ease: EASE_YUNA,
                  delay: reduce ? 0 : i * 0.05,
                }}
                className="grid gap-4 py-8 min-[800px]:grid-cols-[1fr_auto] min-[800px]:items-end"
              >
                <div>
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-feu-core">
                    {tier.badge}
                  </p>
                  <p className="mt-2 font-display text-[clamp(1.8rem,4vw,2.4rem)] font-extrabold leading-none">
                    {tier.price}{" "}
                    <span className="text-base font-bold text-papier/70">
                      {tier.currency}
                    </span>
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-papier/80">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex gap-2">
                        <span className="text-feu-core" aria-hidden>
                          ✦
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-papier/45">
                  Logo — à fournir
                </p>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10">
            <ButtonLink href="/partenaires">
              Devenir partenaire
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
