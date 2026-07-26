import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
};

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-feu text-papier shadow-[0_10px_28px_color-mix(in_srgb,var(--feu)_32%,transparent)] hover:bg-braise",
  secondary:
    "border-2 border-bleu bg-transparent text-bleu hover:bg-bleu hover:text-papier",
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
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[0.95rem] font-bold tracking-[0.02em] transition-[background-color,color,border-color,transform,box-shadow] duration-[250ms] ease-yuna hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bleu motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${VARIANT[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
