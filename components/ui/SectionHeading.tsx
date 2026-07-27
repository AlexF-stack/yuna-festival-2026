type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  titleId: string;
  description?: string;
  align?: "left" | "center";
  /** light = texte blanc sur fond bleu/feu logo exact */
  variant?: "default" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  align = "left",
  variant = "default",
}: SectionHeadingProps) {
  const centered = align === "center";
  const light = variant === "light";

  return (
    <header className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className={`mb-3 inline-flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] ${
          centered ? "justify-center" : ""
        } ${light ? "text-papier/85" : "text-feu"}`}
      >
        <span
          aria-hidden
          className={`h-0.5 w-8 shrink-0 ${light ? "bg-papier" : "bg-feu"}`}
        />
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className={`section-title ${light ? "text-papier" : "text-bleu"}`}
      >
        {title}
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
