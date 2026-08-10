import { ProductCard } from "@/components/sections/ProductCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { getBoutiqueCheckoutHref } from "@/lib/site";
import { getProducts } from "@/lib/products";
import { PREORDER_DEADLINE_ISO } from "@/lib/urgency";

export async function Boutique() {
  const products = await getProducts();
  const checkoutHref = getBoutiqueCheckoutHref();
  const deadline = new Date(PREORDER_DEADLINE_ISO).toLocaleDateString("fr-BJ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SectionShell
      id="boutique"
      labelledBy="boutique-title"
      tone="bleu-soft"
      background="boutique"
    >
      <div className="flex flex-col gap-8 min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between">
        <SectionHeading
          eyebrow="Boutique officielle"
          title="Porte le feu"
          titleId="boutique-title"
          description={`Tee-shirts LED YUNA — précommande jusqu’au ${deadline}. Retrait sur le site du festival (Midombo).`}
          tone="feu"
          accentLast
        />
        <ButtonLink
          href={checkoutHref}
          className="shrink-0 self-start min-[900px]:self-auto"
        >
          Pré-commander
        </ButtonLink>
      </div>

      <p className="mt-6 max-w-2xl rounded-2xl border border-feu/25 bg-papier/80 px-4 py-3 text-sm text-charbon">
        Précommande ouverte jusqu’au <strong>{deadline}</strong>. Retrait sur le
        site à Midombo — livraison Cotonou sur demande après confirmation.
        {checkoutHref.startsWith("mailto:") ? (
          <>
            {" "}
            <span className="font-semibold text-encre">
              Paiement non instantané :
            </span>{" "}
            le bouton ouvre un e-mail de précommande ; l’équipe confirme stock et
            Mobile Money / virement.
          </>
        ) : (
          <> Checkout sécurisé FedaPay.</>
        )}
      </p>

      {products.length === 0 ? (
        <p className="mt-14 text-charbon">Boutique bientôt disponible.</p>
      ) : (
        <div className="mx-auto mt-12 grid max-w-[420px] grid-cols-1 gap-6 min-[880px]:max-w-none min-[880px]:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </SectionShell>
  );
}
