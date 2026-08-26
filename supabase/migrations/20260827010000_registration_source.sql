-- Attribution des inscriptions : d'où vient la personne (campagne email, WhatsApp, réseaux…)
alter table public.registrations
  add column if not exists source text;

comment on column public.registrations.source is
  'Canal d''acquisition normalisé, dérivé des paramètres UTM ou du référent. Ex. "email/brevo/vague-01", "whatsapp", "instagram", "direct". Null pour les inscriptions antérieures au traçage.';

create index if not exists registrations_source_idx
  on public.registrations (source)
  where source is not null;
