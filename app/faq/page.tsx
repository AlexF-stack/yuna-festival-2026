import type { Metadata } from "next";

import { Faq } from "@/components/sections/Faq";
import { PageIntro } from "@/components/ui/PageIntro";
import { FAQ_ITEMS } from "@/lib/faq";

const DESCRIPTION =
  "Entrée gratuite, pass QR, horaires, accès au Terrain de Midombo, bénévolat — toutes les réponses pratiques sur le YUNA Festival 2026.";

export const metadata: Metadata = {
  title: "FAQ & infos pratiques",
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ & infos pratiques | YUNA Festival 2026",
    description: DESCRIPTION,
    url: "https://yunafestival.com/faq",
  },
};

/** JSON-LD FAQPage — scopé à la page FAQ où les questions sont affichées. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <main id="contenu" className="bg-papier text-encre">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        eyebrow="Infos pratiques"
        title="FAQ"
        lead="Entrée, pass QR, horaires, accès et bénévolat — les réponses essentielles avant le 5 septembre."
        cta={{ href: "/#inscription", label: "Inscris-toi — pass QR gratuit" }}
      />
      <Faq />
    </main>
  );
}
