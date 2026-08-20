import Link from "next/link";
import { ShieldCheck, ArrowRight, type LucideIcon } from "lucide-react";

interface FAQItem { q: string; a: string; }

interface LandingProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  problem: string;
  solutionPoints: string[];
  faqs: FAQItem[];
  ctaLabel: string;
  ctaHref?: string;
}

const RELATED_LINKS = [
  { label: "Medical Report Summary", href: "/medical-report-summary-ai" },
  { label: "Doctor Prescription Explained", href: "/doctor-prescription-explained" },
  { label: "Legal Document Explainer", href: "/legal-document-explainer" },
  { label: "Phishing Email Detector", href: "/phishing-email-detector" },
  { label: "Scam Message Checker", href: "/scam-message-checker" },
  { label: "Document Understanding AI", href: "/document-understanding-ai" },
  { label: "Example Library", href: "/example-library" },
  { label: "Trust Center", href: "/trust-center" },
];

export function SEOLanding({
  eyebrow, title, subtitle, icon: Icon, problem, solutionPoints, faqs,
  ctaLabel, ctaHref = "/#upload",
}: LandingProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "Inter,system-ui,-apple-system,sans-serif", color: "#1D1D1F", WebkitFontSmoothing: "antialiased" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}a{color:inherit;text-decoration:none;}`}</style>
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: "#0066CC", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L1.5 3.2V6.5c0 2.8 2.3 4.2 5 5.1 2.7-.9 5-2.3 5-5.1V3.2L6.5 1z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/></svg></span>
          Klarium
        </Link>
        <Link href={ctaHref} style={{ fontSize: 13, color: "#0066CC", fontWeight: 600 }}>{ctaLabel} →</Link>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#6B7280", marginBottom: 20 }}><Link href="/" style={{ color: "#0066CC" }}>Klarium</Link><span aria-hidden="true"> / </span><span>{eyebrow}</span></nav>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, background: "#EFF6FF", border: "1px solid #BFDBFE", marginBottom: 18 }}><Icon size={13} color="#1D4ED8" /><span style={{ fontSize: 11, fontWeight: 700, color: "#1E3A8A", letterSpacing: ".08em", textTransform: "uppercase" }}>{eyebrow}</span></div>
        <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.03em", marginBottom: 14 }}>{title}</h1>
        <p style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.7, marginBottom: 32, maxWidth: 600 }}>{subtitle}</p>

        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>The problem</p>
          <p style={{ fontSize: 15, color: "#1D1D1F", lineHeight: 1.7 }}>{problem}</p>
        </div>

        <section aria-labelledby="how-klarium-helps" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 16 }}>
          <h2 id="how-klarium-helps" style={{ fontSize: 14, fontWeight: 700, color: "#1E3A8A", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>How Klarium helps</h2>
          {solutionPoints.map((p, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < solutionPoints.length - 1 ? 10 : 0, alignItems: "flex-start" }}><span style={{ width: 20, height: 20, borderRadius: "50%", background: "#EFF6FF", color: "#1D4ED8", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{i + 1}</span><span style={{ fontSize: 15, lineHeight: 1.65 }}>{p}</span></div>)}
        </section>

        <section aria-labelledby="how-it-works" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 16 }}>
          <h2 id="how-it-works" style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>How it works</h2>
          <ol style={{ paddingLeft: 20, color: "#374151" }}>
            <li style={{ marginBottom: 9, fontSize: 14, lineHeight: 1.6 }}><strong>Provide the document or message.</strong> Upload a supported file, image, scan, or paste text.</li>
            <li style={{ marginBottom: 9, fontSize: 14, lineHeight: 1.6 }}><strong>Klarium identifies the task.</strong> The system analyzes the content and applies the appropriate explanation or safety workflow.</li>
            <li style={{ marginBottom: 9, fontSize: 14, lineHeight: 1.6 }}><strong>Read the structured result.</strong> Key terms, meaning, important details, risks, and next steps are organized into clear sections.</li>
            <li style={{ fontSize: 14, lineHeight: 1.6 }}><strong>Verify important decisions.</strong> Medical, legal, financial, and safety-sensitive information should be confirmed with an appropriate professional.</li>
          </ol>
        </section>

        <div style={{ padding: "16px 20px", borderRadius: 12, background: "#F0FDF4", border: "1px solid #BBF7D0", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}><ShieldCheck size={16} color="#15803D" /><span style={{ fontSize: 13, fontWeight: 600, color: "#166534" }}>Documents are processed for your request · No account required · Free to try</span></div>

        <section aria-labelledby="faq" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 24 }}>
          <h2 id="faq" style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Frequently asked questions</h2>
          {faqs.map((f, i) => <div key={i} style={{ marginBottom: i < faqs.length - 1 ? 14 : 0, paddingBottom: i < faqs.length - 1 ? 14 : 0, borderBottom: i < faqs.length - 1 ? "1px solid #F3F4F6" : "none" }}><p style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{f.q}</p><p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6 }}>{f.a}</p></div>)}
        </section>

        <section aria-labelledby="explore-more" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 24 }}>
          <h2 id="explore-more" style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Explore related guides</h2>
          <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6, marginBottom: 14 }}>Continue through Klarium's topic clusters to understand related documents and safety checks.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{RELATED_LINKS.map((link) => <Link key={link.href} href={link.href} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "8px 11px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#F9FAFB", fontSize: 12, fontWeight: 600, color: "#1D4ED8" }}>{link.label} <ArrowRight size={12} /></Link>)}</div>
        </section>

        <div style={{ padding: "28px 24px", borderRadius: 14, background: "#0A1628", textAlign: "center", color: "#fff" }}><p style={{ fontWeight: 800, fontSize: 22, marginBottom: 8, letterSpacing: "-.03em" }}>Try it with your own document</p><p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", marginBottom: 22, lineHeight: 1.6 }}>Free, private, instant. No account needed.</p><Link href={ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0066CC", color: "#fff", padding: "13px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15 }}>{ctaLabel} <ArrowRight size={15} /></Link></div>
      </main>
    </div>
  );
}
