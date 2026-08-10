"use client";

import { Newsletter } from "@/components/sections/Newsletter";
import { useLocale, useMessages } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { FAQ_ITEMS } from "@/lib/faq";

export function Faq() {
  const t = useMessages();
  const { locale } = useLocale();
  const isEn = locale === "en";
  const copy = t.pages.faq;

  return (
    <SectionShell id="faq" labelledBy="faq-title" tone="papier">
      <div className="grid gap-14 min-[960px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[960px]:gap-20">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={isEn ? "Everything you need" : "Tout savoir"}
              titleId="faq-title"
              description={copy.lead}
              tone="feu"
            />
            <div className="mt-10">
              <Newsletter />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.id}
                className="surface-card group px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-bleu">
                  {isEn ? item.questionEn : item.question}
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bleu/15 text-feu transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-charbon">
                  {isEn ? item.answerEn : item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
