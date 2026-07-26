"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ProductVisual } from "@/components/sections/ProductVisual";
import type { Product } from "@/types/product";
import { formatPriceFcfa } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

const TAG_TONE: Record<Product["tag_variant"], string> = {
  led: "text-feu",
  sound: "text-bleu",
  pro: "text-vert",
};

export function ProductCard({ product }: ProductCardProps) {
  const reduceMotion = useReducedMotion();
  const visualDark = product.visual_key === "programmable";

  return (
    <motion.article
      whileHover={
        reduceMotion
          ? undefined
          : { y: -6, transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] } }
      }
      className={`overflow-hidden rounded-3xl border bg-papier shadow-[0_14px_40px_rgba(0,90,140,0.07)] ${
        product.is_featured
          ? "border-feu/40 ring-2 ring-feu/20"
          : "border-bleu/10"
      }`}
    >
      {product.flag_label ? (
        <p className="bg-feu px-4 py-2 text-center font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-papier">
          {product.flag_label}
        </p>
      ) : null}

      <div
        className={
          visualDark
            ? "flex justify-center bg-[radial-gradient(ellipse_at_50%_45%,var(--tee-visual-dark-mid),var(--tee-visual-dark-deep)_75%)] p-6"
            : "flex justify-center bg-[radial-gradient(ellipse_at_50%_45%,var(--tee-visual-mid),var(--tee-visual-deep)_75%)] p-6"
        }
      >
        <ProductVisual visualKey={product.visual_key} titleId={product.slug} />
      </div>

      <div className="border-t border-bleu/8 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.3rem] font-extrabold uppercase leading-tight text-bleu">
            {product.name}
          </h3>
          <p className="shrink-0 text-right">
            <span className="block text-[0.65rem] uppercase tracking-[0.12em] text-charbon">
              Dès
            </span>
            <span className="font-mono text-base font-bold text-feu">
              {formatPriceFcfa(product.price_fcfa)}
            </span>
          </p>
        </div>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-charbon">
          {product.description}
        </p>
        <p
          className={`mt-4 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] ${TAG_TONE[product.tag_variant]}`}
        >
          {product.tag_label}
        </p>
      </div>
    </motion.article>
  );
}
