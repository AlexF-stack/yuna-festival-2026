export type TitleTone = "bleu" | "feu" | "encre";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  titleId: string;
  description?: string;
  align?: "left" | "center";
  /** light = texte blanc sur fond bleu/feu logo exact */
  variant?: "default" | "light";
  /**
   * Couleur du grand titre (fonds clairs).
   * Alterner section à section pour le rythme marque — défaut bleu.
   */
  tone?: TitleTone;
  /**
   * Met le dernier mot en accent (opposé au tone) — effet festival.
   * Ignoré en variant light.
   */
  accentLast?: boolean;
};

const TITLE_TONE: Record<TitleTone, string> = {
  bleu: "text-bleu",
  feu: "text-feu",
  encre: "text-encre",
};

const ACCENT_FOR: Record<TitleTone, string> = {
  /** Sur papier clair : jaune pur trop faible → rouge / vert drapeau. */
  bleu: "text-rouge",
  feu: "text-vert",
  encre: "text-vert",
};

const EYEBROW_FOR: Record<TitleTone, string> = {
  bleu: "text-vert",
  feu: "text-rouge",
  encre: "text-jaune",
};

function splitLastWord(title: string): { head: string; last: string } | null {
  const trimmed = title.trim();
  const i = trimmed.lastIndexOf(" ");
  if (i <= 0) return null;
  return { head: trimmed.slice(0, i), last: trimmed.slice(i + 1) };
}

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  align = "left",
  variant = "default",
  tone = "bleu",
  accentLast = false,
}: SectionHeadingProps) {
  const centered = align === "center";
  const light = variant === "light";
  const parts = !light && accentLast ? splitLastWord(title) : null;

  return (
    <header className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className={`mb-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] ${
          light ? "text-papier/85" : EYEBROW_FOR[tone]
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className={`section-title ${light ? "text-papier" : TITLE_TONE[tone]}`}
      >
        {parts ? (
          <>
            {parts.head}{" "}
            <span className={ACCENT_FOR[tone]}>{parts.last}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {description ? (
        <p
          className={`section-lead ${light ? "text-papier/80" : "text-charbon"} ${
            centered ? "mx-auto max-w-xl" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
