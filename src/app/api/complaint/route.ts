import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import { db } from "@/lib/db";
import { checkRateLimit, getClientIdentifier, looksLikeBot } from "@/lib/rate-limit";

async function ensureComplaintTable() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) return;

  const client = createClient({ url, authToken });
  try {
    // Production currently has the Prisma model but is missing the physical table.
    // CREATE TABLE IF NOT EXISTS is idempotent and does not modify existing data.
    await client.execute(`
      CREATE TABLE IF NOT EXISTS "Complaint" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT,
        "message" TEXT NOT NULL,
        "category" TEXT NOT NULL DEFAULT 'general',
        "status" TEXT NOT NULL DEFAULT 'open',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await client.execute(`CREATE INDEX IF NOT EXISTS "Complaint_status_idx" ON "Complaint" ("status")`);
    await client.execute(`CREATE INDEX IF NOT EXISTS "Complaint_createdAt_idx" ON "Complaint" ("createdAt")`);
  } finally {
    client.close();
  }
}

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

    await ensureComplaintTable();

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
