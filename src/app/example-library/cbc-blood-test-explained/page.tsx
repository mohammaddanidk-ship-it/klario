import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "CBC Blood Test Results Explained: WBC, Hemoglobin, MCV & More | Klarium",
  description: "Learn how to read CBC blood test results in plain language, including white blood cells, hemoglobin, platelets, MCV, anemia patterns, reference ranges, and what to discuss with a doctor.",
  alternates: { canonical: "/example-library/cbc-blood-test-explained" },
};

const BLOCKS = [
  { h: "What this document is", t: "A Complete Blood Count (CBC) is a common blood test that measures several types of blood cells and related values. A CBC report may include white blood cells (WBC), red blood cells (RBC), hemoglobin, hematocrit, platelets, MCV, MCH, MCHC, and other measurements depending on the laboratory." },
  { h: "What this example says in plain words", t: "In this illustrative report, the white blood cell count is mildly elevated, while hemoglobin and MCV are low. Together, low hemoglobin and low MCV can be seen in a microcytic anemia pattern, but the cause cannot be determined from these numbers alone. Platelets are within the stated example range." },
  { h: "White blood cells (WBC)", t: "WBCs are part of the immune system. A higher or lower WBC count can have many causes, including infection, inflammation, medicines, immune conditions, or normal variation. The WBC number should be interpreted with the laboratory's reference range and the person's symptoms and history." },
  { h: "Hemoglobin and hematocrit", t: "Hemoglobin carries oxygen in the blood. A low hemoglobin result can be associated with anemia, but the cause requires context. Hematocrit describes the proportion of blood made up of red blood cells and is usually interpreted together with other CBC values." },
  { h: "MCV: what the number means", t: "MCV describes the average size of red blood cells. A low MCV means the red blood cells are smaller than the laboratory's reference range. Low MCV can occur with iron deficiency and several other conditions, so it is a clue rather than a diagnosis." },
  { h: "Platelets", t: "Platelets help blood clot. A platelet count that is outside the laboratory's range can have different explanations, and the significance depends on how high or low it is, other results, symptoms, medicines, and the clinical context." },
  { h: "Reference ranges matter", t: "There is no single universal 'normal CBC' number for every laboratory and person. Reference ranges can differ by laboratory method, age, sex, pregnancy status, and other factors. Always read the result together with the reference range printed on the actual report." },
  { h: "What to discuss with a doctor", t: "If a CBC shows persistent anemia, unusual WBC results, platelet abnormalities, or multiple flagged values, ask the appropriate healthcare professional what the pattern means in your specific context and whether follow-up testing is needed. Do not diagnose yourself from one CBC result." },
];

const FAQS = [
  ["What does CBC stand for?", "CBC stands for Complete Blood Count. It is a blood test that measures several blood-cell values."],
  ["What does a low hemoglobin result mean?", "Low hemoglobin can indicate anemia, but the cause cannot be determined from hemoglobin alone. Other CBC values, symptoms, history, and sometimes additional tests are needed."],
  ["What does low MCV mean on a CBC?", "Low MCV means the average red blood cell size is below the laboratory's reference range. It can occur with iron deficiency and other conditions and is not itself a diagnosis."],
  ["What does a high WBC count mean?", "A high WBC count can occur for many reasons, including infection or inflammation. It needs to be interpreted with the reference range, symptoms, and other results."],
  ["Can Klarium diagnose anemia from a CBC?", "No. Klarium can explain CBC terminology and organize findings, but a diagnosis and treatment plan should come from a qualified healthcare professional."],
];

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "Inter,system-ui,-apple-system,sans-serif", color: "#1D1D1F", WebkitFontSmoothing: "antialiased" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}a{color:inherit;text-decoration:none;}`}</style>
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: "#0066CC", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M6.5 1L1.5 3.2V6.5c0 2.8 2.3 4.2 5 5.1 2.7-.9 5-2.3 5-5.1V3.2L6.5 1z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/></svg></span>
          Klarium
        </Link>
        <Link href="/#upload" style={{ fontSize: 13, color: "#0066CC", fontWeight: 600 }}>Try Klarium →</Link>
      </header>
      <main style={{ maxWidth: 780, margin: "0 auto", padding: "40px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#6E6E73", marginBottom: 20 }}><Link href="/" style={{ color: "#0066CC" }}>Klarium</Link>{" / "}<Link href="/example-library" style={{ color: "#0066CC" }}>Example Library</Link>{" / "}<span>CBC Blood Test Results</span></nav>
        <header style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#0066CC", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>Medical example guide</p>
          <h1 style={{ fontSize: "clamp(27px,5vw,42px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.035em", marginBottom: 14 }}>CBC Blood Test Results, Explained</h1>
          <p style={{ maxWidth: 700, fontSize: 17, color: "#5F6368", lineHeight: 1.65 }}>Learn what common CBC values mean, including WBC, hemoglobin, MCV and platelets, and how to read results together with the reference range on your report.</p>
        </header>
        <div style={{ padding: "16px 18px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, marginBottom: 20 }}><p style={{ fontSize: 11, fontWeight: 800, color: "#1E3A8A", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>Important</p><p style={{ fontSize: 14, color: "#1D1D1F", lineHeight: 1.65 }}>This is a synthetic educational example, not a real patient's report. CBC results must be interpreted using the actual laboratory reference ranges and clinical context.</p></div>
        <div style={{ padding: "14px 18px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 16 }}><p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Illustrative CBC report</p><p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-line" }}>White Blood Cell Count: 11.8 x10^9/L (High)\nHemoglobin: 10.9 g/dL (Low)\nPlatelet Count: 165 x10^9/L (Normal)\nMCV: 78 fL (Low)</p></div>
        <article style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          {BLOCKS.map((b, i) => <section key={b.h} style={{ marginBottom: i < BLOCKS.length - 1 ? 24 : 0 }}><h2 style={{ fontSize: 16, fontWeight: 750, color: "#1E3A8A", marginBottom: 7 }}>{b.h}</h2><p style={{ fontSize: 14, color: "#1D1D1F", lineHeight: 1.75 }}>{b.t}</p></section>)}
        </article>
        <section aria-labelledby="faq" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}><h2 id="faq" style={{ fontSize: 18, fontWeight: 750, marginBottom: 16 }}>CBC blood test questions</h2>{FAQS.map(([q, a], i) => <div key={q} style={{ marginBottom: i < FAQS.length - 1 ? 16 : 0, paddingBottom: i < FAQS.length - 1 ? 16 : 0, borderBottom: i < FAQS.length - 1 ? "1px solid #F3F4F6" : "none" }}><h3 style={{ fontSize: 14, fontWeight: 650, marginBottom: 5 }}>{q}</h3><p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.65 }}>{a}</p></div>)}</section>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}><Link href="/medical-report-summary-ai" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 13px", borderRadius: 9, background: "#fff", border: "1px solid #E5E7EB", color: "#1D4ED8", fontSize: 13, fontWeight: 650 }}>Medical Report Explainer <ArrowRight size={13} /></Link><Link href="/doctor-prescription-explained" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 13px", borderRadius: 9, background: "#fff", border: "1px solid #E5E7EB", color: "#1D4ED8", fontSize: 13, fontWeight: 650 }}>Doctor Prescription Guide <ArrowRight size={13} /></Link></div>
        <div style={{ padding: "28px 24px", borderRadius: 14, background: "#0A1628", textAlign: "center", color: "#fff" }}><p style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, letterSpacing: "-.03em" }}>Have your own CBC report?</p><p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 20, lineHeight: 1.6 }}>Upload it to get a structured plain-language explanation.</p><Link href="/#upload" style={{ display: "inline-block", background: "#0066CC", color: "#fff", padding: "12px 26px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>Explain My Document →</Link></div>
      </main>
    </div>
  );
}
