import type { Messages } from "@/lib/i18n/types";

export const en: Messages = {
  skipToContent: "Skip to content",
  langName: "English",
  langSwitch: "Language",
  common: {
    register: "Get your pass",
    registerCta: "It’s free, I’m in",
    registerShort: "Register",
    myPass: "My pass",
    recoverPass: "Lost your pass? Recover it",
    freeEntry: "Free entry",
    sitePublic: "Public site",
    backHome: "← Back to site",
  },
  nav: [
    { href: "/mouvement", label: "Movement" },
    { href: "/artistes", label: "Artists" },
    { href: "/journee", label: "Daytime" },
    { href: "/partenaires", label: "Partners" },
    { href: "/soutenir", label: "Support" },
  ],
  footerNav: [
    { href: "/mouvement", label: "Movement" },
    { href: "/vision", label: "Vision" },
    { href: "/artistes", label: "Artists" },
    { href: "/journee", label: "Daytime" },
    { href: "/#lieu", label: "Venue" },
    { href: "/mon-pass", label: "Recover my pass" },
    { href: "/soutenir", label: "Support" },
    { href: "/partenaires", label: "Partners" },
    { href: "/filtre", label: "Photo filter" },
    { href: "/flamme", label: "The flame at home" },
    { href: "/faq", label: "FAQ" },
    { href: "/confidentialite", label: "Privacy" },
    { href: "/mentions-legales", label: "Legal notice" },
  ],
  footer: {
    festival: "Festival",
    contact: "Contact",
    socials: "Social",
    organization: "Organization",
    tagline: "Youth United for New Awakening",
    dove: "יוֹנָה · The Dove, the Spirit on a generation",
    verseLine:
      "An extraordinary generation rises. Isaiah 60:1 · 5–6 September 2026",
    openNote: "Free entry · Gates open 4:00 PM",
  },
  hero: {
    eyebrow: "Youth United for New Awakening · יוֹנָה",
    titleLine1: "BÉNIN",
    titleLine2: "DEBOUT",
    support:
      "An extraordinary generation rises. Joseph. Daniel. David. Now it’s your turn.",
    verse:
      "“Arise, shine, for your light has come, and the glory of the Lord rises upon you.”",
    verseRef: "Isaiah 60:1",
    ctaPrimary: "It’s free, I’m taking my spot",
    ctaSecondary: "See the daytime programme",
    meta: "5–6 September 2026 · Terrain de Midombo",
    datesHero: "5–6 SEP · 2026",
    venueLine: "5–6 September 2026 · Terrain de Midombo · Free entry",
  },
  registerExtras: {
    addGuest: "+ Add a pass for someone else",
    removeGuest: "Remove",
    guestLabel: "Pass #{n}",
    guestName: "Full name *",
    guestPhone: "Phone (WhatsApp) *",
    guestsHint:
      "With Concert / Festival you can add up to 4 guests (5 passes max). Royal school and masterclass stay individual. Everyone gets their own QR.",
    ambassadeurGuestsHint:
      "As an ambassador, you can also create up to 4 Festival passes for people who haven’t registered themselves. Each person gets their own QR (distinct WhatsApp).",
    maxGuests: "Maximum 5 passes per registration.",
    submitMulti: "Get the QR passes",
  },
  sessions: {
    eyebrow: "Saturday sessions",
    title: "Masterclasses",
    lead: "Entrepreneurship masterclass. Free registration, limited seats.",
    register: "Register →",
    capacity: "Up to {n} seats",
    free: "Free",
    speakers: "Speakers",
  },
  mouvement: {
    eyebrow: "The movement",
    title: "More than a festival",
    lead: "YUNA is a movement: living faith, excellence, and impact at Terrain de Midombo.",
  },
  whatsapp: {
    label: "WhatsApp",
    aria: "Message YUNA on WhatsApp",
  },
  stats: [
    { value: "2", label: "Festival days" },
    { value: "1", label: "Masterclass" },
    { value: "1", label: "Generation rising" },
  ],
  statsRegistered: {
    label: "Already registered",
  },
  explore: {
    eyebrow: "Explore",
    title: "The whole festival",
    description:
      "Movement, artists, daytime and FAQ. The details live on each page.",
    cards: [
      {
        href: "/mouvement",
        title: "The movement",
        description: "More than a festival. Faith and generation at Terrain de Midombo.",
        imageAlt: "YUNA movement",
      },
      {
        href: "/artistes",
        title: "Artists",
        description: "Artists are revealed progressively.",
        imageAlt: "Festival stage and artists",
      },
      {
        href: "/journee",
        title: "Daytime",
        description: "Entrepreneurship masterclass, plus gospel, art and dance hubs.",
        imageAlt: "Community daytime actions",
      },
      {
        href: "/faq",
        title: "FAQ & info",
        description: "Entry, QR pass, access. The essentials.",
        imageAlt: "Festival crowd",
      },
      {
        href: "/filtre",
        title: "Photo filter",
        description: "Official I’ll be there frame: add your photo and share.",
        imageAlt: "YUNA I’ll be there photo filter",
      },
      {
        href: "/flamme",
        title: "The flame at home",
        description: "Place the 3D emblem, film and share.",
        imageAlt: "3D YUNA flame emblem",
      },
    ],
  },
  saveTheDate: {
    eyebrow: "Save the date · 2026",
    title: "5–6 September 2026",
    support:
      "An extraordinary generation rises. Joseph. Daniel. David. Now it’s your turn.",
    venue:
      "Terrain de Midombo. Free entry. Save the date, get your pass.",
  },
  register: {
    eyebrow: "Registration",
    title: "Register, free ticket",
    lead:
      "Register for free and get your official QR ticket by email. Show it at the gate.",
    formTitle: "Your details",
    name: "Full name *",
    namePh: "e.g. Grace Ahouansou",
    phone: "Phone (WhatsApp) *",
    phonePh: "+229 01 XX XX XX XX",
    email: "Email *",
    emailPh: "you@email.com",
    typesLegend: "You’re signing up for",
    typesHint:
      "Pick one, two, or all options. Each choice gets its own QR pass.",
    typesRequired: "Choose at least one option.",
    busQuestion: "Do you need a bus?",
    busHint:
      "Shuttle buses are available. Tell us if you need one and from which area.",
    busYes: "Yes, I need a bus",
    busNo: "No thanks",
    busLocation: "Your neighborhood / pickup point *",
    busLocationPh: "e.g. Akpakpa, Cadjehoun, Godomey…",
    busRequired: "Please say whether you need a bus or not.",
    busLocationRequired:
      "Enter your neighborhood or pickup point for the shuttle.",
    consent:
      "I agree that my information may be used to generate my ticket and organize the festival, as described in the",
    privacy: "privacy policy",
    submit: "Get my ticket",
    already: "Already registered?",
    recoverLink: "Recover my pass",
    registeredCount: "{n} people already registered",
    previewLabel: "Ticket preview",
    previewHint:
      "The final ticket (with QR) is created after validation. This preview shows how it will look at the gate.",
  },
  registerTypes: {
    ecole_royale: {
      label: "Royal school",
      hint: "Training · limited seats",
    },
    pass: {
      label: "Concert / Festival",
      hint: "Free entry · QR ticket for both evenings",
    },
    masterclass_vteam: {
      label: "VTeam masterclass",
      hint: "Saturday 10am–1pm · musicians & worship leaders",
    },
    masterclass_entrepreneuriat: {
      label: "Entrepreneurship masterclass",
      hint: "Saturday 3–5pm · limited seats",
    },
    benevole: {
      label: "Volunteer",
      hint: "Legacy type · already issued passes",
    },
    ambassadeur: {
      label: "Ambassador",
      hint: "Outreach, invites, presence · dedicated WhatsApp group",
    },
  },
  floatCta: "Register · Free",
  floatAria: "Register for free and get my QR pass",
  lineup: {
    eyebrow: "Artists",
    title: "The artists",
    description:
      "Worship, praise and strong stages. Names are revealed progressively.",
    teaser: "Artists are revealed progressively. Stay tuned.",
    coming: "Artists coming soon.",
    mysteryEyebrow: "Coming to the stage",
    mysteryTitle: "Coming soon",
    mysteryBody:
      "More names still under wraps. Announcements drop progressively. Stay tuned.",
  },
  pages: {
    artistes: {
      eyebrow: "Stages & worship",
      title: "The artists",
      lead:
        "Worship, praise and strong stages. Exo Éclat, Valère Kouton, Simiane Tatu and Dany Kasongo are already revealed. More names drop progressively.",
    },
    vision: {
      eyebrow: "The vision",
      title: "An extraordinary generation",
      lead:
        "Joseph, Daniel, David: young people with an excellent spirit who stand before kings.",
    },
    journee: {
      eyebrow: "Saturday daytime",
      title: "Impact before the stage",
      lead:
        "Before the concerts, Saturday hosts the Entrepreneurship masterclass, plus gospel, art and dance hubs.",
    },
    lieu: {
      eyebrow: "The venue",
      title: "Terrain de Midombo",
      lead:
        "Terrain de Midombo, Akpakpa, Cotonou. Free entry, open to all.",
    },
    boutique: {
      eyebrow: "Shop",
      title: "Wear the fire",
      lead: "YUNA LED tees. The movement’s identity on you.",
    },
    don: {
      eyebrow: "Support",
      title: "Support YUNA",
      lead:
        "We’re not selling anything here. Your support keeps the festival free and open to all.",
    },
    faq: {
      eyebrow: "Info",
      title: "FAQ",
      lead: "Entry, QR pass, access. The essentials.",
    },
    monPass: {
      eyebrow: "Lost your pass?",
      title: "Recover my pass",
      lead:
        "Enter the name and WhatsApp number used at registration. We’ll show your QR again.",
      notYet: "Not registered yet?",
    },
    mouvement: {
      eyebrow: "The movement",
      title: "More than a festival",
      lead:
        "Faith, gifts and impact on the ground. A generation rising at Terrain de Midombo and beyond.",
    },
  },
  confirmation: {
    eyebrow: "Registration confirmed",
    title: "Your YUNA ticket",
    leadMessaging:
      "Here’s your official ticket with QR. An email with your pass link is sent automatically. Show the QR at the gate.",
    leadSave:
      "Here’s your official ticket with QR. A confirmation email is also sent when Resend is configured. You can recover it via My pass.",
    groupTitle: "Group: {n} tickets created",
    groupBody: "Here’s your ticket. The others in the group:",
    passN: "Ticket #{n} →",
    lostLink: "Lost this link?",
    recover: "Recover your pass",
    channelCta: "Join the WhatsApp channel",
    channelRedirect:
      "Next step: join the official YUNA channel for announcements.",
    channelCountdown: "Redirecting in {n} s…",
    volunteersCta: "Join the ambassadors group",
    volunteersRedirect:
      "Next step: join the YUNA ambassadors WhatsApp group.",
  },
  passActions: {
    confirmed: "Confirmed",
    messageSent: "message sent via {channel}. Keep your ticket below too.",
    savePass:
      "Download your ticket (PNG) or save the link. You can also recover it via My pass.",
    downloadPng: "Download ticket",
    share: "Share / copy link",
    linkCopied: "Link copied",
    shareTitle: "YUNA Festival 2026 ticket",
    shareText: "My YUNA QR ticket",
  },
  countdown: {
    days: "Days",
    hours: "Hours",
    minutes: "Min",
    seconds: "Sec",
    label: "Countdown",
  },
};
