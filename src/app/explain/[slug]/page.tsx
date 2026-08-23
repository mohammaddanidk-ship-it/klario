import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE = "https://klarium.co";

function cleanType(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function titleFor(docType: string, isPhishing: boolean) {
  const type = cleanType(docType);
  if (/medical report/i.test(type)) return "Medical Report Explained: Results, Terms & What to Check | Klarium";
  if (/legal document/i.test(type)) return "Legal Document Explained: Terms, Clauses & What to Check | Klarium";
  return isPhishing
    ? `${type} Scams: How to Spot Them & What to Do | Klarium`
    : `${type} Explained: Meaning, What to Check & Next Steps | Klarium`;
}

function descriptionFor(docType: string, isPhishing: boolean) {
  const type = cleanType(docType);
  if (/medical report/i.test(type)) return "Learn how to understand a medical report, common sections, results, reference ranges, findings, and what to verify with a qualified professional.";
  if (/legal document/i.test(type)) return "Learn how to understand a legal document, identify important clauses, dates, obligations, fees, deadlines, and points that may need professional review.";
  return isPhishing
    ? `Learn how to recognize ${type} scams, warning signs to check, and safer next steps in plain language.`
    : `Understand what a ${type} means, what it commonly contains, what to check, and what to do next in plain language.`;
}

function topicProfile(docType: string) {
  const type = cleanType(docType);
  if (/medical report/i.test(type)) {
    return {
      heading: "Medical report: what to focus on",
      intro: "A medical report can contain findings, measurements, reference ranges, impressions, diagnoses, recommendations, and technical terms. The meaning of an individual result depends on the test, the laboratory or imaging method, the reference range, and the patient's clinical context.",
      checks: [
        "The report date, patient details, test or study name, and issuing facility.",
        "Each result together with its unit and the stated reference range—not the number alone.",
        "Flags such as high, low, abnormal, positive, negative, critical, or outside-range findings.",
        "The impression, conclusion, recommendation, or follow-up section when present.",
        "Any result or handwritten note that is unclear; do not rely on an uncertain transcription for a medical decision.",
      ],
      next: "Use Klarium to translate technical wording into plain language, then confirm clinically important findings, diagnoses, medication decisions, or urgent concerns with a qualified healthcare professional.",
      faqs: [
        ["Does an abnormal result always mean a disease?", "No. A result outside a stated reference range does not by itself establish a diagnosis. Interpretation depends on the test, context, symptoms, history, and the professional interpreting the report."],
        ["What is the difference between a result and a diagnosis?", "A test result is a measurement or observation. A diagnosis is a clinical conclusion that may use several pieces of evidence. Klarium can explain report wording but should not be treated as a diagnosis."],
        ["Can Klarium tell me whether I need treatment?", "No. Klarium can explain what the report says and highlight terms or findings to discuss, but treatment decisions should be made with the appropriate healthcare professional."],
      ],
    };
  }
  if (/legal document/i.test(type)) {
    return {
      heading: "Legal document: what to focus on",
      intro: "Legal documents can create rights, duties, deadlines, payments, restrictions, or other consequences. The practical meaning often depends on the exact wording, definitions, exceptions, governing law, and the relationship between different clauses.",
      checks: [
        "The parties, document date, effective date, and the purpose of the agreement or notice.",
        "Definitions, obligations, payment terms, fees, deadlines, and conditions.",
        "Termination, renewal, cancellation, notice, liability, indemnity, dispute, and governing-law clauses when present.",
        "Exceptions, conditions, references to other documents, attachments, schedules, or incorporated terms.",
        "Any clause you cannot confidently understand; important legal consequences should be reviewed by a qualified legal professional.",
      ],
      next: "Use Klarium to identify and explain difficult wording in plain language, then verify important rights, obligations, deadlines, or risks with a qualified legal professional before acting.",
      faqs: [
        ["Can Klarium tell me whether a contract is legally valid?", "No. Klarium can explain wording and identify points to review, but legal validity depends on jurisdiction, facts, the parties, and applicable law."],
        ["What clauses should I read carefully?", "Pay particular attention to payment, obligations, deadlines, termination, renewal, liability, dispute resolution, governing law, and any unusual conditions or exceptions."],
        ["Should I sign a document after Klarium explains it?", "An explanation is not legal approval. If the document creates significant rights, obligations, costs, or risks, have the appropriate qualified professional review it before signing."],
      ],
    };
  }
  return {
    heading: "What to focus on",
    intro: "The most useful way to understand a document is to identify who issued it, why it exists, the important facts or obligations it contains, what action it requires, and which parts need verification.",
    checks: [
      "Who issued the document and whether the source is trustworthy.",
      "Dates, names, amounts, deadlines, conditions, and requested actions.",
      "Warnings, exceptions, obligations, cancellation or follow-up requirements.",
      "Any part that is unclear, contradictory, handwritten, or difficult to verify.",
    ],
    next: "Use Klarium for a plain-language explanation, then verify important decisions with the appropriate qualified professional.",
    faqs: [
      [`What is a ${type}?`, `A ${type} is a document containing information, terms, results, instructions, records, or obligations. The exact meaning depends on the document and the context in which it was issued.`],
      ["What should I check first?", "Start with the issuer, dates, names, amounts, important conditions, warnings, deadlines, and any action the document asks you to take."],
      ["When should I ask a professional?", "For important medical, legal, financial, tax, immigration, insurance, or employment decisions, confirm the interpretation with the appropriate qualified professional."],
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rec = await db.explanation.findUnique({ where: { slug } });
  if (!rec || rec.snippets !== "[]") return { title: "Not Found | Klarium", robots: { index: false, follow: false } };
  const title = titleFor(rec.docType, rec.isPhishing);
  const description = descriptionFor(rec.docType, rec.isPhishing);
  const canonical = `${SITE}/explain/${slug}`;
  return {
    title, description, robots: { index: true, follow: true }, alternates: { canonical },
    openGraph: { title, description, type: "article", url: canonical, siteName: "Klarium" },
    twitter: { card: "summary", title, description },
  };
}

export default async function ExplainPage({ params }: Props) {
  const { slug } = await params;
  const rec = await db.explanation.findUnique({ where: { slug } });
  if (!rec || rec.snippets !== "[]") notFound();

  db.explanation.update({ where: { slug }, data: { views: { increment: 1 } } }).catch(() => {});

  const allPages = await db.explanation.findMany({
    where: { snippets: "[]", slug: { not: slug } },
    select: { slug: true, docType: true, isPhishing: true, views: true },
    orderBy: { views: "desc" }, take: 30,
  });
  const currentWords = cleanType(rec.docType).toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3);
  const relatedPages = [...allPages].map((page) => {
    const words = page.docType.toLowerCase().split(/[^a-z0-9]+/);
    const overlap = words.filter((word) => currentWords.includes(word)).length;
    return { ...page, score: overlap * 1000 + page.views };
  }).sort((a, b) => b.score - a.score).slice(0, 6);

  const blocks = rec.explanation.split("\n").filter((line) => !line.startsWith("VERDICT:") && !line.startsWith("CONFIDENCE:") && line.trim());
  const firstParagraph = blocks.find((line) => !line.startsWith("**") && !line.startsWith("- ") && !line.startsWith("• "));
  const accent = rec.isPhishing ? "#B91C1C" : "#0066CC";
  const accentDk = rec.isPhishing ? "#7F1D1D" : "#1E3A8A";
  const accentBg = rec.isPhishing ? "#FEF2F2" : "#EFF6FF";
  const accentBr = rec.isPhishing ? "#FECDD3" : "#BFDBFE";
  const title = titleFor(rec.docType, rec.isPhishing);
  const description = descriptionFor(rec.docType, rec.isPhishing);
  const canonical = `${SITE}/explain/${slug}`;
  const profile = topicProfile(rec.docType);
  const faqItems = rec.isPhishing ? [
    { q: `How can I spot a ${rec.docType} scam?`, a: "Check for urgency, unexpected requests for money or credentials, suspicious links, unusual sender details, and instructions that prevent you from verifying the request independently." },
    { q: `What should I do with a suspicious ${rec.docType}?`, a: "Do not click links, reply, or provide sensitive information. Verify the message through an official channel you find independently." },
    { q: "What if I already interacted with it?", a: "Stop further interaction, secure any affected accounts or credentials, preserve relevant evidence, and contact the appropriate official provider or financial institution through an independently verified channel." },
  ] : profile.faqs.map(([q, a]) => ({ q, a }));

  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: title, description, url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical }, datePublished: rec.createdAt.toISOString(), dateModified: rec.updatedAt.toISOString(),
    publisher: { "@type": "Organization", name: "Klarium", url: SITE }, inLanguage: rec.language,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Klarium", item: SITE },
      { "@type": "ListItem", position: 2, name: rec.isPhishing ? "Scam Shield" : "Document Guides", item: `${SITE}/#upload` },
      { "@type": "ListItem", position: 3, name: rec.docType, item: canonical },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "Inter,system-ui,-apple-system,sans-serif", color: "#1D1D1F", WebkitFontSmoothing: "antialiased" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}a{color:inherit;text-decoration:none;}article h2{scroll-margin-top:80px;}`}</style>
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 16, color: "#1D1D1F", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M6.5 1L1.5 3.2V6.5c0 2.8 2.3 4.2 5 5.1 2.7-.9 5-2.3 5-5.1V3.2L6.5 1z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" /></svg>
          </span>
          Klarium
        </Link>
        <Link href="/#upload" style={{ fontSize: 13, color: accent, fontWeight: 600 }}>Explain your document →</Link>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#6E6E73", marginBottom: 24 }}>
          <Link href="/" style={{ color: accent }}>Klarium</Link>{" / "}
          <Link href="/#upload" style={{ color: accent }}>{rec.isPhishing ? "Scam Shield" : "Document Guides"}</Link>{" / "}
          <span>{rec.docType}</span>
        </nav>

        <header style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>{rec.isPhishing ? "Safety guide" : "Document guide"}</p>
          <h1 style={{ fontSize: "clamp(27px,4.5vw,42px)", fontWeight: 800, color: "#1D1D1F", lineHeight: 1.08, letterSpacing: "-0.035em", marginBottom: 14 }}>
            {rec.isPhishing ? `How to understand ${rec.docType} scams` : title.replace(" | Klarium", "")}
          </h1>
          <p style={{ maxWidth: 700, fontSize: 17, color: "#5F6368", lineHeight: 1.65 }}>{description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "#6E6E73" }}>Klarium educational guide</span><span style={{ color: "#D1D5DB" }}>•</span>
            <span style={{ fontSize: 12, color: "#6E6E73" }}>{rec.language}</span>
            {rec.views > 0 && <><span style={{ color: "#D1D5DB" }}>•</span><span style={{ fontSize: 12, color: "#9CA3AF" }}>{rec.views.toLocaleString()} views</span></>}
          </div>
        </header>

        <article>
          <section aria-labelledby="quick-answer" style={{ background: accentBg, border: `1px solid ${accentBr}`, borderRadius: 14, padding: "20px 22px", marginBottom: 20 }}>
            <h2 id="quick-answer" style={{ fontSize: 12, fontWeight: 800, color: accentDk, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 9 }}>Quick answer</h2>
            <p style={{ fontSize: 16, color: "#1D1D1F", lineHeight: 1.65 }}>{firstParagraph || profile.intro}</p>
          </section>

          {rec.isPhishing && rec.verdict && (
            <section aria-label="Safety verdict" style={{ padding: "18px 20px", borderRadius: 12, marginBottom: 20, background: rec.verdict === "SCAM" ? "#FEF2F2" : "#F0FDF4", border: `1.5px solid ${rec.verdict === "SCAM" ? "#FECDD3" : "#86EFAC"}`, display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 30, lineHeight: 1 }}>{rec.verdict === "SCAM" ? "⚠️" : "✅"}</span>
              <div><p style={{ fontWeight: 700, fontSize: 16, color: rec.verdict === "SCAM" ? "#7F1D1D" : "#14532D" }}>{rec.verdict === "SCAM" ? "Warning: this message pattern can be used for fraud" : "This message pattern appears legitimate"}</p>{rec.confidence && <p style={{ fontSize: 12, color: rec.verdict === "SCAM" ? "#B91C1C" : "#15803D", fontWeight: 600, marginTop: 3 }}>Confidence: {rec.confidence}</p>}</div>
            </section>
          )}

          <section aria-labelledby="guide-content" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "24px 26px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, paddingBottom: 13, borderBottom: "1px solid #F3F4F6" }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2.5 6.5l2.75 2.75L10.5 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <div><h2 id="guide-content" style={{ fontSize: 13, fontWeight: 750, color: "#1D1D1F" }}>What this document means</h2><p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>Plain-language explanation · {rec.language}</p></div>
            </div>
            <div>{blocks.map((line, i) => {
              if (line.startsWith("**") && line.endsWith("**")) return <h2 key={i} style={{ fontSize: 16, fontWeight: 750, color: accentDk, lineHeight: 1.35, margin: i === 0 ? "0 0 9px" : "24px 0 9px" }}>{line.replace(/\*\*/g, "")}</h2>;
              if (line.startsWith("- ") || line.startsWith("• ")) return <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0, marginTop: 9, display: "block" }} /><span style={{ fontSize: 15, color: "#1D1D1F", lineHeight: 1.65 }}>{line.replace(/^[-•]\s/, "")}</span></div>;
              return <p key={i} style={{ fontSize: 15, color: "#1D1D1F", lineHeight: 1.7, marginBottom: 7 }}>{line}</p>;
            })}</div>
          </section>

          <section aria-labelledby="topic-focus" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
            <h2 id="topic-focus" style={{ fontSize: 18, fontWeight: 750, color: "#1D1D1F", marginBottom: 10 }}>{profile.heading}</h2>
            <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.7, marginBottom: 14 }}>{profile.intro}</p>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1D1D1F", marginBottom: 9 }}>Key points to check</h3>
            <ul style={{ paddingLeft: 20, color: "#4B5563" }}>{profile.checks.map((item) => <li key={item} style={{ marginBottom: 8, lineHeight: 1.6 }}>{item}</li>)}</ul>
          </section>

          <section aria-labelledby="next-steps" style={{ background: accentBg, border: `1px solid ${accentBr}`, borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
            <h2 id="next-steps" style={{ fontSize: 18, fontWeight: 750, color: accentDk, marginBottom: 10 }}>What to do next</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7 }}>{profile.next}</p>
          </section>

          <section aria-labelledby="check-first" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
            <h2 id="check-first" style={{ fontSize: 18, fontWeight: 750, color: "#1D1D1F", marginBottom: 12 }}>What should you verify?</h2>
            <ul style={{ paddingLeft: 20, color: "#4B5563" }}>{profile.checks.map((item) => <li key={`verify-${item}`} style={{ marginBottom: 8, lineHeight: 1.6 }}>{item}</li>)}</ul>
          </section>

          <section aria-labelledby="common-questions" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
            <h2 id="common-questions" style={{ fontSize: 18, fontWeight: 750, color: "#1D1D1F", marginBottom: 16 }}>Common questions</h2>
            {faqItems.map(({ q, a }, i) => <div key={q} style={{ marginBottom: i < faqItems.length - 1 ? 16 : 0, paddingBottom: i < faqItems.length - 1 ? 16 : 0, borderBottom: i < faqItems.length - 1 ? "1px solid #F3F4F6" : "none" }}><h3 style={{ fontSize: 14, fontWeight: 650, color: "#1D1D1F", marginBottom: 6 }}>{q}</h3><p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.65 }}>{a}</p></div>)}
          </section>

          {relatedPages.length > 0 && <section aria-labelledby="related-guides" style={{ marginBottom: 20 }}>
            <h2 id="related-guides" style={{ fontSize: 18, fontWeight: 750, color: "#1D1D1F", marginBottom: 12 }}>Related document guides</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10 }}>{relatedPages.map((page) => <Link key={page.slug} href={`/explain/${page.slug}`} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 11, padding: "14px 15px", display: "block" }}><span style={{ display: "block", fontSize: 13, fontWeight: 650, color: "#1D1D1F", marginBottom: 4 }}>{page.docType}</span><span style={{ display: "block", fontSize: 11, color: accent }}>Read the guide →</span></Link>)}</div>
          </section>}

          <section aria-label="Professional advice notice" style={{ padding: "14px 16px", borderRadius: 10, background: "#F9FAFB", border: "1px solid #E5E7EB", marginBottom: 20 }}>
            <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.6 }}><strong style={{ color: "#374151" }}>Important:</strong> Klarium provides general educational explanations. It does not replace qualified medical, legal, financial, tax, immigration, insurance, or other professional advice. If a document affects an important decision, verify the details with the appropriate professional.</p>
          </section>

          <section style={{ padding: "30px 24px", borderRadius: 14, background: "#0A1628", textAlign: "center", color: "#fff" }}>
            <p style={{ fontWeight: 800, fontSize: 23, marginBottom: 8, letterSpacing: "-0.03em" }}>Have a document you do not understand?</p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.58)", marginBottom: 22, lineHeight: 1.6 }}>Upload it to Klarium and get a clear explanation in your language.</p>
            <Link href="/#upload" style={{ display: "inline-block", background: accent, color: "#fff", padding: "13px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15 }}>Explain My Document →</Link>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.32)", marginTop: 14 }}>No account required · Your uploaded document is not published as an SEO page</p>
          </section>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </div>
  );
}
