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
            ? "section-eyebrow mb-3 justify-center"
            : "section-eyebrow mb-3"
        }
      >
        <span
          aria-hidden
          className={`h-0.5 w-8 shrink-0 ${light ? "bg-feu" : "bg-feu"}`}
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
