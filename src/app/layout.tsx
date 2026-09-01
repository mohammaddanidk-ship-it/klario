import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const SITE = "https://www.klarium.co";
const FAVICON = `${SITE}/icon`;
const BRAND_LOGO = `${SITE}/logo`;
const BRAND_DESCRIPTION = "Understand important documents and suspicious messages in plain language, with multilingual AI explanations and safety-focused guidance.";
const BRAND_TITLE = "Klarium — Understand Anything. Stay Safe. In Your Language.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: BRAND_TITLE, template: "%s | Klarium" },
  description: BRAND_DESCRIPTION,
  applicationName: "Klarium",
  authors: [{ name: "Klarium" }],
  creator: "Klarium",
  publisher: "Klarium",
  category: "technology",
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "64x64" }],
    shortcut: [{ url: "/icon", type: "image/png", sizes: "64x64" }],
    apple: [{ url: "/icon", type: "image/png", sizes: "64x64" }],
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
    url: SITE,
    siteName: "Klarium",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
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
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1B2D" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Klarium",
      url: SITE,
      logo: BRAND_LOGO,
      description: BRAND_DESCRIPTION,
      knowsAbout: [
        "document understanding",
        "medical document explanation",
        "legal document explanation",
        "financial document explanation",
        "phishing detection",
        "scam detection",
        "multilingual document analysis",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "Klarium",
      url: SITE,
      description: BRAND_DESCRIPTION,
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE}/#webapp`,
      name: "Klarium",
      url: SITE,
      description: BRAND_DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires a modern web browser with JavaScript enabled",
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#organization` },
      featureList: [
        "AI document explanation",
        "multilingual explanations",
        "document type detection",
        "doctor prescription explanation",
        "phishing and scam detection",
        "document chat",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: SITE,
      name: BRAND_TITLE,
      description: BRAND_DESCRIPTION,
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/icon" type="image/png" sizes="64x64" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <I18nProvider>{children}<Toaster /></I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
