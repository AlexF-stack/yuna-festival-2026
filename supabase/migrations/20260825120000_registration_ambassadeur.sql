-- Ambassadeur : type d'inscription public (remplace bénévole à l'ouverture)
alter table public.registrations
  drop constraint if exists registrations_type_check;

alter table public.registrations
  add constraint registrations_type_check
  check (
    registration_type in (
      'pass',
      'masterclass_vteam',
      'masterclass_entrepreneuriat',
      'benevole',
      'ambassadeur',
      'ecole_royale'
    )
  );

comment on constraint registrations_type_check on public.registrations is
  'Types de pass : festival, masterclass, école royale, ambassadeur (+ benevole legacy).';
