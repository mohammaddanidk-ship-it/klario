import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { db } from "@/lib/db";

const COOKIE_NAME = "klarium_admin_session";
const MAX_AGE = 60 * 60 * 8;

function sign(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

function validSession(value: string, secret: string) {
  const [expiresRaw, signature] = value.split(".");
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000) || !signature) return false;
  const expected = sign(String(expires), secret);
  const a = Buffer.from(signature, "hex");
  const b = Buffer.from(expected, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function GET(req: NextRequest) {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) return NextResponse.json({ error: "Admin dashboard not configured. Add ADMIN_PASSWORD to the Vercel Production environment and redeploy." }, { status: 503 });

  const session = req.cookies.get(COOKIE_NAME)?.value;
  if (!session || !validSession(session, expectedPassword)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [allLogs, todayLogs, monthLogs, totalExplanations, totalPhishingChecks, openComplaints, recentComplaints] = await Promise.all([
      db.usageLog.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
      db.usageLog.findMany({ where: { createdAt: { gte: startOfToday } } }),
      db.usageLog.findMany({ where: { createdAt: { gte: startOfMonth } } }),
      db.explanation.count({ where: { isPhishing: false } }),
      db.explanation.count({ where: { isPhishing: true } }),
      db.complaint.count({ where: { status: "open" } }),
      db.complaint.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    ]);

    const sumCost = (logs: typeof allLogs) => logs.reduce((sum, l) => sum + l.estimatedCostCents, 0);
    const failedToday = todayLogs.filter(l => !l.success).length;
    const failedMonth = monthLogs.filter(l => !l.success).length;

    return NextResponse.json({
      today: { requests: todayLogs.length, failed: failedToday, costCents: sumCost(todayLogs) },
      month: { requests: monthLogs.length, failed: failedMonth, costCents: sumCost(monthLogs) },
      allTime: { requests: allLogs.length, costCents: sumCost(allLogs) },
      totals: { explanations: totalExplanations, phishingChecks: totalPhishingChecks },
      complaints: { open: openComplaints, recent: recentComplaints.map(c => ({ id: c.id, email: c.email, message: c.message, category: c.category, status: c.status, createdAt: c.createdAt })) },
      recentFailures: allLogs.filter(l => !l.success).slice(0, 15).map(l => ({ endpoint: l.endpoint, errorMessage: l.errorMessage, createdAt: l.createdAt })),
      recentRequests: allLogs.slice(0, 30).map(l => ({ endpoint: l.endpoint, success: l.success, costCents: l.estimatedCostCents, createdAt: l.createdAt })),
    });
  } catch (e) {
    console.error("[/api/admin/stats]", e);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
