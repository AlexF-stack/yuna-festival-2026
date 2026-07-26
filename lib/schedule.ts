import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { ScheduleItem } from "@/types/schedule";

export async function getSchedule(): Promise<ScheduleItem[]> {
  if (!hasSupabaseEnv()) {
    console.warn(
      "[schedule] Supabase non configuré — programme vide. Appliquer migrations + seed_schedule.sql.",
    );
    return [];
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("schedule")
    .select("id, day, time, title, description, order")
    .order("day", { ascending: true })
    .order("order", { ascending: true });

  if (error) {
    throw new Error(`Impossible de charger le programme: ${error.message}`);
  }

  return (data ?? []) as ScheduleItem[];
}
