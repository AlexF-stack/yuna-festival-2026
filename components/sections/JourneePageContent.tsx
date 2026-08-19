"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { useLocale, useMessages } from "@/components/i18n/LocaleProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SoftImage } from "@/components/ui/SoftImage";
import { POLES } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";
import { fill } from "@/lib/i18n";
import { EASE_PREMIUM, EASE_YUNA } from "@/lib/motion";
import { FESTIVAL_SESSIONS } from "@/lib/sessions";

/**
 * Page Journée — chronologie Midombo du samedi (pas une grille de cartes générique).
 */
export function JourneePageContent() {
  const reduce = useReducedMotion();
  const t = useMessages();
  const { locale } = useLocale();
  const isEn = locale === "en";
  const copy = t.pages.journee;

  return (
    <>
      {/* Intro — aube Midombo */}
      <section
        data-tone="bleu"
        data-nav-tone="bleu"
        className="relative overflow-hidden bg-bleu pb-16 pt-40 text-papier min-[760px]:pb-20 min-[760px]:pt-44"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,color-mix(in_srgb,var(--jaune)_28%,transparent),transparent_45%),radial-gradient(ellipse_at_10%_100%,color-mix(in_srgb,var(--feu)_30%,transparent),transparent_50%)]"
        />
        <div
          aria-hidden
          className="flag-stripe absolute inset-x-0 bottom-0 z-10"
        >
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
              {copy.eyebrow} · {FESTIVAL.edition}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,8vw,4.6rem)] font-extrabold uppercase leading-[0.92]">
              {(() => {
                const parts = copy.title.trim().split(/\s+/);
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
              {copy.lead}
            </p>
            <p className="mt-4 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-papier/55">
              {isEn
                ? `Saturday 5 Sep · masterclasses 10am–5pm · evenings open ${FESTIVAL.siteOpens}`
                : `Samedi 5 sept · masterclass 10h–17h · soirées ouverture ${FESTIVAL.siteOpens}`}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#sessions">
                {isEn ? "See the schedule →" : "Voir le déroulé →"}
              </ButtonLink>
              <ButtonLink href="/#inscription" variant="outline-light">
                {t.common.registerCta}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chronologie — une colonne, heures en mono */}
      <section
        id="sessions"
        data-tone="papier"
        data-nav-tone="papier"
        className="section-pad bg-papier"
      >
        <div className="section-container px-5 min-[760px]:px-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: EASE_YUNA }}
          >
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
              {t.sessions.eyebrow}
            </p>
            <h2
              id="sessions-title"
              className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold uppercase leading-[1.02] text-bleu"
            >
              {t.sessions.title.replace(/\s+(\S+)$/, "")}{" "}
              <span className="text-feu">
                {t.sessions.title.match(/\S+$/)?.[0] ?? ""}
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-charbon">
              {t.sessions.lead}
            </p>
          </motion.div>

          <ol className="relative mt-14 space-y-0 border-l-2 border-bleu/15 pl-6 min-[640px]:pl-10">
            {FESTIVAL_SESSIONS.map((session, i) => {
              const title = isEn ? session.titleEn : session.title;
              const place = isEn ? session.placeEn : session.place;
              const description = isEn
                ? session.descriptionEn
                : session.description;
              const href = session.registerType
                ? `/#inscription?type=${session.registerType}`
                : null;
              const isMaster = session.kind === "masterclass";

              return (
                <motion.li
                  key={session.id}
                  initial={reduce ? false : { opacity: 0, x: -18 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.55,
                    ease: EASE_YUNA,
                    delay: reduce ? 0 : i * 0.06,
                  }}
                  className="relative pb-12 last:pb-0"
                >
                  <span
                    aria-hidden
                    className={`absolute -left-[1.9rem] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-papier min-[640px]:-left-[2.4rem] ${
                      isMaster ? "bg-feu" : "bg-vert"
                    }`}
                  />
                  <div className="grid gap-4 min-[800px]:grid-cols-[11rem_1fr] min-[800px]:gap-10">
                    <div>
                      <p className="font-mono text-[0.85rem] font-bold tabular-nums tracking-[0.06em] text-feu">
                        {session.time}
                      </p>
                      <p className="mt-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-charbon/55">
                        {isMaster
                          ? isEn
                            ? "Masterclass"
                            : "Masterclass"
                          : isEn
                            ? "Outreach"
                            : "Action"}
                      </p>
                    </div>
                    <div
                      className={`rounded-[1.5rem] border p-5 min-[480px]:p-6 ${
                        isMaster
                          ? "border-feu/25 bg-gradient-to-br from-[color-mix(in_srgb,var(--feu)_8%,var(--papier))] to-papier"
                          : "border-vert/20 bg-gradient-to-br from-[color-mix(in_srgb,var(--vert)_7%,var(--papier))] to-papier"
                      }`}
                    >
                      <h3
                        className={`font-display text-[clamp(1.35rem,3vw,1.85rem)] font-extrabold uppercase leading-tight ${
                          isMaster ? "text-feu" : "text-bleu"
                        }`}
                      >
                        {title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-charbon/80">
                        {place}
                      </p>
                      <p className="mt-3 text-[1.02rem] leading-relaxed text-charbon">
                        {description}
                      </p>
                      {session.speakers?.length ? (
                        <ul className="mt-4 space-y-1.5 border-t border-bleu/10 pt-4">
                          {session.speakers.map((name) => (
                            <li
                              key={name}
                              className="flex gap-2 text-sm text-charbon"
                            >
                              <span className="text-feu" aria-hidden>
                                →
                              </span>
                              {name}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-vert/10 px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-vert">
                          {session.capacity
                            ? fill(t.sessions.capacity, {
                                n: String(session.capacity),
                              })
                            : t.sessions.free}
                        </span>
                        {href ? (
                          <Link
                            href={href}
                            className="btn-cta-flame inline-flex min-h-10 items-center rounded-full px-5 text-sm font-bold text-papier ring-1 ring-[color-mix(in_srgb,var(--feu-glow)_40%,transparent)] transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-feu"
                          >
                            {t.sessions.register}
                          </Link>
                        ) : (
                          <span className="text-sm font-semibold text-charbon/70">
                            {isEn
                              ? "Open to all · no registration"
                              : "Ouvert à tous · sans inscription"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Arc du samedi — bandeau nuit */}
      <section
        data-tone="charbon"
        data-nav-tone="charbon"
        className="relative overflow-hidden bg-nuit-profonde py-14 text-ivoire-froid min-[760px]:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,color-mix(in_srgb,var(--feu)_22%,transparent),transparent_55%)]"
        />
        <div className="section-container relative z-10 px-5 min-[760px]:px-6">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu-glow">
            {isEn ? "Then night falls" : "Puis la nuit tombe"}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold uppercase leading-[1.05]">
            {isEn ? (
              <>
                Site opens at 4pm —{" "}
                <span className="text-feu-core">concerts from 6pm</span>
              </>
            ) : (
              <>
                À 16h le site ouvre —{" "}
                <span className="text-feu-core">concerts dès 18h</span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-ivoire-froid/75">
            {isEn
              ? "Daytime prepares the ground. At night, a generation rises on Midombo’s stage — free entry."
              : "La journée prépare le terrain. Le soir, la génération se lève sur scène à Midombo — entrée libre."}
          </p>
          <div className="mt-8">
            <ButtonLink href="/artistes">
              {isEn ? "See the line-up →" : "Voir le line-up →"}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Pôles — bandes immersives, pas une grille de 4 clones */}
      <section
        id="poles"
        data-tone="papier"
        data-nav-tone="papier"
        className="bg-papier"
      >
        <div className="section-container px-5 pb-6 pt-16 min-[760px]:px-6 min-[760px]:pt-20">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-feu">
            {isEn ? "The hubs" : "Les pôles"}
          </p>
          <h2
            id="poles-title"
            className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold uppercase leading-[1.02] text-bleu"
          >
            {isEn ? (
              <>
                Activities for <span className="text-feu">everyone</span>
              </>
            ) : (
              <>
                Des activités pour <span className="text-feu">tous</span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-lg text-[1.05rem] text-charbon">
            {isEn
              ? "One aim: glorify God — gospel, art, dance, training."
              : "Un seul objectif : glorifier Dieu — gospel, art, danse, formation."}
          </p>
        </div>

        <div className="mt-8 space-y-3 px-0 min-[900px]:space-y-0">
          {POLES.map((pole, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={pole.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  ease: EASE_YUNA,
                  delay: reduce ? 0 : i * 0.04,
                }}
                className={`relative grid min-h-[280px] overflow-hidden min-[900px]:min-h-[320px] min-[900px]:grid-cols-2 ${
                  reverse ? "min-[900px]:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/11] min-[900px]:aspect-auto min-[900px]:min-h-full">
                  <SoftImage
                    src={pole.image}
                    alt={pole.title}
                    fill
                    sizes="(min-width: 900px) 50vw, 100vw"
                    quality={86}
                    wrapperClassName="absolute inset-0"
                    objectPosition={pole.objectPosition}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nuit-profonde/50 to-transparent min-[900px]:bg-gradient-to-r min-[900px]:from-transparent min-[900px]:to-nuit-profonde/20" />
                </div>
                <div
                  className={`flex flex-col justify-center bg-nuit-profonde px-6 py-10 text-ivoire-froid min-[480px]:px-10 min-[900px]:px-14 ${
                    reverse ? "min-[900px]:items-end min-[900px]:text-right" : ""
                  }`}
                >
                  <p
                    className={`font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] ${
                      pole.accent === "feu" ? "text-feu-glow" : "text-ciel"
                    }`}
                  >
                    0{i + 1} · {isEn ? "Hub" : "Pôle"}
                  </p>
                  <h3
                    className={`mt-3 font-display text-[clamp(1.75rem,4vw,2.4rem)] font-extrabold uppercase leading-[0.95] ${
                      pole.accent === "feu" ? "text-feu-core" : "text-papier"
                    }`}
                  >
                    {pole.title}
                  </h3>
                  <p
                    className={`mt-4 max-w-md text-[1.02rem] leading-relaxed text-ivoire-froid/75 ${
                      reverse ? "min-[900px]:ml-auto" : ""
                    }`}
                  >
                    {pole.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </>
  );
}
