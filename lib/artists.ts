import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { Artist } from "@/types/artist";

export async function getArtists(): Promise<Artist[]> {
  if (!hasSupabaseEnv()) {
    console.warn(
      "[artists] Supabase non configuré — retour d'un line-up vide. Renseigner .env.local puis appliquer supabase/migrations + seed.sql.",
    );
    return [];
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("artists")
    .select("id, name, role, is_headliner, order, bio_short")
    .order("order", { ascending: true });

  if (error) {
    throw new Error(`Impossible de charger les artistes: ${error.message}`);
  }

  return data ?? [];
}
