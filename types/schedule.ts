export type ScheduleDay = 1 | 2;

export type ScheduleItem = {
  id: string;
  day: ScheduleDay;
  time: string;
  /** Titre affiché (générique si artiste non révélé). */
  title: string;
  description: string | null;
  order: number;
  artist_id: string | null;
  /** Nom uniquement si artiste lié ET is_revealed. */
  artist_name: string | null;
  artist_revealed: boolean;
};
