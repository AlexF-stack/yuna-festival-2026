-- À exécuter sur le projet Supabase CRM (inscriptions).
-- Navettes bus synchronisées depuis le site.

alter table public.inscriptions
  add column if not exists bus_wanted boolean not null default false;

alter table public.inscriptions
  add column if not exists bus_location text;

comment on column public.inscriptions.bus_wanted is
  'Demande de bus (sync site).';
comment on column public.inscriptions.bus_location is
  'Position / quartier pour la navette.';

create index if not exists inscriptions_bus_wanted_idx
  on public.inscriptions (bus_wanted)
  where bus_wanted = true;
