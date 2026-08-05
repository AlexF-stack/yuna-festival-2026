---
name: yuna-festival-delivery
description: >-
  YUNA Festival 2026 delivery & ops (Next.js 15 + Supabase + Vercel): public site,
  /staff/scan, /staff/crm, health-check, secrets, CRM await sync, mobile staff UI,
  Vercel toolbar off, client PDF handover, DNS domain, announced lineup vs DB.
  Use for prod handoff, E2E, push/deploy, scan/CRM responsive, or day-of checklist.
  Bilingual EN/FR — reply in the user's language. Triggers: remise, delivery,
  « tout fonctionnel », ready for prod, staff tools, yunafestival.com DNS.
---

# YUNA Festival — delivery & ops / livraison & ops

Complements `yuna-design-system` (UI/copy) and `yuna-backend` (schema/API).

## Language / Langue

| Rule | Detail |
|------|--------|
| **Agent replies** | Match the user: **FR** or **EN**. If mixed, prefer the latest user message language. |
| **Site UI copy** | Public site supports **FR \| EN** via cookie `yuna-locale` + `LanguageSwitcher` in header. Dictionaries: `lib/i18n/messages/{fr,en}.ts`. Staff tools stay **French**. |
| **Staff UI** | French labels (Scan, CRM, Secret staff) — keep FR for door staff in Cotonou. |
| **Code / commits** | Identifiers in English; commit messages FR (project habit) or EN if user writes in EN. |
| **This skill** | Bilingual where it matters; shell commands stay English. |

Never commit `.env*`, `.staff-secret.local`, `.crm-api-key.local`.

## Architecture — 3 surfaces

| Surface | URL | Auth |
|---------|-----|------|
| Public site / Site public | `/` (+ pages) | none |
| Door scan / Scan porte | `/staff/scan` | header `x-yuna-staff` = `YUNA_STAFF_SECRET` |
| CRM listing | `/staff/crm` | `x-api-key` = `YUNA_CRM_API_KEY` **or** same staff secret |

**Supabase:** site `yargdalaivcqmnwppcmi` · CRM `rroyxwiyyaexrvqijwnu`  
**Host:** Vercel `yuna-festival-2026` · `https://yuna-festival-2026.vercel.app`

```
Public → POST /api/register → QR /confirmation/[id]
Staff  → POST /api/staff/unlock → POST /api/check-in
CRM    → GET  /api/crm/registrations
Health → GET  /api/health
```

## Chrome & mobile (required / non négociable)

1. **`AppChrome`**: on `/staff/*` → `StaffNav` only (no SiteHeader / Footer / RegisterFloat).
2. **`Loader`**: disabled on `/staff/*` (otherwise blocks door tools).
3. **CRM**: cards `< md`, table `md:block`; inputs `text-base` / `min-h-11`.
4. **Scan**: safe-area, bounded camera box, full-width mobile buttons.
5. **Viewport**: `viewportFit: "cover"` + `env(safe-area-inset-*)`.

## Line-up / programme content

- Minute-by-minute programme: **do not show** on `/artistes` until approved (`<Programme />` removed).
- Announced total: `LINEUP_TOTAL = 13` in `lib/festival.ts` (matches `EVENT_STATS`).
- Display: `totalCount = Math.max(artists.length, LINEUP_TOTAL)`; mystery = `totalCount - revealed`.
- **Do not invent** artist names in DB to reach 13 → pad UI only.

## Secrets & env

| Variable | Role / Rôle |
|----------|-------------|
| `YUNA_STAFF_SECRET` | unlock + check-in (+ CRM fallback) |
| `YUNA_CRM_API_KEY` | CRM API |
| `YUNA_CRM_SUPABASE_URL` + `YUNA_CRM_SERVICE_ROLE_KEY` | CRM sync |
| `KV_REST_API_*` or `UPSTASH_*` | Redis rate-limit |
| `NEXT_PUBLIC_SITE_URL` | absolute URLs |

Gitignored locals: `.staff-secret.local`, `.crm-api-key.local`.  
**Trap:** `vercel env pull` may wipe local secrets to `""`.

CRM sync: always **`await`** (never `after()` alone on serverless).

## Delivery workflow / Workflow livraison

```
1. Fix code
2. npx tsc --noEmit
3. Commit + git push origin HEAD
4. npx vercel --prod --yes
5. Smoke (below)
```

### Required smoke

```bash
BASE=https://yuna-festival-2026.vercel.app
curl -s $BASE/api/health
# checks.ok + siteDb, crmDb, crmApiKey, staffSecret, rateLimitRedis, siteUrl = true

curl -s -X POST $BASE/api/staff/unlock -H "x-yuna-staff: $SECRET"
# → 200 {"ok":true}

# Pages 200: /, /artistes, /staff/scan, /staff/crm
```

E2E: register → CRM sync → unlock → check-in → re-scan (already in) → recover pass.

## Vercel Toolbar (not site nav)

The Vercel triangle is **not** the app nav. Do not rebrand it → **disable**:

```bash
npx vercel api "/v9/projects/{PROJECT_ID}?teamId={TEAM_ID}" -X PATCH \
  -F "enableProductionFeedback=false" -F "enablePreviewFeedback=false"

npx vercel api "/v2/teams/{TEAM_ID}" -X PATCH \
  -F "enableProductionFeedback=off" -F "enablePreviewFeedback=off"
```

Disable **all** team projects + team setting. Open session: Ctrl+F5 or ✕.

## Domain `.com`

Adding on Vercel ≠ live. If LiteSpeed / dns-parking:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Until then: share `*.vercel.app`.

## Client PDF handover / Remise PDF

1. Markdown `LIVRAISON-CLIENT-YUNA.md` (links, staff secret, flows, DNS) — FR for local client; EN summary on request.
2. If `md-to-pdf` / puppeteer fails (Windows) → Edge headless:

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="LIVRAISON-CLIENT-YUNA.pdf" `
  "file:///C:/Users/.../LIVRAISON-CLIENT-YUNA.html"
```

3. Copy to Desktop if asked.

## Priority files

```
components/ui/AppChrome.tsx
components/staff/StaffNav.tsx | StaffScanClient.tsx | StaffCrmClient.tsx
components/Loader.tsx
app/api/health/route.ts | staff/unlock | check-in | crm/registrations | register
lib/festival.ts (LINEUP_TOTAL, EVENT_STATS) | lib/crm.ts | lib/rate-limit.ts
app/artistes/page.tsx
```

## Anti-patterns

- CRM table-only on mobile
- Global loader on `/staff`
- Fire-and-forget CRM sync
- Toolbar off on a single project only
- Inventing seed artists for the counter
- Committing secrets / e2e dumps
- Assuming `.com` is Vercel without `x-vercel-id` vs LiteSpeed

## References

- Day-of checklist: [references/checklist.md](references/checklist.md)
- Design / copy: skill `yuna-design-system`
- Schema / API: skill `yuna-backend`
