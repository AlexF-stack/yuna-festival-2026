"use client";

import { YunaLogo } from "@/components/brand/YunaLogo";
import { useMessages } from "@/components/i18n/LocaleProvider";
import { ORGANIZER } from "@/lib/content-site";
import { FESTIVAL } from "@/lib/festival";
import { SITE_CONTACT } from "@/lib/site";

export function SiteFooter() {
  const t = useMessages();

  return (
    <footer className="relative z-10 bg-bleu-fonce text-papier">
      <div aria-hidden className="flag-stripe">
        <span className="bg-vert" />
        <span className="bg-jaune" />
        <span className="bg-rouge" />
      </div>

      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 min-[760px]:grid-cols-2 min-[1000px]:grid-cols-4 min-[760px]:px-6">
        <div className="min-[1000px]:col-span-1">
          <YunaLogo size="footer" />
          <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.28em] text-jaune">
            {FESTIVAL.theme} · {FESTIVAL.edition}
          </p>
          <p className="mt-3 text-sm text-papier/75">{t.footer.tagline}</p>
          <p className="mt-2 text-sm text-papier/65">{t.footer.dove}</p>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-papier/75">
            {t.footer.verseLine}
          </p>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-papier/45">
            {t.footer.festival}
          </p>
          <ul className="space-y-2.5">
            {t.footerNav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-papier/80 transition-colors hover:text-jaune"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-papier/45">
            {t.footer.contact}
          </p>
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="block text-papier/80 transition-colors hover:text-jaune"
          >
            {SITE_CONTACT.email}
          </a>
          <p className="mt-4 text-sm text-papier/55">
            {FESTIVAL.city}, {FESTIVAL.country}
          </p>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-papier/45">
            {t.footer.organization}
          </p>
          <p className="text-papier/80">{ORGANIZER.name}</p>
          <p className="mt-3 text-sm text-papier/55">{t.hero.meta.split(" · ")[0]}</p>
          <p className="mt-2 text-sm text-papier/55">{t.footer.openNote}</p>
        </div>
      </div>

      <div className="border-t border-papier/10 px-5 py-5 text-center font-mono text-[0.68rem] uppercase tracking-[0.18em] text-papier/40 min-[760px]:px-6">
        © {FESTIVAL.edition} {FESTIVAL.brandFull} · {ORGANIZER.name}
      </div>
    </footer>
  );
}
