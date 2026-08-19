import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { ORGANIZER } from "@/lib/content-site";
import { SITE_CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment YUNA Festival 2026 collecte, utilise et protège tes données personnelles (inscription, pass QR, newsletter).",
  robots: { index: true, follow: true },
  alternates: { canonical: "/confidentialite" },
};

const SECTIONS: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: "1. Qui est responsable de tes données ?",
    paragraphs: [
      `Le site festivalyuna.com est édité par ${ORGANIZER.name}, organisateur du YUNA Festival 2026 à Cotonou (Bénin). Pour toute question relative à tes données personnelles, écris-nous à ${SITE_CONTACT.email}.`,
    ],
  },
  {
    title: "2. Quelles données collectons-nous ?",
    paragraphs: [
      "Inscription au festival : nom complet, numéro de téléphone (WhatsApp), adresse e-mail (optionnelle, obligatoire pour les bénévoles), type d'inscription (pass, masterclass, bénévole).",
      "Newsletter : adresse e-mail uniquement.",
      "Jour de l'événement : heure de validation de ton pass à l'entrée (check-in).",
      "Nous ne collectons aucune donnée de navigation à des fins publicitaires et n'utilisons pas de cookies de suivi tiers.",
    ],
  },
  {
    title: "3. Pourquoi ces données ?",
    paragraphs: [
      "Générer et t'envoyer ton pass QR personnel, contrôler les entrées le jour J, organiser les masterclass et le programme bénévole, et — si tu t'y abonnes — t'envoyer les annonces du festival (artistes, horaires, infos pratiques).",
      "Base légale : ton consentement, exprimé lors de l'envoi du formulaire d'inscription ou d'abonnement à la newsletter.",
    ],
  },
  {
    title: "4. Où sont stockées tes données et qui y accède ?",
    paragraphs: [
      "Tes données sont stockées de manière sécurisée sur Supabase (hébergement cloud chiffré) et ne sont accessibles qu'à l'équipe d'organisation du festival. Elles ne sont jamais vendues ni transmises à des tiers à des fins commerciales.",
    ],
  },
  {
    title: "5. Combien de temps les gardons-nous ?",
    paragraphs: [
      "Les données d'inscription et de check-in sont conservées jusqu'à trois mois après le festival (au plus tard le 31 décembre 2026), puis supprimées. Les e-mails newsletter sont conservés jusqu'à ta désinscription.",
    ],
  },
  {
    title: "6. Tes droits",
    paragraphs: [
      `Conformément au Règlement général sur la protection des données (RGPD) et à la loi béninoise n°2017-20 portant code du numérique, tu disposes d'un droit d'accès, de rectification, d'effacement et d'opposition sur tes données. Pour l'exercer, écris à ${SITE_CONTACT.email} — nous répondons sous 30 jours.`,
      "Tu peux aussi introduire une réclamation auprès de l'Autorité de protection des données personnelles du Bénin (APDP).",
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <main
      id="contenu"
      className="flex min-h-dvh flex-col items-center bg-nuage px-5 pb-16 pt-28 text-encre"
    >
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-feu">
        Tes données, protégées
      </p>
      <h1 className="mt-3 text-center font-display text-[clamp(2rem,6vw,3.2rem)] font-extrabold uppercase leading-[0.95] text-bleu">
        Politique de confidentialité
      </h1>
      <p className="mt-4 max-w-xl text-center text-[1.02rem] leading-relaxed text-charbon">
        Dernière mise à jour : 4 août 2026. En bref : on collecte le strict
        minimum pour ton pass et le jour J, on ne vend rien, et tout est
        supprimé après le festival.
      </p>

      <div className="mt-10 w-full max-w-2xl space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl font-extrabold uppercase text-bleu">
              {section.title}
            </h2>
            {section.paragraphs.map((text) => (
              <p key={text} className="mt-3 leading-relaxed text-charbon">
                {text}
              </p>
            ))}
          </section>
        ))}
      </div>

      <ButtonLink href="/" variant="ghost" className="mt-12 !px-0">
        ← Retour au site
      </ButtonLink>
    </main>
  );
}
