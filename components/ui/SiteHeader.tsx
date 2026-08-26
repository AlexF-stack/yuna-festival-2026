"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { YunaLogo } from "@/components/brand/YunaLogo";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useMessages } from "@/components/i18n/LocaleProvider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { FESTIVAL } from "@/lib/festival";
import { registerHref } from "@/lib/register-href";

type NavSurface = "hero" | "bleu" | "feu" | "papier";

/**
 * Header suit la section (lisibilité) — plus d’inversion bleu→feu
 * qui peignait tout le header en orange après chargement.
 */
function toneToSurface(tone: string | null, isHero: boolean): NavSurface {
  if (isHero) return "hero";
  if (tone === "papier" || tone === "nuage") return "papier";
  if (tone === "charbon") return "hero";
  if (tone === "feu" || tone === "feu-soft") return "bleu";
  if (tone === "bleu" || tone === "bleu-soft") return "bleu";
  return "papier";
}

/** CTA flamme — contraste : papier sur header feu (évite orange sur orange). */
const CTA_FLAME =
  "!btn-cta-flame !text-papier hover:!brightness-110 shadow-ombre-cta ring-2 ring-[color-mix(in_srgb,var(--feu-glow)_50%,transparent)]";
const CTA_ON_DARK = CTA_FLAME;
const CTA_ON_FEU =
  "!bg-papier !text-feu hover:!bg-ivoire-froid shadow-[0_12px_32px_rgba(0,0,0,0.2)] ring-2 ring-papier/40";
const CTA_ON_PAPIER = CTA_FLAME;

const SURFACE_STYLE: Record<
  NavSurface,
  { header: string; link: string; linkActive: string; burger: string; mobile: string; cta: string; chip: string }
> = {
  hero: {
    header:
      "border-b border-papier/15 bg-encre/80 shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
    link: "text-papier/85 hover:text-papier",
    linkActive: "text-jaune",
    burger: "border-papier/40 text-papier bg-papier/5",
    mobile: "border-t border-papier/15 bg-encre text-papier",
    cta: CTA_ON_DARK,
    chip: "border-papier/25 bg-papier/10 text-jaune",
  },
  bleu: {
    header:
      "border-b border-papier/15 bg-bleu shadow-[0_12px_40px_color-mix(in_srgb,var(--bleu)_40%,transparent)]",
    link: "text-papier/90 hover:text-papier",
    linkActive: "text-jaune",
    burger: "border-papier/40 text-papier",
    mobile: "border-t border-papier/20 bg-bleu text-papier",
    cta: CTA_ON_DARK,
    chip: "border-papier/30 bg-papier/10 text-jaune",
  },
  feu: {
    header:
      "border-b border-papier/15 bg-feu shadow-[0_12px_40px_color-mix(in_srgb,var(--feu)_40%,transparent)]",
    link: "text-papier/90 hover:text-papier",
    linkActive: "text-papier",
    burger: "border-papier/40 text-papier",
    mobile: "border-t border-papier/20 bg-feu text-papier",
    cta: CTA_ON_FEU,
    chip: "border-papier/35 bg-papier/15 text-papier",
  },
  papier: {
    header:
      "border-b border-bleu/15 bg-papier shadow-[0_10px_36px_rgba(0,90,140,0.1)]",
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
  const [surface, setSurface] = useState<NavSurface>(() =>
    pathname === "/" ? "hero" : "bleu",
  );
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let raf = 0;
    let nodes: HTMLElement[] = [];

    const refreshNodes = () => {
      nodes = Array.from(
        document.querySelectorAll<HTMLElement>(
          "section[data-nav-surface], section[data-tone], section[data-nav-tone]",
        ),
      );
    };

    const resolveSurface = (): NavSurface => {
      let match: HTMLElement | null = null;
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) {
          match = node;
          break;
        }
      }

      if (!match) return window.scrollY < 48 ? "hero" : "bleu";
      if (match.getAttribute("data-nav-surface") === "hero") return "hero";
      const tone =
        match.getAttribute("data-tone") ||
        match.getAttribute("data-nav-tone");
      return toneToSurface(tone, false);
    };

    const applyScrollState = () => {
      raf = 0;
      const y = window.scrollY;
      const nextScrolled = y > 24;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

      let nextHidden = false;
      if (!open) {
        const goingDown = y > lastY.current;
        nextHidden = goingDown && y > 140;
      }
      setHidden((prev) => (prev === nextHidden ? prev : nextHidden));
      lastY.current = y;

      const nextSurface = resolveSurface();
      setSurface((prev) => (prev === nextSurface ? prev : nextSurface));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(applyScrollState);
    };

    refreshNodes();
    applyScrollState();
    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, pathname]);

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
      className={`relative z-[120] pt-[env(safe-area-inset-top)] transition-transform duration-300 ease-yuna ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${style.header}`}
    >
      <div aria-hidden className="flag-stripe">
        <span className="bg-vert" />
        <span className="bg-jaune" />
        <span className="bg-rouge" />
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
            aria-label="YUNA Festival, retour à l'accueil"
          >
            <YunaLogo size="nav" />
          </Link>
          <span
            className={`hidden truncate rounded-full border px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] min-[1100px]:inline-flex ${style.chip}`}
          >
            {messages.hero.datesHero} · {FESTIVAL.locationLine}
          </span>
        </div>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center justify-center gap-0.5 min-[900px]:flex"
        >
          {messages.nav.map((link) => {
            const active = navIsActive(pathname, link.href);
            return (
              <TransitionLink
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
              </TransitionLink>
            );
          })}
        </nav>

        <div className="hidden items-center justify-end gap-2.5 min-[900px]:flex">
          <LanguageSwitcher light={lightText} surface={activeSurface} />
          <TransitionLink
            href="/mon-pass"
            className={`rounded-full px-2.5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.08em] transition-colors min-[1100px]:px-3 ${style.link}`}
          >
            {messages.common.myPass}
          </TransitionLink>
          <ButtonLink
            href={registerHref(pathname)}
            className={`cta-register-pulse min-h-12 !px-5 !py-3 text-[0.8rem] font-extrabold uppercase tracking-[0.06em] min-[1100px]:!px-6 min-[1100px]:text-[0.85rem] ${style.cta}`}
          >
            {messages.common.register}
          </ButtonLink>
        </div>

        <div className="flex max-w-[min(100%,14.5rem)] items-center justify-end gap-1.5 min-[380px]:max-w-none min-[380px]:gap-2 min-[900px]:hidden">
          <LanguageSwitcher light={lightText} surface={activeSurface} />
          <ButtonLink
            href={registerHref(pathname)}
            className={`cta-register-pulse min-h-10 shrink-0 !px-3 !py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.04em] min-[380px]:!px-3.5 min-[380px]:text-[0.68rem] ${style.cta}`}
          >
            {messages.common.registerShort}
          </ButtonLink>
          <button
            type="button"
            className={`relative z-[130] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border min-[380px]:h-11 min-[380px]:w-11 ${style.burger}`}
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
          {messages.hero.datesHero} · {FESTIVAL.locationLine}
        </p>
        <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
          {messages.nav.map((link) => {
            const active = navIsActive(pathname, link.href);
            return (
              <TransitionLink
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
              </TransitionLink>
            );
          })}
          <TransitionLink
            href="/mon-pass"
            onClick={() => setOpen(false)}
            className={`mt-6 rounded-2xl border px-4 py-3.5 text-center text-sm font-bold uppercase tracking-[0.08em] ${
              lightText
                ? "border-papier/25 text-papier hover:bg-papier/10"
                : "border-bleu/20 text-bleu hover:bg-logo-bleu-soft"
            }`}
          >
            {messages.common.myPass}
          </TransitionLink>
          <ButtonLink
            href={registerHref(pathname)}
            className={`cta-register-pulse mt-3 w-full !py-4 text-[1.05rem] font-extrabold uppercase tracking-[0.06em] ${style.cta}`}
            onClick={() => setOpen(false)}
          >
            {messages.common.registerCta}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
