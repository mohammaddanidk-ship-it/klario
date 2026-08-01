import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

function toSlug(docType: string): string {
  return docType.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 60);
}

const SYSTEM = (lang: string) => `You are Klarium, a trusted document clarity assistant. Explain this document in simple plain language.

Respond in ${lang} using this exact structure:

**What this document is:**
[One sentence only]

**What it says in plain language:**
[2–4 bullet points — simple words, no jargon]

**Key things to be aware of:**
[2–3 bullet points — risks, deadlines, or required actions]

**Confidence:**
[State HIGH, MEDIUM, or LOW, then in one short sentence explain why — e.g. "High — the document text was clear and complete" or "Low — parts of the image were blurry or the text seemed cut off"]

**What should I do next?**
[1–2 specific, safe, actionable bullet points appropriate to the document type. For medical documents suggest consulting a physician. For legal documents suggest reviewing deadlines or consulting a lawyer for anything significant. For financial documents suggest verifying with the institution. Never give specific legal, medical, or financial advice beyond safe general guidance — always point toward a qualified professional for anything important.]

Write as you would explain to a trusted friend. Respond entirely in ${lang}.`;

export async function POST(req: NextRequest) {
  try {
    const clientId = getClientIdentifier(req);
    const { allowed } = checkRateLimit(clientId);
    if (!allowed) {
      return NextResponse.json(
        { error: "You've reached the limit of 10 requests per 10 minutes. Please wait a few minutes and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { text, fileData, fileType, language = "English", docType = "document" } = body;

    if (!text && !fileData) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "Service not configured" }, { status: 503 });
    }

    const sys = SYSTEM(language);
    let messages: any[];

    if (fileData && fileType) {
      const isPDF = fileType === "application/pdf";
      messages = [{
        role: "user",
        content: [
          isPDF
            ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: fileData } }
            : { type: "image",    source: { type: "base64", media_type: fileType,            data: fileData } },
          { type: "text", text: `Explain this document clearly in ${language}.` }
        ]
      }];
    } else {
      messages = [{ role: "user", content: `${sys}\n\nDocument:\n${text}` }];
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1200,
        system: fileData ? sys : undefined,
        messages
      })
    });

    const data = await res.json();
    const explanation = data?.content?.[0]?.text;
    if (!explanation) {
      return NextResponse.json({ error: "Failed to generate explanation", detail: JSON.stringify(data) }, { status: 500 });
    }

    const slug = toSlug(docType);
    let savedSlug: string | null = null;

    try {
      const existing = await db.explanation.findUnique({ where: { slug } });

      if (existing) {
        const snippets: string[] = JSON.parse(existing.snippets || "[]");
        if (text && text.length > 20) {
          snippets.unshift(text.substring(0, 200));
          if (snippets.length > 5) snippets.pop();
        }
        await db.explanation.update({
          where: { slug },
          data: { count: { increment: 1 }, explanation, snippets: JSON.stringify(snippets), language }
        });
        savedSlug = existing.slug;
      } else {
        const snippets = text ? [text.substring(0, 200)] : [];
        await db.explanation.create({
          data: { slug, docType, explanation, snippets: JSON.stringify(snippets), language, isPhishing: false }
        });
        savedSlug = slug;
      }
    } catch { /* DB non-critical */ }

    return NextResponse.json({ explanation, slug: savedSlug });
  } catch (e) {
    console.error("[/api/explain]", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
