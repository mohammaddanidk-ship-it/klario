import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Government Letter Explained in Plain Language | Klarium Example",
  description: "See a real example of a confusing government notice explained simply, with deadlines and next steps clarified.",
  alternates: { canonical: "/example-library/government-letter-explained" },
};

const BLOCKS = [
  { h: "What this document is", t: "This is a request for additional documents related to an application you submitted to a government office." },
  { h: "What it says in plain words", t: "The office needs more paperwork from you to continue processing your application. You have 30 days from the letter's date to respond." },
  { h: "Key things to be aware of", t: "Missing the 30-day deadline means your application gets closed automatically, and you may need to start over." },
  { h: "What should I do next", t: "Note the exact deadline date from the letter today. Contact the office listed to confirm exactly which documents are missing before the deadline arrives." }
];

export default function Page() {
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

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px 80px" }}>
        <Link href="/example-library" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6E6E73", marginBottom: 20 }}>
          <ArrowLeft size={14} /> Back to Example Library
        </Link>

        <h1 style={{ fontSize: "clamp(26px,5vw,38px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.03em", marginBottom: 20 }}>
          Government Letter, Explained
        </h1>

        <div style={{ padding: "14px 18px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 16 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Sample Government Notice (anonymized example)</p>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-line" }}>This notice is to inform you that your application reference #GX-2291 requires additional supporting documentation within 30 days of the date of this letter, failing which the application will be closed without further notice.</p>
        </div>

        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #F3F4F6" }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "#0066CC", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FileText size={13} color="#fff" />
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#1E3A8A", letterSpacing: ".08em", textTransform: "uppercase" }}>Klarium Example Explanation</p>
          </div>
          {BLOCKS.map((b, i) => (
            <div key={i} style={{ marginBottom: i < BLOCKS.length - 1 ? 16 : 0 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#1E3A8A", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>{b.h}</p>
              <p style={{ fontSize: 14, color: "#1D1D1F", lineHeight: 1.7 }}>{b.t}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: "28px 24px", borderRadius: 14, background: "#0A1628", textAlign: "center", color: "#fff" }}>
          <p style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, letterSpacing: "-.03em" }}>Have your own document like this?</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", marginBottom: 20, lineHeight: 1.6 }}>Get your own explained free, in seconds.</p>
          <Link href="/#upload" style={{ display: "inline-block", background: "#0066CC", color: "#fff", padding: "12px 26px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
            Explain My Document →
          </Link>
        </div>

        <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 16, textAlign: "center" }}>
          This is an anonymized example for illustration purposes only, not a real user's document.
        </p>
      </main>
    </div>
  );
}
