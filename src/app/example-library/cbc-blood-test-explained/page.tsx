import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const SITE = "https://www.klarium.co";
const PAGE_URL = `${SITE}/example-library/cbc-blood-test-explained`;

export const metadata: Metadata = {
  title: "CBC Blood Test Results: Normal Values & Interpretation | Klarium",
  description:
    "Learn how to read CBC blood test results: WBC, RBC, hemoglobin, hematocrit, MCV, MCH, MCHC, RDW, platelets and the differential, with reference-range guidance and safe next steps.",
  alternates: { canonical: "/example-library/cbc-blood-test-explained" },
};

const CORE_ROWS = [
  ["WBC", "White blood cells", "About 3.4–9.6 billion/L in one Mayo adult reference set", "Cells involved in immune defense"],
  ["RBC", "Red blood cells", "Male: 4.35–5.65 trillion/L; Female: 3.92–5.13 trillion/L", "Cells that carry oxygen"],
  ["Hemoglobin (Hgb/Hb)", "Oxygen-carrying protein", "Male: 13.2–16.6 g/dL; Female: 11.6–15.0 g/dL", "A major marker used when assessing anemia"],
  ["Hematocrit (Hct)", "Percentage of blood made up of RBCs", "Male: 38.3–48.6%; Female: 35.5–44.9%", "Interpreted with hemoglobin and RBC findings"],
  ["MCV", "Mean corpuscular volume", "Often around 80–100 fL; use your laboratory's range", "Average red-cell size"],
  ["MCH", "Mean corpuscular hemoglobin", "Often around 27–32 pg/cell; use your laboratory's range", "Average hemoglobin amount per red cell"],
  ["MCHC", "Mean corpuscular hemoglobin concentration", "Often around 32–36 g/dL; use your laboratory's range", "Hemoglobin concentration inside red cells"],
  ["Platelets (PLT)", "Platelet count", "Male: 135–317 billion/L; Female: 157–371 billion/L in one Mayo adult reference set", "Cells that help blood clot"],
];

const DIFFERENTIAL = [
  ["Neutrophils", "A major first-line white-cell defense against many infections and other inflammatory signals."],
  ["Lymphocytes", "White cells involved in adaptive and other immune responses."],
  ["Monocytes", "White cells involved in immune surveillance and removal of cellular debris."],
  ["Eosinophils", "White cells that can be involved in allergic and parasitic responses."],
  ["Basophils", "A less common white-cell type involved in inflammatory and allergic responses."],
];

const PATTERNS = [
  ["Low hemoglobin + low MCV", "This can fit a microcytic anemia pattern. Iron deficiency is one possible cause, but other causes exist; additional history and testing may be needed."],
  ["Low hemoglobin + high MCV", "This can fit a macrocytic pattern. Vitamin deficiencies, medicines and other conditions can be considered depending on the clinical context."],
  ["High WBC", "A high white-cell count can occur with infection, inflammation, medicines and other conditions. The differential and symptoms help provide context."],
  ["Low WBC", "A low white-cell count can have many causes, including some infections, medicines, immune conditions and reduced blood-cell production."],
  ["Low platelets", "A low platelet count can affect bleeding risk, but the significance depends on the degree of reduction, symptoms and the reason for the result."],
  ["High platelets", "A high platelet count can occur for several reasons, including reactive changes. It should be interpreted with the rest of the CBC and clinical history."],
];

const FAQS = [
  ["What does CBC stand for?", "CBC stands for Complete Blood Count. It is a blood test that measures red blood cells, white blood cells, platelets and related measurements."],
  ["What are normal CBC values?", "There is no single universal CBC range. Reference intervals vary by laboratory and can also vary with factors such as age and sex. The range printed on your own report is the most relevant starting point."],
  ["What does low hemoglobin mean on a CBC?", "Low hemoglobin can be a sign of anemia, but it does not identify the cause by itself. Hematocrit, RBC indices such as MCV, symptoms, history and sometimes additional tests are considered together."],
  ["What does low MCV mean?", "Low MCV means the average red blood cell is smaller than the laboratory's reference range. It can occur with iron deficiency and other conditions, so it is a clue rather than a diagnosis."],
  ["What does a high WBC count mean?", "A high WBC count can happen for many reasons, including infection or inflammation. It should be interpreted with the differential, reference range, symptoms and medical history."],
  ["Can a CBC diagnose cancer or leukemia?", "A CBC can reveal patterns that may prompt further evaluation, but it cannot by itself confirm or rule out cancer. Diagnosis requires clinical assessment and, when appropriate, additional testing."],
  ["Is a CBC the same as a hemogram or complete blood picture?", "These terms are often used for broadly similar blood-count testing, but the exact panel and reported measurements can differ by laboratory. Check the tests and reference ranges on your report."],
  ["Can Klarium diagnose anemia from my CBC?", "No. Klarium is designed to explain document information in plain language and help organize questions. Diagnosis and treatment decisions should come from a qualified healthcare professional who can assess your full context."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: "CBC Blood Test Results: Normal Values & Interpretation",
      description: "Plain-language guide to understanding common CBC blood test measurements, reference ranges and result patterns.",
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      publisher: { "@type": "Organization", name: "Klarium", url: SITE },
      about: [
        "Complete Blood Count",
        "CBC blood test",
        "CBC results",
        "hemoglobin",
        "MCV",
        "white blood cells",
        "platelets",
      ],
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Klarium", item: SITE },
        { "@type": "ListItem", position: 2, name: "Example Library", item: `${SITE}/example-library` },
        { "@type": "ListItem", position: 3, name: "CBC Blood Test Results", item: PAGE_URL },
      ],
    },
  ],
};

const sourceLink = (href: string, children: React.ReactNode) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#1D4ED8", textDecoration: "underline", textUnderlineOffset: 2 }}
  >
    {children} <ExternalLink size={11} style={{ display: "inline", verticalAlign: "-1px" }} />
  </a>
);

export default function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F5F7",
        fontFamily: "Inter,system-ui,-apple-system,sans-serif",
        color: "#1D1D1F",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}a{color:inherit;text-decoration:none;}table{border-collapse:collapse;width:100%;}`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Link href="/" style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
          Klarium
        </Link>
        <Link href="/#upload" style={{ fontSize: 13, color: "#0066CC", fontWeight: 600 }}>
          Try Klarium →
        </Link>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#6E6E73", marginBottom: 20 }}>
          <Link href="/" style={{ color: "#0066CC" }}>Klarium</Link>{" / "}
          <Link href="/example-library" style={{ color: "#0066CC" }}>Example Library</Link>{" / "}
          <span>CBC Blood Test Results</span>
        </nav>

        <header style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#0066CC", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>
            Medical example guide
          </p>
          <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.035em", marginBottom: 14 }}>
            CBC Blood Test Results: Normal Values &amp; Interpretation
          </h1>
          <p style={{ maxWidth: 780, fontSize: 17, color: "#5F6368", lineHeight: 1.65 }}>
            Learn how to read a Complete Blood Count (CBC), including WBC, RBC, hemoglobin, hematocrit, MCV, MCH, MCHC, platelets and the white-cell differential. Use the reference range printed on your own laboratory report when judging whether a value is outside the expected range.
          </p>
        </header>

        <div style={{ padding: "16px 18px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#1E3A8A", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>
            Medical safety note
          </p>
          <p style={{ fontSize: 14, color: "#1D1D1F", lineHeight: 1.7 }}>
            This guide is educational and is not a diagnosis or treatment plan. CBC reference ranges differ between laboratories and can vary with age, sex, pregnancy, altitude and other factors. A flagged result does not automatically mean disease, and a result inside the range does not rule out every health problem. Use your report&apos;s own reference interval and discuss concerning or persistent results with a qualified healthcare professional.
          </p>
        </div>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 780, marginBottom: 10 }}>What is a CBC blood test?</h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#303134", marginBottom: 10 }}>
            A Complete Blood Count is one of the most common blood tests. It measures several parts of the blood, including red blood cells, white blood cells, platelets, hemoglobin and hematocrit. Depending on the laboratory, the report may also include red-cell indices and a white blood cell differential.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#303134" }}>
            CBC results can help clinicians look for patterns associated with conditions such as anemia, infection, bleeding or clotting problems and some blood disorders. A CBC is a starting point for clinical interpretation, not a diagnosis by itself. {sourceLink("https://www.nhlbi.nih.gov/health/blood-tests", "NHLBI")}, {sourceLink("https://medlineplus.gov/lab-tests/complete-blood-count-cbc/", "MedlinePlus")}, and {sourceLink("https://www.mayoclinic.org/tests-procedures/complete-blood-count/about/pac-20384919", "Mayo Clinic")} provide patient-facing medical background.
          </p>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 780, marginBottom: 8 }}>CBC normal values: a reference guide</h2>
          <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.7, marginBottom: 16 }}>
            The ranges below are examples from established patient-information sources, not universal diagnostic cutoffs. Laboratories use their own reference intervals, units and methods. Always compare your result with the range printed next to that result on your report.
          </p>
          <div style={{ overflowX: "auto", border: "1px solid #E5E7EB", borderRadius: 10 }}>
            <table>
              <thead>
                <tr style={{ background: "#F8FAFC" }}>
                  {["Test", "What it measures", "Example adult reference", "Why it matters"].map((x) => (
                    <th key={x} scope="col" style={{ textAlign: "left", padding: "11px 12px", fontSize: 12, fontWeight: 750, borderBottom: "1px solid #E5E7EB", minWidth: 150 }}>{x}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CORE_ROWS.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={`${row[0]}-${i}`} style={{ padding: "11px 12px", fontSize: 12, lineHeight: 1.6, color: i === 0 ? "#111827" : "#4B5563", fontWeight: i === 0 ? 700 : 400, borderBottom: "1px solid #F1F5F9", verticalAlign: "top" }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: "#6E6E73", lineHeight: 1.7, marginTop: 12 }}>
            Reference ranges are not interchangeable between laboratories. For example, Mayo Clinic publishes one set of adult ranges while MedlinePlus gives another commonly used set. The clinically relevant comparison is normally the interval supplied by the laboratory that performed your test.
          </p>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 780, marginBottom: 14 }}>How to read a CBC report step by step</h2>
          {[
            ["1", "Start with the laboratory flags", "Look for H, L, High, Low or another flag, then read the exact reference interval beside the result."],
            ["2", "Check the units", "The same measurement can appear in different unit systems or abbreviated forms. Do not compare a number without checking its unit."],
            ["3", "Look at related values together", "Hemoglobin, hematocrit, RBC count and red-cell indices are interpreted together; WBC count is often interpreted with the differential; platelets are considered separately and in context."],
            ["4", "Look for a pattern, not one number", "A single borderline result can have a different meaning from several related values changing together."],
            ["5", "Add clinical context", "Symptoms, medicines, recent illness, pregnancy, age, previous results and medical history can change how a CBC is interpreted."],
            ["6", "Use follow-up testing when appropriate", "A clinician may repeat a CBC or order other tests when a pattern needs clarification. A CBC alone is rarely the final answer."],
          ].map(([n, h, t]) => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 12, marginBottom: 15 }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: "#EFF6FF", color: "#1D4ED8", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800 }}>{n}</div>
              <div><h3 style={{ fontSize: 14, fontWeight: 720, marginBottom: 4 }}>{h}</h3><p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7 }}>{t}</p></div>
            </div>
          ))}
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 780, marginBottom: 12 }}>What the main CBC numbers mean</h2>
          <div style={{ display: "grid", gap: 14 }}>
            {[
              ["WBC — white blood cell count", "WBCs are part of the immune system. Higher or lower counts can have many explanations, so the number is interpreted with the differential, symptoms and clinical history."],
              ["RBC — red blood cell count", "RBCs carry oxygen. A low or high RBC count can be associated with different conditions and is usually interpreted alongside hemoglobin, hematocrit and red-cell indices."],
              ["Hemoglobin — Hgb/Hb", "Hemoglobin is the oxygen-carrying protein in red blood cells. A low value is an important clue when assessing anemia, but the cause cannot be determined from hemoglobin alone."],
              ["Hematocrit — Hct", "Hematocrit is the proportion of blood made up of red blood cells. It is interpreted with hemoglobin and other red-cell measurements."],
              ["MCV — mean corpuscular volume", "MCV estimates the average size of red blood cells. Low MCV is called microcytosis; high MCV is called macrocytosis. These are patterns, not diagnoses."],
              ["MCH and MCHC", "These red-cell indices describe the amount and concentration of hemoglobin in red blood cells and add context to hemoglobin and MCV findings."],
              ["RDW — red cell distribution width", "RDW describes variation in red-cell size. It can add useful context when a clinician is assessing anemia, but it should not be interpreted in isolation."],
              ["Platelets — PLT", "Platelets help form blood clots. Low or high platelet counts can have multiple causes and need to be interpreted with the degree of change, symptoms, medicines and other results."],
            ].map(([h, t]) => (
              <div key={h} style={{ paddingBottom: 14, borderBottom: "1px solid #F1F5F9" }}>
                <h3 style={{ fontSize: 14, fontWeight: 720, marginBottom: 4 }}>{h}</h3>
                <p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7 }}>{t}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 780, marginBottom: 12 }}>CBC differential: the white blood cell types</h2>
          <p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7, marginBottom: 14 }}>
            A CBC with differential breaks the white blood cell count into types. Your report may show percentages, absolute counts, or both. The exact interpretation depends on the laboratory range and the rest of the CBC.
          </p>
          {DIFFERENTIAL.map(([h, t]) => (
            <div key={h} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 12, padding: "10px 0", borderBottom: "1px solid #F1F5F9" }}>
              <strong style={{ fontSize: 13 }}>{h}</strong><p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.65 }}>{t}</p>
            </div>
          ))}
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 780, marginBottom: 12 }}>Common CBC patterns and what they can suggest</h2>
          <p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7, marginBottom: 14 }}>
            Patterns are more useful than isolated numbers. The examples below are educational clues, not diagnostic rules.
          </p>
          {PATTERNS.map(([h, t]) => (
            <div key={h} style={{ padding: "12px 0", borderBottom: "1px solid #F1F5F9" }}>
              <h3 style={{ fontSize: 14, fontWeight: 720, marginBottom: 4 }}>{h}</h3>
              <p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7 }}>{t}</p>
            </div>
          ))}
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 780, marginBottom: 10 }}>Example: how to read an abnormal CBC pattern</h2>
          <div style={{ padding: "14px 16px", background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 14 }}>
            <p style={{ fontSize: 12, fontWeight: 750, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 7 }}>Synthetic educational example</p>
            <p style={{ fontSize: 13, lineHeight: 1.8 }}>WBC: 11.8 ×10⁹/L (flagged high) · Hemoglobin: 10.9 g/dL (flagged low) · MCV: 78 fL (flagged low) · Platelets: 165 ×10⁹/L (within this example range)</p>
          </div>
          <p style={{ fontSize: 13, color: "#303134", lineHeight: 1.8, marginBottom: 10 }}>
            A reader could describe this as a combination of elevated WBC with low hemoglobin and low MCV. The low hemoglobin plus low MCV is a microcytic anemia pattern, while the elevated WBC needs its own context. This does <strong>not</strong> establish the cause of anemia or the reason for the WBC change.
          </p>
          <p style={{ fontSize: 13, color: "#303134", lineHeight: 1.8 }}>
            A clinician may consider symptoms, recent infection, bleeding history, medicines, previous CBCs and other laboratory tests before deciding whether follow-up is needed. The safest interpretation is therefore a structured description of the pattern, not a diagnosis from the numbers alone.
          </p>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 780, marginBottom: 10 }}>When should you discuss a CBC with a doctor?</h2>
          <p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7, marginBottom: 10 }}>
            Consider professional review when results are persistently outside the laboratory range, several related results are abnormal, the result is unexpected for you, or you have symptoms that concern you. Urgent symptoms should be assessed through appropriate local medical services rather than an online explainer.
          </p>
          <p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7 }}>
            The {sourceLink("https://www.nhlbi.nih.gov/health/anemia/diagnosis", "NHLBI anemia guidance")} emphasizes that CBC findings are interpreted alongside medical history and other tests when evaluating anemia. {sourceLink("https://www.cancer.org/cancer/diagnosis-staging/tests/blood-tests.html", "American Cancer Society") } also notes that laboratories use their own reference ranges and that results should be reviewed in the context of the individual patient.
          </p>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 780, marginBottom: 10 }}>CBC vs. hemogram vs. complete blood picture</h2>
          <p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.8 }}>
            You may see terms such as <strong>CBC</strong>, <strong>complete blood count</strong>, <strong>hemogram</strong> or <strong>complete blood picture</strong> used in different countries and laboratories. They often refer to broadly similar blood-count testing, but the exact measurements included can differ. For reliable interpretation, use the actual list of tests, units and reference ranges printed by your laboratory rather than assuming two reports are identical.
          </p>
        </section>

        <section aria-labelledby="faq" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 id="faq" style={{ fontSize: 20, fontWeight: 780, marginBottom: 16 }}>CBC blood test questions</h2>
          {FAQS.map(([q, a], i) => (
            <div key={q} style={{ marginBottom: i < FAQS.length - 1 ? 16 : 0, paddingBottom: i < FAQS.length - 1 ? 16 : 0, borderBottom: i < FAQS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <h3 style={{ fontSize: 14, fontWeight: 650, marginBottom: 5 }}>{q}</h3>
              <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.7 }}>{a}</p>
            </div>
          ))}
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 780, marginBottom: 10 }}>Medical sources used for this guide</h2>
          <ul style={{ paddingLeft: 20, display: "grid", gap: 8 }}>
            <li style={{ fontSize: 13, lineHeight: 1.6 }}>{sourceLink("https://medlineplus.gov/lab-tests/complete-blood-count-cbc/", "MedlinePlus — Complete Blood Count (CBC)")}</li>
            <li style={{ fontSize: 13, lineHeight: 1.6 }}>{sourceLink("https://medlineplus.gov/ency/article/003642.htm", "MedlinePlus Medical Encyclopedia — CBC blood test")}</li>
            <li style={{ fontSize: 13, lineHeight: 1.6 }}>{sourceLink("https://www.nhlbi.nih.gov/health/blood-tests", "NHLBI — Blood Tests")}</li>
            <li style={{ fontSize: 13, lineHeight: 1.6 }}>{sourceLink("https://www.nhlbi.nih.gov/health/anemia/diagnosis", "NHLBI — Anemia Diagnosis")}</li>
            <li style={{ fontSize: 13, lineHeight: 1.6 }}>{sourceLink("https://www.mayoclinic.org/tests-procedures/complete-blood-count/about/pac-20384919", "Mayo Clinic — Complete Blood Count")}</li>
            <li style={{ fontSize: 13, lineHeight: 1.6 }}>{sourceLink("https://www.cancer.org/cancer/diagnosis-staging/tests/blood-tests.html", "American Cancer Society — Blood Tests")}</li>
          </ul>
        </section>

        <section aria-labelledby="more-guides" style={{ marginBottom: 20 }}>
          <h2 id="more-guides" style={{ fontSize: 18, fontWeight: 750, marginBottom: 12 }}>More document guides</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link href="/guides" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 13px", borderRadius: 9, background: "#fff", border: "1px solid #E5E7EB", color: "#1D4ED8", fontSize: 13, fontWeight: 650 }}>All Document Guides <ArrowRight size={13} /></Link>
            <Link href="/medical-report-summary-ai" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 13px", borderRadius: 9, background: "#fff", border: "1px solid #E5E7EB", color: "#1D4ED8", fontSize: 13, fontWeight: 650 }}>Medical Report Explainer <ArrowRight size={13} /></Link>
            <Link href="/doctor-prescription-explained" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 13px", borderRadius: 9, background: "#fff", border: "1px solid #E5E7EB", color: "#1D4ED8", fontSize: 13, fontWeight: 650 }}>Doctor Prescription Guide <ArrowRight size={13} /></Link>
          </div>
        </section>

        <div style={{ padding: "28px 24px", borderRadius: 14, background: "#0A1628", textAlign: "center", color: "#fff" }}>
          <p style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, letterSpacing: "-.03em" }}>Have your own CBC report?</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 20, lineHeight: 1.6 }}>Upload it to get a structured plain-language explanation.</p>
          <Link href="/#upload" style={{ display: "inline-block", background: "#0066CC", color: "#fff", padding: "12px 26px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>Explain My Document →</Link>
        </div>
      </main>
    </div>
  );
}
