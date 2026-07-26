import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  if (!hasSupabaseEnv()) {
    console.warn(
      "[products] Supabase non configuré — boutique vide. Appliquer migrations + seed_products.sql.",
    );
    return [];
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, description, price_fcfa, tag_label, tag_variant, is_featured, flag_label, visual_key, order",
    )
    .order("order", { ascending: true });

  if (error) {
    throw new Error(`Impossible de charger les produits: ${error.message}`);
  }

  return (data ?? []) as Product[];
}
