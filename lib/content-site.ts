/**
 * Contenu éditorial — source : export HTML YUNA Festival 2026 (référence complète).
 * Dates & lieu : édition 2026 Midombo.
 */

export const MISSION = {
  eyebrow: "La mission",
  title: "Un festival, une génération en feu",
  lead:
    "Que tu viennes seul, en famille ou entre amis, prépare-toi à vivre un festival qui célèbre la foi, les talents et l'amour de Dieu — dans une ambiance fraternelle et joyeuse.",
  body:
    "Organisé par La Cité des Jeunes / Global Impact Ministries, YUNA est bien plus qu'un événement : c'est un mouvement. À travers des concerts, des ateliers et des enseignements, nous célébrons une foi vivante et affirmons qu'on peut impacter le monde en suivant Christ.",
  highlight:
    "Éveiller des vocations, rallumer des flammes, et rappeler à toute une génération qu'elle a été choisie pour impacter le monde avec amour, vérité et audace.",
  subtitle: "Le RDV de toute une génération chrétienne",
  ctaLabel: "Inscris-toi",
  ctaHref: "/#inscription",
} as const;

export const VISION = {
  eyebrow: "La vision",
  titleLine1: "Une génération",
  titleLine2: "non ordinaire",
  intro:
    "YUNA — Youth United for New Awakening — porte aussi un secret : en hébreu, יוֹנָה (Yonah) signifie la colombe — le symbole du Saint-Esprit qui descend (Matthieu 3:16). La colombe et le feu : l'Esprit repose sur une génération qui se lève. Pas des spectateurs. Des Joseph, des Daniel, des David : des jeunes qui portent un esprit supérieur et qui se tiennent devant les rois.",
  pillars: [
    {
      id: "joseph",
      hebrew: "חֲלוֹם · le rêve",
      title: "Joseph",
      ref: "Genèse 41",
      text: "De la fosse au palais. Le rêveur devient gouverneur. Une jeunesse qui porte des rêves plus grands que ses circonstances — et l'excellence pour les accomplir.",
      image: "/media/vision-joseph-generated.webp",
    },
    {
      id: "daniel",
      hebrew: "רוּחַ יַתִּירָה · ruach yattirah",
      title: "Daniel",
      ref: "Daniel 6:3",
      text: "« Un esprit supérieur était en lui. » L'esprit extraordinaire. Une jeunesse intègre, excellente, qui influence les empires sans compromis.",
      image: "/media/vision-daniel-generated.webp",
    },
    {
      id: "david",
      hebrew: "מָשִׁיחַ · l'oint",
      title: "David",
      ref: "1 Samuel 16",
      text: "Oint au milieu de ses frères. Adorateur, guerrier, roi. Une jeunesse qui sert le dessein de Dieu dans sa génération — et qui règne.",
      image: "/media/vision-david-generated.webp",
    },
  ],
} as const;

export const JOURNEE = {
  eyebrow: "Samedi en journée",
  title: "Impact avant la scène",
  intro:
    "Le réveil commence par le service. Avant les projecteurs, YUNA touche la ville.",
  items: [
    {
      id: "medical",
      time: "08:00 – 13:00",
      title: "Action sociale & médicale",
      description:
        "Consultations médicales gratuites, dépistages, dons et assistance aux familles du quartier de Midombo et environs.",
    },
    {
      id: "vteam",
      time: "10:00 – 13:00",
      title: "Masterclass VTeam",
      description:
        "Pour musiciens et chantres : technique instrumentale, direction de louange, vie d'adorateur.",
    },
    {
      id: "entrepreneuriat",
      time: "15:00 – 17:00",
      title: "Masterclass Entrepreneuriat",
      description:
        "Bâtir en jeune non ordinaire : vision, excellence et royaume dans les affaires.",
      speakers: [
        "Prophète Joël Francis Tatu",
        "Prophète Johnny Doefia",
        "Prophète Dr Hervé Mama",
      ],
    },
  ],
} as const;

export const VENUE = {
  eyebrow: "Le lieu",
  title: "Terrain de Midombo",
  intro:
    "Un espace ouvert au cœur de la ville — accessible à tous, entrée libre. Le festival vient à la rencontre de la jeunesse, là où elle vit.",
  amenities: [
    "Entrée gratuite, ouverte à tous",
    "Ouverture du site à 17h00 chaque soir",
    "Espace sécurisé, sanitaires et points d'eau sur place",
    "Stands de restauration et espace prière",
    "Accès facile en zém, taxi et bus",
  ],
} as const;

export const SPONSORS = {
  eyebrow: "Partenariat",
  title: "Devenez partenaire du réveil",
  intro:
    "Associez votre marque à l'événement jeunesse de l'année au Bénin : des milliers de jeunes, deux masterclass, une action médicale et une visibilité nationale et diaspora.",
  tiers: [
    {
      id: "bronze",
      badge: "Bronze",
      price: "500 000",
      currency: "FCFA",
      perks: [
        "Logo sur le site et affiches",
        "Mention scène (2 soirs)",
        "Stand sur le site du festival",
      ],
      cta: "Choisir Bronze",
      mailSubject: "Sponsoring Bronze — YUNA 2026",
      featured: false,
    },
    {
      id: "gold",
      badge: "★ Or — Partenaire officiel",
      price: "3 000 000",
      currency: "FCFA",
      perks: [
        "Naming « présenté par » sur tous supports",
        "Logo écran géant + bannières scène",
        "Prise de parole en soirée",
        "Stand premium + activation de marque",
        "Contenu dédié réseaux sociaux",
        "Accès VIP artistes & intervenants",
      ],
      cta: "Devenir partenaire Or",
      mailSubject: "Sponsoring Or — YUNA 2026",
      featured: true,
    },
    {
      id: "silver",
      badge: "Argent",
      price: "1 500 000",
      currency: "FCFA",
      perks: [
        "Logo écran géant + site + affiches",
        "Mention scène chaque soir",
        "Stand + distribution flyers",
        "Post dédié réseaux sociaux",
      ],
      cta: "Choisir Argent",
      mailSubject: "Sponsoring Argent — YUNA 2026",
      featured: false,
    },
  ],
  logosTitle: "Ils soutiennent YUNA 2026",
} as const;

export const PARTICIPATE = {
  eyebrow: "Réponds à l'appel",
  title: "Lève-toi.",
  intro:
    "Bénévoles, chorales, partenaires, sponsors, médias — YUNA 2026 se bâtit ensemble. Rejoins la génération qui se lève.",
  ctaVolunteer: "Devenir bénévole",
  ctaPartner: "Devenir partenaire",
} as const;

export const TEASER = {
  eyebrow: "Aftermovie & teaser",
  title: "Vis l'expérience",
  intro:
    "Regarde le teaser officiel YUNA 2026 — et imagine-toi au milieu de la foule le 5 septembre.",
  /** Remplacer par l'ID YouTube officiel quand disponible */
  youtubeId: process.env.NEXT_PUBLIC_YUNA_TEASER_ID ?? "",
} as const;

export const REGISTER_COPY = {
  intro:
    "Inscris-toi gratuitement et génère immédiatement ton pass personnel avec code QR — à présenter à l'entrée. Enregistre le lien de confirmation : aucun e-mail n'est envoyé pour l'instant.",
  goalLabel: "inscrits",
  honorPlacesLabel: "places d'honneur restantes",
} as const;

export const POLES = [
  {
    id: "gospel",
    title: "Gospel & adoration",
    description:
      "Louanges, concerts et temps d'adoration — la flamme au centre de chaque soirée.",
    accent: "feu" as const,
    image: "/media/pole-gospel-adoration.webp",
    objectPosition: "center 35%",
  },
  {
    id: "art",
    title: "Art & créativité",
    description:
      "Expositions, performances et rencontres pour faire rayonner les talents de la génération.",
    accent: "bleu" as const,
    image: "/media/pole-art-creativite.webp",
    objectPosition: "center center",
  },
  {
    id: "danse",
    title: "Danse & scène",
    description:
      "Spectacles, énergie du corps et moments forts qui font vibrer Midombo.",
    accent: "feu" as const,
    image: "/media/pole-danse-scene.webp",
    objectPosition: "center 25%",
  },
  {
    id: "formation",
    title: "Masterclass",
    description:
      "VTeam (musiciens & chantres) et Entrepreneuriat — exceller sans quitter le Royaume.",
    accent: "bleu" as const,
    image: "/media/pole-masterclass.webp",
    objectPosition: "center 40%",
  },
] as const;

export const DONATE = {
  label: "Faire un don",
  pageHref: "/don",
  href: "mailto:contact@yunafestival.org?subject=Don%20YUNA%20Festival%202026",
  blurb: "Soutiens le mouvement — chaque contribution allume une flamme de plus.",
  pageTitle: "Allume une flamme de plus",
  pageLead:
    "YUNA Festival est gratuit pour toute une génération. Ton don finance la scène, la logistique, les masterclass et les actions de solidarité à Midombo.",
  pillars: [
    {
      title: "La scène & la prod",
      text: "Sono, lumières, sécurité et équipe technique pour deux soirées dignes d'une génération qui se lève.",
    },
    {
      title: "Masterclass & formation",
      text: "Ateliers VTeam et entrepreneuriat — exceller sans quitter le Royaume, avec des formateurs engagés.",
    },
    {
      title: "Solidarité Midombo",
      text: "Consultations, dépistages et assistance aux familles du quartier — la foi en actes, sur le terrain.",
    },
  ],
  ctaEmail: "Écrire pour donner",
  ctaHome: "Retour à l'accueil",
} as const;

export const ORGANIZER = {
  name: "Global Impact Ministries",
  tagline: "Youth United for New Awakening",
  hebrew: "יוֹנָה · La Colombe — l'Esprit sur une génération",
} as const;
