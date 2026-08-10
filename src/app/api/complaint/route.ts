import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, getClientIdentifier, looksLikeBot } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    if (looksLikeBot(req)) {
      return NextResponse.json({ error: "Request blocked." }, { status: 403 });
    }

    const clientId = getClientIdentifier(req);
    const { allowed } = checkRateLimit(clientId);
    if (!allowed) {
      return NextResponse.json({ error: "Too many submissions. Please wait a few minutes." }, { status: 429 });
    }

    const body = await req.json();
    const { email, message, category = "general" } = body;

    if (!message || message.trim().length < 10) {
      return NextResponse.json({ error: "Please provide a bit more detail (at least 10 characters)." }, { status: 400 });
    }

    await db.complaint.create({
      data: {
        email: email?.trim() || null,
        message: message.trim().slice(0, 2000),
        category,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[/api/complaint]", e);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}
