import type { Messages } from "@/lib/i18n/types";

export const fr: Messages = {
  skipToContent: "Aller au contenu",
  langName: "Français",
  langSwitch: "Langue",
  common: {
    register: "Réserve ton pass",
    registerCta: "C’est gratuit, je prends ma place",
    registerShort: "S’inscrire",
    myPass: "Mon pass",
    recoverPass: "Pass perdu ? Retrouver mon pass",
    freeEntry: "Entrée libre",
    sitePublic: "Site public",
    backHome: "← Retour au site",
  },
  nav: [
    { href: "/mouvement", label: "Mouvement" },
    { href: "/artistes", label: "Artistes" },
    { href: "/journee", label: "Journée" },
    { href: "/partenaires", label: "Partenaires" },
    { href: "/soutenir", label: "Soutenir" },
  ],
  footerNav: [
    { href: "/mouvement", label: "Mouvement" },
    { href: "/vision", label: "Vision" },
    { href: "/artistes", label: "Artistes" },
    { href: "/journee", label: "Journée" },
    { href: "/#lieu", label: "Lieu" },
    { href: "/mon-pass", label: "Retrouver mon pass" },
    { href: "/soutenir", label: "Soutenir" },
    { href: "/partenaires", label: "Partenaires" },
    { href: "/filtre", label: "Filtre photo" },
    { href: "/flamme", label: "La flamme chez toi" },
    { href: "/faq", label: "FAQ" },
    { href: "/confidentialite", label: "Confidentialité" },
    { href: "/mentions-legales", label: "Mentions légales" },
  ],
  footer: {
    festival: "Festival",
    contact: "Contact",
    socials: "Réseaux",
    organization: "Organisation",
    tagline: "Youth United for New Awakening",
    dove: "יוֹנָה · La Colombe, l'Esprit sur une génération",
    verseLine:
      "Une génération non ordinaire se lève. Ésaïe 60:1 · 5–6 septembre 2026",
    openNote: "Entrée libre · Ouverture 16h00",
  },
  hero: {
    eyebrow: "Youth United for New Awakening · יוֹנָה",
    titleLine1: "BÉNIN",
    titleLine2: "DEBOUT",
    support:
      "Une génération non ordinaire se lève. Joseph. Daniel. David. À toi maintenant.",
    verse:
      "« Lève-toi, sois éclairée, car ta lumière arrive, et la gloire de l'Éternel se lève sur toi. »",
    verseRef: "Ésaïe 60:1",
    ctaPrimary: "C’est gratuit, je prends ma place",
    ctaSecondary: "Voir la journée",
    meta: "5–6 septembre 2026 · Cotonou",
    datesHero: "5–6 SEP · 2026",
    venueLine: "5–6 septembre 2026 · Cotonou · Entrée libre",
  },
  registerExtras: {
    addGuest: "+ Ajouter un pass pour quelqu’un d’autre",
    removeGuest: "Retirer",
    guestLabel: "Pass n°{n}",
    guestName: "Nom complet *",
    guestPhone: "Téléphone (WhatsApp) *",
    guestsHint:
      "Avec Concert / Festival, tu peux ajouter jusqu’à 4 proches (5 pass max). École royale et masterclass restent individuels. Chaque personne a son QR.",
    maxGuests: "Maximum 5 pass par inscription.",
    submitMulti: "Recevoir les pass QR",
  },
  sessions: {
    eyebrow: "Sessions du samedi",
    title: "Masterclass",
    lead: "Masterclass Entrepreneuriat. Inscription gratuite, places limitées.",
    register: "S’inscrire →",
    capacity: "Jusqu’à {n} places",
    free: "Gratuit",
    speakers: "Intervenants",
  },
  mouvement: {
    eyebrow: "Le mouvement",
    title: "Plus qu’un festival",
    lead: "YUNA est un mouvement : foi vivante, excellence, et impact sur le terrain à Midombo.",
  },
  whatsapp: {
    label: "WhatsApp",
    aria: "Écrire à YUNA sur WhatsApp",
  },
  stats: [
    { value: "2", label: "Jours de festival" },
    { value: "1", label: "Masterclass" },
    { value: "1", label: "Génération qui se lève" },
  ],
  statsRegistered: {
    label: "Déjà inscrits",
  },
  explore: {
    eyebrow: "Explorer",
    title: "Tout le festival",
    description:
      "Mouvement, artistes, journée et infos. Le détail est sur chaque page.",
    cards: [
      {
        href: "/mouvement",
        title: "Le mouvement",
        description: "Plus qu’un festival. Foi et génération à Midombo.",
        imageAlt: "Le mouvement YUNA",
      },
      {
        href: "/artistes",
        title: "Artistes",
        description: "Les artistes se dévoilent progressivement.",
        imageAlt: "Scène et artistes du festival",
      },
      {
        href: "/journee",
        title: "La journée",
        description: "Masterclass Entrepreneuriat, pôles gospel, art, danse.",
        imageAlt: "Actions communautaires en journée",
      },
      {
        href: "/faq",
        title: "FAQ & infos",
        description: "Entrée, pass QR, accès. Les réponses essentielles.",
        imageAlt: "Public du festival",
      },
      {
        href: "/filtre",
        title: "Filtre photo",
        description: "Cadre officiel J’y serai : ajoute ta photo et partage.",
        imageAlt: "Filtre photo YUNA J’y serai",
      },
      {
        href: "/flamme",
        title: "La flamme chez toi",
        description: "Pose l’emblème en 3D, filme et partage.",
        imageAlt: "Emblème flamme YUNA en 3D",
      },
    ],
  },
  saveTheDate: {
    eyebrow: "Save the date · 2026",
    title: "5–6 septembre 2026",
    support:
      "Une génération non ordinaire se lève. Joseph. Daniel. David. À toi maintenant.",
    venue:
      "Cotonou. Entrée libre. Garde la date, génère ton pass.",
  },
  register: {
    eyebrow: "Inscription",
    title: "Inscris-toi, ticket gratuit",
    lead:
      "Inscris-toi gratuitement et reçois ton ticket officiel avec QR par e-mail, à présenter à l'entrée.",
    formTitle: "Tes infos",
    name: "Nom complet *",
    namePh: "Ex : Grâce Ahouansou",
    phone: "Téléphone (WhatsApp) *",
    phonePh: "+229 01 XX XX XX XX",
    email: "Email *",
    emailPh: "ton@email.com",
    typesLegend: "Tu t’inscris pour",
    typesHint:
      "Tu peux cocher une, deux ou toutes les options. Chaque choix génère son propre pass QR.",
    typesRequired: "Choisis au moins une option.",
    busQuestion: "As-tu besoin d’un bus ?",
    busHint:
      "Des navettes sont mises à disposition. Dis-nous si tu en as besoin et depuis quel quartier.",
    busYes: "Oui, je veux un bus",
    busNo: "Non merci",
    busLocation: "Ton quartier / point de départ *",
    busLocationPh: "Ex : Akpakpa, Cadjèhoun, Godomey…",
    busRequired: "Indique si tu as besoin d’un bus ou non.",
    busLocationRequired:
      "Indique ton quartier ou ton point de départ pour la navette.",
    consent:
      "J'accepte que mes informations soient utilisées pour générer mon ticket et organiser le festival, comme décrit dans la",
    privacy: "politique de confidentialité",
    submit: "Recevoir mon ticket",
    already: "Déjà inscrit ?",
    recoverLink: "Retrouver mon pass",
    registeredCount: "{n} personnes déjà inscrites",
    previewLabel: "Aperçu du ticket",
    previewHint:
      "Le ticket définitif (avec QR) est créé après validation. Cet aperçu te montre à quoi il ressemblera à l'entrée.",
  },
  registerTypes: {
    ecole_royale: {
      label: "École royale",
      hint: "Formation · places limitées",
    },
    pass: {
      label: "Concert / Festival",
      hint: "Entrée libre · ticket QR pour les 2 soirées",
    },
    masterclass_vteam: {
      label: "Masterclass VTeam",
      hint: "Samedi 10h–13h · musiciens & chantres",
    },
    masterclass_entrepreneuriat: {
      label: "Masterclass Entrepreneuriat",
      hint: "Samedi 15h–17h · places limitées",
    },
    benevole: {
      label: "Bénévole / Ambassadeur",
      hint: "Accueil, sécurité, technique… · groupe WhatsApp dédié",
    },
  },
  floatCta: "S’inscrire · Gratuit",
  floatAria: "S’inscrire gratuitement et recevoir mon pass QR",
  lineup: {
    eyebrow: "Artistes",
    title: "Les artistes",
    description:
      "Adoration, louange et scènes fortes. Les noms se dévoilent progressivement.",
    teaser: "Les artistes se dévoilent progressivement. Reste connecté.",
    coming: "Artistes à venir.",
    mysteryEyebrow: "Bientôt sur scène",
    mysteryTitle: "Bientôt dévoilés",
    mysteryBody:
      "D’autres noms encore sous emballage. Les annonces sortent progressivement. Reste connecté.",
  },
  pages: {
    artistes: {
      eyebrow: "Scènes & adoration",
      title: "Les artistes",
      lead:
        "Adoration, louange et scènes fortes. Exo Éclat, Valère Kouton, Simiane Tatu, Dany Kasongo déjà dévoilés. Le reste arrive progressivement.",
    },
    vision: {
      eyebrow: "La vision",
      title: "Une génération non ordinaire",
      lead:
        "Joseph, Daniel, David : des jeunes qui portent un esprit supérieur et se tiennent devant les rois.",
    },
    journee: {
      eyebrow: "Samedi en journée",
      title: "Impact avant la scène",
      lead:
        "Avant les concerts, le samedi accueille la Masterclass Entrepreneuriat, plus les pôles gospel, art et danse.",
    },
    lieu: {
      eyebrow: "Le lieu",
      title: "Cotonou",
      lead:
        "Cotonou. Entrée libre, accessible à tous.",
    },
    boutique: {
      eyebrow: "Boutique",
      title: "Porte le feu",
      lead: "Tee-shirts LED YUNA. L’identité du mouvement sur toi.",
    },
    don: {
      eyebrow: "Soutenir",
      title: "Soutenir YUNA",
      lead:
        "On ne vend rien ici. Ton soutien garde le festival gratuit et ouvert à tous.",
    },
    faq: {
      eyebrow: "Infos",
      title: "FAQ",
      lead: "Entrée, pass QR, accès. Les réponses essentielles.",
    },
    monPass: {
      eyebrow: "Pass perdu ?",
      title: "Retrouver mon pass",
      lead:
        "Entre ton nom et le numéro WhatsApp utilisés à l'inscription. On te réaffiche ton QR.",
      notYet: "Pas encore inscrit ?",
    },
    mouvement: {
      eyebrow: "Le mouvement",
      title: "Plus qu’un festival",
      lead:
        "Foi, talents et impact terrain. Une génération qui se lève à Midombo et au-delà.",
    },
  },
  confirmation: {
    eyebrow: "Inscription confirmée",
    title: "Ton ticket YUNA",
    leadMessaging:
      "Voici ton ticket officiel avec QR. Un e-mail avec le lien de ton pass part automatiquement. Présente le QR à l’entrée.",
    leadSave:
      "Voici ton ticket officiel avec QR. Un e-mail de confirmation part aussi si Resend est configuré. Tu pourras le retrouver via Mon pass.",
    groupTitle: "Groupe : {n} tickets créés",
    groupBody: "Voici ton ticket. Les autres du groupe :",
    passN: "Ticket n°{n} →",
    lostLink: "Tu perds ce lien ?",
    recover: "Retrouve ton pass",
    channelCta: "Rejoindre le canal WhatsApp",
    channelRedirect:
      "Prochaine étape : rejoins le canal officiel YUNA pour les annonces.",
    channelCountdown: "Redirection dans {n} s…",
    volunteersCta: "Rejoindre le groupe bénévoles",
    volunteersRedirect:
      "Prochaine étape : rejoins le groupe WhatsApp des bénévoles et ambassadeurs.",
  },
  passActions: {
    confirmed: "Confirmé",
    messageSent:
      "message envoyé par {channel}. Garde aussi ton ticket ci-dessous.",
    savePass:
      "Télécharge ton ticket (PNG) ou enregistre le lien. Tu pourras aussi le retrouver via Mon pass.",
    downloadPng: "Télécharger le ticket",
    share: "Partager / copier le lien",
    linkCopied: "Lien copié",
    shareTitle: "Ticket YUNA Festival 2026",
    shareText: "Mon ticket QR YUNA",
  },
  countdown: {
    days: "Jours",
    hours: "Heures",
    minutes: "Min",
    seconds: "Sec",
    label: "Compte à rebours",
  },
};
