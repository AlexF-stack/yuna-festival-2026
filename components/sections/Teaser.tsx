import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { TEASER } from "@/lib/content-site";

export function Teaser() {
  const hasVideo = Boolean(TEASER.youtubeId);

  return (
    <SectionShell id="teaser" labelledBy="teaser-title" background="teaser">
      <SectionHeading
        eyebrow={TEASER.eyebrow}
        title={TEASER.title}
        titleId="teaser-title"
        description={TEASER.intro}
      />

      <div className="relative mt-12 aspect-video overflow-hidden rounded-3xl border border-bleu/12 bg-encre shadow-ombre-bleu-lg">
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
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-bleu-fonce to-bleu px-6 text-center text-papier">
            <p className="font-display text-2xl font-extrabold uppercase">
              Teaser bientôt disponible
            </p>
            <p className="max-w-md text-sm text-papier/75">
              La vidéo officielle sera publiée ici — suis la newsletter pour être
              prévenu en premier.
            </p>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
