"use client";

import Link from "next/link";

import { useMessages } from "@/components/i18n/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { SoftImage } from "@/components/ui/SoftImage";

const CARD_MEDIA: Record<
  string,
  { image: string; objectPosition?: string }
> = {
  "/vision": { image: "/media/title-vision.webp" },
  "/artistes": { image: "/media/title-lineup.webp" },
  "/journee": {
    image: "/media/community.webp",
    objectPosition: "center 40%",
  },
  "/lieu": { image: "/media/venue-midombo-generated.webp" },
  "/boutique": {
    image: "/media/lights.webp",
    objectPosition: "center 30%",
  },
  "/faq": { image: "/media/crowd.webp" },
};

/**
 * Sommaire visuel de la home — chaque section détaillée vit sur sa propre
 * page pour garder la home courte sur mobile.
 */
export function ExploreSections() {
  const t = useMessages();

  return (
    <SectionShell id="explorer" labelledBy="explorer-title" tone="papier">
      <SectionHeading
        eyebrow={t.explore.eyebrow}
        title={t.explore.title}
        titleId="explorer-title"
        description={t.explore.description}
      />
      <div className="mt-10 grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 min-[1000px]:grid-cols-3">
        {t.explore.cards.map((card) => {
          const media = CARD_MEDIA[card.href] ?? {
            image: "/media/crowd.webp",
          };
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block h-44 overflow-hidden rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu min-[900px]:h-52"
            >
              <SoftImage
                src={media.image}
                alt={card.imageAlt}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw"
                wrapperClassName="absolute inset-0"
                className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                objectPosition={media.objectPosition ?? "center"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-encre/92 via-encre/35 to-encre/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-papier">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-extrabold uppercase leading-tight">
                    {card.title}
                  </h3>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-feu text-papier transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-papier/80">
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
}
