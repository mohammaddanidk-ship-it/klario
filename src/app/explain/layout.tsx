import Link from "next/link";
import type { ReactNode } from "react";

export default function ExplainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <section
        aria-labelledby="related-klarium-guides"
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 20px 72px",
          fontFamily: "Inter,system-ui,-apple-system,sans-serif",
        }}
      >
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            paddingTop: 28,
          }}
        >
          <h2
            id="related-klarium-guides"
            style={{
              fontSize: 20,
              lineHeight: 1.25,
              fontWeight: 750,
              color: "#1D1D1F",
              marginBottom: 8,
            }}
          >
            More document guides
          </h2>
          <p style={{ color: "#6E6E73", fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>
            Explore related Klarium guides or upload your own document for a plain-language explanation.
          </p>
          <nav aria-label="Related document guides" style={{ display: "grid", gap: 10 }}>
            <Link
              href="/explain/legal-document-explainer"
              style={{
                display: "block",
                padding: "14px 16px",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                background: "#fff",
                color: "#1D1D1F",
                fontWeight: 650,
                lineHeight: 1.4,
              }}
            >
              Legal document explainer
              <span style={{ display: "block", color: "#6E6E73", fontSize: 13, fontWeight: 400, marginTop: 3 }}>
                Understand clauses, obligations, deadlines and important terms.
              </span>
            </Link>
            <Link
              href="/explain/medical-report-summary-ai"
              style={{
                display: "block",
                padding: "14px 16px",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                background: "#fff",
                color: "#1D1D1F",
                fontWeight: 650,
                lineHeight: 1.4,
              }}
            >
              Medical report summary guide
              <span style={{ display: "block", color: "#6E6E73", fontSize: 13, fontWeight: 400, marginTop: 3 }}>
                Understand results, reference ranges, findings and recommendations.
              </span>
            </Link>
            <Link
              href="/#upload"
              style={{
                display: "block",
                padding: "14px 16px",
                border: "1px solid #BFDBFE",
                borderRadius: 12,
                background: "#EFF6FF",
                color: "#1E3A8A",
                fontWeight: 650,
                lineHeight: 1.4,
              }}
            >
              Explain your own document →
              <span style={{ display: "block", color: "#475569", fontSize: 13, fontWeight: 400, marginTop: 3 }}>
                Upload a document and get a structured plain-language explanation.
              </span>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
