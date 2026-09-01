import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Government Letter Explained: Notice, Deadline & Next Steps | Klarium",
  description: "Learn how to understand a government letter or notice, including requests for documents, deadlines, application status, required actions, and what to verify.",
  alternates: { canonical: "/example-library/government-letter-explained" },
};

const BLOCKS = [
  { h: "What this document is", t: "This illustrative example is a government notice asking an applicant to provide additional supporting documents for an application already submitted. Government letters can contain important dates, reference numbers, requests, deadlines, and consequences for not responding." },
  { h: "What it says in plain words", t: "The office needs more paperwork before it can continue processing the application. In this synthetic example, the notice says the applicant has 30 days from the date of the letter to respond." },
  { h: "Find the exact deadline", t: "Do not assume that '30 days' means the same calendar date in every situation. Read the date printed on the actual notice and check whether the issuing authority specifies how the response period is calculated, including weekends, holidays, or receipt rules." },
  { h: "Check what documents are missing", t: "A notice may name specific documents, forms, translations, identity evidence, financial records, photographs, or other supporting material. Make a checklist from the exact wording rather than relying on a general assumption about what the office wants." },
  { h: "What happens if you do not respond", t: "Some government processes can pause, close, refuse, or otherwise affect an application when a deadline is missed. The consequence depends on the authority, application type, jurisdiction, and wording of the notice. Confirm the consequence from the actual notice or the issuing authority." },
  { h: "Verify the sender safely", t: "If a letter arrives unexpectedly or contains payment or personal-information requests, verify the issuing organisation independently. Use an official website or contact method rather than relying only on phone numbers, links, or email addresses printed in a suspicious message." },
  { h: "What should I do next?", t: "Record the reference number, identify every requested item, calculate the response deadline from the actual notice, gather the required documents, and contact the issuing office if anything is unclear. For immigration, legal, tax, benefits, or other high-stakes matters, consider professional advice." },
];

const FAQS = [
  ["What is a government letter?", "It is written communication from a government department or public authority about an application, decision, request, requirement, appointment, payment, or other official matter."],
  ["What should I look for first?", "Check the issuing authority, reference number, date, reason for the letter, required action, deadline, consequences, and contact information."],
  ["Does a government notice always mean my application was rejected?", "No. Some notices request additional information or documents, confirm a status, schedule an appointment, or explain a next step. Read the exact wording of the notice."],
  ["Can Klarium tell me what I legally have to do?", "Klarium can explain the wording and organize important details, but legal or immigration consequences depend on the jurisdiction and facts. Confirm high-stakes decisions with the appropriate authority or qualified professional."],
];

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "Inter,system-ui,-apple-system,sans-serif", color: "#1D1D1F", WebkitFontSmoothing: "antialiased" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}a{color:inherit;text-decoration:none;}`}</style>
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 28, height: 28, borderRadius: 7, background: "#0066CC", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M6.5 1L1.5 3.2V6.5c0 2.8 2.3 4.2 5 5.1 2.7-.9 5-2.3 5-5.1V3.2L6.5 1z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/></svg></span>Klarium</Link>
        <Link href="/#upload" style={{ fontSize: 13, color: "#0066CC", fontWeight: 600 }}>Try Klarium →</Link>
      </header>
      <main style={{ maxWidth: 780, margin: "0 auto", padding: "40px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#6E6E73", marginBottom: 20 }}><Link href="/" style={{ color: "#0066CC" }}>Klarium</Link>{" / "}<Link href="/example-library" style={{ color: "#0066CC" }}>Example Library</Link>{" / "}<span>Government Letter</span></nav>
        <header style={{ marginBottom: 28 }}><p style={{ fontSize: 11, fontWeight: 700, color: "#0066CC", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>Government notice example</p><h1 style={{ fontSize: "clamp(27px,5vw,42px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.035em", marginBottom: 14 }}>Government Letter, Explained</h1><p style={{ maxWidth: 700, fontSize: 17, color: "#5F6368", lineHeight: 1.65 }}>Understand common parts of a government letter or notice: why you received it, what action is requested, how to find the deadline, and what to verify before responding.</p></header>
        <div style={{ padding: "16px 18px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, marginBottom: 20 }}><p style={{ fontSize: 11, fontWeight: 800, color: "#1E3A8A", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>Important</p><p style={{ fontSize: 14, color: "#1D1D1F", lineHeight: 1.65 }}>This is a synthetic educational example. Government procedures, deadlines, and legal consequences vary by country, agency, application type, and the exact wording of the notice.</p></div>
        <div style={{ padding: "14px 18px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 16 }}><p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Illustrative government notice</p><p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, fontStyle: "italic" }}>This notice is to inform you that your application reference #GX-2291 requires additional supporting documentation within 30 days of the date of this letter, failing which the application may be closed according to the applicable procedure.</p></div>
        <article style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>{BLOCKS.map((b, i) => <section key={b.h} style={{ marginBottom: i < BLOCKS.length - 1 ? 24 : 0 }}><h2 style={{ fontSize: 16, fontWeight: 750, color: "#1E3A8A", marginBottom: 7 }}>{b.h}</h2><p style={{ fontSize: 14, color: "#1D1D1F", lineHeight: 1.75 }}>{b.t}</p></section>)}</article>
        <section aria-labelledby="faq" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}><h2 id="faq" style={{ fontSize: 18, fontWeight: 750, marginBottom: 16 }}>Government letter questions</h2>{FAQS.map(([q, a], i) => <div key={q} style={{ marginBottom: i < FAQS.length - 1 ? 16 : 0, paddingBottom: i < FAQS.length - 1 ? 16 : 0, borderBottom: i < FAQS.length - 1 ? "1px solid #F3F4F6" : "none" }}><h3 style={{ fontSize: 14, fontWeight: 650, marginBottom: 5 }}>{q}</h3><p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.65 }}>{a}</p></div>)}</section>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}><Link href="/legal-document-explainer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 13px", borderRadius: 9, background: "#fff", border: "1px solid #E5E7EB", color: "#1D4ED8", fontSize: 13, fontWeight: 650 }}>Legal Document Explainer <ArrowRight size={13} /></Link><Link href="/visa-rejection-letter-explained" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 13px", borderRadius: 9, background: "#fff", border: "1px solid #E5E7EB", color: "#1D4ED8", fontSize: 13, fontWeight: 650 }}>Visa Rejection Letter <ArrowRight size={13} /></Link></div>
        <div style={{ padding: "28px 24px", borderRadius: 14, background: "#0A1628", textAlign: "center", color: "#fff" }}><p style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, letterSpacing: "-.03em" }}>Have your own government letter?</p><p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 20, lineHeight: 1.6 }}>Upload it to get a structured plain-language explanation.</p><Link href="/#upload" style={{ display: "inline-block", background: "#0066CC", color: "#fff", padding: "12px 26px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>Explain My Document →</Link></div>
      </main>
    </div>
  );
}
