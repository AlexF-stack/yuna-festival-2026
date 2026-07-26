export type ScheduleDay = 1 | 2;

export type ScheduleItem = {
  id: string;
  day: ScheduleDay;
  time: string;
  title: string;
  description: string | null;
  order: number;
};
