import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck, Languages, Search, GitCompare, Sparkles } from "lucide-react";
import {
  GLOBAL_DOCUMENT_CATEGORIES,
  GLOBAL_DOCUMENT_INTENTS,
  GLOBAL_LANGUAGE_MARKERS,
  GLOBAL_COUNTRY_MARKERS,
} from "@/lib/seo/global-document-intents";

const SITE = "https://www.klarium.co";

export const metadata: Metadata = {
  title: "AI Document Reader & Analyzer for Any Document",
  description:
    "Understand, summarize, translate, compare and check documents with Klarium. Medical, legal, government, financial, work, education, business, PDF, scans and suspicious messages in one global document intelligence platform.",
  alternates: { canonical: `${SITE}/documents` },
  openGraph: {
    title: "AI Document Reader & Analyzer for Any Document | Klarium",
    description:
      "One place to understand documents, find important information, compare files, translate meaning and spot risks.",
    url: `${SITE}/documents`,
    siteName: "Klarium",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE}/documents#webpage`,
      url: `${SITE}/documents`,
      name: "AI Document Reader & Analyzer for Any Document | Klarium",
      description: metadata.description,
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Klarium",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web",
      url: SITE,
      description: "Global AI document understanding, verification and safety platform.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Klarium", item: SITE },
        { "@type": "ListItem", position: 2, name: "Documents", item: `${SITE}/documents` },
      ],
    },
  ],
};

const capabilities = [
  { icon: FileText, title: "Understand", text: "Turn dense documents into clear explanations without losing the important details." },
  { icon: Search, title: "Find", text: "Surface dates, deadlines, amounts, names, obligations, warnings and other important information." },
  { icon: ShieldCheck, title: "Protect", text: "Identify suspicious requests, manipulation signals, inconsistencies and uncertainty before you act." },
  { icon: GitCompare, title: "Compare", text: "Compare documents and versions to find meaningful differences and contradictions." },
  { icon: Languages, title: "Translate", text: "Understand document meaning across languages instead of relying only on literal translation." },
  { icon: Sparkles, title: "Act", text: "Turn what the document says into sensible next questions and next steps." },
];

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#101828]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0A1628] text-white">K</span>
            <span>Klarium</span>
          </Link>
          <Link href="/#upload" className="rounded-lg bg-[#0A1628] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
            Analyze a document
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-16 text-center md:pt-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">KLARIUM DOCUMENT INTELLIGENCE</p>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-[-0.04em] text-[#0A1628] md:text-6xl">
            Understand any document. Anywhere in the world.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            Medical reports, contracts, government letters, bank documents, invoices, prescriptions, research papers, scanned forms, suspicious messages and documents you cannot even identify yet.
            Klarium turns them into information you can actually understand and act on.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#upload" className="inline-flex items-center gap-2 rounded-xl bg-[#0A1628] px-6 py-3.5 font-bold text-white shadow-sm hover:opacity-90">
              Upload anything <ArrowRight size={17} />
            </Link>
            <Link href="/example-library" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-800 hover:bg-slate-50">
              See examples
            </Link>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
              <Icon className="mb-4 text-blue-700" size={22} />
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">DOCUMENT UNIVERSE</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">From the document you know to the one you cannot name.</h2>
              <p className="mt-4 leading-7 text-slate-600">Klarium is designed around the real world, where people receive documents from different countries, industries and institutions and often do not know what they are looking at.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {GLOBAL_DOCUMENT_CATEGORIES.map((category) => (
                <span key={category} className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700">{category}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">HOW PEOPLE SEARCH</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Not one keyword. One problem, many ways to ask.</h2>
              <p className="mt-4 leading-7 text-slate-600">Klarium is built to understand the intent behind natural-language searches rather than stuffing pages with exact-match phrases.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {GLOBAL_DOCUMENT_INTENTS.map((group) => (
                <div key={group.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="font-bold">{group.label}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.keywordPatterns.slice(0, 6).map((keyword) => (
                      <span key={keyword} className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600">{keyword}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[#0A1628] text-white">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">GLOBAL BY DESIGN</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Documents do not stop at borders.</h2>
                <p className="mt-4 leading-7 text-slate-300">The same human need appears in different countries: understand a letter, know the deadline, translate the meaning, check the risk, compare two versions, or figure out what to ask next.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {GLOBAL_COUNTRY_MARKERS.map((country) => <span key={country} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">{country}</span>)}
              </div>
            </div>
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">LANGUAGE</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {GLOBAL_LANGUAGE_MARKERS.map((language) => <span key={language} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-300">{language}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">THE KLARIUM STANDARD</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Facts first. Uncertainty visible. Action clear.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">Important statements should be grounded in the document. Interpretation should be identified as interpretation. When the evidence is insufficient, Klarium should say so rather than inventing certainty.</p>
          <Link href="/#upload" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0A1628] px-6 py-3.5 font-bold text-white hover:opacity-90">
            Put Klarium to work <ArrowRight size={17} />
          </Link>
        </section>
      </main>
    </div>
  );
}
