"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { useLocale, useMessages } from "@/components/i18n/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { fill } from "@/lib/i18n";
import { EASE_YUNA } from "@/lib/motion";
import { FESTIVAL_SESSIONS } from "@/lib/sessions";

/** Catalogue sessions journée — CTA vers inscription préfiltrée. */
export function SessionsCatalog() {
  const t = useMessages();
  const { locale } = useLocale();
  const reduce = useReducedMotion();
  const isEn = locale === "en";

  return (
    <SectionShell id="sessions" labelledBy="sessions-title" tone="papier">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_YUNA }}
      >
        <SectionHeading
          eyebrow={t.sessions.eyebrow}
          title={t.sessions.title}
          titleId="sessions-title"
          description={t.sessions.lead}
          tone="encre"
          accentLast
        />

        <div className="mt-10 grid gap-4 min-[760px]:grid-cols-3">
          {FESTIVAL_SESSIONS.map((session) => {
            const title = isEn ? session.titleEn : session.title;
            const place = isEn ? session.placeEn : session.place;
            const description = isEn
              ? session.descriptionEn
              : session.description;
            const href = session.registerType
              ? `/#inscription?type=${session.registerType}`
              : "/#inscription";

            return (
              <article
                key={session.id}
                className="flex flex-col rounded-2xl border border-bleu/12 bg-papier p-5 shadow-[0_8px_28px_rgba(0,90,140,0.06)]"
              >
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-feu">
                  {session.time}
                </p>
                <h3 className="mt-2 font-display text-lg font-extrabold uppercase leading-tight text-bleu">
                  {title}
                </h3>
                <p className="mt-1 text-xs font-medium text-charbon">{place}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charbon">
                  {description}
                </p>
                {session.speakers?.length ? (
                  <p className="mt-3 text-xs text-charbon/80">
                    <span className="font-semibold text-encre">
                      {t.sessions.speakers} :{" "}
                    </span>
                    {session.speakers.join(" · ")}
                  </p>
                ) : null}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-bleu/8 pt-4">
                  <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] text-vert">
                    {session.capacity
                      ? fill(t.sessions.capacity, { n: String(session.capacity) })
                      : t.sessions.free}
                  </span>
                  {session.registerType ? (
                    <Link
                      href={href}
                      className="text-sm font-bold text-bleu underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bleu"
                    >
                      {t.sessions.register}
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </motion.div>
    </SectionShell>
  );
}
