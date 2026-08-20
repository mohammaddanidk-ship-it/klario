import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface Props { params: Promise<{ slug: string }> }

const SITE = "https://klarium.co";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rec = await db.explanation.findUnique({ where: { slug } });
  if (!rec || rec.snippets !== "[]") return { title: "Not Found | Klarium", robots: { index: false, follow: false } };
  const count = rec.count > 1 ? ` — explained ${rec.count} times` : "";
  const title = rec.isPhishing ? `How to detect ${rec.docType} scams | Klarium` : `How to understand a ${rec.docType}${count} | Klarium`;
  const desc = rec.isPhishing ? `Klarium explains how to identify ${rec.docType} fraud in plain language and what safe next steps to take.` : `Klarium explains what a ${rec.docType} means in plain language, what to check, and what to do next.`;
  return {
    title,
    description: desc,
    robots: { index: true, follow: true },
    alternates: { canonical: `/explain/${slug}` },
    openGraph: { title, description: desc, type: "article" },
    twitter: { card: "summary", title, description: desc },
    keywords: `${rec.docType}, understand ${rec.docType}, ${rec.docType} explained, what does ${rec.docType} mean`,
  };
}

export default async function ExplainPage({ params }: Props) {
  const { slug } = await params;
  const rec = await db.explanation.findUnique({ where: { slug } });
  // Legacy records may contain visitor-derived snippets. Do not expose them or allow indexing.
  if (!rec || rec.snippets !== "[]") notFound();
  db.explanation.update({ where: { slug }, data: { views: { increment: 1 } } }).catch(() => {});

  const blocks = rec.explanation.split("\n").filter(l => !l.startsWith("VERDICT:") && !l.startsWith("CONFIDENCE:") && l.trim());
  const accent = rec.isPhishing ? "#B91C1C" : "#0066CC";
  const accentDk = rec.isPhishing ? "#7F1D1D" : "#1E3A8A";
  const accentBg = rec.isPhishing ? "#FEF2F2" : "#EFF6FF";
  const accentBr = rec.isPhishing ? "#FECDD3" : "#BFDBFE";

  return (
    <div style={{ minHeight:"100vh", background:"#F5F5F7", fontFamily:"Inter,system-ui,-apple-system,sans-serif", color:"#1D1D1F", WebkitFontSmoothing:"antialiased" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}a{color:inherit;text-decoration:none;}`}</style>
      <header style={{ background:"#fff", borderBottom:"1px solid #E5E7EB", padding:"0 24px", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <Link href="/" style={{ fontWeight:700, fontSize:16, color:"#1D1D1F", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ width:28, height:28, borderRadius:7, background:accent, display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L1.5 3.2V6.5c0 2.8 2.3 4.2 5 5.1 2.7-.9 5-2.3 5-5.1V3.2L6.5 1z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/></svg></span>
          Klarium
        </Link>
        <Link href="/#upload" style={{ fontSize:13, color:accent, fontWeight:600 }}>Try with your document →</Link>
      </header>

      <main style={{ maxWidth:760, margin:"0 auto", padding:"40px 20px 80px" }}>
        <p style={{ fontSize:12, color:"#6E6E73", marginBottom:24 }}><Link href="/" style={{ color:accent }}>Klarium</Link>{" / "}<Link href="/" style={{ color:accent }}>{rec.isPhishing ? "Scam Shield" : "Document Clarity"}</Link>{" / "}<span style={{ textTransform:"capitalize" }}>{rec.docType}</span></p>
        <h1 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, color:"#1D1D1F", lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:12 }}>{rec.isPhishing ? `How to detect ${rec.docType} scams` : `How to understand a ${rec.docType}`}</h1>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28, flexWrap:"wrap" }}><span style={{ fontSize:12, color:"#6E6E73" }}>Klarium educational guide · {rec.language}</span>{rec.count > 1 && <span style={{ fontSize:12, fontWeight:600, color:accent, background:accentBg, border:`1px solid ${accentBr}`, padding:"3px 10px", borderRadius:20 }}>Used {rec.count} times</span>}{rec.views > 0 && <span style={{ fontSize:12, color:"#9CA3AF" }}>{rec.views.toLocaleString()} views</span>}</div>

        {rec.isPhishing && rec.verdict && <div style={{ padding:"18px 20px", borderRadius:12, marginBottom:16, background:rec.verdict === "SCAM" ? "#FEF2F2" : "#F0FDF4", border:`1.5px solid ${rec.verdict === "SCAM" ? "#FECDD3" : "#86EFAC"}`, display:"flex", alignItems:"center", gap:14 }}><span style={{ fontSize:32, lineHeight:1 }}>{rec.verdict === "SCAM" ? "⚠️" : "✅"}</span><div><p style={{ fontWeight:700, fontSize:17, color:rec.verdict === "SCAM" ? "#7F1D1D" : "#14532D" }}>{rec.verdict === "SCAM" ? "This type of message is commonly used in scams" : "This type of message is typically legitimate"}</p>{rec.confidence && <p style={{ fontSize:12, color:rec.verdict === "SCAM" ? "#B91C1C" : "#15803D", fontWeight:600, marginTop:3 }}>Confidence: {rec.confidence}</p>}</div></div>}

        <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:14, padding:"22px 24px", marginBottom:20, boxShadow:"0 1px 4px rgba(0,0,0,.05)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, paddingBottom:12, borderBottom:"1px solid #F3F4F6" }}><div style={{ width:28, height:28, borderRadius:7, background:accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5l2.75 2.75L10.5 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div><p style={{ fontSize:11, fontWeight:700, color:accentDk, letterSpacing:".08em", textTransform:"uppercase" }}>{rec.isPhishing ? "Klarium Shield — Safety Guide" : "Klarium — Document Guide"}</p><p style={{ fontSize:10, color:"#9CA3AF", marginTop:1 }}>General educational information · {rec.language}</p></div></div>
          {blocks.map((line, i) => { if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", color:accentDk, textTransform:"uppercase", margin:i===0 ? "0 0 8px" : "18px 0 8px" }}>{line.replace(/\*\*/g, "")}</p>; if (line.startsWith("- ") || line.startsWith("• ")) return <div key={i} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}><span style={{ width:4, height:4, borderRadius:"50%", background:accent, flexShrink:0, marginTop:9, display:"block" }}/><span style={{ fontSize:15, color:"#1D1D1F", lineHeight:1.65 }}>{line.replace(/^[-•]\s/, "")}</span></div>; return <p key={i} style={{ fontSize:15, color:"#1D1D1F", lineHeight:1.65, marginBottom:4 }}>{line}</p>; })}
          <div style={{ marginTop:16, paddingTop:12, borderTop:"1px solid #F3F4F6", display:"flex", alignItems:"flex-start", gap:6 }}><span style={{ fontSize:11, flexShrink:0 }}>🔒</span><p style={{ fontSize:11, color:"#9CA3AF", lineHeight:1.5 }}>This public guide contains general educational information only. It does not reproduce visitor documents or personal information.</p></div>
        </div>

        <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:14, padding:"20px 24px", marginBottom:20 }}><h2 style={{ fontSize:14, fontWeight:700, color:"#1D1D1F", marginBottom:14 }}>Common questions about {rec.docType}s</h2>{(rec.isPhishing ? [{ q:`How do I know if a ${rec.docType} is a scam?`, a:`Look for urgent language, suspicious links, requests for personal information, and sender details that do not match the official organisation. Verify independently before responding.` },{ q:`What should I do if I received a suspicious ${rec.docType}?`, a:`Do not click links or provide credentials. Contact the organisation through an official channel and report suspected fraud to the relevant provider or bank.` }] : [{ q:`What is a ${rec.docType}?`, a:`A ${rec.docType} is a type of document containing information, instructions, results, terms, or obligations. Klarium helps explain its common structure in plain language.` },{ q:`What should I check first?`, a:`Start with the purpose, issuer, dates, amounts, results, conditions, warnings, deadlines, and actions requested by the original document.` },{ q:`Do I need professional advice?`, a:`For important medical, legal, financial, tax, immigration, insurance, or employment decisions, confirm the interpretation with the appropriate qualified professional.` }]).map(({ q, a }, i) => <div key={i} style={{ marginBottom:i < 2 ? 14 : 0, paddingBottom:i < 2 ? 14 : 0, borderBottom:i < 2 ? "1px solid #F3F4F6" : "none" }}><p style={{ fontSize:14, fontWeight:600, color:"#1D1D1F", marginBottom:5 }}>{q}</p><p style={{ fontSize:13, color:"#6E6E73", lineHeight:1.6 }}>{a}</p></div>)}</div>

        <div style={{ padding:"28px 24px", borderRadius:14, background:"#0A1628", textAlign:"center", color:"#fff" }}><p style={{ fontWeight:800, fontSize:22, marginBottom:8, letterSpacing:"-0.03em" }}>Have a confusing document?</p><p style={{ fontSize:15, color:"rgba(255,255,255,.55)", marginBottom:22, lineHeight:1.6 }}>Klarium explains documents in plain language. Free, private, instant.</p><Link href="/#upload" style={{ display:"inline-block", background:accent, color:"#fff", padding:"13px 30px", borderRadius:10, fontWeight:700, fontSize:15 }}>Explain My Document →</Link><p style={{ fontSize:11, color:"rgba(255,255,255,.3)", marginTop:14 }}>No account required · Your document is not published as an SEO page</p></div>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"Article",
        "headline":rec.isPhishing ? `How to detect ${rec.docType} scams` : `How to understand a ${rec.docType}`,
        "description":`Plain language educational guide about a ${rec.docType}`,
        "url":`${SITE}/explain/${slug}`,
        "mainEntityOfPage":{"@type":"WebPage","@id":`${SITE}/explain/${slug}`},
        "datePublished":rec.createdAt.toISOString(),
        "dateModified":rec.createdAt.toISOString(),
        "publisher":{"@type":"Organization","name":"Klarium","url":SITE},
        "inLanguage":rec.language,
        "interactionStatistic":{"@type":"InteractionCounter","interactionType":"https://schema.org/ReadAction","userInteractionCount":rec.views}
      })}}/>
    </div>
  );
}
