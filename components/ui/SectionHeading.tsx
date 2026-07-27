type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  titleId: string;
  description?: string;
  align?: "left" | "center";
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
        className={
          centered
            ? `mb-3 text-[0.72rem] font-bold uppercase tracking-[0.32em] ${light ? "text-feu" : "text-feu"}`
            : `mb-3 flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu before:block before:h-0.5 before:w-8 before:content-[''] ${light ? "before:bg-feu" : "before:bg-feu"}`
        }
      >
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className={`font-display text-[clamp(2.4rem,6vw,4.25rem)] font-extrabold uppercase leading-[0.98] tracking-tight ${
          light ? "text-papier" : "text-bleu"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-[1.05rem] leading-relaxed ${
            light ? "text-papier/80" : "text-charbon"
          } ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
