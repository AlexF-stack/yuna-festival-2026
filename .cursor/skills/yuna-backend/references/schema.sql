-- Schéma de référence — YUNA Festival 2026
-- Postgres (Supabase). Conçu pour : zéro doublon, traitement asynchrone, idempotence.

create extension if not exists "uuid-ossp";

-- Inscriptions
create table if not exists registrations (
  id uuid primary key default uuid_generate_v4(),
  idempotency_key text not null unique,     -- généré côté client au chargement du formulaire
  full_name text not null,
  phone text not null,
  email text,
  city text,
  category text not null check (category in (
    'FESTIVAL', 'MASTERCLASS_VTEAM', 'MASTERCLASS_ENTREPRENEURIAT', 'BENEVOLE'
  )),
  preferred_channel text not null default 'both' check (preferred_channel in ('email','whatsapp','both')),
  qr_token text not null unique,             -- token opaque encodé dans le QR, pas de données perso dedans
  qr_status text not null default 'valid' check (qr_status in ('valid','used','revoked')),
  email_status text not null default 'pending' check (email_status in ('pending','sent','failed','skipped')),
  whatsapp_status text not null default 'pending' check (whatsapp_status in ('pending','sent','failed','skipped')),
  checked_in_at timestamptz,
  created_at timestamptz not null default now()
);

-- Contrainte d'unicité sur la vraie personne (déduplication) :
-- un même téléphone ne peut s'inscrire deux fois dans la même catégorie.
create unique index if not exists uniq_registration_person
  on registrations (phone, category);

-- File d'attente de traitement (découplée de la requête HTTP d'inscription)
create table if not exists registration_jobs (
  id uuid primary key default uuid_generate_v4(),
  registration_id uuid not null references registrations(id) on delete cascade,
  job_type text not null check (job_type in ('generate_qr','send_email','send_whatsapp')),
  status text not null default 'queued' check (status in ('queued','processing','done','failed')),
  attempts int not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Base des 9 000 contacts existants (pour la campagne de masse)
create table if not exists contacts (
  id uuid primary key default uuid_generate_v4(),
  full_name text,
  phone text unique,
  email text,
  opted_in boolean not null default true,
  source text default 'edition_precedente',
  created_at timestamptz not null default now()
);

-- Campagnes de communication de masse
create table if not exists campaigns (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  channel text not null check (channel in ('email','whatsapp','both')),
  message_template text not null,
  status text not null default 'draft' check (status in ('draft','sending','done','failed')),
  created_at timestamptz not null default now()
);

create table if not exists campaign_sends (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  contact_id uuid not null references contacts(id) on delete cascade,
  channel text not null check (channel in ('email','whatsapp')),
  status text not null default 'queued' check (status in ('queued','sent','failed')),
  error text,
  sent_at timestamptz
);

-- Admins (auth simple — voir SKILL.md pour la recommandation d'implémentation)
create table if not exists admins (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  created_at timestamptz not null default now()
);
