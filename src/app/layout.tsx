import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const SITE = "https://klarium.co";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Klarium — Understand Anything. Stay Safe. In Your Language.", template: "%s | Klarium" },
  description: "Understand medical reports, legal documents, contracts, bank letters and suspicious messages in plain language. Klarium explains what matters, highlights risks and helps you decide what to do next.",
  keywords: ["AI document understanding", "explain medical report", "medical report explained", "legal document explainer", "contract explainer", "phishing detector", "scam detector", "document AI", "multilingual AI", "understand documents", "Klarium"],
  authors: [{ name: "Klarium" }],
  creator: "Klarium",
  publisher: "Klarium",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Klarium — Understand Anything. Stay Safe. In Your Language.",
    description: "AI document understanding and safety analysis for medical reports, legal documents, contracts, financial documents and suspicious messages.",
    url: SITE,
    siteName: "Klarium",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "Klarium — Understand Anything. Stay Safe. In Your Language.", description: "Understand important documents and suspicious messages in plain language." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#0F1B2D" }],
  width: "device-width", initialScale: 1, maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <I18nProvider>{children}<Toaster /></I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
