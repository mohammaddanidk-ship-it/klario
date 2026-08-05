import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Trash2, AlertTriangle, Stethoscope, Scale, DollarSign, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Trust Center — Privacy, Security & Responsible AI | Klarium",
  description: "How Klarium handles your data, protects your privacy, and uses AI responsibly. Full transparency on data retention, security, and AI limitations.",
  alternates: { canonical: "/trust-center" },
};

const SECTIONS = [
  {
    icon: Eye,
    title: "Responsible AI",
    body: "Klarium uses AI to help you understand documents — it does not make decisions for you. Every explanation is generated based on the exact content you provide, with a confidence rating so you know how certain the AI is. Klarium never claims certainty it doesn't have, and always encourages consulting a qualified professional for anything significant.",
  },
  {
    icon: Lock,
    title: "Security",
    body: "All connections to Klarium are encrypted in transit. Documents are processed through a secure server-side connection to our AI provider — your files are never exposed directly to the browser or any third party beyond what's needed to generate your explanation.",
  },
  {
    icon: Shield,
    title: "Privacy",
    body: "Klarium does not require an account, login, or personal information to use. We do not track you across other websites. The only information processed is the document or message you choose to submit, for the sole purpose of generating your explanation.",
  },
  {
    icon: Trash2,
    title: "Data Retention",
    body: "Uploaded documents and pasted text are processed in real-time and are not stored as files. For our public document-clarity library (the /explain pages), we retain only the generated explanation and a short anonymized snippet — never the full original document, and never any personally identifying information.",
  },
  {
    icon: Trash2,
    title: "Delete My Data",
    body: "Since Klarium does not require an account and does not store your original documents, there is nothing tied to your identity to delete. If you believe a specific public explanation page contains information you'd like removed, contact us and we will review and remove it.",
  },
  {
    icon: AlertTriangle,
    title: "AI Limitations",
    body: "Klarium's AI can make mistakes, especially with poor image quality, unusual document formats, or highly technical or unusual legal language. Every result includes a confidence rating to help you judge how much to rely on it. Klarium is a starting point for understanding — not a final authority.",
  },
  {
    icon: Stethoscope,
    title: "Medical Disclaimer",
    body: "Klarium provides information to help you understand medical documents in plain language. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified physician regarding any medical decisions.",
  },
  {
    icon: Scale,
    title: "Legal Disclaimer",
    body: "Klarium provides information to help you understand legal documents in plain language. It is not legal advice and does not create an attorney-client relationship. For decisions with real legal consequences, consult a qualified lawyer.",
  },
  {
    icon: DollarSign,
    title: "Financial Disclaimer",
    body: "Klarium provides information to help you understand financial documents in plain language. It is not financial advice. For decisions involving money, credit, loans, or investments, consult a qualified financial professional or your financial institution directly.",
  },
];

export default function TrustCenterPage() {
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

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px 80px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, background: "#EFF6FF", border: "1px solid #BFDBFE", marginBottom: 18 }}>
          <Shield size={13} color="#1D4ED8" />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#1E3A8A", letterSpacing: ".08em", textTransform: "uppercase" }}>Trust Center</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.03em", marginBottom: 14 }}>
          Full transparency, always
        </h1>
        <p style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.7, marginBottom: 40, maxWidth: 580 }}>
          Klarium handles sensitive documents — medical, legal, and financial. Here's exactly how we handle your data, where our AI's limitations are, and what you should know before relying on any result.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {SECTIONS.map((s) => (
            <div key={s.title} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <s.icon size={15} color="#1D4ED8" />
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>{s.title}</h2>
              </div>
              <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.7 }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: "28px 24px", borderRadius: 14, background: "#0A1628", textAlign: "center", color: "#fff" }}>
          <p style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, letterSpacing: "-.03em" }}>Questions about your data?</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", marginBottom: 20, lineHeight: 1.6 }}>We're happy to explain anything on this page in more detail.</p>
          <Link href="/#upload" style={{ display: "inline-block", background: "#0066CC", color: "#fff", padding: "12px 26px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
            Try Klarium Free →
          </Link>
        </div>
      </main>
    </div>
  );
}
