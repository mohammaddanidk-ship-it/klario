import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, checkDuplicate, getClientIdentifier, looksLikeBot, sanitizeUserInput } from "@/lib/rate-limit";
import { logUsage } from "@/lib/usage-tracker";
import { isQualitySeoCandidate } from "@/lib/seo/public-content";

function toSlug(docType: string): string {
  return docType.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim().substring(0, 60);
}

function buildSafePublicExplanation(docType: string, language: string, phishing: boolean): string {
  const label = phishing ? "scam or phishing message" : docType;
  const sections = language.toLowerCase().startsWith("english")
    ? [
        `**Document type:** ${docType}`,
        `**What it is:** This page explains what a ${label} generally means, what information is normally important, what to check, and what practical next steps may be useful. It is a general educational guide and does not contain or reproduce any visitor's document.`,
        `## 1. What this means\nA ${label} can contain important information that is easy to misunderstand when it uses technical, legal, financial, medical, or urgent language. The meaning depends on the exact document, the issuing organization, the dates and amounts shown, and the surrounding context.`,
        `## 2. What stands out\nLook for the document's purpose, issuing organization, relevant parties, dates, amounts, reference numbers, instructions, warnings, conditions, deadlines, and unusual requests.`,
        `## 3. What it means for you\nThe practical meaning depends on what the document actually states and what action it expects from you. Separate explicit facts from assumptions.`,
        `## 4. What needs attention\nPrioritize deadlines, financial consequences, legal obligations, health implications, account-security risks, and requests for sensitive information. Verify important claims through an appropriate official or professional source.`,
        `## 5. What to do next\n1. Identify who issued the document and why.\n2. Check dates, amounts, results, clauses, and instructions.\n3. Verify important claims through an official channel.\n4. Keep the original document available.\n5. For high-stakes medical, legal, financial, tax, immigration, or insurance decisions, confirm the interpretation with the appropriate qualified professional.`,
        `## 6. What to ask / verify\nConfirm what action is required, the relevant deadline, which facts are uncertain, what evidence supports important claims, and where official confirmation can be obtained.`,
        `## 7. In simple words\nKlarium helps turn complicated documents into understandable information. Important decisions should be based on the original document and verified facts.`,
      ]
    : [
        `**Document type:** ${docType}`,
        `**What it is:** This is a general Klarium guide explaining what a ${label} usually contains, what deserves attention, and what practical steps can help. It is educational content only and contains no visitor-submitted document text.`,
        `## 1. What this means\nA ${label} can contain important information that may be difficult to understand because of specialist language, formal conditions, numbers, dates, or urgent instructions. The exact meaning depends on the original document and its context.`,
        `## 2. What stands out\nCheck the purpose, issuer, dates, amounts, results, conditions, instructions, warnings, deadlines, and unusual requests.`,
        `## 3. What it means for you\nThe practical meaning depends on what the document asks you to do and what it establishes. Separate explicit information from assumptions.`,
        `## 4. What needs attention\nPay special attention to deadlines, financial consequences, legal obligations, health implications, account-security risks, and requests for sensitive information.`,
        `## 5. What to do next\n1. Identify the issuer and purpose.\n2. Check dates, amounts, results, clauses, and instructions.\n3. Verify important claims through an official channel.\n4. Keep the original document available.\n5. Get qualified professional advice for high-stakes decisions.`,
        `## 6. What to ask / verify\nConfirm what action is required, the relevant deadline, the evidence supporting important claims, and where official confirmation can be obtained.`,
        `## 7. In simple words\nThis guide helps you understand the kind of information a ${label} may contain. The original document and the appropriate professional remain the final source of truth.`,
      ];
  return sections.join("\n\n");
}

const SYSTEM = (lang: string) => `You are Klarium, a professional document-understanding assistant. Your job is to make a person genuinely understand their document, not merely summarize it.

FIRST: AUTOMATICALLY IDENTIFY THE DOCUMENT
Determine the most likely type from the actual uploaded image/text. Categories include medical report, CBC/blood test, imaging report, prescription/doctor's medicine receipt, legal notice, contract, rental agreement, employment document, bank/financial document, insurance, government/tax, visa/immigration, invoice/bill, education document, email/message, phishing/scam message, or another category. Do not force a category when evidence is weak.

At the beginning include:
**Document type:** [specific type]
**What it is:** [one clear sentence]

If confidence is not high, say “Likely document type”.

IMPORTANT OUTPUT DESIGN
Never produce a wall of text. Start with a short **Quick understanding** section, then use clear headings, bullets, tables where helpful, and numbered actions. Put the most important facts near the top. Preserve exact readable values and clearly label anything uncertain.

Use this logical structure in EVERY language. Translate headings naturally while preserving the order:

## Quick understanding
Give the clearest 1–3 sentence answer about what the document is and what matters most.

## 1. What this means
Explain the overall situation in plain language.

## 2. Key details
List important findings, clauses, amounts, dates, results, requests, warnings or conditions. Explain why each matters.

## 3. What it means for you
Explain practical consequences and what the document does and does not establish.

## 4. What needs attention
Separate ordinary information from information that deserves attention. Only call something abnormal, risky, urgent, expensive, legally significant, or suspicious when supported by evidence.

## 5. What to do next
Give a numbered practical action plan based on this document. Never invent a deadline.

## 6. What to ask / verify
Give specific questions or facts the visitor should verify with the appropriate professional or organization.

## 7. In simple words
End with a short plain-language conclusion.

PRESCRIPTION / DOCTOR'S MEDICINE RECEIPT — HIGHEST PRIORITY HIGH-SAFETY MODE
If the uploaded document appears to be a prescription, handwritten doctor's medicine receipt, medication list, or medicine instruction sheet, activate this mode.

The goal is to READ AND EXPLAIN what is visibly written, not to prescribe, alter, approve, or infer treatment.

For EACH medicine, create a clearly separated block:
### Medicine 1
- **Medicine name:** reproduce only what is actually readable.
- **Reading confidence:** Clear / Partially clear / Unclear.
- **Strength:** only if visible.
- **Form:** tablet/capsule/syrup/injection/cream/etc., only if visible.
- **Doctor's dosage:** exactly what is written; do not normalize or infer it.
- **Frequency:** only if written or unambiguous.
- **Duration:** only if written.
- **Food instruction:** only if written.
- **Quantity:** only if visible.
- **Special instructions:** only if visible.
- **Common use:** concise general medical information only; do not claim this proves why the doctor prescribed it.

Then add:
## Prescription safety check
Use three categories:
- **Clearly readable:** fields that can be read confidently.
- **Needs confirmation:** ambiguous handwriting, medicine names, strengths, doses, frequency or duration.
- **Not visible:** information that is cropped, covered, too blurry, or absent.

If handwriting is difficult to read, say so prominently near the top. Never turn an unclear handwritten mark into a confident medicine name or dose.

CRITICAL PRESCRIPTION RULES
- Never invent or “correct” a medicine name.
- Never infer dosage from common dosage, age, weight, disease or medicine strength.
- Never tell the visitor to start, stop, increase, decrease, combine or substitute medicine based solely on Klarium.
- Never claim the prescription is medically appropriate or safe for the individual.
- If two medicine names look similar, flag both possibilities as uncertain rather than choosing one.
- If a medicine cannot be identified confidently, write: **Medicine name unclear — do not rely on this reading; confirm with your pharmacist/doctor.**
- If dosage cannot be identified confidently, write: **Dosage unclear — do not guess; confirm before taking it.**
- If the image is blurry, rotated, cropped, low-resolution, or handwritten and difficult to read, state the limitation.
- Never claim “100% accurate”, “error-free”, or “safe to take.”

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

QUALITY
Be specific to THIS document. Preserve exact readable names, dates, amounts, units, currencies, reference ranges and clause numbers. If something is blurry, cropped, missing or unreadable, explicitly say what cannot be determined. If evidence conflicts, explain the conflict rather than guessing. Distinguish “the document says” from general background information. Do not expose internal reasoning.

LANGUAGE
Respond completely in ${lang}. Keep the same clarity, structure, professionalism and safety warnings in every supported language. Translate headings and explanations naturally. Do not fall back to English unless requested.

SAFETY
For medical, legal, financial, tax, immigration and insurance content, educate and explain but do not present yourself as a licensed professional. For medication, never replace a doctor/pharmacist and never guess uncertain prescription information.

Now analyze the supplied document. The uploaded image is the primary source of truth.`;

const PRESCRIPTION_VERIFY = (lang: string) => `You are the second-pass verification layer for Klarium's prescription reader. Re-read the SAME prescription image independently at high visual detail. Your only job is to detect and correct reading mistakes, especially handwritten medicine names, strength, dosage, frequency and duration.

Respond completely in ${lang} and use this exact structure:
## Prescription verification
### Medicine 1
- **Best reading:** ...
- **Confidence:** High / Medium / Low
- **Alternative reading if ambiguous:** ...
- **Strength:** ... / Needs confirmation / Not visible
- **Dosage:** ... / Needs confirmation / Not visible
- **Frequency:** ... / Needs confirmation / Not visible
- **Duration:** ... / Needs confirmation / Not visible
- **Other visible instructions:** ...

Repeat for every medicine.

## Verification warnings
List every field that must be confirmed with a doctor or pharmacist.

RULES:
- Never guess a handwritten medicine name.
- If two names are plausible, show both and mark Low confidence.
- Never infer dosage, frequency or duration.
- Do not use medical knowledge to “fix” handwriting.
- Do not claim that a medicine is safe or appropriate.
- If a line cannot be read, say exactly that it cannot be read.
- Prefer uncertainty over a false positive.
- The original image remains the source of truth.`;

async function callGemini(key: string, contents: any[], mediaResolution: "MEDIA_RESOLUTION_LOW" | "MEDIA_RESOLUTION_MEDIUM" | "MEDIA_RESOLUTION_HIGH") {
  return fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 5000,
        temperature: 0.05,
        media_resolution: mediaResolution,
      },
    }),
  });
}

function extractExplanation(data: any): string {
  return data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join("\n") || "";
}

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
    let uploadedMime = "";
    let uploadedData = "";
    if (rawFileData && rawFileType) {
      const dataUrlMatch = typeof rawFileData === "string" ? rawFileData.match(/^data:([^;,]+);base64,(.+)$/s) : null;
      uploadedMime = dataUrlMatch?.[1] || String(rawFileType).split(";")[0].trim();
      uploadedData = dataUrlMatch?.[2] || String(rawFileData).replace(/^data:[^,]+,/, "").replace(/\s/g, "");
      if (!uploadedMime || !uploadedData) return NextResponse.json({ error: "The uploaded file could not be read. Please upload it again." }, { status: 400 });
      if (uploadedData.length > 20_000_000) return NextResponse.json({ error: "This file is too large. Please upload a smaller image." }, { status: 413 });
      parts.push({ inlineData: { mimeType: uploadedMime, data: uploadedData } });
      parts.push({ text: `${SYSTEM(language)}\n\nAnalyze the uploaded document image directly. Pay particular attention to small text, handwriting, medicine names, numbers and units. Do not guess unreadable content.` });
    } else {
      parts.push({ text: `${SYSTEM(language)}\n\nAnalyze the following document text:\n\n${text}` });
    }

    const initialResolution = rawFileData ? (uploadedMime === "application/pdf" ? "MEDIA_RESOLUTION_MEDIUM" : "MEDIA_RESOLUTION_HIGH") : "MEDIA_RESOLUTION_LOW";
    let res: Response;
    try {
      res = await callGemini(key, [{ role: "user", parts }], initialResolution);
    } catch (e) {
      console.error("[Gemini network]", e);
      await logUsage({ endpoint: "explain", success: false, errorMessage: "Network error reaching AI service" });
      return NextResponse.json({ error: "Our AI service is temporarily unreachable. Please try again in a moment." }, { status: 503 });
    }

    const data = await res.json().catch(() => ({}));
    let explanation = extractExplanation(data);
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
    const phishing = /phishing|scam|suspicious/i.test(detectedType);
    const isPrescription = /prescription|doctor.?s medicine|medicine receipt|medication list|medicine instruction/i.test(`${detectedType} ${docType}`);

    // Prescription gets an independent second vision pass. It is deliberately stricter than the first pass:
    // uncertainty is surfaced rather than silently resolved. This is a safety/accuracy check, not a diagnosis.
    if (isPrescription && rawFileData && uploadedMime.startsWith("image/")) {
      try {
        const verifyParts = [
          { inlineData: { mimeType: uploadedMime, data: uploadedData } },
          { text: `${PRESCRIPTION_VERIFY(language)}\n\nFIRST-PASS READING TO CHECK (do not trust it blindly):\n${explanation}` },
        ];
        const verifyRes = await callGemini(key, [{ role: "user", parts: verifyParts }], "MEDIA_RESOLUTION_HIGH");
        const verifyData = await verifyRes.json().catch(() => ({}));
        const verification = extractExplanation(verifyData);
        if (verifyRes.ok && verification) {
          explanation = `${verification}\n\n## Full document explanation\n${explanation}`;
          await logUsage({ endpoint: "explain-prescription-verification", success: true, inputTokens: verifyData?.usageMetadata?.promptTokenCount ?? 0, outputTokens: verifyData?.usageMetadata?.candidatesTokenCount ?? 0 });
        } else {
          console.warn("[Prescription verification] unavailable", verifyRes.status, verifyData?.error?.message);
          await logUsage({ endpoint: "explain-prescription-verification", success: false, errorMessage: `Gemini ${verifyRes.status}: verification unavailable` });
        }
      } catch (e) {
        console.error("[Prescription verification network]", e);
        await logUsage({ endpoint: "explain-prescription-verification", success: false, errorMessage: "Verification pass failed" });
      }
    }

    // Never publish, update, or retain a public SEO page with content generated from a visitor's document.
    const publicExplanation = buildSafePublicExplanation(detectedType, language, phishing);
    const qualityCandidate = {
      title: phishing ? `How to understand ${detectedType} scams` : `How to understand a ${detectedType}`,
      description: `Klarium explains what a ${detectedType} means in plain language, what to look for, what may need attention, and practical next steps.`,
      explanation: publicExplanation,
      faqs: [
        { question: `What is a ${detectedType}?`, answer: `This guide explains the purpose and common structure of a ${detectedType} in plain language.` },
        { question: `What should I check in a ${detectedType}?`, answer: `Check the dates, amounts, results, clauses, requests and warnings that are actually present in the original document.` },
        { question: `Should I get professional advice?`, answer: `For medical, legal, financial or other high-stakes decisions, confirm important decisions with the appropriate qualified professional.` },
      ],
    };

    let savedSlug: string | null = null;
    try {
      const existing = await db.explanation.findUnique({ where: { slug } });
      if (existing) {
        if (isQualitySeoCandidate(qualityCandidate)) {
          await db.explanation.update({ where: { slug }, data: { count: { increment: 1 }, explanation: publicExplanation, snippets: "[]", language, isPhishing: phishing } });
          savedSlug = existing.slug;
        }
      } else if (isQualitySeoCandidate(qualityCandidate)) {
        await db.explanation.create({ data: { slug, docType: detectedType, explanation: publicExplanation, snippets: "[]", language, isPhishing: phishing } });
        savedSlug = slug;
      }
    } catch (dbError) {
      console.error("[/api/explain DB]", dbError);
    }

    return NextResponse.json({ explanation, slug: savedSlug, detectedType, publicPageCreated: Boolean(savedSlug), prescriptionVerification: isPrescription && Boolean(rawFileData && uploadedMime.startsWith("image/")) });
  } catch (e) {
    console.error("[/api/explain]", e);
    try { await logUsage({ endpoint: "explain", success: false, errorMessage: String(e) }); } catch {}
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}