import type { ReactNode } from "react";

type EffectFrameProps = {
  children: ReactNode;
  className?: string;
  /** dark = fond encre ; media = transparent (images) */
  tone?: "papier" | "dark" | "media";
  /** Coins cinéma en plus du liseré animé */
  corners?: boolean;
  soft?: boolean;
};

/**
 * Cadre à effets YUNA — liseré conique bleu/feu/jaune + glow.
 */
export function EffectFrame({
  children,
  className = "",
  tone = "papier",
  corners = false,
  soft = false,
}: EffectFrameProps) {
  const toneClass =
    tone === "dark"
      ? "fx-frame--dark"
      : tone === "media"
        ? "fx-frame--media"
        : "";

  return (
    <div
      className={`fx-frame ${toneClass} ${soft ? "fx-frame--soft" : ""} ${
        corners ? "fx-corners" : ""
      } ${className}`}
    >
      {corners ? (
        <>
          <span aria-hidden className="fx-corners__tl" />
          <span aria-hidden className="fx-corners__br" />
        </>
      ) : null}
      <div className="fx-frame__inner">{children}</div>
    </div>
  );
}
