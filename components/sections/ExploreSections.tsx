import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { SoftImage } from "@/components/ui/SoftImage";

type ExploreCard = {
  href: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
};

const CARDS: ExploreCard[] = [
  {
    href: "/vision",
    title: "La vision",
    description: "Joseph, Daniel, David — une génération non ordinaire.",
    image: "/media/title-vision.jpg",
    imageAlt: "La vision du YUNA Festival",
  },
  {
    href: "/artistes",
    title: "Line-up",
    description: "Les artistes se dévoilent progressivement.",
    image: "/media/title-lineup.jpg",
    imageAlt: "Scène et artistes du festival",
  },
  {
    href: "/journee",
    title: "La journée",
    description: "Action médicale, masterclass et pôles d'activités.",
    image: "/media/community.jpg",
    imageAlt: "Actions communautaires en journée",
    objectPosition: "center 40%",
  },
  {
    href: "/lieu",
    title: "Le lieu",
    description: "Terrain de Midombo, Cotonou — entrée libre.",
    image: "/media/venue-midombo-generated.webp",
    imageAlt: "Terrain de Midombo",
  },
  {
    href: "/boutique",
    title: "Boutique",
    description: "Tee-shirts LED YUNA — porte le feu.",
    image: "/media/lights.jpg",
    imageAlt: "Lumières de scène",
    objectPosition: "center 30%",
  },
  {
    href: "/faq",
    title: "FAQ & infos",
    description: "Entrée, pass QR, accès — les réponses essentielles.",
    image: "/media/crowd.webp",
    imageAlt: "Public du festival",
  },
];

/**
 * Sommaire visuel de la home — chaque section détaillée vit sur sa propre
 * page pour garder la home courte sur mobile.
 */
export function ExploreSections() {
  return (
    <SectionShell id="explorer" labelledBy="explorer-title" tone="papier">
      <SectionHeading
        eyebrow="Explorer"
        title="Tout le festival"
        titleId="explorer-title"
        description="Vision, line-up, journée d'impact, lieu, boutique et infos pratiques — chaque univers a sa page."
      />
      <div className="mt-10 grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 min-[1000px]:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative block h-44 overflow-hidden rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu min-[900px]:h-52"
          >
            <SoftImage
              src={card.image}
              alt={card.imageAlt}
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw"
              wrapperClassName="absolute inset-0"
              className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
              objectPosition={card.objectPosition ?? "center"}
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
        ))}
      </div>
    </SectionShell>
  );
}
