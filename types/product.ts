export type ProductTagVariant = "led" | "sound" | "pro";
export type ProductVisualKey = "basic" | "sound" | "programmable";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_fcfa: number;
  tag_label: string;
  tag_variant: ProductTagVariant;
  is_featured: boolean;
  flag_label: string | null;
  visual_key: ProductVisualKey;
  order: number;
};

export function formatPriceFcfa(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} F`;
}
