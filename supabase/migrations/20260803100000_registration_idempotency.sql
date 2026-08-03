-- Idempotence formulaire + unicité personne/catégorie (skill yuna-backend)

alter table public.registrations
  add column if not exists idempotency_key text;

-- Backfill pour les lignes existantes
update public.registrations
set idempotency_key = id::text
where idempotency_key is null;

alter table public.registrations
  alter column idempotency_key set not null;

create unique index if not exists registrations_idempotency_key_key
  on public.registrations (idempotency_key);

-- Un même téléphone peut s'inscrire à plusieurs catégories,
-- mais une seule fois par catégorie.
drop index if exists public.registrations_phone_key;

create unique index if not exists uniq_registration_person
  on public.registrations (phone, registration_type);

comment on column public.registrations.idempotency_key is
  'Clé client (UUID) — double clic / retry renvoie la même inscription.';
