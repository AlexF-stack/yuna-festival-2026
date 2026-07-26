"use client";

import { useEffect, useState } from "react";

import { YunaLogo } from "@/components/brand/YunaLogo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FESTIVAL, NAV_LINKS } from "@/lib/festival";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] transition-[background-color,box-shadow,border-color] duration-300 ease-yuna ${
        scrolled || open
          ? "border-b border-bleu/10 bg-papier/95 shadow-[0_8px_30px_rgba(0,90,140,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-papier/80 backdrop-blur-md"
      }`}
    >
      <div aria-hidden className="flex h-1 w-full">
        <span className="flex-1 bg-vert" />
        <span className="flex-1 bg-jaune" />
        <span className="flex-1 bg-rouge" />
      </div>

      <div className="mx-auto flex h-[4.25rem] max-w-[1240px] items-center justify-between gap-4 px-5 min-[900px]:h-[4.75rem] min-[900px]:px-6">
        <a
          href="#hero"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label="YUNA Festival — retour à l'accueil"
        >
          <YunaLogo size="nav" priority />
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-0.5 min-[900px]:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-charbon transition-colors hover:bg-ciel hover:text-bleu"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden min-[900px]:block">
          <ButtonLink href="#inscription" className="!px-6 !py-2.5 text-[0.8rem]">
            Réserver
          </ButtonLink>
        </div>

        <button
          type="button"
          className="relative z-[130] flex h-11 w-11 items-center justify-center rounded-full border border-bleu/20 text-bleu min-[900px]:hidden"
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
        className="border-t border-bleu/10 bg-papier px-5 py-6 min-[900px]:hidden"
      >
        <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3.5 font-display text-xl font-extrabold uppercase tracking-wide text-bleu hover:bg-ciel"
            >
              {link.label}
            </a>
          ))}
          <p className="mt-2 px-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-charbon">
            {FESTIVAL.datesHero} · {FESTIVAL.city}
          </p>
          <ButtonLink
            href="#inscription"
            className="mt-4 w-full"
            onClick={() => setOpen(false)}
          >
            Réserver ma place
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
