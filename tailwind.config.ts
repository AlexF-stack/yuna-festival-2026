import type { Config } from "tailwindcss";

/**
 * Tokens YUNA — charte logo + DESIGN.md
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bleu: "var(--bleu)",
        "bleu-fonce": "var(--bleu-fonce)",
        feu: "var(--feu)",
        braise: "var(--braise)",
        charbon: "var(--charbon)",
        encre: "var(--encre)",
        papier: "var(--papier)",
        nuage: "var(--nuage)",
        ciel: "var(--ciel)",
        vert: "var(--vert)",
        jaune: "var(--jaune)",
        rouge: "var(--rouge)",
        /* aliases */
        nuit: "var(--nuit)",
        nuit2: "var(--nuit2)",
        aube: "var(--aube)",
        ivoire: "var(--ivoire)",
        "sky-deep": "var(--sky-deep)",
        "sky-mid": "var(--sky-mid)",
        "sky-horizon": "var(--sky-horizon)",
        wa: "var(--wa)",
      },
      fontFamily: {
        display: ["var(--font-baloo-2)", "system-ui", "sans-serif"],
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        yuna: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
