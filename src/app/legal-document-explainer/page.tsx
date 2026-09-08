import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Scale } from "lucide-react";

const SITE = "https://www.klarium.co";
const PAGE_URL = `${SITE}/legal-document-explainer`;

export const metadata: Metadata = {
  title: "Legal Document Explainer: Contracts, Notices & Agreements | Klarium",
  description:
    "Understand legal documents in plain language. Learn how to read contracts, rental agreements, legal notices, deadlines, obligations, risks and next steps before making an important decision.",
  alternates: { canonical: "/legal-document-explainer" },
};

const DOC_TYPES = [
  ["Contracts", "Understand parties, obligations, payment terms, termination, renewal, liability and important conditions."],
  ["Rental agreements", "Find rent, deposit, duration, utilities, repairs, renewal, termination and dispute clauses."],
  ["Legal notices", "Identify who sent the notice, what is being alleged or demanded, deadlines and what response may be expected."],
  ["Employment documents", "Review compensation, duties, leave, termination, confidentiality, non-compete and other key terms."],
  ["Court and official documents", "Identify the document type, named parties, dates, required actions and whether professional review is appropriate."],
  ["Terms & policies", "Translate dense terms into a structured overview of obligations, permissions, limitations and important conditions."],
];

const CHECKLIST = [
  ["Who are the parties?", "Identify every person, company, agency or other party named in the document and their role."],
  ["What is being agreed or demanded?", "Find the central obligation, promise, allegation, request or legal effect before reading every clause in detail."],
  ["What money or property is involved?", "Look for rent, fees, deposits, payments, penalties, compensation, assets or other financial commitments."],
  ["What dates and deadlines matter?", "Mark start and end dates, renewal dates, notice periods, response deadlines and other time-sensitive requirements."],
  ["What happens if someone does not comply?", "Look for termination, penalties, interest, remedies, dispute procedures and other consequences."],
  ["Which clauses deserve a second look?", "Pay particular attention to one-sided termination, automatic renewal, broad indemnities, waivers, unclear standards and blank fields."],
];

const FAQS = [
  ["What is a legal document explainer?", "A legal document explainer turns dense legal wording into a structured plain-language overview so you can identify the document's purpose, parties, obligations, dates, important clauses and questions to investigate."],
  ["Can Klarium explain a contract?", "Yes. Klarium is designed to explain supported documents and organize important information such as obligations, dates, key terms and potential areas that deserve closer review. It is not a substitute for legal advice."],
  ["Can Klarium explain a legal notice?", "Yes. A notice can be reviewed for its apparent sender, stated issue or demand, response deadline, referenced documents and requested action. The legal effect of a notice depends on its wording, jurisdiction and circumstances."],
  ["Can an AI tell me whether a contract is safe to sign?", "No. An AI explanation can help you understand a document, but whether you should sign it is a legal and factual decision. Important contracts involving money, property, employment or legal rights should be reviewed by an appropriately qualified lawyer."],
  ["What should I look for before signing a contract?", "Start with the parties, purpose, payment obligations, duration, renewal, termination, liability, dispute terms, deadlines and any clause that gives one party unusually broad rights. Then consider whether the terms match what you were actually promised."],
  ["Is a legal notice the same as a court order?", "Not necessarily. A legal notice is generally a formal communication or demand; a court order is issued by a court. The exact meaning and legal effect depend on the document and jurisdiction."],
  ["Can Klarium provide legal advice?", "No. Klarium provides document understanding and educational explanations. It should not be relied on as a final legal opinion, and high-stakes decisions should be confirmed with a qualified legal professional."],
  ["Does every legal document need a lawyer?", "Not every everyday document requires professional review, but the risk rises when a document affects significant money, property, employment, immigration status, litigation, liability or important legal rights. When the stakes are high, professional review is prudent."],
];

const sources = [
  ["Google Search Central — Creating helpful, reliable, people-first content", "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"],
  ["U.S. Courts — Glossary / court-document terminology", "https://www.uscourts.gov/glossary"],
  ["Legal Information Institute — Contract overview", "https://www.law.cornell.edu/wex/contract"],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Legal Document Explainer: Contracts, Notices & Agreements",
      description: metadata.description,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "Klarium", url: SITE },
    },
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: "Legal Document Explainer: Contracts, Notices & Agreements",
      description: "A plain-language guide to understanding contracts, agreements, legal notices, deadlines, obligations and important clauses.",
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      publisher: { "@type": "Organization", name: "Klarium", url: SITE },
      about: ["legal documents", "contracts", "legal notices", "rental agreements", "legal agreements"],
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Klarium", item: SITE },
        { "@type": "ListItem", position: 2, name: "Legal Document Explainer", item: PAGE_URL },
      ],
    },
  ],
};

function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "#1D4ED8", textDecoration: "underline", textUnderlineOffset: 2 }}>
      {children} <ExternalLink size={11} style={{ display: "inline", verticalAlign: "-1px" }} />
    </a>
  );
}

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "Inter,system-ui,-apple-system,sans-serif", color: "#1D1D1F", WebkitFontSmoothing: "antialiased" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}a{color:inherit;text-decoration:none;}`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: "#0066CC", display: "flex", alignItems: "center", justifyContent: "center" }}><Scale size={14} color="#fff" /></span>
          Klarium
        </Link>
        <Link href="/#upload" style={{ fontSize: 13, color: "#0066CC", fontWeight: 600 }}>Explain My Document →</Link>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "42px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#6E6E73", marginBottom: 20 }}>
          <Link href="/" style={{ color: "#0066CC" }}>Klarium</Link> / <span>Legal Document Explainer</span>
        </nav>

        <header style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 750, color: "#0066CC", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>Legal document guide</p>
          <h1 style={{ fontSize: "clamp(30px,5vw,46px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.035em", marginBottom: 14 }}>Legal Document Explainer: Understand Contracts, Notices &amp; Agreements</h1>
          <p style={{ maxWidth: 800, fontSize: 17, color: "#555B64", lineHeight: 1.65 }}>
            Legal documents can be difficult to understand because important obligations are often buried inside formal language. This guide shows a practical way to identify what a document is, what it asks you to do, which dates matter and which clauses deserve a closer look.
          </p>
        </header>

        <div style={{ padding: "16px 18px", background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#9A3412", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Legal safety note</p>
          <p style={{ fontSize: 14, lineHeight: 1.7 }}>
            Klarium is a document-understanding tool, not a law firm and not a substitute for legal advice. An explanation cannot determine whether a document is enforceable, whether a claim is valid, or whether you should sign or respond in a particular way. For significant money, property, litigation, employment, immigration or other important legal rights, have the actual document reviewed by a qualified lawyer in the relevant jurisdiction.
          </p>
        </div>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>What is a legal document?</h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#303134", marginBottom: 10 }}>
            A legal document is a written record that can establish, describe, request, transfer or affect legal rights and obligations. The category matters: a contract, rental agreement, legal notice, court document and government form can have very different purposes and consequences.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#303134" }}>
            Before trying to interpret every sentence, identify the document type and its practical purpose. A useful first pass is to find the parties, the main obligation or demand, money or property involved, dates and deadlines, and what happens if the stated terms are not followed. This document-reading approach is also consistent with practical legal-information resources that emphasize parties, obligations, deadlines and consequences. <Source href="https://www.law.cornell.edu/wex/contract">Cornell Legal Information Institute</Source> provides general contract terminology for further context.
          </p>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 14 }}>What kinds of legal documents can you understand?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
            {DOC_TYPES.map(([h, t]) => (
              <div key={h} style={{ padding: "15px 16px", border: "1px solid #E5E7EB", borderRadius: 11, background: "#FAFAFA" }}>
                <h3 style={{ fontSize: 14, fontWeight: 730, marginBottom: 6 }}>{h}</h3>
                <p style={{ fontSize: 13, color: "#60656D", lineHeight: 1.65 }}>{t}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>How to read a legal document: a 6-point checklist</h2>
          <p style={{ fontSize: 13, color: "#646970", lineHeight: 1.7, marginBottom: 16 }}>Start with the facts that can change what you need to do. Then read the surrounding clauses for definitions, exceptions and conditions.</p>
          {CHECKLIST.map(([h, t], i) => (
            <div key={h} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 12, padding: "12px 0", borderBottom: i < CHECKLIST.length - 1 ? "1px solid #F1F5F9" : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: "#EFF6FF", color: "#1D4ED8", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800 }}>{i + 1}</div>
              <div><h3 style={{ fontSize: 14, fontWeight: 720, marginBottom: 4 }}>{h}</h3><p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7 }}>{t}</p></div>
            </div>
          ))}
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>Contract clauses worth paying attention to</h2>
          <p style={{ fontSize: 14, color: "#5F6368", lineHeight: 1.75, marginBottom: 14 }}>A clause is not automatically unfair or invalid because it sounds strict. The point is to identify provisions that can materially change your obligations and then verify them for your situation.</p>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              ["Payment and fees", "What must be paid, when, to whom, and what happens after a missed payment?"],
              ["Duration and renewal", "When does the agreement start and end? Does it renew automatically, and how can renewal be stopped?"],
              ["Termination", "Who can terminate, for what reasons, with what notice, and what happens after termination?"],
              ["Liability and indemnity", "Does one party take responsibility for losses, claims or costs that could otherwise fall elsewhere?"],
              ["Dispute resolution", "Does the document specify a court, arbitration process, governing law or another dispute mechanism?"],
              ["Definitions and exceptions", "Defined terms and exceptions can substantially change the meaning of the surrounding clauses."],
            ].map(([h, t]) => <div key={h} style={{ padding: "13px 14px", background: "#F8FAFC", borderRadius: 10, border: "1px solid #E5E7EB" }}><h3 style={{ fontSize: 14, fontWeight: 720, marginBottom: 4 }}>{h}</h3><p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.65 }}>{t}</p></div>)}
          </div>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>How to understand a legal notice</h2>
          <p style={{ fontSize: 14, color: "#303134", lineHeight: 1.8, marginBottom: 10 }}>
            If you receive a legal notice, first identify the sender, recipient, subject of the dispute, factual allegations, requested action and stated deadline. Preserve the original notice and related records. Do not assume that a notice is a court order simply because it uses formal legal language.
          </p>
          <p style={{ fontSize: 14, color: "#303134", lineHeight: 1.8 }}>
            The legal effect of a notice varies by jurisdiction and by the underlying matter. Some notices are demands or warnings; particular laws can also require notice before certain proceedings. For example, U.S. federal civil procedure has specific rules for particular government claims, while other jurisdictions have different requirements. The correct question is therefore not simply “Is this a legal notice?” but “What does this particular document require, under the law that applies to this situation?”
          </p>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>What a good AI explanation should give you</h2>
          <div style={{ display: "grid", gap: 9 }}>
            {["A plain-language summary of what the document appears to be", "The parties and their roles", "Important dates, deadlines and renewal/termination conditions", "Key obligations, payments and restrictions", "Clauses or sections that deserve closer attention", "Questions you can take to a lawyer or the other party", "Clear uncertainty where the document is incomplete, ambiguous or difficult to read"].map((x) => <div key={x} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}><span style={{ color: "#16A34A", fontWeight: 800 }}>✓</span><span style={{ fontSize: 14, lineHeight: 1.65 }}>{x}</span></div>)}
          </div>
        </section>

        <section aria-labelledby="faq" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 id="faq" style={{ fontSize: 21, fontWeight: 780, marginBottom: 16 }}>Legal document questions</h2>
          {FAQS.map(([q, a], i) => (
            <div key={q} style={{ paddingBottom: i < FAQS.length - 1 ? 16 : 0, marginBottom: i < FAQS.length - 1 ? 16 : 0, borderBottom: i < FAQS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <h3 style={{ fontSize: 14, fontWeight: 680, marginBottom: 5 }}>{q}</h3>
              <p style={{ fontSize: 13, color: "#646970", lineHeight: 1.7 }}>{a}</p>
            </div>
          ))}
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 750, marginBottom: 10 }}>Sources and further reading</h2>
          <ul style={{ paddingLeft: 20, display: "grid", gap: 8 }}>
            {sources.map(([label, href]) => <li key={href} style={{ fontSize: 13, lineHeight: 1.6 }}><Source href={href}>{label}</Source></li>)}
          </ul>
        </section>

        <section aria-labelledby="related" style={{ marginBottom: 20 }}>
          <h2 id="related" style={{ fontSize: 18, fontWeight: 750, marginBottom: 12 }}>Explore related Klarium guides</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {[
              ["Document Guides", "/guides"],
              ["Government Letter Explained", "/example-library/government-letter-explained"],
              ["Medical Report Summary", "/medical-report-summary-ai"],
              ["Doctor Prescription Explained", "/doctor-prescription-explained"],
              ["Phishing Email Detector", "/phishing-email-detector"],
              ["Scam Message Checker", "/scam-message-checker"],
            ].map(([label, href]) => <Link key={href} href={href} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 13px", borderRadius: 9, background: "#fff", border: "1px solid #E5E7EB", color: "#1D4ED8", fontSize: 13, fontWeight: 650 }}>{label} <ArrowRight size={13} /></Link>)}
          </div>
        </section>

        <div style={{ padding: "28px 24px", borderRadius: 14, background: "#0A1628", textAlign: "center", color: "#fff" }}>
          <p style={{ fontWeight: 800, fontSize: 21, marginBottom: 8, letterSpacing: "-.03em" }}>Have a legal document you do not understand?</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 20, lineHeight: 1.6 }}>Upload it to get a structured plain-language explanation, then verify important decisions with the right professional.</p>
          <Link href="/#upload" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0066CC", color: "#fff", padding: "12px 26px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>Explain My Document <ArrowRight size={15} /></Link>
        </div>
      </main>
    </div>
  );
}
