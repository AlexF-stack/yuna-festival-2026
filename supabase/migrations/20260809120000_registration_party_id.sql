-- Groupe multi-pass : même party_id pour tous les pass d'une inscription famille.

alter table public.registrations
  add column if not exists party_id uuid;

comment on column public.registrations.party_id is
  'UUID partagé quand plusieurs pass sont créés ensemble (inscription groupe).';

create index if not exists registrations_party_id_idx
  on public.registrations (party_id)
  where party_id is not null;
