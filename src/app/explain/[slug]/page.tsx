import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rec = await db.explanation.findUnique({ where: { slug } });
  if (!rec) return { title: "Not Found | Klario" };

  const count = rec.count > 1 ? ` — explained ${rec.count} times` : "";
  const title = rec.isPhishing
    ? `How to detect ${rec.docType} scams | Klario`
    : `How to understand a ${rec.docType}${count} | Klario`;
  const desc = rec.isPhishing
    ? `Klario Shield explains how to identify ${rec.docType} fraud. Free AI scam detection. No account required.`
    : `Klario explains what a ${rec.docType} means in plain language. Free AI document clarity. No account required.`;

  return {
    title,
    description: desc,
    alternates: { canonical: `/explain/${slug}` },
    openGraph: { title, description: desc, type: "article" },
    twitter:   { card: "summary", title, description: desc },
    keywords:  `${rec.docType}, understand ${rec.docType}, ${rec.docType} explained, what does ${rec.docType} mean`,
  };
}

export default async function ExplainPage({ params }: Props) {
  const { slug } = await params;
  const rec = await db.explanation.findUnique({ where: { slug } });
  if (!rec) notFound();

  // Increment views — non-blocking
  db.explanation.update({ where: { slug }, data: { views: { increment: 1 } } }).catch(() => {});

  const blocks = rec.explanation
    .split("\n")
    .filter(l => !l.startsWith("VERDICT:") && !l.startsWith("CONFIDENCE:") && l.trim());

  const snippets: string[] = JSON.parse(rec.snippets || "[]");
  const accent   = rec.isPhishing ? "#B91C1C" : "#0066CC";
  const accentDk = rec.isPhishing ? "#7F1D1D" : "#1E3A8A";
  const accentBg = rec.isPhishing ? "#FEF2F2" : "#EFF6FF";
  const accentBr = rec.isPhishing ? "#FECDD3" : "#BFDBFE";

  return (
    <div style={{ minHeight:"100vh", background:"#F5F5F7", fontFamily:"Inter,system-ui,-apple-system,sans-serif", color:"#1D1D1F", WebkitFontSmoothing:"antialiased" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}a{color:inherit;text-decoration:none;}`}</style>

      {/* Header */}
      <header style={{ background:"#fff", borderBottom:"1px solid #E5E7EB", padding:"0 24px", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <Link href="/" style={{ fontWeight:700, fontSize:16, color:"#1D1D1F", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ width:28, height:28, borderRadius:7, background:accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L1.5 3.2V6.5c0 2.8 2.3 4.2 5 5.1 2.7-.9 5-2.3 5-5.1V3.2L6.5 1z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/></svg>
          </span>
          Klario
        </Link>
        <Link href="/#upload" style={{ fontSize:13, color:accent, fontWeight:600 }}>
          Try with your document →
        </Link>
      </header>

      <main style={{ maxWidth:760, margin:"0 auto", padding:"40px 20px 80px" }}>

        {/* Breadcrumb */}
        <p style={{ fontSize:12, color:"#6E6E73", marginBottom:24 }}>
          <Link href="/" style={{ color:accent }}>Klario</Link>
          {" / "}
          <Link href="/" style={{ color:accent }}>{rec.isPhishing ? "Scam Shield" : "Document Clarity"}</Link>
          {" / "}
          <span style={{ textTransform:"capitalize" }}>{rec.docType}</span>
        </p>

        {/* Title */}
        <h1 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, color:"#1D1D1F", lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:12 }}>
          {rec.isPhishing
            ? `How to detect ${rec.docType} scams`
            : `How to understand a ${rec.docType}`
          }
        </h1>

        {/* Meta row */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28, flexWrap:"wrap" }}>
          <span style={{ fontSize:12, color:"#6E6E73" }}>
            Explained by Klario AI · {new Date(rec.createdAt).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })}
          </span>
          {rec.count > 1 && (
            <span style={{ fontSize:12, fontWeight:600, color:accent, background:accentBg, border:`1px solid ${accentBr}`, padding:"3px 10px", borderRadius:20 }}>
              Explained {rec.count} times
            </span>
          )}
          {rec.views > 0 && (
            <span style={{ fontSize:12, color:"#9CA3AF" }}>
              {rec.views.toLocaleString()} views
            </span>
          )}
        </div>

        {/* Verdict banner — phishing only */}
        {rec.isPhishing && rec.verdict && (
          <div style={{ padding:"18px 20px", borderRadius:12, marginBottom:16,
            background: rec.verdict === "SCAM" ? "#FEF2F2" : "#F0FDF4",
            border:`1.5px solid ${rec.verdict === "SCAM" ? "#FECDD3" : "#86EFAC"}`,
            display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:32, lineHeight:1 }}>{rec.verdict === "SCAM" ? "⚠️" : "✅"}</span>
            <div>
              <p style={{ fontWeight:700, fontSize:17, color: rec.verdict === "SCAM" ? "#7F1D1D" : "#14532D" }}>
                {rec.verdict === "SCAM" ? "This type of message is commonly used in scams" : "This type of message is typically legitimate"}
              </p>
              {rec.confidence && (
                <p style={{ fontSize:12, color: rec.verdict === "SCAM" ? "#B91C1C" : "#15803D", fontWeight:600, marginTop:3 }}>
                  Confidence: {rec.confidence}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Main explanation */}
        <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:14, padding:"22px 24px", marginBottom:20, boxShadow:"0 1px 4px rgba(0,0,0,.05)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, paddingBottom:12, borderBottom:"1px solid #F3F4F6" }}>
            <div style={{ width:28, height:28, borderRadius:7, background:accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5l2.75 2.75L10.5 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:accentDk, letterSpacing:".08em", textTransform:"uppercase" }}>
                {rec.isPhishing ? "Klario Shield — Fraud Analysis" : "Klario — Document Explanation"}
              </p>
              <p style={{ fontSize:10, color:"#9CA3AF", marginTop:1 }}>in {rec.language} · Updated {new Date(rec.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>

          {blocks.map((line, i) => {
            if (line.startsWith("**") && line.endsWith("**")) return (
              <p key={i} style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", color:accentDk, textTransform:"uppercase", margin: i===0 ? "0 0 8px" : "18px 0 8px" }}>
                {line.replace(/\*\*/g, "")}
              </p>
            );
            if (line.startsWith("- ") || line.startsWith("• ")) return (
              <div key={i} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
                <span style={{ width:4, height:4, borderRadius:"50%", background:accent, flexShrink:0, marginTop:9, display:"block" }}/>
                <span style={{ fontSize:15, color:"#1D1D1F", lineHeight:1.65 }}>{line.replace(/^[-•]\s/, "")}</span>
              </div>
            );
            return <p key={i} style={{ fontSize:15, color:"#1D1D1F", lineHeight:1.65, marginBottom:4 }}>{line}</p>;
          })}

          <div style={{ marginTop:16, paddingTop:12, borderTop:"1px solid #F3F4F6", display:"flex", alignItems:"flex-start", gap:6 }}>
            <span style={{ fontSize:11, flexShrink:0 }}>🔒</span>
            <p style={{ fontSize:11, color:"#9CA3AF", lineHeight:1.5 }}>
              {rec.isPhishing
                ? "For suspected fraud, report to your bank and local cybercrime authorities immediately."
                : "For legal, medical, or financial decisions, always consult a qualified professional."}
            </p>
          </div>
        </div>

        {/* Real examples from users — builds trust and SEO content */}
        {snippets.length > 0 && (
          <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:14, padding:"20px 24px", marginBottom:20 }}>
            <h2 style={{ fontSize:14, fontWeight:700, color:"#1D1D1F", marginBottom:14 }}>
              Real examples people have submitted
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {snippets.map((snippet, i) => (
                <div key={i} style={{ padding:"12px 14px", background:"#F9FAFB", borderRadius:8, border:"1px solid #E5E7EB" }}>
                  <p style={{ fontSize:12, color:"#6B7280", fontStyle:"italic", lineHeight:1.6 }}>
                    &ldquo;{snippet}{snippet.length >= 200 ? "…" : ""}&rdquo;
                  </p>
                </div>
              ))}
            </div>
            <p style={{ fontSize:11, color:"#9CA3AF", marginTop:12 }}>
              These examples were submitted by real users and explained by Klario AI.
            </p>
          </div>
        )}

        {/* FAQ section for SEO */}
        <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:14, padding:"20px 24px", marginBottom:20 }}>
          <h2 style={{ fontSize:14, fontWeight:700, color:"#1D1D1F", marginBottom:14 }}>
            Common questions about {rec.docType}s
          </h2>
          {(rec.isPhishing ? [
            { q:`How do I know if a ${rec.docType} is a scam?`, a:`Look for urgent language, suspicious links, requests for personal information, and sender addresses that don't match the official organisation. Klario Shield can analyse any message instantly.` },
            { q:`What should I do if I received a suspicious ${rec.docType}?`, a:`Do not click any links or provide any information. Contact the organisation directly using a phone number from their official website. Report the message to your bank's fraud team.` },
          ] : [
            { q:`What is a ${rec.docType}?`, a:`A ${rec.docType} is a formal document that contains legal or official information. Klario explains what it means in plain language so you can understand your rights and obligations.` },
            { q:`Do I need a lawyer to understand a ${rec.docType}?`, a:`For major decisions, yes. But Klario helps you understand the basics first — what the document says, what to watch out for, and what questions to ask your lawyer.` },
            { q:`Is it safe to upload a ${rec.docType} to Klario?`, a:`Yes. Klario processes your document privately and never stores it on our servers. Your document is analysed in real-time and immediately discarded.` },
          ]).map(({ q, a }, i) => (
            <div key={i} style={{ marginBottom: i < 1 ? 14 : 0, paddingBottom: i < 1 ? 14 : 0, borderBottom: i < 1 ? "1px solid #F3F4F6" : "none" }}>
              <p style={{ fontSize:14, fontWeight:600, color:"#1D1D1F", marginBottom:5 }}>{q}</p>
              <p style={{ fontSize:13, color:"#6E6E73", lineHeight:1.6 }}>{a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding:"28px 24px", borderRadius:14, background:"#0A1628", textAlign:"center", color:"#fff" }}>
          <p style={{ fontWeight:800, fontSize:22, marginBottom:8, letterSpacing:"-0.03em" }}>
            Have a confusing document?
          </p>
          <p style={{ fontSize:15, color:"rgba(255,255,255,.55)", marginBottom:22, lineHeight:1.6 }}>
            Klario explains any document in plain language. Free, private, instant.
          </p>
          <Link href="/#upload" style={{ display:"inline-block", background:accent, color:"#fff", padding:"13px 30px", borderRadius:10, fontWeight:700, fontSize:15 }}>
            Explain My Document →
          </Link>
          <p style={{ fontSize:11, color:"rgba(255,255,255,.3)", marginTop:14 }}>
            No account required · Documents never stored · Free forever
          </p>
        </div>
      </main>

      {/* Schema.org structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": rec.isPhishing ? `How to detect ${rec.docType} scams` : `How to understand a ${rec.docType}`,
        "description": `Plain language explanation of a ${rec.docType}`,
        "datePublished": rec.createdAt.toISOString(),
        "dateModified":  rec.updatedAt.toISOString(),
        "publisher": { "@type":"Organization", "name":"Klario", "url":"https://klario.tools" },
        "inLanguage": rec.language,
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/ReadAction",
          "userInteractionCount": rec.views
        }
      })}}/>
    </div>
  );
}
