"use client";

import Image from "next/image";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { TransitionLink } from "@/components/ui/TransitionLink";

const COPY = {
  fr: {
    eyebrow: "À vivre maintenant",
    title: "Entre dans l’univers YUNA",
    description:
      "Crée ton visuel Bénin Debout ou pose l’emblème YUNA chez toi. Deux expériences gratuites, directement sur ton téléphone.",
    filter: {
      badge: "Photo officielle",
      title: "Ton portrait Bénin Debout",
      description:
        "Prends ou choisis ta photo, ajuste le cadre officiel puis partage-la.",
      cta: "Créer ma photo",
    },
    flame: {
      badge: "Vidéo · emblème 3D",
      title: "La flamme chez toi",
      description:
        "Active ta caméra, place l’emblème dans ton espace et filme la scène.",
      cta: "Lancer l’expérience",
    },
  },
  en: {
    eyebrow: "Try it now",
    title: "Step into the YUNA experience",
    description:
      "Create your Bénin Debout visual or place the YUNA emblem at home. Two free mobile experiences.",
    filter: {
      badge: "Official photo",
      title: "Your Bénin Debout portrait",
      description:
        "Take or choose a photo, adjust the official frame and share it.",
      cta: "Create my photo",
    },
    flame: {
      badge: "Video · 3D emblem",
      title: "The flame at home",
      description:
        "Turn on your camera, place the emblem in your space and film it.",
      cta: "Launch the experience",
    },
  },
} as const;

export function FestivalExperiences() {
  const { locale } = useLocale();
  const copy = COPY[locale];

  return (
    <SectionShell
      id="experiences"
      labelledBy="experiences-title"
      tone="bleu-soft"
      className="!py-14 min-[760px]:!py-20"
    >
      <Reveal>
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="experiences-title"
          description={copy.description}
          tone="bleu"
          accentLast
        />
      </Reveal>

      <RevealGroup className="mt-8 grid gap-4 min-[760px]:mt-10 min-[760px]:grid-cols-2 min-[760px]:gap-6">
        <RevealItem>
          <TransitionLink
            href="/filtre"
            className="group grid overflow-hidden rounded-[1.6rem] border border-bleu/10 bg-papier shadow-[0_20px_55px_rgba(0,78,122,.12)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bleu motion-reduce:transition-none min-[480px]:grid-cols-[0.9fr_1.1fr] min-[760px]:grid-cols-1 min-[1080px]:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-bleu min-[480px]:aspect-auto min-[760px]:aspect-[16/10] min-[1080px]:aspect-auto">
              <Image
                src="/media/community.webp"
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-bleu/20" />
              <div className="absolute inset-3 mx-auto aspect-square max-h-[calc(100%-1.5rem)]">
                <Image
                  src="/media/filter-benin-debout-overlay.png"
                  alt=""
                  fill
                  sizes="240px"
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
            <div className="flex min-h-48 flex-col justify-center p-5 min-[480px]:p-6">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-feu">
                {copy.filter.badge}
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold uppercase leading-none text-bleu">
                {copy.filter.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charbon/75">
                {copy.filter.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-feu">
                {copy.filter.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </TransitionLink>
        </RevealItem>

        <RevealItem>
          <TransitionLink
            href="/flamme"
            className="group grid overflow-hidden rounded-[1.6rem] border border-feu/12 bg-papier shadow-[0_20px_55px_rgba(255,59,0,.1)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-feu motion-reduce:transition-none min-[480px]:grid-cols-[0.9fr_1.1fr] min-[760px]:grid-cols-1 min-[1080px]:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#fff8f1_0%,#ffd27a_42%,#ff6600_100%)] min-[480px]:aspect-auto min-[760px]:aspect-[16/10] min-[1080px]:aspect-auto">
              <div className="absolute inset-x-8 bottom-3 h-10 rounded-[50%] bg-charbon/25 blur-xl" />
              <Image
                src="/brand/yuna-mark.png"
                alt=""
                width={190}
                height={278}
                className="relative h-[88%] w-auto mix-blend-multiply drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
              />
            </div>
            <div className="flex min-h-48 flex-col justify-center p-5 min-[480px]:p-6">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-feu">
                {copy.flame.badge}
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold uppercase leading-none text-bleu">
                {copy.flame.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charbon/75">
                {copy.flame.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-feu">
                {copy.flame.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </TransitionLink>
        </RevealItem>
      </RevealGroup>
    </SectionShell>
  );
}
