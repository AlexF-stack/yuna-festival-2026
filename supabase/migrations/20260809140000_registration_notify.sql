-- Statut d'envoi confirmation (WhatsApp / SMS) — découplé de l'inscription HTTP.
alter table public.registrations
  add column if not exists notify_status text,
  add column if not exists notify_channel text,
  add column if not exists notified_at timestamptz,
  add column if not exists notify_error text;

comment on column public.registrations.notify_status is
  'pending | sent | failed | skipped';
comment on column public.registrations.notify_channel is
  'whatsapp | sms | none';
