"use client";

import {
  LocalizedMonPassExtras,
} from "@/components/i18n/LocalizedPageIntro";
import { useMessages } from "@/components/i18n/LocaleProvider";
import { RecoverPassForm } from "@/components/pass/RecoverPassForm";

export function MonPassContent() {
  const t = useMessages();

  return (
    <>
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu">
        {t.pages.monPass.eyebrow}
      </p>
      <h1 className="mt-3 text-center font-display text-[clamp(2.2rem,7vw,3.4rem)] font-extrabold uppercase leading-[0.95] text-bleu">
        {t.pages.monPass.title}
      </h1>
      <p className="mt-4 max-w-md text-center text-[1.02rem] leading-relaxed text-charbon">
        {t.pages.monPass.lead}
      </p>

      <div className="relative mt-10 w-full max-w-md">
        <RecoverPassForm />
      </div>

      <LocalizedMonPassExtras />
    </>
  );
}
