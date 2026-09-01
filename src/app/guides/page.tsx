import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.klarium.co";

export const metadata: Metadata = {
  title: "Document Guides: Medical, Legal, Financial & Scam Documents",
  description: "Clear guides for understanding medical reports, doctor prescriptions, legal documents, bills, letters, insurance papers, and suspicious messages.",
  alternates: { canonical: `${SITE}/guides` },
  openGraph: { title: "Document Guides: Medical, Legal, Financial & Scam Documents | Klarium", description: "Clear guides for understanding important documents and suspicious messages in plain language.", url: `${SITE}/guides`, siteName: "Klarium", type: "website" },
  robots: { index: true, follow: true },
};

const groups = [
  { title: "Medical documents", intro: "Learn what common medical reports, test results, prescriptions and bills contain. Use these guides to understand terminology and identify what should be discussed with a qualified professional.", links: [["CBC blood test results explained", "/example-library/cbc-blood-test-explained"], ["MRI report explained", "/example-library/mri-report-explained"], ["CT scan report explained", "/example-library/ct-scan-explained"], ["Doctor prescription explained", "/doctor-prescription-explained"], ["Medical report summary", "/medical-report-summary-ai"], ["Medical bill explained", "/medical-bill-explained"]] },
  { title: "Legal, work & official documents", intro: "Understand common agreements, notices, insurance paperwork and official letters by focusing on dates, obligations, amounts, conditions and next steps.", links: [["Rental agreement explained", "/rental-agreement-explained"], ["Legal document explainer", "/legal-document-explainer"], ["Employment contract explained", "/employment-contract-explainer"], ["Government letter explained", "/example-library/government-letter-explained"], ["Court notice explained", "/court-notice-explained"], ["Insurance policy explained", "/insurance-policy-explained"], ["Insurance claim explained", "/example-library/insurance-claim-explained"], ["Visa rejection letter explained", "/visa-rejection-letter-explained"]] },
  { title: "Scam & phishing guides", intro: "Learn how to recognize suspicious messages and common fraud patterns before clicking links, sending money or sharing sensitive information.", links: [["Phishing email detector", "/phishing-email-detector"], ["Scam message checker", "/scam-message-checker"], ["WhatsApp scam checker", "/whatsapp-scam-checker"], ["Job offer scam checker", "/job-offer-scam-checker"], ["Fake bank email example", "/example-library/fake-bank-email-example"], ["Fake delivery scam example", "/example-library/fake-delivery-scam-example"]] },
];

const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Document Guides", url: `${SITE}/guides`, description: "Clear guides for understanding important documents and suspicious messages.", isPartOf: { "@type": "WebSite", name: "Klarium", url: SITE } };

export default function GuidesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#F5F7FA", color: "#111827", fontFamily: "Inter,system-ui,-apple-system,sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 22px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}><Link href="/" style={{ fontWeight: 800, fontSize: 18 }}>Klarium</Link><Link href="/#upload" style={{ color: "#1683FF", fontWeight: 700, fontSize: 13 }}>Explain a document →</Link></header>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "52px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#6B7280", marginBottom: 24 }}><Link href="/" style={{ color: "#1683FF" }}>Klarium</Link> / Document Guides</nav>
        <header style={{ maxWidth: 760, marginBottom: 42 }}><p style={{ color: "#1683FF", fontWeight: 800, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>Klarium Guides</p><h1 style={{ fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 16px", fontWeight: 850 }}>Understand the document before you act.</h1><p style={{ fontSize: 18, lineHeight: 1.7, color: "#4B5563", margin: 0 }}>Explore practical explanations for medical reports, prescriptions, legal documents, official letters, insurance paperwork and suspicious messages. Klarium turns difficult wording into plain-language guidance while clearly separating explanation from professional advice.</p></header>
        <div style={{ display: "grid", gap: 22 }}>{groups.map((group) => <section key={group.title} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 18, padding: "26px 26px 22px", boxShadow: "0 2px 8px rgba(15,23,42,.04)" }}><h2 style={{ fontSize: 22, margin: "0 0 8px", letterSpacing: "-0.02em" }}>{group.title}</h2><p style={{ color: "#6B7280", lineHeight: 1.65, fontSize: 14, maxWidth: 760, margin: "0 0 18px" }}>{group.intro}</p><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10 }}>{group.links.map(([label, href]) => <Link key={href} href={href} style={{ display: "block", border: "1px solid #E5E7EB", borderRadius: 11, padding: "14px 15px", background: "#FAFBFC" }}><span style={{ display: "block", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{label}</span><span style={{ color: "#1683FF", fontSize: 11, fontWeight: 650 }}>Read guide →</span></Link>)}</div></section>)}</div>
        <section style={{ marginTop: 24, padding: "26px", borderRadius: 18, background: "#0F1B2D", color: "#fff", textAlign: "center" }}><h2 style={{ fontSize: 24, margin: "0 0 8px", letterSpacing: "-0.025em" }}>Have a document that is not listed?</h2><p style={{ color: "rgba(255,255,255,.68)", lineHeight: 1.6, maxWidth: 620, margin: "0 auto 18px", fontSize: 14 }}>Upload it to Klarium. The system can identify the document type and explain the important parts in your chosen language.</p><Link href="/#upload" style={{ display: "inline-block", background: "#1683FF", color: "#fff", padding: "12px 22px", borderRadius: 9, fontWeight: 750, fontSize: 13 }}>Explain My Document →</Link></section>
        <p style={{ color: "#9CA3AF", fontSize: 11, lineHeight: 1.6, marginTop: 20, textAlign: "center" }}>Klarium provides educational explanations, not medical, legal, financial, tax, immigration or other professional advice.</p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
