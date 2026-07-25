import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// One clean slug per document type — no timestamps
function toSlug(docType: string): string {
  return docType.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 60);
}

const SYSTEM = (lang: string) => `You are Klario, a trusted document clarity assistant. Explain this document in simple plain language.

Respond in ${lang} using this exact structure:

**What this document is:**
[One sentence only]

**What it says in plain language:**
[2–4 bullet points — simple words, no jargon]

**Key things to be aware of:**
[2–3 bullet points — risks, deadlines, or required actions]

**The bottom line:**
[One sentence — what should this person do or know]

Write as you would explain to a trusted friend. Respond entirely in ${lang}.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, fileData, fileType, language = "English", docType = "document" } = body;

    if (!text && !fileData) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "Service not configured" }, { status: 503 });
    }

    // Call Claude API
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
        model: "model: "claude-sonnet-5",
        max_tokens: 1000,
        system: fileData ? sys : undefined,
        messages
      })
    });

    const data = await res.json();
    const explanation = data?.content?.[0]?.text;
    if (!explanation) {
      return NextResponse.json({ error: "Failed to generate explanation" }, { status: 500 });
    }

    // ── Smart SEO: one page per docType, update if exists ──────────────────
    const slug = toSlug(docType);
    let savedSlug: string | null = null;

    try {
      const existing = await db.explanation.findUnique({ where: { slug } });

      if (existing) {
        // Page exists — update count and add snippet (max 5 stored)
        const snippets: string[] = JSON.parse(existing.snippets || "[]");
        if (text && text.length > 20) {
          snippets.unshift(text.substring(0, 200));
          if (snippets.length > 5) snippets.pop(); // keep only 5 snippets
        }
        await db.explanation.update({
          where: { slug },
          data: {
            count:       { increment: 1 },
            explanation, // always update with freshest explanation
            snippets:    JSON.stringify(snippets),
            language,
          }
        });
        savedSlug = existing.slug;
      } else {
        // New docType — create the page
        const snippets = text ? [text.substring(0, 200)] : [];
        await db.explanation.create({
          data: {
            slug,
            docType,
            explanation,
            snippets:   JSON.stringify(snippets),
            language,
            isPhishing: false,
          }
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
