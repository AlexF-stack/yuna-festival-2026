-- École royale : nouvelle catégorie (à exécuter sur yuna-festival-2026 si pas encore fait)
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
      'ecole_royale'
    )
  );
