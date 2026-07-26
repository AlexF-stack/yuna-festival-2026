import type { ProductVisualKey } from "@/types/product";

type ProductVisualProps = {
  visualKey: ProductVisualKey;
  titleId: string;
};

/** Illustrations tee — reprises du HTML `.tee-visual` (SVG léger). */
export function ProductVisual({ visualKey, titleId }: ProductVisualProps) {
  if (visualKey === "basic") {
    return (
      <svg
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-[200px] drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${titleId}-tf`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="var(--braise)" />
            <stop offset="1" stopColor="var(--jaune)" />
          </linearGradient>
          <filter id={`${titleId}-tg`}>
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M64 26 L42 38 L22 66 L40 84 L52 74 L52 205 L148 205 L148 74 L160 84 L178 66 L158 38 L136 26 C126 42 108 44 100 44 C92 44 74 42 64 26 Z"
          fill="var(--sky-mid)"
        />
        <g filter={`url(#${titleId}-tg)`} className="tee-flame origin-bottom">
          <path
            d="M100 74 C120 96,128 120,116 142 C132 136,140 122,140 108 C154 130,146 162,116 176 C90 188,62 172,58 148 C55 128,68 104,90 94 C86 114,92 130,100 136 C92 110,96 90,100 74 Z"
            fill={`url(#${titleId}-tf)`}
          />
        </g>
        <text
          x="100"
          y="192"
          textAnchor="middle"
          className="fill-ivoire font-display text-[14px] font-extrabold"
        >
          BÉNIN DEBOUT
        </text>
      </svg>
    );
  }

  if (visualKey === "sound") {
    return (
      <svg
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-[200px] drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${titleId}-tf`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="var(--braise)" />
            <stop offset="0.6" stopColor="var(--feu)" />
            <stop offset="1" stopColor="var(--jaune)" />
          </linearGradient>
          <filter id={`${titleId}-tg`}>
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M64 26 L42 38 L22 66 L40 84 L52 74 L52 205 L148 205 L148 74 L160 84 L178 66 L158 38 L136 26 C126 42 108 44 100 44 C92 44 74 42 64 26 Z"
          fill="var(--sky-mid)"
        />
        <g filter={`url(#${titleId}-tg)`} className="tee-pulse origin-center">
          <path
            d="M100 66 C122 90,130 116,118 140 C134 134,142 120,142 104 C158 130,150 162,118 178 C90 190,60 174,56 146 C53 124,67 98,90 88 C86 110,92 128,100 134 C91 106,96 86,100 66 Z"
            fill={`url(#${titleId}-tf)`}
          />
          <path
            d="M100 120 C108 130,122 132,134 129 C126 140,112 144,102 140 C106 148,116 152,124 151 C116 160,104 162,96 158 C99 168,94 176,88 180 C84 172,84 162,88 154 C79 158,68 153,63 146 C74 144,82 140,86 132 C74 135,64 129,60 120 C76 123,92 118,98 108 Z"
            fill="var(--ivoire)"
          />
        </g>
        <g className="tee-pulse origin-center">
          <circle cx="72" cy="98" r="3" fill="var(--jaune)" />
          <circle cx="130" cy="94" r="3" fill="var(--jaune)" />
          <circle cx="60" cy="150" r="3" fill="var(--feu)" />
          <circle cx="142" cy="154" r="3" fill="var(--feu)" />
        </g>
        <text
          x="100"
          y="196"
          textAnchor="middle"
          className="fill-ivoire font-display text-[14px] font-extrabold"
        >
          BÉNIN DEBOUT
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      className="max-w-[200px] drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
      aria-hidden
    >
      <defs>
        <filter id={`${titleId}-tg`}>
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M64 26 L42 38 L22 66 L40 84 L52 74 L52 205 L148 205 L148 74 L160 84 L178 66 L158 38 L136 26 C126 42 108 44 100 44 C92 44 74 42 64 26 Z"
        fill="var(--nuit)"
      />
      <g filter={`url(#${titleId}-tg)`} className="tee-pulse origin-center">
        <rect x="94" y="72" width="8" height="8" rx="1.5" fill="var(--jaune)" />
        <rect x="103" y="72" width="8" height="8" rx="1.5" fill="var(--aube)" />
        <rect x="85" y="82" width="8" height="8" rx="1.5" fill="var(--feu)" />
        <rect x="94" y="82" width="8" height="8" rx="1.5" fill="var(--jaune)" />
        <rect x="103" y="82" width="8" height="8" rx="1.5" fill="var(--aube)" />
        <rect x="112" y="82" width="8" height="8" rx="1.5" fill="var(--feu)" />
        <rect x="76" y="92" width="8" height="8" rx="1.5" fill="var(--braise)" />
        <rect x="85" y="92" width="8" height="8" rx="1.5" fill="var(--feu)" />
        <rect x="94" y="92" width="8" height="8" rx="1.5" fill="var(--jaune)" />
        <rect x="103" y="92" width="8" height="8" rx="1.5" fill="var(--jaune)" />
        <rect x="112" y="92" width="8" height="8" rx="1.5" fill="var(--feu)" />
        <rect x="121" y="92" width="8" height="8" rx="1.5" fill="var(--braise)" />
        <rect x="76" y="102" width="8" height="8" rx="1.5" fill="var(--feu)" />
        <rect x="85" y="102" width="8" height="8" rx="1.5" fill="var(--aube)" />
        <rect x="94" y="102" width="8" height="8" rx="1.5" fill="var(--ivoire)" />
        <rect x="103" y="102" width="8" height="8" rx="1.5" fill="var(--ivoire)" />
        <rect x="112" y="102" width="8" height="8" rx="1.5" fill="var(--aube)" />
        <rect x="121" y="102" width="8" height="8" rx="1.5" fill="var(--feu)" />
        <rect x="82" y="112" width="8" height="8" rx="1.5" fill="var(--braise)" />
        <rect x="91" y="112" width="8" height="8" rx="1.5" fill="var(--feu)" />
        <rect x="100" y="112" width="8" height="8" rx="1.5" fill="var(--aube)" />
        <rect x="109" y="112" width="8" height="8" rx="1.5" fill="var(--feu)" />
        <rect x="118" y="112" width="8" height="8" rx="1.5" fill="var(--braise)" />
        <rect x="91" y="122" width="8" height="8" rx="1.5" fill="var(--braise)" />
        <rect x="100" y="122" width="8" height="8" rx="1.5" fill="var(--feu)" />
        <rect x="109" y="122" width="8" height="8" rx="1.5" fill="var(--braise)" />
      </g>
      <text
        x="100"
        y="192"
        textAnchor="middle"
        className="fill-ivoire font-display text-[14px] font-extrabold"
      >
        BÉNIN DEBOUT
      </text>
    </svg>
  );
}
