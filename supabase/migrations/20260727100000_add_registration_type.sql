-- Type d'inscription (pass, masterclass, bénévole)
alter table public.registrations
  add column if not exists registration_type text not null default 'pass';

alter table public.registrations
  drop constraint if exists registrations_type_check;

alter table public.registrations
  add constraint registrations_type_check
  check (
    registration_type in (
      'pass',
      'masterclass_vteam',
      'masterclass_entrepreneuriat',
      'benevole'
    )
  );

comment on column public.registrations.registration_type is
  'pass | masterclass_vteam | masterclass_entrepreneuriat | benevole';
