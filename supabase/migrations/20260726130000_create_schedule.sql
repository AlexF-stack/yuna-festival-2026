-- schedule : créneaux programme YUNA Festival 2026

create table if not exists public.schedule (
  id uuid primary key default gen_random_uuid(),
  day smallint not null check (day in (1, 2)),
  time text not null,
  title text not null,
  description text,
  "order" integer not null,
  created_at timestamptz not null default now(),
  constraint schedule_order_positive check ("order" >= 0)
);

comment on table public.schedule is 'Programme minute par minute — Jour 1 (sam. 5) / Jour 2 (dim. 6).';
comment on column public.schedule.day is '1 = samedi 5 sept, 2 = dimanche 6 sept.';
comment on column public.schedule."order" is 'Ordre d''affichage croissant au sein du jour.';

create index if not exists schedule_day_order_idx
  on public.schedule (day, "order");

alter table public.schedule enable row level security;

create policy "schedule_public_read"
  on public.schedule
  for select
  to anon, authenticated
  using (true);
