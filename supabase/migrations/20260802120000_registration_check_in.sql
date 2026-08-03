-- Check-in porte — scan QR staff (pas d’espace admin site)
-- Le listing reste dans le CRM / Supabase ; le site ne fait que valider l’entrée.

alter table public.registrations
  add column if not exists checked_in_at timestamptz,
  add column if not exists checked_in_by text;

comment on column public.registrations.checked_in_at is 'Premier scan réussi à l’entrée (anti-rejeu).';
comment on column public.registrations.checked_in_by is 'Identifiant staff / appareil ayant scanné.';

create index if not exists registrations_checked_in_at_idx
  on public.registrations (checked_in_at);
