# Design system — YUNA Festival 2026 « Bénin Debout »

Source de vérité couleurs : **logo officiel** (`public/brand/yuna-logo.png`) —
voir aussi `.cursor/skills/yuna-design-system` (patterns UI / contenu) et
`.cursor/skills/yuna-backend` (inscription / QR). La palette nuit du skill
historique est **remplacée** par les tokens logo ci-dessous.

Toute couleur / police dans un composant passe par ces tokens, jamais en dur.

## Palette (logo + énergie festival)

Ancrage logo (`bleu` / flamme) + chaleur type festival gospel AO (jaune
électrique, orange saturé, papier tiède) — sans copier Effuzion pixel pour pixel.

| Token | Hex | Usage |
| --- | --- | --- |
| `bleu` | `#0077BB` | Marque — titres, liens, sections bleues |
| `bleu-fonce` | `#005A8C` | Hover / sections fortes |
| `feu` | `#FF4D00` | CTA primaires, urgence, flamme |
| `braise` | `#D93F00` | Hover CTA |
| `charbon` | `#4A3C34` | Texte secondaire (brun chaud) |
| `encre` | `#17110E` | Texte principal (noir chaud) |
| `papier` | `#FFF8F1` | Fond principal tiède |
| `nuage` | lavage feu sur papier | Sections alternées chaudes |
| `ciel` | lavage bleu sur papier | Highlights bleus doux |
| `vert` | `#00A35C` | Accents positifs + liseré Bénin |
| `jaune` | `#FFD400` | CTA secondaires, barre urgence, liseré |
| `rouge` | `#E8112D` | Tricolore Bénin (liseré) |

Le tricolore reste un liseré discret (nav, footer) ; le jaune sert aussi d’accent festival.

## Typographie

| Rôle | Famille | Poids | Classes |
| --- | --- | --- | --- |
| Display (YUNA, titres) | **Baloo 2** | 700 / 800 | `font-display` |
| Corps | **Space Grotesk** | 400 / 500 / 700 | `font-sans` |
| Technique | **JetBrains Mono** | 700 | `font-mono` |

### Tons des grands titres (`SectionHeading`)

Alterner `tone` : `bleu` (marque) · `feu` (énergie) · `encre` (gravité).  
Option `accentLast` : dernier mot en couleur opposée. Sur fond coloré (`variant="light"`), rester en `papier`.

## Direction visuelle

Sites de référence (Bénin) : **FINAB**, festivals culturels institutionnels —
fonds clairs, marque forte, beaucoup d’air, CTA orange, accent bleu.

## Motion & accessibilité

- Fade-in scroll : max 700–900 ms, easing `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Toujours respecter `prefers-reduced-motion: reduce`.
- `:focus-visible` : outline `bleu`, offset 3px.
- Mobile-first : valider à **375px**.
