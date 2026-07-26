-- registrations : inscriptions pass QR (entrée libre)

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  created_at timestamptz not null default now(),
  qr_code text not null,
  constraint registrations_name_len check (char_length(trim(name)) >= 2),
  constraint registrations_phone_len check (char_length(trim(phone)) >= 8)
);

comment on table public.registrations is 'Inscriptions festival — pass QR à présenter à l''entrée.';
comment on column public.registrations.qr_code is 'Data URL PNG du QR (encode l''id inscription).';

-- Anti-doublon atomique (contrainte unique, pas de SELECT puis INSERT)
create unique index if not exists registrations_phone_key
  on public.registrations (phone);

alter table public.registrations enable row level security;

-- Pas d'accès public direct : lectures/écritures via service_role (API Next.js)
-- (service_role bypass RLS ; aucune policy anon = refus Data API publique)
