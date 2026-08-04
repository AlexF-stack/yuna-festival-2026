import { ProductCard } from "@/components/sections/ProductCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { getProducts } from "@/lib/products";
import { getPreorderMailto } from "@/lib/site";

export async function Boutique() {
  const products = await getProducts();
  const preorderHref = getPreorderMailto();

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
          description="Tee-shirts LED YUNA — de la flamme toujours allumée à la matrice pilotée depuis ton téléphone."
        />
        <ButtonLink
          href={preorderHref}
          className="shrink-0 self-start min-[900px]:self-auto"
        >
          Pré-commander
        </ButtonLink>
      </div>

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
