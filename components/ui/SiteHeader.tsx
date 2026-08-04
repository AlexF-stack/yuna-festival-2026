"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { YunaLogo } from "@/components/brand/YunaLogo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FESTIVAL, NAV_LINKS } from "@/lib/festival";

type NavSurface = "hero" | "bleu" | "feu" | "papier";

/**
 * Header = inverse vif de la section :
 * sections bleues → header feu | sections orange → header bleu | papier → bleu
 */
function toneToSurface(tone: string | null, isHero: boolean): NavSurface {
  if (isHero) return "hero";
  if (tone === "bleu" || tone === "bleu-soft") return "feu";
  if (tone === "feu" || tone === "feu-soft") return "bleu";
  if (tone === "charbon") return "feu";
  return "bleu";
}

const SURFACE_STYLE: Record<
  NavSurface,
  { header: string; link: string; burger: string; mobile: string; cta: string }
> = {
  hero: {
    header: "border-b border-papier/10 bg-transparent",
    link: "text-papier/90 hover:bg-papier/10 hover:text-papier",
    burger: "border-papier/35 text-papier",
    mobile: "border-t border-papier/15 bg-encre text-papier",
    cta: "",
  },
  bleu: {
    header:
      "border-b border-papier/15 bg-bleu shadow-[0_10px_36px_color-mix(in_srgb,var(--bleu)_45%,transparent)]",
    link: "text-papier hover:bg-papier/15",
    burger: "border-papier/40 text-papier",
    mobile: "border-t border-papier/20 bg-bleu text-papier",
    cta: "!bg-feu !text-papier hover:!bg-braise",
  },
  feu: {
    header:
      "border-b border-papier/15 bg-feu shadow-[0_10px_36px_color-mix(in_srgb,var(--feu)_45%,transparent)]",
    link: "text-papier hover:bg-papier/15",
    burger: "border-papier/40 text-papier",
    mobile: "border-t border-papier/20 bg-feu text-papier",
    cta: "!bg-papier !text-feu hover:!bg-papier/90",
  },
  papier: {
    header:
      "border-b border-bleu/20 bg-papier shadow-[0_8px_30px_rgba(0,90,140,0.1)]",
    link: "text-bleu hover:bg-logo-bleu-soft",
    burger: "border-bleu/25 text-bleu",
    mobile: "border-t border-bleu/10 bg-papier text-bleu",
    cta: "",
  },
};

/** Hauteur approximative du bandeau header pour le probe. */
const PROBE_Y = 88;

export function SiteHeader() {
  const [surface, setSurface] = useState<NavSurface>("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const pick = () => {
      // Ne pas utiliser elementFromPoint : le header fixe intercepte le hit-test.
      const nodes = document.querySelectorAll<HTMLElement>(
        "section[data-nav-surface], section[data-tone], [data-nav-tone]",
      );

      let match: HTMLElement | null = null;
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) {
          match = node;
          break;
        }
      }

      if (!match) {
        setSurface(window.scrollY < 48 ? "hero" : "bleu");
        return;
      }

      if (match.getAttribute("data-nav-surface") === "hero") {
        setSurface("hero");
        return;
      }

      const tone =
        match.getAttribute("data-tone") ||
        match.getAttribute("data-nav-tone");
      setSurface(toneToSurface(tone, false));
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick, { passive: true });
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeSurface = open && surface === "hero" ? "bleu" : surface;
  const style = SURFACE_STYLE[activeSurface];
  const lightText = activeSurface !== "papier";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] transition-[background-color,box-shadow,border-color,color] duration-300 ease-yuna ${style.header}`}
    >
      <div aria-hidden className="flex h-1 w-full">
        <span className="flex-1 bg-vert" />
        <span className="flex-1 bg-jaune" />
        <span className="flex-1 bg-rouge" />
      </div>

      <div className="mx-auto flex h-[4.25rem] max-w-[1240px] items-center justify-between gap-4 px-5 min-[900px]:h-[4.75rem] min-[900px]:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label="YUNA Festival — retour à l'accueil"
        >
          <YunaLogo
            size="nav"
            priority
            className={activeSurface !== "papier" ? "brightness-110 drop-shadow-sm" : ""}
          />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-0.5 min-[900px]:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.1em] transition-colors ${style.link}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 min-[900px]:flex">
          <Link
            href="/mon-pass"
            className={`rounded-full px-3.5 py-2 text-[0.76rem] font-bold uppercase tracking-[0.08em] transition-colors ${style.link}`}
          >
            Mon pass
          </Link>
          <ButtonLink
            href="/#inscription"
            className={`min-h-11 !px-6 !py-2.5 text-[0.8rem] ${style.cta}`}
          >
            Inscris-toi
          </ButtonLink>
        </div>

        <button
          type="button"
          className={`relative z-[130] flex h-11 w-11 items-center justify-center rounded-full border min-[900px]:hidden ${style.burger}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span
            aria-hidden
            className={`absolute h-0.5 w-5 bg-current transition-transform duration-[250ms] ease-yuna ${open ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            aria-hidden
            className={`absolute h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            aria-hidden
            className={`absolute h-0.5 w-5 bg-current transition-transform duration-[250ms] ease-yuna ${open ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className={`px-5 py-6 min-[900px]:hidden ${style.mobile}`}
      >
        <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-3 py-3.5 font-display text-xl font-extrabold uppercase tracking-wide ${
                lightText
                  ? "text-papier hover:bg-papier/10"
                  : "text-bleu hover:bg-logo-bleu-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <p
            className={`mt-2 px-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] ${
              lightText ? "text-papier/70" : "text-charbon"
            }`}
          >
            {FESTIVAL.datesHero} · {FESTIVAL.city}
          </p>
          <Link
            href="/mon-pass"
            onClick={() => setOpen(false)}
            className={`mt-4 rounded-xl border px-4 py-3 text-center font-bold uppercase tracking-[0.08em] ${
              lightText
                ? "border-papier/25 text-papier hover:bg-papier/10"
                : "border-bleu/20 text-bleu hover:bg-logo-bleu-soft"
            }`}
          >
            Pass perdu ? Retrouver mon pass
          </Link>
          <ButtonLink
            href="/#inscription"
            className={`mt-3 w-full ${style.cta}`}
            onClick={() => setOpen(false)}
          >
            Inscris-toi
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
