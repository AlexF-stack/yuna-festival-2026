import {
  ANNOUNCED_ARTISTS,
  LINEUP_FULLY_REVEALED,
  canonicalArtistName,
  portraitForArtist,
} from "@/lib/artists-announced";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { toPublicArtist, type Artist, type PublicArtist } from "@/types/artist";

function announcedAsArtists(): Artist[] {
  return ANNOUNCED_ARTISTS.map((a, i) => ({
    id: `announced-${i + 1}`,
    name: a.name,
    role: a.role,
    is_headliner: a.is_headliner,
    is_revealed: true,
    order: a.order,
    bio_short: a.bio_short,
    portrait_url: a.portrait_url,
  }));
}

function mergePortraits(rows: Artist[]): Artist[] {
  return rows.map((row) => {
    const portrait =
      row.portrait_url ||
      (row.is_revealed ? portraitForArtist(row.name) : null);
    const name = row.is_revealed
      ? canonicalArtistName(row.name)
      : row.name;
    return { ...row, name, portrait_url: portrait };
  });
}

function ensureAnnounced(rows: Artist[]): Artist[] {
  const byCanonical = new Map(
    rows.map((r) => [canonicalArtistName(r.name).toLowerCase(), r]),
  );

  const merged = [...rows];
  for (const announced of announcedAsArtists()) {
    const key = announced.name.toLowerCase();
    const existing = byCanonical.get(key);
    if (!existing) {
      merged.push(announced);
      continue;
    }
    existing.is_revealed = true;
    existing.portrait_url =
      existing.portrait_url || announced.portrait_url;
    if (!existing.bio_short) existing.bio_short = announced.bio_short;
    if (!existing.role || existing.role === "Artiste") {
      existing.role = announced.role;
    }
    existing.name = announced.name;
  }

  return merged.sort((a, b) => a.order - b.order);
}

/** Line-up complet : masquer les placeholders mystère encore en base. */
function finalizeArtists(rows: Artist[]): Artist[] {
  const ensured = ensureAnnounced(rows);
  if (!LINEUP_FULLY_REVEALED) return ensured;
  return ensured.filter((a) => a.is_revealed && Boolean(a.name?.trim()));
}

export async function getArtists(): Promise<PublicArtist[]> {
  if (!hasSupabaseEnv()) {
    console.warn(
      "[artists] Supabase non configuré — line-up annoncé local.",
    );
    return announcedAsArtists().map(toPublicArtist);
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("artists")
    .select(
      "id, name, role, is_headliner, is_revealed, order, bio_short, portrait_url",
    )
    .order("order", { ascending: true });

  if (error) {
    // Colonne portrait_url absente tant que la migration n'est pas appliquée.
    if (error.message.toLowerCase().includes("portrait_url")) {
      const fallback = await supabase
        .from("artists")
        .select("id, name, role, is_headliner, is_revealed, order, bio_short")
        .order("order", { ascending: true });
      if (fallback.error) {
        throw new Error(
          `Impossible de charger les artistes: ${fallback.error.message}`,
        );
      }
      const rows = mergePortraits(
        ((fallback.data ?? []) as Omit<Artist, "portrait_url">[]).map(
          (row) => ({ ...row, portrait_url: null }),
        ),
      );
      return finalizeArtists(rows).map(toPublicArtist);
    }
    throw new Error(`Impossible de charger les artistes: ${error.message}`);
  }

  const rows = mergePortraits((data ?? []) as Artist[]);
  return finalizeArtists(rows).map(toPublicArtist);
}

export async function getArtistsCount(): Promise<number> {
  if (!hasSupabaseEnv()) return ANNOUNCED_ARTISTS.length;
  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from("artists")
    .select("id", { count: "exact", head: true });
  if (error) return ANNOUNCED_ARTISTS.length;
  return count ?? 0;
}
