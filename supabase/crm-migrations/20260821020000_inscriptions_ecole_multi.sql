-- À exécuter sur le projet Supabase CRM (rroyxwiyyaexrvqijwnu).
-- 1) Autoriser ecole_royale dans type_pass
-- 2) Lever l'unicité téléphone seule : une personne peut avoir plusieurs types
--    (pass + école + masterclass) → unique (telephone, type_pass)

alter table public.inscriptions
  drop constraint if exists inscriptions_type_pass_check;

alter table public.inscriptions
  add constraint inscriptions_type_pass_check
  check (
    type_pass in (
      'pass',
      'masterclass_vteam',
      'masterclass_entrepreneuriat',
      'benevole',
      'ecole_royale'
    )
  );

alter table public.inscriptions
  drop constraint if exists inscriptions_telephone_key;

-- Index unique composé (si une contrainte unique du même nom existait déjà, on la recrée)
drop index if exists public.inscriptions_telephone_key;

create unique index if not exists inscriptions_telephone_type_uidx
  on public.inscriptions (telephone, type_pass);

comment on constraint inscriptions_type_pass_check on public.inscriptions is
  'Types alignés site festival (dont ecole_royale).';
