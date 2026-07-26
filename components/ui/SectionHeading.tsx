type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  titleId: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <header className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className={
          centered
            ? "mb-3 text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu"
            : "mb-3 flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu before:block before:h-0.5 before:w-8 before:bg-feu before:content-['']"
        }
      >
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="font-display text-[clamp(2.4rem,6vw,4.25rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-bleu"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-[1.05rem] leading-relaxed text-charbon ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
