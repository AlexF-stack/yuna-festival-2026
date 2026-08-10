"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ArtistMarquee } from "@/components/sections/ArtistMarquee";
import { LineupMystery } from "@/components/sections/LineupMystery";
import { useLocale, useMessages } from "@/components/i18n/LocaleProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { fill } from "@/lib/i18n";
import { FESTIVAL, LINEUP_TOTAL } from "@/lib/festival";
import { EASE_PREMIUM, EASE_YUNA } from "@/lib/motion";
import type { PublicArtist } from "@/types/artist";

type ArtistesPageContentProps = {
  artists: PublicArtist[];
};

const SOIREES = {
  fr: [
    {
      day: "Samedi 5 septembre",
      short: "Sam. 5",
      meta: "ouverture 17h · scène 18h",
      slots: [
        { time: "18:00", label: "Ouverture & prière" },
        { time: "18:15–20:05", label: "Louange & scènes (artistes à dévoiler)" },
        { time: "20:05", label: "Parole prophétique · 45 min" },
        { time: "20:50", label: "Adoration · 1 h" },
        { time: "21:50–23:00", label: "Scènes & clôture" },
      ],
    },
    {
      day: "Dimanche 6 septembre",
      short: "Dim. 6",
      meta: "ouverture 17h · scène 18h",
      slots: [
        { time: "18:00", label: "Ouverture & prière" },
        { time: "18:10–18:50", label: "Louange (artistes à dévoiler)" },
        { time: "18:50", label: "Exhortation · 30 min" },
        { time: "19:20", label: "Adoration · 1 h" },
        { time: "20:20", label: "Parole · 1 h" },
        { time: "21:20", label: "Tête d’affiche internationale · 1 h" },
        { time: "22:20", label: "Clôture & envoi" },
      ],
    },
  ],
  en: [
    {
      day: "Saturday 5 September",
      short: "Sat. 5",
      meta: "gates 5pm · stage 6pm",
      slots: [
        { time: "18:00", label: "Opening & prayer" },
        { time: "18:15–20:05", label: "Worship & stages (artists TBA)" },
        { time: "20:05", label: "Prophetic word · 45 min" },
        { time: "20:50", label: "Adoration · 1 h" },
        { time: "21:50–23:00", label: "Stages & close" },
      ],
    },
    {
      day: "Sunday 6 September",
      short: "Sun. 6",
      meta: "gates 5pm · stage 6pm",
      slots: [
        { time: "18:00", label: "Opening & prayer" },
        { time: "18:10–18:50", label: "Worship (artists TBA)" },
        { time: "18:50", label: "Exhortation · 30 min" },
        { time: "19:20", label: "Adoration · 1 h" },
        { time: "20:20", label: "Word · 1 h" },
        { time: "21:20", label: "International headliner · 1 h" },
        { time: "22:20", label: "Close & send-out" },
      ],
    },
  ],
} as const;

/**
 * Page Line-up — affiche éditoriale + soirées en chronologie (pas une grille de tiles).
 */
export function ArtistesPageContent({ artists }: ArtistesPageContentProps) {
  const reduce = useReducedMotion();
  const t = useMessages();
  const { locale } = useLocale();
  const isEn = locale === "en";
  const intro = t.pages.artistes;
  const soirees = SOIREES[isEn ? "en" : "fr"];

  const revealed = artists.filter((a) => a.is_revealed && a.name);
  const totalCount = Math.max(artists.length, LINEUP_TOTAL);
  const mysteryCount = Math.max(0, totalCount - revealed.length);
  const revealedNames = revealed.map((a) => a.name as string);
  const headliner = revealed.find((a) => a.is_headliner);
  const others = revealed.filter((a) => !a.is_headliner);

  return (
    <>
      <section
        data-tone="bleu"
        data-nav-tone="bleu"
        className="relative overflow-hidden bg-bleu pb-14 pt-40 text-papier min-[760px]:pb-16 min-[760px]:pt-44"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_10%,color-mix(in_srgb,var(--feu)_38%,transparent),transparent_48%),radial-gradient(ellipse_at_0%_100%,color-mix(in_srgb,var(--jaune)_18%,transparent),transparent_45%)]"
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
            <p className="mt-4 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-papier/55">
              {fill(t.lineup.teaser, { n: String(totalCount) })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#artistes">
                {isEn ? "See the names →" : "Voir les noms →"}
              </ButtonLink>
              <ButtonLink href="#programme" variant="outline-light">
                {isEn ? "Evenings →" : "Soirées →"}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      <ArtistMarquee revealedNames={revealedNames} />

      <section
        id="artistes"
        data-tone="charbon"
        data-nav-tone="charbon"
        className="relative overflow-hidden bg-nuit-profonde py-16 text-ivoire-froid min-[760px]:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--feu)_28%,transparent),transparent_50%),radial-gradient(ellipse_at_100%_80%,color-mix(in_srgb,var(--bleu)_25%,transparent),transparent_45%)]"
        />
        <div className="section-container relative z-10 px-5 min-[760px]:px-6">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu-glow">
            {t.lineup.eyebrow}
          </p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold uppercase leading-[1.02]">
            {t.lineup.title.replace(/\s+(\S+)$/, "")}{" "}
            <span className="text-feu-core">
              {t.lineup.title.match(/\S+$/)?.[0] ?? ""}
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-[1.05rem] text-ivoire-froid/70">
            {t.lineup.description}
          </p>

          {totalCount === 0 ? (
            <p className="mt-14 text-ivoire-froid/80">{t.lineup.coming}</p>
          ) : (
            <ol className="mt-14 space-y-0">
              {headliner ? (
                <motion.li
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.65, ease: EASE_YUNA }}
                  className="border-b border-ivoire-froid/10 pb-12"
                >
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu-core">
                    ★ {isEn ? "Headliner" : "Tête d'affiche"} · {headliner.role}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(2.8rem,10vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-papier">
                    {headliner.name}
                  </h3>
                  {headliner.bio_short ? (
                    <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-ivoire-froid/75">
                      {headliner.bio_short}
                    </p>
                  ) : null}
                </motion.li>
              ) : null}

              {others.map((artist, i) => (
                <motion.li
                  key={artist.id}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.5,
                    ease: EASE_YUNA,
                    delay: reduce ? 0 : i * 0.04,
                  }}
                  className="grid gap-2 border-b border-ivoire-froid/10 py-7 min-[640px]:grid-cols-[4.5rem_1fr] min-[640px]:items-baseline min-[640px]:gap-8"
                >
                  <p className="font-mono text-sm font-bold tabular-nums text-feu-glow">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ivoire-froid/45">
                      {artist.role}
                    </p>
                    <h3 className="mt-1 font-display text-[clamp(1.6rem,4vw,2.35rem)] font-extrabold uppercase leading-[1.02] text-papier">
                      {artist.name}
                    </h3>
                    {artist.bio_short ? (
                      <p className="mt-2 max-w-xl text-[0.98rem] leading-relaxed text-ivoire-froid/65">
                        {artist.bio_short}
                      </p>
                    ) : null}
                  </div>
                </motion.li>
              ))}

              {mysteryCount > 0 ? (
                <li className="pt-10">
                  <LineupMystery count={mysteryCount} />
                </li>
              ) : null}
            </ol>
          )}
        </div>
      </section>

      {/* Soirées — une chronologie par jour */}
      <section
        id="programme"
        data-tone="papier"
        data-nav-tone="papier"
        className="section-pad bg-papier"
      >
        <div className="section-container px-5 min-[760px]:px-6">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
            {isEn ? "The evenings" : "Les soirées"}
          </p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold uppercase leading-[1.02] text-bleu">
            {isEn ? (
              <>
                Shape of the{" "}
                <span className="text-feu">two nights</span>
              </>
            ) : (
              <>
                Structure des{" "}
                <span className="text-feu">deux soirs</span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-lg text-[1.05rem] text-charbon">
            {isEn
              ? "Names drop progressively — the rundown is already set."
              : "Les noms sortent progressivement — le déroulé est déjà là."}
          </p>

          <div className="mt-14 space-y-16">
            {soirees.map((soir, dayIndex) => (
              <motion.div
                key={soir.day}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  ease: EASE_YUNA,
                  delay: reduce ? 0 : dayIndex * 0.06,
                }}
              >
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-bleu/15 pb-4">
                  <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold uppercase text-bleu">
                    {soir.day}
                  </h3>
                  <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-feu">
                    {soir.short} · {soir.meta}
                  </p>
                </div>
                <ol className="relative mt-6 border-l-2 border-bleu/15 pl-6 min-[480px]:pl-8">
                  {soir.slots.map((slot) => (
                    <li
                      key={`${soir.day}-${slot.time}`}
                      className="relative pb-5 last:pb-0"
                    >
                      <span
                        aria-hidden
                        className="absolute -left-[1.7rem] top-1.5 h-2.5 w-2.5 rounded-full bg-feu ring-4 ring-papier min-[480px]:-left-[2.05rem]"
                      />
                      <div className="grid gap-1 min-[560px]:grid-cols-[8.5rem_1fr] min-[560px]:gap-6">
                        <span className="font-mono text-[0.78rem] font-bold tabular-nums text-feu">
                          {slot.time}
                        </span>
                        <span className="text-[1.02rem] text-encre">
                          {slot.label}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <ButtonLink href="/#inscription">
              {t.common.registerCta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
