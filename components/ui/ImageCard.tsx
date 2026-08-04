"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SoftImage } from "@/components/ui/SoftImage";

type ImageCardProps = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  eyebrow?: string;
  accent?: "feu" | "bleu";
  objectPosition?: string;
  className?: string;
};

/**
 * Carte image pleine hauteur — gradient bas, hover reveal (Canaan).
 */
export function ImageCard({
  image,
  imageAlt,
  title,
  description,
  eyebrow,
  accent = "feu",
  objectPosition = "center",
  className = "",
}: ImageCardProps) {
  const reduce = useReducedMotion();
  const accentBar = accent === "feu" ? "bg-feu" : "bg-bleu";

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`group surface-card-image relative h-[min(340px,72vw)] min-[640px]:h-80 overflow-hidden ${className}`}
    >
      <SoftImage
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 25vw"
        wrapperClassName="absolute inset-0"
        className="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
        objectPosition={objectPosition}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-encre/90 via-encre/30 to-transparent" />
      <div
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 ${accentBar} transition-transform duration-500 group-hover:scale-x-100`}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-papier">
        {eyebrow ? (
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-papier/65">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="mt-1 font-display text-xl font-extrabold uppercase leading-tight">
          {title}
        </h3>
        {/* Reveal au hover uniquement là où le hover existe — toujours visible au tactile. */}
        <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-papier/75 opacity-100 translate-y-0 min-[900px]:opacity-0 min-[900px]:translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
