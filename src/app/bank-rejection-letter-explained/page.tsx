import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";

const BASE = "https://www.klarium.co";

export const metadata: Metadata = {
  title: "Bank Rejection Letter Explained: Reasons & Next Steps | Klarium",
  description:
    "Understand a bank rejection letter in plain language. Learn what rejection reasons, policy wording, credit concerns and missing information can mean, then check your own letter with Klarium.",
  alternates: { canonical: "/bank-rejection-letter-explained" },
  openGraph: {
    title: "Bank Rejection Letter Explained: Reasons & Next Steps | Klarium",
    description:
      "Upload or paste a bank rejection letter and understand what it says, what it does not say, and what to verify before applying again.",
    url: `${BASE}/bank-rejection-letter-explained`,
    type: "article",
  },
};

const commonReasons = [
  {
    title: "Affordability or repayment concerns",
    text: "A lender may refer to affordability, repayment capacity, income, existing commitments, or debt levels. The exact test varies by lender and product.",
  },
  {
    title: "Credit or risk information",
    text: "A letter may refer to credit history, adverse information, internal risk criteria, or a credit assessment. The wording does not always reveal the underlying data or score.",
  },
  {
    title: "Missing or inconsistent information",
    text: "Names, income evidence, addresses, dates, bank statements, tax records, or other supporting documents may be incomplete or inconsistent with the application.",
  },
  {
    title: "Eligibility or policy criteria",
    text: "Terms such as eligibility criteria, lending policy, internal policy, or risk appetite can mean the application did not meet a particular lender's rules.",
  },
  {
    title: "Verification or compliance",
    text: "Some account-opening and lending decisions involve identity, source-of-funds, business, or other verification checks. A generic rejection does not prove a particular cause.",
  },
  {
    title: "Product-specific requirements",
    text: "Mortgage, personal-loan, business-loan, credit-card, and bank-account applications can have different requirements. Do not assume one rejection reason applies to every product.",
  },
];

const documentChecklist = [
  "The exact reason or wording used by the bank",
  "Application or reference number",
  "Date of the decision",
  "Product requested and amount, if stated",
  "Any cited policy, eligibility, credit, or verification language",
  "Any deadline or appeal/review information",
  "Documents the bank says were missing or unsuitable",
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Bank Rejection Letter Explained: Reasons & Next Steps",
        description: metadata.description,
        url: `${BASE}/bank-rejection-letter-explained`,
        publisher: { "@type": "Organization", name: "Klarium", url: BASE },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Klarium", item: BASE },
          {
            "@type": "ListItem",
            position: 2,
            name: "Bank Rejection Letter Explained",
            item: `${BASE}/bank-rejection-letter-explained`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0066CC] text-white">
              <ShieldCheck size={16} />
            </span>
            Klarium
          </Link>
          <Link
            href="/#upload"
            className="rounded-lg bg-[#0066CC] px-4 py-2 text-sm font-bold text-white"
          >
            Check my letter →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-500">
          <Link href="/" className="text-[#0066CC]">
            Klarium
          </Link>{" "}
          / Bank rejection letter explained
        </nav>

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-900">
          <FileText size={14} />
          Bank letter explainer
        </div>

        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
          Bank rejection letter explained: reasons and next steps
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
          A rejection letter can be short, vague, and full of policy language.
          Klarium helps you turn the actual wording in your letter into a
          clearer explanation of what the bank said, what it did not say, and
          what you should verify before taking your next step.
        </p>

        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <p className="font-bold text-blue-950">The useful part is your actual letter.</p>
          <p className="mt-2 text-sm leading-6 text-blue-900">
            General lists of rejection reasons cannot tell you why your
            particular application was declined. Upload the letter or paste
            its text into Klarium so the explanation is based on the document
            itself.
          </p>
        </div>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold">What a bank rejection letter can mean</h2>
          <p className="mt-3 leading-7 text-gray-600">
            Banks and lenders use different underwriting, eligibility,
            verification, and risk policies. These are common categories of
            wording, not a diagnosis of your specific rejection.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {commonReasons.map((item) => (
              <article key={item.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold">How to read the rejection letter</h2>
          <ol className="mt-5 space-y-4">
            <li>
              <strong>1. Find the decision.</strong>{" "}
              <span className="text-gray-600">Identify what application or product was rejected and when.</span>
            </li>
            <li>
              <strong>2. Find the stated reason.</strong>{" "}
              <span className="text-gray-600">Separate the bank&apos;s actual wording from assumptions about why it happened.</span>
            </li>
            <li>
              <strong>3. Find cited evidence or criteria.</strong>{" "}
              <span className="text-gray-600">Look for credit, affordability, eligibility, verification, documentation, or policy references.</span>
            </li>
            <li>
              <strong>4. Check what action is available.</strong>{" "}
              <span className="text-gray-600">The letter may mention review, appeal, missing documents, a contact route, or a date.</span>
            </li>
            <li>
              <strong>5. Do not invent a hidden reason.</strong>{" "}
              <span className="text-gray-600">If the bank did not state a reason, mark it as unknown and ask the bank for clarification where appropriate.</span>
            </li>
          </ol>
        </section>

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold">What to collect before you reapply</h2>
          <p className="mt-3 text-gray-600">
            Keep the rejection letter together with the information it refers to.
            This makes it easier to spot missing or inconsistent details.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {documentChecklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0066CC]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-extrabold text-amber-950">Important: a rejection letter is not a complete financial assessment</h2>
          <p className="mt-3 text-sm leading-6 text-amber-900">
            Klarium can explain the document, identify what is stated, organize
            important details, and highlight what remains unclear. It cannot
            determine whether you will be approved by another lender, guarantee
            approval, or replace regulated financial advice.
          </p>
        </section>

        <section className="mt-8 rounded-2xl bg-[#0A1628] p-7 text-center text-white">
          <h2 className="text-2xl font-black">Have the rejection letter?</h2>
          <p className="mx-auto mt-2 max-w-xl leading-7 text-white/65">
            Upload it to Klarium and get a plain-language explanation based on
            the document instead of guessing from generic rejection lists.
          </p>
          <Link
            href="/#upload"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0066CC] px-6 py-3 font-bold"
          >
            Explain my bank letter <ArrowRight size={16} />
          </Link>
        </section>

        <section className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold">Related Klarium tools</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/documents" className="rounded-lg border bg-white px-3 py-2 text-sm font-semibold text-blue-700">AI document reader</Link>
            <Link href="/legal-document-explainer" className="rounded-lg border bg-white px-3 py-2 text-sm font-semibold text-blue-700">Legal document explainer</Link>
            <Link href="/example-library/government-letter-explained" className="rounded-lg border bg-white px-3 py-2 text-sm font-semibold text-blue-700">Government letter explainer</Link>
            <Link href="/trust-center" className="rounded-lg border bg-white px-3 py-2 text-sm font-semibold text-blue-700">Trust Center</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
