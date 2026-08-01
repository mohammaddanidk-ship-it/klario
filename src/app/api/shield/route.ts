import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

const SYSTEM = `You are Klarium Shield, a fraud and phishing detection system. Analyse this message with precision.

Use this exact format:

VERDICT: [SCAM or LEGITIMATE]
CONFIDENCE: [HIGH or MEDIUM or LOW]

**What this message claims to be:**
[One sentence]

**Red flags identified:**
[Each flag as a bullet. If none: "No suspicious elements detected."]

**Why this verdict:**
[2–3 clear sentences]

**What should I do next?**
[2–3 specific actionable bullet points — e.g. "Do not click any links", "Report to your bank's fraud team", "Delete this message"]

Be decisive. People's financial security depends on your accuracy.`;

function toSlug(label: string): string {
  return label.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 60);
}

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
    const { text, fileData, fileType, docType = "suspicious-message" } = body;

    if (!text && !fileData) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "Service not configured" }, { status: 503 });
    }

    let messages: any[];
    if (fileData && fileType) {
      messages = [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: fileType, data: fileData } },
          { type: "text", text: "Analyse this message or screenshot for phishing and fraud." }
        ]
      }];
    } else {
      messages = [{ role: "user", content: `${SYSTEM}\n\nMessage:\n${text}` }];
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
        system: fileData ? SYSTEM : undefined,
        messages
      })
    });

    const data = await res.json();
    const result = data?.content?.[0]?.text;
    if (!result) {
      return NextResponse.json({ error: "Failed to analyse message", detail: JSON.stringify(data) }, { status: 500 });
    }

    const verdict    = result.includes("VERDICT: SCAM") ? "SCAM" : result.includes("VERDICT: LEGITIMATE") ? "LEGITIMATE" : "UNKNOWN";
    const confidence = result.includes("CONFIDENCE: HIGH") ? "HIGH" : result.includes("CONFIDENCE: MEDIUM") ? "MEDIUM" : "LOW";

    try {
      const slug = toSlug(docType);
      const existing = await db.explanation.findUnique({ where: { slug } });
      if (existing) {
        const snippets: string[] = JSON.parse(existing.snippets || "[]");
        if (text) { snippets.unshift(text.substring(0, 200)); if (snippets.length > 5) snippets.pop(); }
        await db.explanation.update({
          where: { slug },
          data: { count: { increment: 1 }, explanation: result, snippets: JSON.stringify(snippets), verdict, confidence }
        });
      } else {
        const snippets = text ? [text.substring(0, 200)] : [];
        await db.explanation.create({
          data: { slug, docType, explanation: result, snippets: JSON.stringify(snippets), isPhishing: true, verdict, confidence }
        });
      }
    } catch { /* non-critical */ }

    return NextResponse.json({ result, verdict, confidence });
  } catch (e) {
    console.error("[/api/shield]", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
