-- Navettes bus festival : intérêt + point de prise en charge
alter table public.registrations
  add column if not exists bus_wanted boolean not null default false;

alter table public.registrations
  add column if not exists bus_location text;

comment on column public.registrations.bus_wanted is
  'true si l''inscrit demande une place dans un bus mis à disposition.';
comment on column public.registrations.bus_location is
  'Quartier / zone / point de départ pour la navette (si bus_wanted).';

create index if not exists registrations_bus_wanted_idx
  on public.registrations (bus_wanted)
  where bus_wanted = true;
