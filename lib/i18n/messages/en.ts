import type { Messages } from "@/lib/i18n/types";

export const en: Messages = {
  skipToContent: "Skip to content",
  langName: "English",
  langSwitch: "Language",
  common: {
    register: "Get your pass",
    registerCta: "It’s free — I’m in",
    myPass: "My pass",
    recoverPass: "Lost your pass? Recover it",
    freeEntry: "Free entry",
    sitePublic: "Public site",
    backHome: "← Back to site",
  },
  nav: [
    { href: "/mouvement", label: "Movement" },
    { href: "/artistes", label: "Line-up" },
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
    organization: "Organization",
    tagline: "Youth United for New Awakening",
    dove: "יוֹנָה · The Dove — the Spirit on a generation",
    verseLine:
      "An extraordinary generation rises. Isaiah 60:1 · 5–6 September 2026",
    openNote: "Free entry · Gates open 4:00 PM",
  },
  hero: {
    eyebrow: "Youth United for New Awakening · יוֹנָה",
    titleLine1: "BÉNIN",
    titleLine2: "DEBOUT",
    support:
      "An extraordinary generation rises — Joseph. Daniel. David. Now it’s your turn.",
    verse:
      "“Arise, shine, for your light has come, and the glory of the Lord rises upon you.”",
    verseRef: "Isaiah 60:1",
    ctaPrimary: "It’s free — I’m taking my spot",
    ctaSecondary: "See the daytime programme",
    meta: "5–6 September 2026 · Midombo Grounds, Cotonou",
    datesHero: "5–6 SEP · 2026",
    venueLine: "5–6 September 2026 · Midombo Grounds – Cotonou · Free entry",
  },
  registerExtras: {
    addGuest: "+ Add a pass for someone else",
    removeGuest: "Remove",
    guestLabel: "Pass #{n}",
    guestName: "Full name *",
    guestPhone: "Phone (WhatsApp) *",
    guestsHint:
      "Book up to 5 passes at once (you + friends/family). Each person gets their own QR — save the confirmation links (no email is sent yet).",
    maxGuests: "Maximum 5 passes per registration.",
    submitMulti: "Get the QR passes",
  },
  sessions: {
    eyebrow: "Saturday sessions",
    title: "Masterclasses",
    lead: "VTeam and Entrepreneurship masterclasses — free registration, limited seats.",
    register: "Register →",
    capacity: "Up to {n} seats",
    free: "Free",
    speakers: "Speakers",
  },
  mouvement: {
    eyebrow: "The movement",
    title: "More than a festival",
    lead: "YUNA is a movement: living faith, excellence, and impact on the ground in Midombo.",
  },
  whatsapp: {
    label: "WhatsApp",
    aria: "Message YUNA on WhatsApp",
  },
  stats: [
    { value: "2", label: "Festival days" },
    { value: "2", label: "Masterclasses" },
    { value: "1", label: "Generation rising" },
  ],
  explore: {
    eyebrow: "Explore",
    title: "The whole festival",
    description:
      "Movement, line-up, daytime and FAQ — details live on each page.",
    cards: [
      {
        href: "/mouvement",
        title: "The movement",
        description: "More than a festival — Midombo, faith and generation.",
        imageAlt: "YUNA movement",
      },
      {
        href: "/artistes",
        title: "Line-up",
        description: "Artists are revealed progressively.",
        imageAlt: "Festival stage and artists",
      },
      {
        href: "/journee",
        title: "Daytime",
        description: "VTeam and Entrepreneurship masterclasses, plus gospel, art and dance hubs.",
        imageAlt: "Community daytime actions",
      },
      {
        href: "/faq",
        title: "FAQ & info",
        description: "Entry, QR pass, access — the essentials.",
        imageAlt: "Festival crowd",
      },
      {
        href: "/filtre",
        title: "Photo filter",
        description: "Bénin Debout frame — flames, theme and verse.",
        imageAlt: "YUNA Bénin Debout photo filter",
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
      "An extraordinary generation rises — Joseph. Daniel. David. Now it’s your turn.",
    venue:
      "Midombo Grounds, Cotonou — Free entry. Save the date, get your pass.",
  },
  register: {
    eyebrow: "Registration",
    title: "Register — free ticket",
    lead:
      "Register for free and instantly get your official ticket with QR — show it at the gate. Save your confirmation link: no email is sent yet.",
    formTitle: "Your details",
    name: "Full name *",
    namePh: "e.g. Grace Ahouansou",
    phone: "Phone (WhatsApp) *",
    phonePh: "+229 01 XX XX XX XX",
    email: "Email (optional)",
    emailPh: "you@email.com",
    consent:
      "I agree that my information may be used to generate my ticket and organize the festival, as described in the",
    privacy: "privacy policy",
    submit: "Get my ticket",
    already: "Already registered?",
    recoverLink: "Recover my pass",
    previewLabel: "Ticket preview",
    previewHint:
      "The final ticket (with QR) is created after validation — this preview shows how it will look at the gate.",
  },
  registerTypes: {
    pass: {
      label: "Festival — 2 evenings",
      hint: "Free entry · QR ticket for priority access",
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
      hint: "Welcome, security, tech, protocol…",
    },
  },
  floatCta: "My pass",
  floatAria: "Get my free QR pass",
  lineup: {
    eyebrow: "Line-up",
    title: "The artists",
    description:
      "Worship, praise and powerful stages — the line-up is revealed progressively.",
    teaser: "Line-up revealed progressively — stay tuned",
    coming: "Line-up coming soon.",
    mysteryEyebrow: "Line-up in progress",
    mysteryTitle: "Coming soon",
    mysteryBody:
      "More names still under wraps — announcements drop progressively. Stay tuned.",
  },
  pages: {
    artistes: {
      eyebrow: "Stages & worship",
      title: "The line-up",
      lead:
        "Worship, praise and powerful stages — the 2026 line-up is revealed progressively. Stay tuned for announcements.",
    },
    vision: {
      eyebrow: "The vision",
      title: "An extraordinary generation",
      lead:
        "Joseph, Daniel, David — young people with an excellent spirit who stand before kings.",
    },
    journee: {
      eyebrow: "Saturday daytime",
      title: "Impact before the stage",
      lead:
        "Before the concerts, Saturday hosts the VTeam and Entrepreneurship masterclasses — plus gospel, art and dance hubs.",
    },
    lieu: {
      eyebrow: "The venue",
      title: "Midombo Grounds",
      lead:
        "An open space in the heart of Cotonou — open to all, free entry.",
    },
    boutique: {
      eyebrow: "Shop",
      title: "Wear the fire",
      lead: "YUNA LED tees — the movement’s identity on you.",
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
      lead: "Entry, QR pass, access — the essentials.",
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
        "Faith, gifts and ground impact — a generation rising in Midombo and beyond.",
    },
  },
  confirmation: {
    eyebrow: "Registration confirmed",
    title: "Your YUNA ticket",
    leadMessaging:
      "Here’s your official ticket with QR. Show it at the gate. A confirmation message is also sent automatically to your phone.",
    leadSave:
      "Here’s your official ticket with QR. Download it or save this link — you can recover it via My pass.",
    groupTitle: "Group: {n} tickets created",
    groupBody: "Here’s your ticket. The others in the group:",
    passN: "Ticket #{n} →",
    lostLink: "Lost this link?",
    recover: "Recover your pass",
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
