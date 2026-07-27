import { Newsletter } from "@/components/sections/Newsletter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { FAQ_ITEMS } from "@/lib/faq";

export function Faq() {
  return (
    <SectionShell id="faq" labelledBy="faq-title" background="faq">
      <div className="grid gap-14 min-[960px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[960px]:gap-20">
        <div>
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout savoir"
            titleId="faq-title"
            description="Entrée, pass QR, lieu et infos pratiques — les réponses essentielles."
          />
          <div className="mt-10 hidden min-[960px]:block">
            <Newsletter />
          </div>
        </div>

        <div className="rounded-3xl border border-bleu/10 bg-papier/80 p-2 backdrop-blur-sm min-[480px]:p-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.id}
              className="group rounded-2xl open:bg-papier open:shadow-[0_8px_24px_rgba(0,90,140,0.06)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-[1.02rem] font-semibold text-encre transition-colors marker:content-none hover:text-bleu [&::-webkit-details-marker]:hidden min-[480px]:px-5">
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bleu/10 font-mono text-lg text-bleu transition-transform duration-[250ms] ease-yuna group-open:rotate-45 group-open:bg-feu group-open:text-papier motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <div className="px-4 pb-5 text-[0.95rem] leading-relaxed text-charbon min-[480px]:px-5">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="mt-12 min-[960px]:hidden">
        <Newsletter />
      </div>
    </SectionShell>
  );
}
