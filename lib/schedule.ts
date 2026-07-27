import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { ScheduleItem } from "@/types/schedule";

type ScheduleRow = {
  id: string;
  day: number;
  time: string;
  title: string;
  description: string | null;
  order: number;
  artist_id: string | null;
  artists: {
    name: string;
    is_revealed: boolean;
  } | null;
};

/**
 * Programme public : artiste lié + non révélé → type de moment seulement.
 * Créneaux sans artist_id : titre inchangé.
 */
export async function getSchedule(): Promise<ScheduleItem[]> {
  if (!hasSupabaseEnv()) {
    console.warn("[schedule] Supabase non configuré — programme vide.");
    return [];
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("schedule")
    .select(
      "id, day, time, title, description, order, artist_id, artists(name, is_revealed)",
    )
    .order("day", { ascending: true })
    .order("order", { ascending: true });

  if (error) {
    throw new Error(`Impossible de charger le programme: ${error.message}`);
  }

  return ((data ?? []) as unknown as ScheduleRow[]).map((row) => {
    const linked = Boolean(row.artist_id && row.artists);
    const revealed = linked && row.artists!.is_revealed;

    if (linked && revealed) {
      return {
        id: row.id,
        day: row.day as 1 | 2,
        time: row.time,
        title: `${row.artists!.name} — ${row.title}`,
        description: row.description,
        order: row.order,
        artist_id: row.artist_id,
        artist_name: row.artists!.name,
        artist_revealed: true,
      };
    }

    // Non lié, ou lié mais non révélé : jamais le nom
    return {
      id: row.id,
      day: row.day as 1 | 2,
      time: row.time,
      title: row.title,
      description: row.description,
      order: row.order,
      artist_id: row.artist_id,
      artist_name: null,
      artist_revealed: false,
    };
  });
}
