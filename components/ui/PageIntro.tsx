import { ButtonLink } from "@/components/ui/ButtonLink";
import { FESTIVAL } from "@/lib/festival";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  cta?: { href: string; label: string };
};

/**
 * Bandeau d'intro des pages de section — même langage visuel que la page Don.
 */
export function PageIntro({ eyebrow, title, lead, cta }: PageIntroProps) {
  return (
    <section
      data-tone="bleu"
      data-nav-tone="bleu"
      className="relative overflow-hidden bg-bleu pb-16 pt-32 text-papier min-[760px]:pb-20 min-[760px]:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--feu)_35%,transparent),transparent_55%),radial-gradient(ellipse_at_90%_80%,color-mix(in_srgb,var(--jaune)_18%,transparent),transparent_50%)]"
      />
      <div className="section-container relative z-10">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-jaune">
            {eyebrow} · {FESTIVAL.brandFull} {FESTIVAL.edition}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.2rem)] font-extrabold uppercase leading-[0.95]">
            {title}
          </h1>
          <p className="mt-6 text-[1.12rem] leading-relaxed text-papier/88">
            {lead}
          </p>
          {cta ? (
            <div className="mt-8">
              <ButtonLink href={cta.href} className="!bg-feu hover:!bg-braise">
                {cta.label}
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
