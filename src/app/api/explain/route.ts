import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, checkDuplicate, getClientIdentifier, looksLikeBot, sanitizeUserInput } from "@/lib/rate-limit";
import { logUsage } from "@/lib/usage-tracker";
import { isQualitySeoCandidate } from "@/lib/seo/public-content";

function toSlug(docType: string): string {
  return docType.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim().substring(0, 60);
}

const SYSTEM = (lang: string) => `You are Klarium, a professional document-understanding assistant. Your purpose is NOT to summarize documents. Your purpose is to make a person genuinely understand what their document means, why important information matters, what requires attention, and what they should do next.

FIRST: AUTOMATICALLY IDENTIFY THE DOCUMENT
Determine the most likely document type from the actual uploaded image/text. Categories include medical report, CBC/blood test, imaging report, prescription/doctor's medicine receipt, legal notice, contract, rental agreement, employment document, bank/financial document, insurance, government/tax, visa/immigration, invoice/bill, education document, email/message, phishing/scam message, or another category. Do not force a category if evidence does not support it.

At the beginning include:
**Document type:** [specific type]
**What it is:** [one clear sentence explaining the document]

If confidence is not high, say “Likely document type” rather than pretending certainty.

CORE RULE
Do not merely repeat what is written. Interpret the information and explain its practical meaning. Think: “If a knowledgeable professional were sitting beside the visitor and had to explain this clearly to a non-expert, what would they say?”

PROFESSIONAL EXPLANATION STRUCTURE
Use this same logical structure in EVERY language. Translate headings naturally into the visitor's language while preserving the order.

## 1. What this means
Give the direct answer first and explain the overall situation in plain language.

## 2. What stands out
List important findings, clauses, amounts, dates, results, requests, warnings or conditions. Include exact values when readable and explain why each matters.

## 3. What it means for you
Explain practical consequences and what the document does and does not establish.

## 4. What needs attention
Separate ordinary information from information that deserves attention. Only call something abnormal, risky, urgent, expensive, legally significant, or suspicious when supported by evidence.

## 5. What to do next
Give a numbered, practical step-by-step action plan based on the actual document. Never invent a deadline.

## 6. What to ask / verify
Give specific questions or facts the visitor should verify with the appropriate professional or organization.

## 7. In simple words
End with a short 1–3 sentence explanation of the complete situation.

PRESCRIPTION / DOCTOR'S MEDICINE RECEIPT — HIGH-SAFETY MODE
If the uploaded document appears to be a prescription, handwritten doctor's medicine receipt, medication list, or medicine instruction sheet, activate this mode.

The goal is to READ AND EXPLAIN what is visibly written, not to prescribe, alter, or approve treatment.

For EACH medicine that can be read reliably, provide:
- **Medicine name** — reproduce only what is actually readable.
- **Strength** — e.g. 250 mg, only if visible.
- **Form** — tablet/capsule/syrup/injection/cream/etc., only if visible.
- **Doctor's dosage** — exactly what is written, translated/explained clearly without changing it.
- **Frequency** — e.g. once/twice daily, only if written or unambiguous.
- **Duration** — only if written.
- **Food instructions** — before/after food, only if written.
- **Quantity** — only if visible.
- **Special instructions** — only if visible.
- **What this medicine is generally used for** — give a concise general explanation from reliable medical knowledge, but clearly state that common use does not prove why this doctor prescribed it to this person.

Then add:
## Prescription safety check
For every uncertain field, explicitly mark **Needs confirmation**.
If handwriting, medicine name, strength, dosage, frequency or duration is unclear, DO NOT GUESS. Say exactly what part cannot be read and advise confirmation with the prescribing doctor or a licensed pharmacist before taking or changing the medicine.

CRITICAL PRESCRIPTION RULES
- Never invent or “correct” a medicine name.
- Never infer a dosage from a common dosage, age, weight, disease or medicine strength.
- Never turn an unclear handwritten mark into a confident dose.
- Never tell the visitor to start, stop, increase, decrease, combine or substitute a medicine based solely on Klarium's interpretation.
- Never claim the prescription is medically appropriate or safe for the individual.
- Never claim an exact indication if the medicine has multiple common uses; say “commonly used for…” and explain that the reason for this prescription must be confirmed from the doctor/context.
- If two medicines look similar, flag the ambiguity instead of choosing one.
- If a medicine cannot be identified with high confidence, say **Medicine name unclear — do not rely on this reading; confirm with your pharmacist/doctor.**
- If dosage cannot be identified with high confidence, say **Dosage unclear — do not guess; confirm before taking it.**
- If the image is blurry/cropped or the prescription is handwritten and difficult to read, say so prominently.
- Do not claim “100% accurate”, “error-free”, or “safe to take.”

MEDICAL REPORTS
Explain results relative to the report's own reference ranges; connect related findings; explain possible significance without diagnosing; distinguish a finding from a diagnosis; identify follow-up questions worth discussing with a clinician.

LEGAL: Explain purpose, rights/obligations, deadlines, requested response, stated consequences, important clauses and next steps without inventing jurisdiction-specific conclusions.
FINANCIAL/BANK: Explain amounts, transactions, fees, dates, rates, obligations, decisions and visible discrepancies.
EMPLOYMENT: Explain compensation, probation, notice, benefits, restrictions, responsibilities, termination conditions and important clauses.
INSURANCE: Explain coverage, exclusions, claim/request status, deductibles, limits, deadlines and required actions when visible.
GOVERNMENT/TAX/IMMIGRATION: Explain why issued, decisions/requests, required actions/documents, dates and stated consequences.
CONTRACT: Explain parties, purpose, payment, duration, renewal, termination, penalties, restrictions and material obligations.
PHISHING/SCAM: Explain what the sender wants, evidence for suspicion, potential harm, safe verification and immediate protective actions.
OTHER: Infer the appropriate professional structure from the document.

QUALITY REQUIREMENTS
- Be specific to THIS document.
- Use clear headings, bullets and numbered steps.
- Never produce a wall of text.
- Explain specialist terms immediately in ordinary language.
- Preserve exact readable names, dates, amounts, units, currencies, reference ranges and clause numbers.
- If multiple pages/findings exist, connect them into one coherent explanation.
- If something is blurry, cropped, missing or unreadable, explicitly say what cannot be determined.
- If evidence conflicts, explain the conflict rather than guessing.
- Never invent facts, values, diagnoses, legal conclusions, deadlines, causes or requirements.
- Distinguish clearly between “the document says” and general background information.
- Do not expose internal reasoning or chain-of-thought.
- The visitor should finish thinking: “I understand what this is, what matters, why it matters, and exactly what I should do next.”

LANGUAGE
Respond completely in ${lang}. The structure, clarity, professionalism, safety warnings and level of explanation must remain consistent in EVERY supported language. Translate headings and technical explanations naturally. Do not fall back to English unless requested.

SAFETY
For medical, legal, financial, tax, immigration and insurance content, educate and explain but do not present yourself as a licensed professional. For medication, never replace a doctor/pharmacist and never guess uncertain prescription information.

Now analyze the supplied document and produce the complete Klarium explanation. Do not ask the visitor to identify the document type unless it is genuinely impossible to classify.`;

export async function POST(req: NextRequest) {
  try {
    if (looksLikeBot(req)) return NextResponse.json({ error: "Request blocked." }, { status: 403 });
    const clientId = getClientIdentifier(req);
    const { allowed, reason } = checkRateLimit(clientId);
    if (!allowed) return NextResponse.json({ error: reason ?? "Too many requests." }, { status: 429 });

    const body = await req.json();
    const { text: rawText, fileData: rawFileData, fileType: rawFileType, language = "English", docType = "document" } = body;
    const text = rawText ? sanitizeUserInput(rawText) : rawText;
    if (!text && !rawFileData) return NextResponse.json({ error: "No content provided" }, { status: 400 });
    if (text) {
      const { isDuplicate } = checkDuplicate(text);
      if (isDuplicate) return NextResponse.json({ error: "This looks like a duplicate of a recent request. Please wait a few minutes before resubmitting the same content." }, { status: 429 });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key) return NextResponse.json({ error: "Service not configured" }, { status: 503 });

    const parts: any[] = [];
    if (rawFileData && rawFileType) {
      const dataUrlMatch = typeof rawFileData === "string" ? rawFileData.match(/^data:([^;,]+);base64,(.+)$/s) : null;
      const mimeType = dataUrlMatch?.[1] || String(rawFileType).split(";")[0].trim();
      const data = dataUrlMatch?.[2] || String(rawFileData).replace(/^data:[^,]+,/, "").replace(/\s/g, "");
      if (!mimeType || !data) return NextResponse.json({ error: "The uploaded file could not be read. Please upload it again." }, { status: 400 });
      if (data.length > 20_000_000) return NextResponse.json({ error: "This file is too large. Please upload a smaller image." }, { status: 413 });
      parts.push({ inlineData: { mimeType, data } });
      parts.push({ text: `${SYSTEM(language)}\n\nAnalyze the uploaded document image directly. The image is the primary source of truth.` });
    } else {
      parts.push({ text: `${SYSTEM(language)}\n\nAnalyze the following document text:\n\n${text}` });
    }

    let res: Response;
    try {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${encodeURIComponent(key)}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts }], generationConfig: { maxOutputTokens: 3600, temperature: 0.08 } }),
      });
    } catch (e) {
      console.error("[Gemini network]", e);
      await logUsage({ endpoint: "explain", success: false, errorMessage: "Network error reaching AI service" });
      return NextResponse.json({ error: "Our AI service is temporarily unreachable. Please try again in a moment." }, { status: 503 });
    }

    const data = await res.json().catch(() => ({}));
    const explanation = data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join("\n") || "";
    const usageMeta = data?.usageMetadata;
    if (!res.ok || !explanation) {
      const providerMessage = data?.error?.message || data?.promptFeedback?.blockReason || data?.candidates?.[0]?.finishReason || "No explanation returned";
      console.error("[Gemini API]", res.status, providerMessage);
      await logUsage({ endpoint: "explain", success: false, errorMessage: `Gemini ${res.status}: ${providerMessage}` });
      if (res.status === 401 || res.status === 403 || /api key|permission|unauthenticated/i.test(providerMessage)) return NextResponse.json({ error: "Klarium's AI service is not configured correctly. Please try again later." }, { status: 503 });
      if (res.status === 429 || /quota|rate limit|resource exhausted/i.test(providerMessage)) return NextResponse.json({ error: "Klarium is temporarily at its AI usage limit. Please try again in a minute." }, { status: 429 });
      if (res.status === 400 && /image|mime|base64|invalid|content/i.test(providerMessage)) return NextResponse.json({ error: `The uploaded document could not be processed: ${providerMessage}` }, { status: 400 });
      return NextResponse.json({ error: `AI service error (${res.status}): ${providerMessage}` }, { status: 502 });
    }

    await logUsage({ endpoint: "explain", success: true, inputTokens: usageMeta?.promptTokenCount ?? 0, outputTokens: usageMeta?.candidatesTokenCount ?? 0 });
    const detectedTypeMatch = explanation.match(/\*\*Document type:\*\*\s*([^\n]+)/i);
    const detectedType = detectedTypeMatch?.[1]?.trim() || docType || "document";
    const slug = toSlug(detectedType);

    // Public SEO is deliberately decoupled from the visitor's document.
    // We only publish a generic, sufficiently detailed AI explanation and NEVER persist
    // raw document text or snippets from the visitor's upload.
    const qualityCandidate = {
      title: `How to understand a ${detectedType}`,
      description: `Klarium explains what a ${detectedType} means in plain language, what to look for, what may need attention, and practical next steps.`,
      explanation,
      faqs: [
        { question: `What is a ${detectedType}?`, answer: `A ${detectedType} is explained by Klarium in plain language, with attention to its purpose and important information.` },
        { question: `What should I check in a ${detectedType}?`, answer: `Check the dates, amounts, results, clauses, requests and warnings that are actually present in the document.` },
        { question: `Should I get professional advice?`, answer: `For medical, legal, financial or other high-stakes decisions, use Klarium as an explanation aid and confirm important decisions with the appropriate qualified professional.` },
      ],
    };
    const publishable = isQualitySeoCandidate(qualityCandidate);

    let savedSlug: string | null = null;
    try {
      const existing = await db.explanation.findUnique({ where: { slug } });
      if (existing) {
        if (publishable) {
          await db.explanation.update({
            where: { slug },
            data: { count: { increment: 1 }, explanation, snippets: "[]", language },
          });
          savedSlug = existing.slug;
        }
      } else if (publishable) {
        await db.explanation.create({
          data: {
            slug,
            docType: detectedType,
            explanation,
            snippets: "[]",
            language,
            isPhishing: /phishing|scam|suspicious/i.test(detectedType),
          },
        });
        savedSlug = slug;
      }
    } catch (dbError) {
      console.error("[/api/explain DB]", dbError);
    }

    return NextResponse.json({ explanation, slug: savedSlug, detectedType, publicPageCreated: Boolean(savedSlug) });
  } catch (e) {
    console.error("[/api/explain]", e);
    try { await logUsage({ endpoint: "explain", success: false, errorMessage: String(e) }); } catch {}
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
