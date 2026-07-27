-- is_revealed + artist_id schedule
alter table public.artists
  add column if not exists is_revealed boolean not null default false;

comment on column public.artists.is_revealed is
  'Si false, le site n''affiche ni nom ni bio — traitement Artiste surprise.';

alter table public.schedule
  add column if not exists artist_id uuid references public.artists(id) on delete set null;

create index if not exists schedule_artist_id_idx on public.schedule (artist_id);

comment on column public.schedule.artist_id is
  'Artiste line-up lié (nullable). Si non révélé, n''afficher que le type de moment.';
