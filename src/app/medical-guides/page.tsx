import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.klarium.co";

export const metadata: Metadata = {
  title: "Medical Report Guides: Blood Tests, Scans & Prescriptions | Klarium",
  description:
    "Practical guides for understanding CBC blood tests, medical reports, MRI and CT reports, prescriptions, and other clinical documents in plain language.",
  alternates: { canonical: `${SITE}/medical-guides` },
  openGraph: {
    title: "Medical Report Guides: Blood Tests, Scans & Prescriptions | Klarium",
    description:
      "Understand common medical documents, test results and prescriptions in plain language before discussing them with a qualified professional.",
    url: `${SITE}/medical-guides`,
    siteName: "Klarium",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const guides = [
  {
    title: "CBC blood test results",
    description:
      "Learn what a complete blood count measures, how common markers are reported, why reference ranges vary, and how patterns can be discussed with a clinician.",
    href: "/example-library/cbc-blood-test-explained",
    label: "CBC guide",
  },
  {
    title: "Medical report summary",
    description:
      "Understand what an AI medical-report summary should include: key findings, terminology, uncertainty, questions to ask, and clear separation from medical advice.",
    href: "/medical-report-summary-ai",
    label: "Report explainer",
  },
  {
    title: "Doctor prescription explained",
    description:
      "Understand common prescription fields, medicines, instructions, duration and questions worth checking with a doctor or pharmacist.",
    href: "/doctor-prescription-explained",
    label: "Prescription guide",
  },
  {
    title: "MRI report explained",
    description:
      "A plain-language starting point for common MRI-report terminology, findings and the difference between a report's wording and a clinical diagnosis.",
    href: "/example-library/mri-report-explained",
    label: "MRI guide",
  },
  {
    title: "CT scan report explained",
    description:
      "Learn how to approach a CT report, understand common sections and identify questions to discuss with the clinician who ordered the scan.",
    href: "/example-library/ct-scan-explained",
    label: "CT guide",
  },
  {
    title: "Medical bill explained",
    description:
      "Understand common sections of a medical bill and the information you may want to verify before paying or disputing a charge.",
    href: "/medical-bill-explained",
    label: "Billing guide",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Medical Report Guides",
  url: `${SITE}/medical-guides`,
  description:
    "Practical guides for understanding medical reports, blood tests, prescriptions and related clinical documents.",
  isPartOf: { "@type": "WebSite", name: "Klarium", url: SITE },
};

export default function MedicalGuidesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F5F7FA",
        color: "#111827",
        fontFamily: "Inter,system-ui,-apple-system,sans-serif",
      }}
    >
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "0 22px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ fontWeight: 800, fontSize: 18 }}>
          Klarium
        </Link>
        <Link
          href="/#upload"
          style={{ color: "#1683FF", fontWeight: 700, fontSize: 13 }}
        >
          Explain a document →
        </Link>
      </header>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "52px 20px 80px" }}>
        <nav
          aria-label="Breadcrumb"
          style={{ fontSize: 12, color: "#6B7280", marginBottom: 24 }}
        >
          <Link href="/" style={{ color: "#1683FF" }}>
            Klarium
          </Link>{" "}
          /{" "}
          <Link href="/guides" style={{ color: "#1683FF" }}>
            Document Guides
          </Link>{" "}
          / Medical Reports
        </nav>

        <header style={{ maxWidth: 780, marginBottom: 38 }}>
          <p
            style={{
              color: "#1683FF",
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Medical report guides
          </p>
          <h1
            style={{
              fontSize: "clamp(32px,5vw,52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              margin: "0 0 16px",
              fontWeight: 850,
            }}
          >
            Understand the report before you worry about it.
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "#4B5563",
              margin: 0,
            }}
          >
            Start with a practical guide for the medical document you have.
            These pages explain terminology, common report sections, reference
            ranges and useful questions without turning an explanation into a
            diagnosis.
          </p>
        </header>

        <section
          aria-labelledby="guides-heading"
          style={{ display: "grid", gap: 14 }}
        >
          <h2
            id="guides-heading"
            style={{ fontSize: 24, margin: "0 0 4px", letterSpacing: "-0.025em" }}
          >
            Start with your document
          </h2>

          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              style={{
                display: "block",
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "21px 22px",
                boxShadow: "0 2px 8px rgba(15,23,42,.035)",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "#1683FF",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  marginBottom: 7,
                }}
              >
                {guide.label}
              </span>
              <span
                style={{
                  display: "block",
                  fontWeight: 780,
                  fontSize: 18,
                  marginBottom: 7,
                }}
              >
                {guide.title}
              </span>
              <span
                style={{
                  display: "block",
                  color: "#6B7280",
                  lineHeight: 1.65,
                  fontSize: 14,
                  maxWidth: 760,
                }}
              >
                {guide.description}
              </span>
              <span
                style={{
                  display: "block",
                  color: "#1683FF",
                  fontSize: 12,
                  fontWeight: 700,
                  marginTop: 10,
                }}
              >
                Read guide →
              </span>
            </Link>
          ))}
        </section>

        <section
          style={{
            marginTop: 28,
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 18,
            padding: "26px",
          }}
        >
          <h2 style={{ fontSize: 23, margin: "0 0 10px", letterSpacing: "-0.025em" }}>
            What to look for in a medical report explanation
          </h2>
          <p style={{ color: "#4B5563", lineHeight: 1.7, fontSize: 14, margin: "0 0 15px" }}>
            A useful explanation should make the original document easier to
            understand without pretending that the document alone can establish
            a diagnosis. Look for the actual finding, the relevant measurement
            or wording, the report&apos;s reference range where applicable, what is
            uncertain, and what should be discussed with the healthcare
            professional who knows the patient&apos;s history.
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#4B5563", lineHeight: 1.8, fontSize: 14 }}>
            <li>Important findings and measurements are clearly identified.</li>
            <li>Medical terminology is translated into ordinary language.</li>
            <li>Reference ranges are treated as lab- and context-dependent.</li>
            <li>Uncertainty is stated instead of being hidden.</li>
            <li>The explanation suggests useful questions rather than making a diagnosis.</li>
          </ul>
        </section>

        <section
          style={{
            marginTop: 24,
            padding: "26px",
            borderRadius: 18,
            background: "#0F1B2D",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 24, margin: "0 0 8px", letterSpacing: "-0.025em" }}>
            Have the actual report?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,.68)",
              lineHeight: 1.6,
              maxWidth: 620,
              margin: "0 auto 18px",
              fontSize: 14,
            }}
          >
            Upload the document to Klarium and get a plain-language explanation
            of the important sections in your chosen language.
          </p>
          <Link
            href="/#upload"
            style={{
              display: "inline-block",
              background: "#1683FF",
              color: "#fff",
              padding: "12px 22px",
              borderRadius: 9,
              fontWeight: 750,
              fontSize: 13,
            }}
          >
            Explain My Medical Report →
          </Link>
        </section>

        <p
          style={{
            color: "#9CA3AF",
            fontSize: 11,
            lineHeight: 1.6,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Klarium provides educational explanations, not medical diagnosis or
          treatment advice. Discuss your report with a qualified healthcare
          professional.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
