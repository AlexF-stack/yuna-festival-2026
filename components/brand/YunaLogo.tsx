import Image from "next/image";

type YunaLogoProps = {
  size?: "nav" | "hero" | "footer";
  className?: string;
  priority?: boolean;
};

const SIZES = {
  nav: { width: 120, height: 174, className: "h-11 w-auto min-[900px]:h-12" },
  hero: {
    width: 220,
    height: 319,
    className: "h-[6.5rem] w-auto min-[480px]:h-28 min-[760px]:h-32",
  },
  footer: { width: 140, height: 203, className: "h-[4.5rem] w-auto" },
} as const;

/** Logo officiel sans fond (PNG transparent). */
export function YunaLogo({
  size = "nav",
  className = "",
  priority = false,
}: YunaLogoProps) {
  const s = SIZES[size];

  return (
    <Image
      src="/brand/yuna-mark.png"
      alt="YUNA Festival"
      width={s.width}
      height={s.height}
      priority={priority}
      className={`${s.className} object-contain object-left ${className}`}
    />
  );
}
