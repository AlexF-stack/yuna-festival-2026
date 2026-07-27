import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { toPublicArtist, type Artist, type PublicArtist } from "@/types/artist";

export async function getArtists(): Promise<PublicArtist[]> {
  if (!hasSupabaseEnv()) {
    console.warn(
      "[artists] Supabase non configuré — retour d'un line-up vide.",
    );
    return [];
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("artists")
    .select("id, name, role, is_headliner, is_revealed, order, bio_short")
    .order("order", { ascending: true });

  if (error) {
    throw new Error(`Impossible de charger les artistes: ${error.message}`);
  }

  return ((data ?? []) as Artist[]).map(toPublicArtist);
}

export async function getArtistsCount(): Promise<number> {
  if (!hasSupabaseEnv()) return 0;
  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from("artists")
    .select("id", { count: "exact", head: true });
  if (error) return 0;
  return count ?? 0;
}
