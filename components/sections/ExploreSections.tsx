"use client";

import { useMessages } from "@/components/i18n/LocaleProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { SoftImage } from "@/components/ui/SoftImage";
import { TransitionLink } from "@/components/ui/TransitionLink";

const CARD_MEDIA: Record<
  string,
  { image: string; objectPosition?: string }
> = {
  "/mouvement": { image: "/media/title-vision.webp" },
  "/vision": { image: "/media/title-vision.webp" },
  "/artistes": { image: "/media/title-lineup.webp" },
  "/journee": {
    image: "/media/community.webp",
    objectPosition: "center 40%",
  },
  "/#lieu": {
    image: "/media/venue-midombo.webp",
    objectPosition: "center 40%",
  },
  "/lieu": {
    image: "/media/venue-midombo.webp",
    objectPosition: "center 40%",
  },
  "/faq": { image: "/media/crowd.webp" },
};

/**
 * Sommaire visuel — mobile : cartes plus hautes, 1re carte hero.
 */
export function ExploreSections() {
  const t = useMessages();

  return (
    <SectionShell id="explorer" labelledBy="explorer-title" tone="papier">
      <Reveal>
        <SectionHeading
          eyebrow={t.explore.eyebrow}
          title={t.explore.title}
          titleId="explorer-title"
          description={t.explore.description}
          tone="bleu"
          accentLast
        />
      </Reveal>
      <RevealGroup className="mt-10 grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 min-[1000px]:grid-cols-3">
        {t.explore.cards.map((card, i) => {
          const media = CARD_MEDIA[card.href] ?? {
            image: "/media/crowd.webp",
          };
          const featured = i === 0;
          return (
            <RevealItem
              key={card.href}
              className={
                featured ? "min-[560px]:col-span-2 min-[1000px]:col-span-1" : ""
              }
            >
              <TransitionLink
                href={card.href}
                className={`group relative block overflow-hidden rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu ${
                  featured
                    ? "h-56 min-[560px]:h-52 min-[900px]:h-52"
                    : "h-48 min-[560px]:h-44 min-[900px]:h-52"
                }`}
              >
                <SoftImage
                  src={media.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  quality={86}
                  wrapperClassName="absolute inset-0"
                  className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                  objectPosition={media.objectPosition ?? "center"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nuit-profonde/95 via-nuit-profonde/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-ivoire-froid min-[480px]:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className={`font-display font-extrabold uppercase leading-tight ${
                        featured ? "text-2xl min-[560px]:text-xl" : "text-xl"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <span
                      aria-hidden
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-feu text-papier transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ivoire-froid/85">
                    {card.description}
                  </p>
                </div>
              </TransitionLink>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </SectionShell>
  );
}
