# Checklist — delivery & day-of / livraison & jour J — YUNA

**Language:** agent replies in **EN or FR** (match the user). Site UI copy stays **FR**.

## Before handoff / Avant remise client

- [ ] `GET /api/health` → all checks `true`
- [ ] Staff unlock `200 {"ok":true}`
- [ ] Test registration → QR confirmation page
- [ ] Row visible in `/staff/crm` (**clé CRM**, pas le secret scan)
- [ ] Check-in OK then re-scan = already checked in / « déjà entré »
- [ ] Recover pass `/mon-pass`
- [ ] `/artistes`: line-up progressif **sans** total d’artistes, **no** Programme section
- [ ] Mobile 390px: home, scan, CRM (cards)
- [ ] Favicon / StaffNav = YUNA mark (not Vercel triangle)
- [ ] Vercel Toolbar off (projects + team)
- [ ] Handover PDF on Desktop + `.vercel.app` links
- [ ] `.com` DNS documented (A/CNAME) if not yet on Vercel

## Secrets to share (never git) / Secrets à communiquer (hors git)

```
YUNA_STAFF_SECRET  → scan porte UNIQUEMENT (/staff/scan)
YUNA_CRM_API_KEY   → dump CRM (/staff/crm) — secret distinct obligatoire
```

Fichiers locaux : `.staff-secret.local`, `.crm-api-key.local`

## Smoke PowerShell

```powershell
$base = "https://yuna-festival-2026.vercel.app"
$secret = (Get-Content .staff-secret.local -Raw).Trim()

(Invoke-WebRequest "$base/api/health" -UseBasicParsing).Content
(Invoke-WebRequest "$base/api/staff/unlock" -Method POST -Headers @{ "x-yuna-staff" = $secret } -UseBasicParsing).Content

foreach ($p in "/", "/artistes", "/staff/scan", "/staff/crm") {
  $r = Invoke-WebRequest "$base$p" -UseBasicParsing
  Write-Host "$p => $($r.StatusCode)"
}
```

## Vérifier que `.com` = Vercel

```powershell
$r = Invoke-WebRequest "https://yunafestival.com" -UseBasicParsing
# Attendu : header x-vercel-id présent, contenu « YUNA Festival » / « Bénin Debout »
# LiteSpeed / title seul « yunafestival.com » = DNS pas encore pointé
```

DNS registrar :

```
A     @    76.76.21.21
CNAME www  cname.vercel-dns.com
```

## Désactiver toolbar sur toute la team

```powershell
# TEAM_ID depuis .vercel/project.json → orgId
# Lister projets puis PATCH chaque id + PATCH team enable*Feedback=off
npx vercel api "/v9/projects?teamId=$TEAM&limit=50" --raw
npx vercel api "/v2/teams/$TEAM" -X PATCH `
  -F "enableProductionFeedback=off" -F "enablePreviewFeedback=off"
```

## Deploy

```powershell
npx tsc --noEmit
git push origin HEAD
npx vercel --prod --yes
```

## IDs projet (référence)

| Ressource | ID / slug |
|-----------|-----------|
| Vercel project | `yuna-festival-2026` / `prj_wdB536I0S7YJvpDXWfbVaf9AQkNW` |
| Team | `team_cz48KA73YHr7WN5ozEWIZITp` |
| Supabase site | `yargdalaivcqmnwppcmi` |
| Supabase CRM | `rroyxwiyyaexrvqijwnu` |
