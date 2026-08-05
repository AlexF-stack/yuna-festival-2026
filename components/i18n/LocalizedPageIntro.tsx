"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { useMessages } from "@/components/i18n/LocaleProvider";
import { PageIntro } from "@/components/ui/PageIntro";

type PageKey =
  | "artistes"
  | "vision"
  | "journee"
  | "lieu"
  | "boutique"
  | "don"
  | "faq"
  | "monPass";

type LocalizedPageIntroProps = {
  page: PageKey;
  showCta?: boolean;
};

/** Intro de page branchée sur le dictionnaire FR/EN. */
export function LocalizedPageIntro({
  page,
  showCta = true,
}: LocalizedPageIntroProps) {
  const t = useMessages();
  const copy = t.pages[page];

  return (
    <PageIntro
      eyebrow={copy.eyebrow}
      title={copy.title}
      lead={copy.lead}
      cta={
        showCta
          ? { href: "/#inscription", label: t.common.registerCta }
          : undefined
      }
    />
  );
}

export function LocalizedMonPassExtras() {
  const t = useMessages();
  return (
    <>
      <p className="mt-8 text-center text-sm text-charbon">
        {t.pages.monPass.notYet}{" "}
        <a
          href="/#inscription"
          className="font-bold text-bleu underline-offset-4 hover:underline"
        >
          {t.common.registerCta}
        </a>
      </p>
      <ButtonLink href="/" variant="ghost" className="mt-6 !px-0">
        {t.common.backHome}
      </ButtonLink>
    </>
  );
}
