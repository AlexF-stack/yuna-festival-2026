import Image from "next/image";

type SectionTitleArtProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Visuel titre de section (style affiche) — généré, sous le heading textuel pour a11y.
 */
export function SectionTitleArt({
  src,
  alt,
  className = "",
}: SectionTitleArtProps) {
  return (
    <div
      className={`relative mt-6 aspect-[21/9] w-full max-w-3xl overflow-hidden rounded-[1.25rem] border border-bleu/12 shadow-ombre-bleu ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 900px) 720px, 100vw"
        quality={78}
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-encre/25 via-transparent to-transparent"
      />
    </div>
  );
}
