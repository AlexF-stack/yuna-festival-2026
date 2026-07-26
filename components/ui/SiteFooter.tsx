import { YunaLogo } from "@/components/brand/YunaLogo";
import { DONATE } from "@/lib/content-site";
import { FESTIVAL, NAV_LINKS } from "@/lib/festival";
import { SITE_CONTACT } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-bleu-fonce text-papier">
      <div aria-hidden className="flex h-1 w-full">
        <span className="flex-1 bg-vert" />
        <span className="flex-1 bg-jaune" />
        <span className="flex-1 bg-rouge" />
      </div>

      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 min-[760px]:grid-cols-[1.4fr_1fr_1fr] min-[760px]:px-6">
        <div>
          <YunaLogo size="footer" />
          <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.28em] text-feu">
            {FESTIVAL.theme} · {FESTIVAL.edition}
          </p>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-papier/75">
            {FESTIVAL.tagline} {FESTIVAL.datesShort} · {FESTIVAL.venue},{" "}
            {FESTIVAL.city}.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-papier/45">
            Explorer
          </p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-papier/80 transition-colors hover:text-feu"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={DONATE.href}
                className="text-papier/80 transition-colors hover:text-feu"
              >
                {DONATE.label}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-papier/45">
            Contact
          </p>
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="block text-papier/80 transition-colors hover:text-feu"
          >
            {SITE_CONTACT.email}
          </a>
          <p className="mt-4 text-sm text-papier/55">
            {FESTIVAL.freeEntry} · Ouverture du site à 17h
          </p>
        </div>
      </div>

      <div className="border-t border-papier/10 px-5 py-5 text-center font-mono text-[0.68rem] uppercase tracking-[0.18em] text-papier/40 min-[760px]:px-6">
        © {FESTIVAL.edition} {FESTIVAL.brandFull} · Global Impact Ministries
      </div>
    </footer>
  );
}
