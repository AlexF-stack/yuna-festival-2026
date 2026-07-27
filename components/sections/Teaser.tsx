"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { SoftImage } from "@/components/ui/SoftImage";
import { TEASER } from "@/lib/content-site";

export function Teaser() {
  const hasVideo = Boolean(TEASER.youtubeId);

  return (
    <SectionShell id="teaser" labelledBy="teaser-title" tone="ciel">
      <Reveal>
        <SectionHeading
          eyebrow={TEASER.eyebrow}
          title={TEASER.title}
          titleId="teaser-title"
          description={TEASER.intro}
        />
      </Reveal>

      <Reveal delay={0.08} variant="open" className="relative mt-14">
        <div
          aria-hidden
          className="absolute -left-3 -top-3 h-full w-full rounded-3xl border border-bleu/20"
        />
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-bleu/12 bg-encre shadow-ombre-bleu-lg">
          {hasVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${TEASER.youtubeId}`}
              title="Teaser YUNA Festival 2026"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <>
              <SoftImage
                src="/media/concert.jpg"
                alt=""
                fill
                sizes="(min-width: 900px) 900px, 100vw"
                wrapperClassName="absolute inset-0"
                className="opacity-60"
                objectPosition="center 30%"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-bleu-fonce/90 via-bleu/75 to-encre/90" />
              <div className="relative flex h-full min-h-[220px] flex-col items-center justify-center gap-4 px-6 text-center text-papier">
                <span
                  aria-hidden
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-papier/30 bg-papier/10 text-2xl backdrop-blur-sm"
                >
                  ▶
                </span>
                <p className="font-display text-2xl font-extrabold uppercase">
                  Teaser bientôt disponible
                </p>
                <p className="max-w-md text-sm text-papier/75">
                  La vidéo officielle sera publiée ici — inscris-toi pour être
                  prévenu en premier.
                </p>
              </div>
            </>
          )}
        </div>
      </Reveal>
    </SectionShell>
  );
}
