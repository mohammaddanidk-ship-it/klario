import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Klarium — Understand Anything. Stay Safe. In Your Language.",
  description:
    "Klarium is an AI understanding and safety assistant. Upload medical reports, legal notices, bank letters, contracts, or suspicious messages — Klarium explains them clearly, in your language, before you decide. Available in 16 languages.",
  keywords: [
    "AI document understanding",
    "explain medical report",
    "explain legal document",
    "phishing detector",
    "scam detector",
    "multilingual AI",
    "understand contracts",
    "Klarium",
  ],
  authors: [{ name: "Klarium" }],
  metadataBase: new URL("https://klarium.ai"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Klarium — Understand Anything. Stay Safe. In Your Language.",
    description:
      "An AI understanding and safety assistant for your most important documents and messages. 16 languages. Privacy-first. Responsible AI.",
    url: "https://klarium.ai",
    siteName: "Klarium",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klarium — Understand Anything. Stay Safe. In Your Language.",
    description:
      "An AI understanding and safety assistant for your most important documents and messages.",
  },
  robots: { index: true, follow: true },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for non-Latin scripts — loaded lazily by i18n */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
            <Toaster />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
