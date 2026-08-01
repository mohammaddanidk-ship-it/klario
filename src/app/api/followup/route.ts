import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const clientId = getClientIdentifier(req);
    const { allowed } = checkRateLimit(clientId);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Please wait a few minutes." }, { status: 429 });
    }

    const body = await req.json();
    const { originalExplanation, question, language = "English" } = body;

    if (!question || !originalExplanation) {
      return NextResponse.json({ error: "Missing question or context" }, { status: 400 });
    }

    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "Service not configured" }, { status: 503 });
    }

    const prompt = `You are Klarium, a document clarity assistant. You already gave someone this explanation of their document:

---
${originalExplanation}
---

They now have a follow-up question: "${question}"

Answer their follow-up question clearly and briefly in ${language}, using only what's reasonable to infer from the explanation above. If the question needs information not in the original document, say so honestly rather than guessing. Keep the answer under 100 words, plain language, no jargon.`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    const answer = data?.content?.[0]?.text;
    if (!answer) {
      return NextResponse.json({ error: "Failed to answer" }, { status: 500 });
    }

    return NextResponse.json({ answer });
  } catch (e) {
    console.error("[/api/followup]", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
