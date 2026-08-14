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
    "Ouverture du site à 16h00 chaque soir — concerts dès 18h",
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
} as const;

/** Page dédiée /partenaires — dossier PDF à déposer dans public/media quand prêt. */
export const PARTNERS_PAGE = {
  eyebrow: "Partenariat",
  title: "Devenir partenaire de YUNA",
  lead:
    "Associez votre marque à Bénin Debout : un festival jeunesse à Midombo, entrée libre, dimension nationale et diaspora.",
  whyTitle: "Pourquoi soutenir YUNA",
  why: [
    "Un événement structuré autour de la jeunesse, de la foi et de l’excellence — pas seulement un concert.",
    "Entrée libre : votre soutien rend possible un festival ouvert à toutes et tous.",
    "Visibilité concrète : site, affiches, scène, stands et réseaux — sur 2 soirées à Cotonou.",
  ],
  audienceTitle: "Audience attendue",
  audience: [
    "Des milliers de jeunes sur le Terrain de Midombo (5–6 septembre 2026).",
    "Objectif d’inscriptions pass QR : 5 000 — suivi staff et check-in sur site.",
    "Public local Cotonou + rayonnement diaspora via le site et les réseaux.",
  ],
  visibilityTitle: "Visibilité offerte",
  visibility: [
    "Logo sur le site officiel et supports print selon le palier.",
    "Mentions scène et présence écran géant (Argent / Or).",
    "Contenu dédié réseaux sociaux (Argent / Or).",
    "Naming « présenté par » et prise de parole (Or — partenaire officiel).",
  ],
  brandingTitle: "Espaces de branding",
  branding: [
    "Affiches et communication digitale du festival",
    "Écran géant et bannières scène",
    "Stand sur le site (activation de marque)",
    "Flyers et distribution terrain (Argent+)",
  ],
  supportModesTitle: "Sponsoring financier ou matériel",
  supportModes: [
    {
      title: "Financier",
      text: "Paliers Bronze 500 000 · Argent 1 500 000 · Or 3 000 000 FCFA — contreparties listées ci-dessous.",
    },
    {
      title: "Matériel / en nature",
      text: "Sono, lumière, groupe électrogène, eau, sanitaires, restauration, logistique médicale — à discuter selon vos moyens.",
    },
  ],
  formTitle: "Formulaire de contact",
  formLead:
    "Présentez-nous votre organisation, le soutien envisagé et vos objectifs de visibilité. L’équipe YUNA reprendra contact avec vous.",
  formOrg: "Organisation / marque *",
  formName: "Nom du contact *",
  formEmail: "E-mail *",
  formPhone: "Téléphone (WhatsApp)",
  formMode: "Type de partenariat *",
  formModeFinancial: "Financier",
  formModeInKind: "Matériel / en nature",
  formModeBoth: "Les deux",
  formTier: "Niveau envisagé",
  formTierOptions: [
    "À définir ensemble",
    "Bronze — 500 000 FCFA",
    "Argent — 1 500 000 FCFA",
    "Or — 3 000 000 FCFA",
    "Contribution matérielle / sur mesure",
  ],
  formMessage: "Message",
  formMessagePh:
    "Vos objectifs, les espaces souhaités ou la nature du matériel proposé…",
  formMailSubject: "Partenariat — YUNA 2026",
  formPrivacy:
    "Les informations saisies servent uniquement à traiter votre demande de partenariat.",
  formSubmitHint:
    "L’envoi prépare votre demande à destination de l’équipe partenariat YUNA.",
  dossierTitle: "Dossier de sponsoring",
  dossierLead:
    "Le dossier PDF détaillé (audiences, plans média, contreparties) sera disponible ici dès validation. En attendant, demandez-le par e-mail.",
  /** Mettre true + déposer le fichier quand le PDF client est prêt. */
  dossierReady: false,
  dossierHref: "/media/dossier-sponsoring-yuna-2026.pdf",
  dossierCta: "Télécharger le dossier",
  dossierMailSubject: "Dossier de sponsoring — YUNA 2026",
  dossierMailCta: "Recevoir le dossier par e-mail",
  contactCta: "Envoyer ma demande",
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
      "Danse de louange, chorégraphies et scènes qui font vibrer une génération jeune pour Christ.",
    accent: "feu" as const,
    image: "/media/pole-danse-scene.webp",
    objectPosition: "center 30%",
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

/** Montants suggérés — page Soutenir (niveaux de flamme). */
export const SUPPORT_FLAMES = [
  {
    amount: 1_000,
    label: "Étincelle",
    hint: "Une main tendue",
  },
  {
    amount: 2_500,
    label: "Braises",
    hint: "Chaleur du terrain",
  },
  {
    amount: 5_000,
    label: "Flamme",
    hint: "Sono & lumière",
  },
  {
    amount: 10_000,
    label: "Torche",
    hint: "Masterclass & scène",
  },
  {
    amount: 25_000,
    label: "Brasier",
    hint: "Toute une soirée",
  },
] as const;

/** @deprecated — préférer SUPPORT_FLAMES */
export const SUPPORT_AMOUNTS_FCFA = [
  1_000, 2_500, 5_000, 10_000, 25_000,
] as const;

export const DONATE = {
  label: "Soutenir YUNA",
  pageHref: "/soutenir",
  href: "mailto:contact@yunafestival.org?subject=Soutenir%20YUNA%20Festival%202026",
  blurb:
    "On ne vend rien ici. Ton soutien garde le festival gratuit et ouvert à tous.",
  pageTitle: "Soutenir YUNA",
  pageLead:
    "Ton soutien garde le festival gratuit et ouvert à tous. Le montant est libre — aucun minimum. Allume une flamme avec ce que tu peux.",
  seedEyebrow: "Semer · Midombo",
  seedTitle: "Allume une flamme",
  seedLead:
    "Choisis l’intensité — ou écris ton montant. Aucun minimum. Chaque franc va sur le terrain.",
  seedCta: "Allumer ma flamme",
  customAmountPh: "Ton montant libre (FCFA)",
  paths: [
    {
      id: "ponctuel",
      title: "Soutien ponctuel",
      text: "Mobile Money ou virement, une seule fois. Ex. 5 000 FCFA = contribution directe à la sono / l’action médicale du samedi.",
      cta: "Allumer une flamme →",
      href: "#semer",
    },
    {
      id: "engager",
      title: "S'engager bénévole",
      text: "Créneaux concrets : accueil, sécurité, technique, protocole. Inscription avec pass QR obligatoire pour le staff jour J.",
      cta: "S'inscrire bénévole →",
      href: "/#inscription?type=benevole",
    },
    {
      id: "partenariat",
      title: "Partenariat",
      text: "Paliers Bronze 500 000 · Argent 1 500 000 · Or 3 000 000 FCFA — logo, scène, stand. Dossier et formulaire sur la page partenaires.",
      cta: "Devenir partenaire →",
      href: "/partenaires",
    },
  ],
  pillars: [
    {
      title: "Scène Midombo · 5–6 sept",
      text: "Location sono & lumières, groupe électrogène, sécurité du terrain, eau et sanitaires — pour 2 soirées (sam. 16h–23h / dim. 16h–22h30), entrée libre pour tout le public.",
    },
    {
      title: "2 masterclass samedi",
      text: "VTeam 10h–13h (musiciens & chantres) + Entrepreneuriat 15h–17h — salles, matériel et places limitées sur inscription QR.",
    },
    {
      title: "Action médicale 08h–13h",
      text: "Consultations gratuites, dépistages et dons pour les familles du quartier Midombo le samedi matin — avant même l’ouverture des concerts.",
    },
  ],
  ctaEmail: "Écrire pour soutenir",
  ctaHome: "Retour à l'accueil",
} as const;

export const ORGANIZER = {
  name: "Global Impact Ministries",
  tagline: "Youth United for New Awakening",
  hebrew: "יוֹנָה · La Colombe — l'Esprit sur une génération",
} as const;
