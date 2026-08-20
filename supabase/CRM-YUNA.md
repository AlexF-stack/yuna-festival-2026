# CRM YUNA Festival 2026

Base Supabase dédiée au **pilotage** (inscriptions, scans, équipe, partenaires).
Le site public `yuna-festival-2026` reste séparé ; il synchronise ici via service role.

## Projet Supabase

1. Dans le dashboard Supabase → **Project Settings → General → Project name**
2. Renommer `crm-majesty-se` → **`yuna-festival-crm`**

Ref projet actuel : `rroyxwiyyaexrvqijwnu`

## Tables

| Table | Rôle |
| --- | --- |
| `inscriptions` | Pass / masterclass / bénévoles (sync site) — colonnes `bus_wanted`, `bus_location` |
| `scans` | Journal des scans entrée |
| `equipe` | Staff admin / scan / accueil |
| `partenaires` | Sponsors |
| `newsletter` | Abonnés |
| `reglages` | Config festival (JSON) |

RLS activé sur toutes les tables, **aucune policy anon** : accès Dashboard + `service_role` uniquement.

## Env site festival (Vercel)

```
YUNA_CRM_SUPABASE_URL=https://rroyxwiyyaexrvqijwnu.supabase.co
YUNA_CRM_SERVICE_ROLE_KEY=...
YUNA_STAFF_SECRET=...
```

## Sync

- Inscription site → upsert `inscriptions` (y compris demande bus + position)
- Check-in `/staff/scan` → update `inscriptions` + insert `scans`

Migration CRM bus : `supabase/crm-migrations/20260820200000_inscriptions_bus.sql`
