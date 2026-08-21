import Image from "next/image";

type YunaLogoProps = {
  size?: "nav" | "hero" | "footer";
  /** flame = halo orange (défaut) ; muted = plat sur fonds clairs très chargés */
  glow?: "flame" | "muted";
  className?: string;
  priority?: boolean;
};

const SIZES = {
  nav: { width: 120, height: 174, className: "h-11 w-auto min-[900px]:h-12" },
  hero: {
    width: 220,
    height: 319,
    className:
      "h-[8rem] w-auto min-[480px]:h-[8.5rem] min-[760px]:h-36 min-[900px]:h-[7.5rem]",
  },
  footer: { width: 140, height: 203, className: "h-[4.5rem] w-auto" },
} as const;

/**
 * Logo officiel — orange flamme poussé (saturate + halo feu).
 * Source compressée (~65 Ko) ; Next sert AVIF/WebP.
 */
export function YunaLogo({
  size = "nav",
  glow = "flame",
  className = "",
  priority = false,
}: YunaLogoProps) {
  const s = SIZES[size];
  const flameClass =
    glow === "flame"
      ? size === "hero"
        ? "logo-flame logo-flame--hero"
        : "logo-flame"
      : "";

  return (
    <Image
      src="/brand/yuna-mark.webp"
      alt="YUNA Festival"
      width={s.width}
      height={s.height}
      priority={priority}
      sizes={
        size === "hero"
          ? "(max-width: 480px) 128px, (max-width: 900px) 144px, 120px"
          : size === "nav"
            ? "48px"
            : "72px"
      }
      className={`${s.className} object-contain object-left ${flameClass} ${className}`}
    />
  );
}
