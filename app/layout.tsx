import type { Metadata, Viewport } from "next";
import {
  Baloo_2,
  JetBrains_Mono,
  Noto_Sans_Hebrew,
  Space_Grotesk,
} from "next/font/google";

import { Loader } from "@/components/Loader";
import { AppChrome } from "@/components/ui/AppChrome";

import "./globals.css";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-baloo-2",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const notoHebrew = Noto_Sans_Hebrew({
  subsets: ["hebrew"],
  weight: ["500", "700"],
  variable: "--font-noto-hebrew",
  display: "swap",
});

const siteUrl = "https://yunafestival.com";

const SITE_DESCRIPTION =
  "YUNA Festival 2026 : Bénin Debout. Une génération non ordinaire se lève. 5–6 septembre 2026, Terrain de Midombo, Cotonou. Entrée libre — line-up dévoilé progressivement.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "YUNA Festival 2026 — Bénin Debout | 5–6 septembre · Terrain de Midombo, Cotonou",
    template: "%s | YUNA Festival 2026",
  },
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "YUNA Festival 2026",
    title: "YUNA Festival 2026 — Bénin Debout",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "YUNA Festival 2026 — Bénin Debout",
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/brand/yuna-mark.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: "/brand/yuna-mark.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0077BB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${baloo2.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${notoHebrew.variable} font-sans antialiased`}
      >
        <a
          href="#contenu"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-feu px-4 py-2 font-bold text-papier opacity-0 transition-none focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-bleu"
        >
          Skip / Aller au contenu
        </a>
        <Loader />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
