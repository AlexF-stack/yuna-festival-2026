"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { YunaLogo } from "@/components/brand/YunaLogo";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useMessages } from "@/components/i18n/LocaleProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FESTIVAL } from "@/lib/festival";

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

const CTA_ON_DARK =
  "!bg-feu !text-papier hover:!bg-braise shadow-[0_8px_22px_color-mix(in_srgb,var(--feu)_40%,transparent)]";
const CTA_ON_FEU =
  "!bg-papier !text-feu hover:!bg-papier/90 shadow-[0_8px_22px_rgba(0,0,0,0.12)]";
const CTA_ON_PAPIER =
  "!bg-feu !text-papier hover:!bg-braise shadow-[0_8px_22px_color-mix(in_srgb,var(--feu)_28%,transparent)]";

const SURFACE_STYLE: Record<
  NavSurface,
  { header: string; link: string; linkActive: string; burger: string; mobile: string; cta: string; chip: string }
> = {
  hero: {
    header:
      "border-b border-papier/15 bg-encre/35 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl backdrop-saturate-150",
    link: "text-papier/85 hover:text-papier",
    linkActive: "text-jaune",
    burger: "border-papier/40 text-papier bg-papier/5",
    mobile: "border-t border-papier/15 bg-encre/95 text-papier backdrop-blur-xl",
    cta: CTA_ON_DARK,
    chip: "border-papier/25 bg-papier/10 text-jaune",
  },
  bleu: {
    header:
      "border-b border-papier/15 bg-bleu/95 shadow-[0_12px_40px_color-mix(in_srgb,var(--bleu)_40%,transparent)] backdrop-blur-md",
    link: "text-papier/90 hover:text-papier",
    linkActive: "text-jaune",
    burger: "border-papier/40 text-papier",
    mobile: "border-t border-papier/20 bg-bleu text-papier",
    cta: CTA_ON_DARK,
    chip: "border-papier/30 bg-papier/10 text-jaune",
  },
  feu: {
    header:
      "border-b border-papier/15 bg-feu/95 shadow-[0_12px_40px_color-mix(in_srgb,var(--feu)_40%,transparent)] backdrop-blur-md",
    link: "text-papier/90 hover:text-papier",
    linkActive: "text-papier",
    burger: "border-papier/40 text-papier",
    mobile: "border-t border-papier/20 bg-feu text-papier",
    cta: CTA_ON_FEU,
    chip: "border-papier/35 bg-papier/15 text-papier",
  },
  papier: {
    header:
      "border-b border-bleu/15 bg-papier/90 shadow-[0_10px_36px_rgba(0,90,140,0.1)] backdrop-blur-md",
    link: "text-bleu/80 hover:text-bleu",
    linkActive: "text-feu",
    burger: "border-bleu/25 text-bleu",
    mobile: "border-t border-bleu/10 bg-papier text-bleu",
    cta: CTA_ON_PAPIER,
    chip: "border-bleu/20 bg-ciel text-bleu",
  },
};

const PROBE_Y = 88;

function navIsActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Header sticky premium — glass, hide-on-scroll, CTA contraste, menu mobile immersif. */
export function SiteHeader() {
  const messages = useMessages();
  const pathname = usePathname() || "/";
  const [surface, setSurface] = useState<NavSurface>("hero");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const pickSurface = () => {
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

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      if (!open) {
        const goingDown = y > lastY.current;
        if (goingDown && y > 140) setHidden(true);
        else setHidden(false);
      } else {
        setHidden(false);
      }
      lastY.current = y;
      pickSurface();
    };

    pickSurface();
    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", pickSurface, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", pickSurface);
    };
  }, [open]);

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
      className={`relative z-[120] pt-[env(safe-area-inset-top)] transition-[transform,background-color,box-shadow,border-color,color] duration-300 ease-yuna ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${style.header}`}
    >
      <div aria-hidden className="flex h-[3px] w-full">
        <span className="flex-1 bg-vert" />
        <span className="flex-1 bg-jaune" />
        <span className="flex-1 bg-rouge" />
      </div>

      <div
        className={`mx-auto grid max-w-[1240px] grid-cols-[1fr_auto] items-center gap-3 px-5 transition-[height] duration-300 ease-yuna min-[900px]:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.1fr)] min-[900px]:px-6 ${
          scrolled
            ? "h-[3.85rem] min-[900px]:h-[4.25rem]"
            : "h-[4.35rem] min-[900px]:h-[4.85rem]"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={() => setOpen(false)}
            aria-label="YUNA Festival — retour à l'accueil"
          >
            <YunaLogo
              size="nav"
              priority
              className={
                activeSurface !== "papier"
                  ? "brightness-110 drop-shadow-sm"
                  : ""
              }
            />
          </Link>
          <span
            className={`fx-frame fx-frame--soft hidden max-w-[14rem] rounded-full min-[1100px]:inline-flex ${
              activeSurface === "papier" ? "" : "fx-frame--dark"
            }`}
          >
            <span
              className={`fx-frame__inner truncate rounded-full px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] ${style.chip}`}
            >
              {messages.hero.datesHero} · {FESTIVAL.city}
            </span>
          </span>
        </div>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center justify-center gap-0.5 min-[900px]:flex"
        >
          {messages.nav.map((link) => {
            const active = navIsActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative whitespace-nowrap rounded-full px-2.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] transition-colors min-[1100px]:px-3.5 min-[1100px]:text-[0.78rem] ${
                  active ? style.linkActive : style.link
                }`}
              >
                {link.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300 ease-yuna min-[1100px]:inset-x-3.5 ${
                    active
                      ? "scale-x-100 bg-current"
                      : "scale-x-0 bg-current group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center justify-end gap-2 min-[900px]:flex">
          <LanguageSwitcher light={lightText} surface={activeSurface} />
          <Link
            href="/mon-pass"
            className={`rounded-full px-2.5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.08em] transition-colors min-[1100px]:px-3 ${style.link}`}
          >
            {messages.common.myPass}
          </Link>
          <ButtonLink
            href="/#inscription"
            className={`min-h-11 !px-4 !py-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.06em] min-[1100px]:!px-5 min-[1100px]:text-[0.78rem] ${style.cta}`}
          >
            {messages.common.register}
          </ButtonLink>
        </div>

        <div className="flex items-center justify-end gap-2 min-[900px]:hidden">
          <LanguageSwitcher light={lightText} surface={activeSurface} />
          <button
            type="button"
            className={`relative z-[130] flex h-11 w-11 items-center justify-center rounded-full border ${style.burger}`}
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
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className={`min-h-[calc(100svh-4.5rem)] px-5 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] min-[900px]:hidden ${style.mobile}`}
      >
        <p
          className={`mb-6 font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] ${
            lightText ? "text-jaune" : "text-feu"
          }`}
        >
          {messages.hero.datesHero} · {FESTIVAL.city}
        </p>
        <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
          {messages.nav.map((link) => {
            const active = navIsActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-3 py-3.5 font-display text-[1.65rem] font-extrabold uppercase leading-none tracking-wide transition-colors ${
                  active
                    ? lightText
                      ? "bg-papier/10 text-jaune"
                      : "bg-logo-bleu-soft text-feu"
                    : lightText
                      ? "text-papier hover:bg-papier/10"
                      : "text-bleu hover:bg-logo-bleu-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/mon-pass"
            onClick={() => setOpen(false)}
            className={`mt-6 rounded-2xl border px-4 py-3.5 text-center text-sm font-bold uppercase tracking-[0.08em] ${
              lightText
                ? "border-papier/25 text-papier hover:bg-papier/10"
                : "border-bleu/20 text-bleu hover:bg-logo-bleu-soft"
            }`}
          >
            {messages.common.myPass}
          </Link>
          <ButtonLink
            href="/#inscription"
            className={`mt-3 w-full !py-4 font-extrabold uppercase tracking-[0.06em] ${style.cta}`}
            onClick={() => setOpen(false)}
          >
            {messages.common.register}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
