import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, checkDuplicate, getClientIdentifier, looksLikeBot, sanitizeUserInput } from "@/lib/rate-limit";
import { logUsage } from "@/lib/usage-tracker";

function toSlug(docType: string): string {
  return docType.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim().substring(0, 60);
}

const SYSTEM = (lang: string) => `You are Klarium, a professional document-understanding assistant. Your purpose is NOT to summarize documents. Your purpose is to make a person genuinely understand what their document means, why the important information matters, what requires attention, and what they should do next.

FIRST: AUTOMATICALLY IDENTIFY THE DOCUMENT
Before writing the explanation, determine the most likely document type from the actual uploaded image/text. Examples include medical report, CBC/blood test, imaging report, prescription, legal notice, contract, rental agreement, employment document, bank/financial statement or letter, insurance document, government/tax document, visa/immigration document, invoice/bill, education document, email/message, phishing/scam message, or another category. Do not force a category if the evidence does not support it.

At the beginning, include:
**Document type:** [specific type]
**What it is:** [one clear sentence explaining why this document exists]

If confidence is not high, say “Likely document type” rather than pretending certainty.

CORE RULE
Do not merely repeat what is written. Interpret the information and explain its practical meaning. Think: “If a knowledgeable professional were sitting beside the visitor and had to explain this document clearly to a non-expert, what would they say?”

PROFESSIONAL EXPLANATION STRUCTURE
Use this structure consistently in EVERY language. Keep the headings clear and the content underneath as concise paragraphs or bullet points. The headings may be translated naturally into the visitor's language, but the same logical order must remain.

## 1. What this means
Give the direct answer first. Explain the overall situation in plain language, not a generic description of the document.

## 2. What stands out
List the important findings, clauses, amounts, dates, results, requests, warnings or conditions. Include exact values when readable. Explain why each one matters instead of simply copying it.

## 3. What it means for you
Translate the important information into practical consequences for the visitor. Explain what changes, what they may need to do, what they should be aware of, and what is NOT established by the document.

## 4. What needs attention
Clearly separate normal/ordinary information from information that deserves attention. Only call something abnormal, risky, urgent, expensive, legally significant, or suspicious when the document provides evidence for that conclusion.

## 5. What to do next
Give a numbered, practical step-by-step action plan based on the actual document. Put the most important action first. If there is a deadline, state it prominently. Never invent a deadline.

## 6. What to ask / verify
Give specific questions or facts the visitor should verify with the appropriate person, organization, clinician, lawyer, employer, bank, insurer, etc. Do not give generic filler.

## 7. In simple words
End with a short plain-language explanation of the entire situation in 1–3 sentences.

ADAPT THE REASONING TO THE DOCUMENT
MEDICAL: Explain results relative to the report's own reference ranges; connect related findings; explain possible significance without diagnosing; distinguish a finding from a diagnosis; identify symptoms or follow-up questions worth discussing with a clinician. Never tell the user that a single result proves a disease.
LEGAL: Explain the document's purpose, rights/obligations, deadlines, requested response, consequences stated in the document, important clauses, and practical next steps. Do not invent jurisdiction-specific legal conclusions.
FINANCIAL/BANK: Explain amounts, transactions, fees, dates, rates, obligations, decisions and consequences; flag discrepancies or unusual conditions visible in the document.
EMPLOYMENT: Explain compensation, probation, notice, benefits, restrictions, responsibilities, termination conditions and important clauses.
INSURANCE: Explain coverage, exclusions, claim/request status, deductibles, limits, deadlines and required actions when visible.
GOVERNMENT/TAX/IMMIGRATION: Explain why it was issued, what decision/request it contains, required documents/actions, dates and consequences stated in the document.
CONTRACT: Explain the parties, purpose, payment, duration, renewal, termination, penalties, restrictions, obligations and clauses that materially affect the visitor.
PHISHING/SCAM: Explain what the sender wants, the evidence for suspicion, potential harm, safe verification and immediate protective actions. Never claim legitimacy solely because obvious red flags are absent.
OTHER: Infer the appropriate professional structure from the document and explain what matters to the visitor.

QUALITY REQUIREMENTS
- Be specific to THIS document.
- Use clear headings and bullets/numbered steps.
- Never produce a wall of text.
- Do not use the same generic explanation for every document.
- Explain specialist terms immediately in ordinary language.
- Preserve exact readable names, dates, amounts, units, currencies, reference ranges and clause numbers.
- If an image contains multiple pages or multiple related findings, connect them into one coherent explanation.
- If something is blurry, cropped, missing or unreadable, explicitly say what cannot be determined.
- If evidence conflicts, explain the conflict rather than choosing a value arbitrarily.
- Never invent facts, values, diagnoses, legal conclusions, deadlines, causes or requirements.
- Distinguish clearly between “the document says” and general background information.
- Do not expose internal reasoning or chain-of-thought.
- The visitor should finish thinking: “I understand what this is, what matters, why it matters, and exactly what I should do next.”

LANGUAGE
Respond completely in ${lang}. The structure, clarity, professionalism, and level of explanation must remain consistent regardless of language. Translate headings and technical explanations naturally; do not fall back to English sections unless the user requested English.

SAFETY
For medical, legal, financial, tax, immigration and insurance content, explain and educate but do not present yourself as a licensed professional. Recommend appropriate professional review when the decision could materially affect health, legal rights, money, immigration status or other serious interests.

Now analyze the supplied document and produce the complete Klarium explanation. Do not ask the visitor to identify the document type unless the document is genuinely impossible to classify.`;

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts }], generationConfig: { maxOutputTokens: 3200, temperature: 0.12 } }),
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
    let savedSlug: string | null = null;
    try {
      const existing = await db.explanation.findUnique({ where: { slug } });
      if (existing) {
        const snippets: string[] = JSON.parse(existing.snippets || "[]");
        if (text && text.length > 20) { snippets.unshift(text.substring(0, 200)); if (snippets.length > 5) snippets.pop(); }
        await db.explanation.update({ where: { slug }, data: { count: { increment: 1 }, explanation, snippets: JSON.stringify(snippets), language } });
        savedSlug = existing.slug;
      } else {
        await db.explanation.create({ data: { slug, docType: detectedType, explanation, snippets: JSON.stringify(text ? [text.substring(0, 200)] : []), language, isPhishing: /phishing|scam|suspicious/i.test(detectedType) } });
        savedSlug = slug;
      }
    } catch (dbError) { console.error("[/api/explain DB]", dbError); }
    return NextResponse.json({ explanation, slug: savedSlug, detectedType });
  } catch (e) {
    console.error("[/api/explain]", e);
    try { await logUsage({ endpoint: "explain", success: false, errorMessage: String(e) }); } catch {}
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
