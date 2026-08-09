"use client";

type OrbProps = {
  cx: string;
  cy: string;
  r: number;
  color: string;
};

function Orb({ cx, cy, r, color }: OrbProps) {
  return (
    <div
      aria-hidden
      className={`absolute rounded-full blur-3xl opacity-30 ${color}`}
      style={{
        left: cx,
        top: cy,
        width: r * 2,
        height: r * 2,
        translate: "-50% -50%",
      }}
    />
  );
}

/** Orbes ambiance — plus discrets sur mobile. */
export function HeroOrbs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      <Orb cx="18%" cy="32%" r={120} color="bg-feu/22 min-[900px]:hidden" />
      <Orb cx="78%" cy="22%" r={100} color="bg-jaune/14 min-[900px]:hidden" />
      <div className="hidden min-[900px]:contents">
        <Orb cx="12%" cy="28%" r={200} color="bg-feu/18" />
        <Orb cx="82%" cy="18%" r={160} color="bg-bleu/20" />
      </div>
    </div>
  );
}
