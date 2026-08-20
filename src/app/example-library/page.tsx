import type { Metadata } from "next";
import Link from "next/link";
import { HeartPulse, Scale, Landmark, ShieldCheck, FileText, ArrowRight, ClipboardPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Document & Scam Example Library — What Klarium Explains | Klarium",
  description: "Browse illustrative examples of documents, prescriptions, medical reports, legal notices, bank letters, and scam messages that Klarium can help explain in plain language.",
  alternates: { canonical: "/example-library" },
};

const CATEGORIES = [
  {
    group: "Medical & Prescriptions",
    icon: HeartPulse,
    items: [
      { label: "Medical Report Summary", href: "/medical-report-summary-ai" },
      { label: "Doctor Prescription Explained", href: "/doctor-prescription-explained", icon: ClipboardPlus },
      { label: "CBC Blood Test Results", href: "/example-library/cbc-blood-test-explained" },
      { label: "MRI Report", href: "/example-library/mri-report-explained" },
      { label: "CT Scan Report", href: "/example-library/ct-scan-explained" },
      { label: "Medical Bill", href: "/medical-bill-explained" },
    ],
  },
  {
    group: "Legal & Contracts",
    icon: Scale,
    items: [
      { label: "Legal Document Explainer", href: "/legal-document-explainer" },
      { label: "Employment Contract", href: "/employment-contract-explainer" },
      { label: "Rental Agreement", href: "/rental-agreement-explained" },
      { label: "Court Notice", href: "/court-notice-explained" },
    ],
  },
  {
    group: "Financial & Government",
    icon: Landmark,
    items: [
      { label: "Bank Rejection Letter", href: "/bank-rejection-letter-explained" },
      { label: "Insurance Policy", href: "/insurance-policy-explained" },
      { label: "Insurance Claim Response", href: "/example-library/insurance-claim-explained" },
      { label: "Government Letter", href: "/example-library/government-letter-explained" },
      { label: "Visa Rejection Letter", href: "/visa-rejection-letter-explained" },
    ],
  },
  {
    group: "Scam & Phishing Detection",
    icon: ShieldCheck,
    items: [
      { label: "Phishing Email Detector", href: "/phishing-email-detector" },
      { label: "Scam Message Checker", href: "/scam-message-checker" },
      { label: "Fake Bank Email", href: "/example-library/fake-bank-email-example" },
      { label: "Fake Delivery Scam", href: "/example-library/fake-delivery-scam-example" },
      { label: "WhatsApp Scam", href: "/whatsapp-scam-checker" },
      { label: "Job Offer Scam", href: "/job-offer-scam-checker" },
      { label: "Crypto Investment Scam", href: "/crypto-investment-scam-checker" },
    ],
  },
];

export default function ExampleLibraryPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "Inter,system-ui,-apple-system,sans-serif", color: "#1D1D1F", WebkitFontSmoothing: "antialiased" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}a{color:inherit;text-decoration:none;}`}</style>

      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: "#0066CC", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L1.5 3.2V6.5c0 2.8 2.3 4.2 5 5.1 2.7-.9 5-2.3 5-5.1V3.2L6.5 1z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/></svg>
          </span>
          Klarium
        </Link>
        <Link href="/#upload" style={{ fontSize: 13, color: "#0066CC", fontWeight: 600 }}>Try Klarium →</Link>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#6B7280", marginBottom: 20 }}>
          <Link href="/" style={{ color: "#0066CC" }}>Klarium</Link><span aria-hidden="true"> / </span><span>Example Library</span>
        </nav>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, background: "#EFF6FF", border: "1px solid #BFDBFE", marginBottom: 18 }}>
          <FileText size={13} color="#1D4ED8" />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#1E3A8A", letterSpacing: ".08em", textTransform: "uppercase" }}>Example Library</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.03em", marginBottom: 14 }}>Explore what Klarium can explain</h1>
        <p style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.7, marginBottom: 18, maxWidth: 640 }}>
          Explore illustrative document and message guides before using Klarium on your own file. The examples below are educational guides, not private documents submitted by visitors.
        </p>
        <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 40, maxWidth: 640 }}>
          Klarium covers four connected search topics: understanding medical information, understanding legal and financial documents, interpreting prescriptions safely, and checking suspicious messages.
        </p>

        {CATEGORIES.map((cat) => (
          <section key={cat.group} aria-labelledby={`category-${cat.group}`} style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}><cat.icon size={14} color="#1D4ED8" /></div>
              <h2 id={`category-${cat.group}`} style={{ fontSize: 16, fontWeight: 700 }}>{cat.group}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10 }}>
              {cat.items.map((item) => (
                <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, fontSize: 14, fontWeight: 500 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 7 }}>{item.icon ? <item.icon size={14} color="#1D4ED8" /> : null}{item.label}</span><ArrowRight size={14} color="#9CA3AF" />
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div style={{ marginTop: 20, padding: "28px 24px", borderRadius: 14, background: "#0A1628", textAlign: "center", color: "#fff" }}>
          <p style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, letterSpacing: "-.03em" }}>Have your own document?</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", marginBottom: 20, lineHeight: 1.6 }}>Skip the examples — get your own explained right now, free.</p>
          <Link href="/#upload" style={{ display: "inline-block", background: "#0066CC", color: "#fff", padding: "12px 26px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>Explain My Document →</Link>
        </div>
      </main>
    </div>
  );
}
