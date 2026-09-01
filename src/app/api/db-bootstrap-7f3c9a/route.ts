import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

const BOOTSTRAP_TOKEN = "klarium-db-bootstrap-7f3c9a-2026";

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("token") !== BOOTSTRAP_TOKEN) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const databaseUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!databaseUrl) return NextResponse.json({ error: "TURSO_DATABASE_URL is not configured" }, { status: 500 });
  const client = createClient({ url: databaseUrl, authToken });
  try {
    await client.execute(`CREATE TABLE IF NOT EXISTS "Explanation" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "slug" TEXT NOT NULL UNIQUE,
      "docType" TEXT NOT NULL UNIQUE,
      "explanation" TEXT NOT NULL,
      "snippets" TEXT NOT NULL DEFAULT '[]',
      "language" TEXT NOT NULL DEFAULT 'English',
      "views" INTEGER NOT NULL DEFAULT 0,
      "count" INTEGER NOT NULL DEFAULT 1,
      "isPhishing" BOOLEAN NOT NULL DEFAULT 0,
      "verdict" TEXT,
      "confidence" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);
    await client.execute(`CREATE INDEX IF NOT EXISTS "Explanation_docType_idx" ON "Explanation" ("docType")`);
    await client.execute(`CREATE INDEX IF NOT EXISTS "Explanation_isPhishing_idx" ON "Explanation" ("isPhishing")`);
    await client.execute(`CREATE INDEX IF NOT EXISTS "Explanation_views_idx" ON "Explanation" ("views")`);
    return NextResponse.json({ ok: true, table: "Explanation", status: "ready" });
  } finally {
    client.close();
  }
}
