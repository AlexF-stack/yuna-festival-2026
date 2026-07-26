/**
 * Contenu éditorial absorbé / adapté de yunafestival.com
 * (mission, pôles, ton) — dates & lieu restent ceux de l’édition 2026 Midombo.
 */

export const MISSION = {
  eyebrow: "La mission",
  title: "Un festival, une génération en feu",
  lead:
    "Que tu viennes seul, en famille ou entre amis, prépare-toi à vivre un festival qui célèbre la foi, les talents et l’amour de Dieu — dans une ambiance fraternelle et joyeuse.",
  body:
    "Organisé dans l’esprit de La Cité des Jeunes, YUNA est bien plus qu’un événement : c’est un mouvement. À travers des concerts, des ateliers et des enseignements, nous célébrons une foi vivante et affirmons qu’on peut impacter le monde en suivant Christ.",
  highlight:
    "Éveiller des vocations, rallumer des flammes, et rappeler à toute une génération qu’elle a été choisie pour impacter le monde avec amour, vérité et audace.",
  subtitle: "Le RDV de toute une génération chrétienne",
  ctaLabel: "Je réserve ma place",
  ctaHref: "#inscription",
} as const;

export const POLES = [
  {
    id: "gospel",
    title: "Gospel & adoration",
    description:
      "Louanges, concerts et temps d’adoration — la flamme au centre de chaque soirée.",
    accent: "feu" as const,
  },
  {
    id: "art",
    title: "Art & créativité",
    description:
      "Expositions, performances et rencontres pour faire rayonner les talents de la génération.",
    accent: "bleu" as const,
  },
  {
    id: "danse",
    title: "Danse & scène",
    description:
      "Spectacles, énergie du corps et moments forts qui font vibrer Midombo.",
    accent: "feu" as const,
  },
  {
    id: "formation",
    title: "Masterclass",
    description:
      "VTeam (musiciens & chantres) et Entrepreneuriat — exceller sans quitter le Royaume.",
    accent: "bleu" as const,
  },
] as const;

export const DONATE = {
  label: "Faire un don",
  href: "mailto:contact@yunafestival.org?subject=Don%20YUNA%20Festival%202026",
  blurb: "Soutiens le mouvement — chaque contribution allume une flamme de plus.",
} as const;
