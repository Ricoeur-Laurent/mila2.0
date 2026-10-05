import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Manrope,
  Bricolage_Grotesque,
  Caveat,
} from "next/font/google";

import Header from "@/components/layout/Header";
import "./globals.css";

/* =====================================================
   POLICES
====================================================== */

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});
/* =====================================================
   SEO
====================================================== */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mila2-0.vercel.app/";
const SITE_NAME = "M.ila — Creative Lab";
const DESCRIPTION =
  "M.ila crée des expériences qui ont du sens : communication, événementiel et accompagnement créatif pour les entreprises, mariages, danse et expériences privées pour les particuliers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "M.ila — L'art de créer des expériences qui ont du sens",
    template: "%s | M.ila Creative Lab",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "M.ila",
    "Creative Lab",
    "communication événementielle",
    "événementiel entreprise",
    "accompagnement créatif",
    "stratégie de communication",
    "organisation de mariage",
    "première danse mariage",
    "cours de danse",
    "expériences privées",
  ],
  authors: [{ name: "M.ila Creative Lab" }],
  creator: "M.ila Creative Lab",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: SITE_NAME,
    title: "M.ila — L'art de créer des expériences qui ont du sens",
    description: DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "M.ila — Creative Lab",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "M.ila — L'art de créer des expériences qui ont du sens",
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#168fe5",
  width: "device-width",
  initialScale: 1,
};

/* =====================================================
   DONNÉES STRUCTURÉES
====================================================== */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "M.ila Creative Lab",
  url: SITE_URL,
  logo: `${SITE_URL}/hero/images/logo.png`,
  image: `${SITE_URL}/og.jpg`,
  description: DESCRIPTION,
  slogan: "L'art de créer des expériences qui ont du sens.",
  knowsAbout: [
    "Communication",
    "Événementiel",
    "Accompagnement créatif",
    "Mariage",
    "Danse",
  ],
};

/* =====================================================
   LAYOUT
====================================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${manrope.variable} ${bricolage.variable} ${caveat.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Lien d'évitement clavier */}
        <a
          href="#contenu"
          className="btn-brut sr-only bg-accent px-4 py-2 font-sans text-xs text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Aller au contenu
        </a>

        <Header />

        <main id="contenu">{children}</main>
      </body>
    </html>
  );
}
