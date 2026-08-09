import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "outline-light" | "ghost";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
};

/**
 * primary = or drapeau (#FCD116) + encre — contraste fort sur hero / photo.
 * secondary = bleu marque. outline-light = sur fonds sombres.
 */
const VARIANT: Record<Variant, string> = {
  primary:
    "bg-jaune text-nuit-profonde shadow-ombre-cta hover:bg-[var(--or-hover)] ring-2 ring-jaune/40",
  secondary:
    "border-2 border-bleu bg-transparent text-bleu hover:bg-bleu hover:text-ivoire-froid",
  "outline-light":
    "border-2 border-ivoire-froid/45 bg-nuit-profonde/25 text-ivoire-froid hover:border-jaune hover:bg-nuit-profonde/45 hover:text-jaune",
  ghost: "bg-transparent text-bleu underline-offset-4 hover:underline",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[0.95rem] font-bold tracking-[0.02em] transition-[background-color,color,border-color,transform,box-shadow] duration-[250ms] ease-yuna hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-jaune motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${VARIANT[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
