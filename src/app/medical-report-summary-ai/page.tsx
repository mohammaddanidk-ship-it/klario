import type { Metadata } from "next";
import { HeartPulse, CheckCircle2, AlertTriangle, FileSearch, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Report Summary: Read & Understand Your Report | Klarium",
  description: "Read your medical report in plain language. Klarium helps organize lab results, medical terms, reference ranges, important findings, uncertainties, and questions for your doctor.",
  alternates: { canonical: "/medical-report-summary-ai" },
};

const cards = [
  { icon: CheckCircle2, title: "What the report actually says", text: "Separate facts visible in the document from AI interpretation so you can tell what is directly supported." },
  { icon: AlertTriangle, title: "Values outside the stated range", text: "When a reference range is visible, Klarium can explain which result is outside that laboratory's stated range without pretending it gives a diagnosis." },
  { icon: FileSearch, title: "Terms and abbreviations", text: "Turn clinical language, test names and abbreviations into straightforward explanations." },
  { icon: MessageCircleQuestion, title: "Questions for your doctor", text: "Get practical questions to discuss with a qualified clinician instead of guessing what a result means." },
];

export default function Page() {
  return (
    <main style={{ minHeight: "100vh", background: "#F5F5F7", color: "#1D1D1F", fontFamily: "Inter,system-ui,-apple-system,sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 16 }}>Klarium</Link>
        <Link href="/#upload" style={{ color: "#0066CC", fontSize: 13, fontWeight: 700 }}>Read my report →</Link>
      </header>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "44px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#6B7280", marginBottom: 18 }}>
          <Link href="/" style={{ color: "#0066CC" }}>Klarium</Link> / Medical Report Summary
        </nav>

        <div style={{ display: "inline-flex", gap: 7, alignItems: "center", padding: "6px 12px", borderRadius: 999, background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1E3A8A", fontSize: 11, fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 16 }}>
          <HeartPulse size={14} /> Medical report summary
        </div>

        <h1 style={{ fontSize: "clamp(30px,5vw,48px)", lineHeight: 1.08, letterSpacing: "-.035em", margin: "0 0 16px", fontWeight: 850 }}>
          Read and understand your medical report in plain language
        </h1>
        <p style={{ maxWidth: 680, fontSize: 18, lineHeight: 1.7, color: "#4B5563", marginBottom: 28 }}>
          Upload a medical report, lab result, scan report, or doctor&apos;s note. Klarium organizes what is written, explains unfamiliar terms, highlights important details, and shows where uncertainty remains.
        </p>

        <section style={{ background: "#0A1628", color: "#fff", borderRadius: 16, padding: "28px 24px", marginBottom: 18 }}>
          <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 9 }}>The useful difference</p>
          <h2 style={{ fontSize: 25, lineHeight: 1.25, marginBottom: 10 }}>Don&apos;t just get a summary. See what is known, what it means, and what is uncertain.</h2>
          <p style={{ color: "rgba(255,255,255,.68)", lineHeight: 1.7, fontSize: 14 }}>
            A medical report can contain numbers, abbreviations, reference ranges, impressions, and clinical language. Klarium is designed to keep those layers distinct rather than turning everything into one confident-sounding paragraph.
          </p>
        </section>

        <section aria-labelledby="features" style={{ display: "grid", gap: 12, marginBottom: 18 }}>
          <h2 id="features" style={{ fontSize: 20, margin: "8px 0 2px" }}>What a medical report summary can contain</h2>
          {cards.map(({ icon: Icon, title, text }) => (
            <article key={title} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 13, padding: "19px 20px", display: "flex", gap: 13 }}>
              <Icon size={19} color="#1D4ED8" style={{ flexShrink: 0, marginTop: 2 }} />
              <div><h3 style={{ fontSize: 15, marginBottom: 5 }}>{title}</h3><p style={{ fontSize: 14, lineHeight: 1.65, color: "#4B5563" }}>{text}</p></div>
            </article>
          ))}
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 13, padding: "21px 20px", marginBottom: 18 }}>
          <h2 style={{ fontSize: 19, marginBottom: 12 }}>How to read a report safely</h2>
          <ol style={{ paddingLeft: 21, color: "#374151", lineHeight: 1.75, fontSize: 14 }}>
            <li>Identify the test or document section and the date.</li>
            <li>Look at the value together with the reference range printed by that laboratory, when available.</li>
            <li>Separate a measured result from the interpretation or impression written by the clinician.</li>
            <li>Do not infer a diagnosis from one number without clinical context.</li>
            <li>Use the generated questions to have a more informed conversation with your doctor.</li>
          </ol>
        </section>

        <section style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 13, padding: "19px 20px", marginBottom: 22 }}>
          <h2 style={{ fontSize: 17, marginBottom: 7 }}>Important medical limitation</h2>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#7C2D12" }}>
            Klarium is an explanation and information tool, not a doctor or diagnostic service. Reference ranges vary by laboratory and person. If a result is alarming, you have serious symptoms, or you are unsure what to do, contact an appropriate healthcare professional promptly.
          </p>
        </section>

        <div style={{ textAlign: "center", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 15, padding: "27px 20px" }}>
          <h2 style={{ fontSize: 23, marginBottom: 7 }}>Have the report already?</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 18 }}>Upload it and start with the information you actually need to understand.</p>
          <Link href="/#upload" style={{ display: "inline-block", background: "#0066CC", color: "#fff", padding: "13px 25px", borderRadius: 9, fontWeight: 750, fontSize: 14 }}>Explain my medical report →</Link>
        </div>

        <p style={{ marginTop: 22, fontSize: 12, lineHeight: 1.6, color: "#6B7280", textAlign: "center" }}>
          Also see <Link href="/example-library/cbc-blood-test-explained" style={{ color: "#1D4ED8" }}>CBC blood test explanations</Link> and <Link href="/doctor-prescription-explained" style={{ color: "#1D4ED8" }}>doctor prescription explanations</Link>.
        </p>
      </div>
    </main>
  );
}
