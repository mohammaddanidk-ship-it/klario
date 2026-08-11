import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { db } from "@/lib/db";

const COOKIE_NAME = "klarium_admin_session";

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

    // Keep each query isolated. A missing/empty optional table should not make
    // the entire admin dashboard unusable.
    const safe = async <T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> => {
      try { return await fn(); } catch (e) { console.error(`[admin stats:${label}]`, e); return fallback; }
    };

    const allLogs = await safe("allLogs", () => db.usageLog.findMany({ orderBy: { createdAt: "desc" }, take: 500 }), [] as any[]);
    const todayLogs = await safe("todayLogs", () => db.usageLog.findMany({ where: { createdAt: { gte: startOfToday } } }), [] as any[]);
    const monthLogs = await safe("monthLogs", () => db.usageLog.findMany({ where: { createdAt: { gte: startOfMonth } } }), [] as any[]);
    const totalExplanations = await safe("explanations", () => db.explanation.count({ where: { isPhishing: false } }), 0);
    const totalPhishingChecks = await safe("phishing", () => db.explanation.count({ where: { isPhishing: true } }), 0);
    const openComplaints = await safe("openComplaints", () => db.complaint.count({ where: { status: "open" } }), 0);
    const recentComplaints = await safe("recentComplaints", () => db.complaint.findMany({ orderBy: { createdAt: "desc" }, take: 20 }), [] as any[]);

    const sumCost = (logs: any[]) => logs.reduce((sum, l) => sum + Number(l?.estimatedCostCents || 0), 0);
    const failedToday = todayLogs.filter((l: any) => !l.success).length;
    const failedMonth = monthLogs.filter((l: any) => !l.success).length;

    return NextResponse.json({
      today: { requests: todayLogs.length, failed: failedToday, costCents: sumCost(todayLogs) },
      month: { requests: monthLogs.length, failed: failedMonth, costCents: sumCost(monthLogs) },
      allTime: { requests: allLogs.length, costCents: sumCost(allLogs) },
      totals: { explanations: totalExplanations, phishingChecks: totalPhishingChecks },
      complaints: {
        open: openComplaints,
        recent: recentComplaints.map((c: any) => ({ id: c.id, email: c.email, message: c.message, category: c.category, status: c.status, createdAt: c.createdAt }))
      },
      recentFailures: allLogs.filter((l: any) => !l.success).slice(0, 15).map((l: any) => ({ endpoint: l.endpoint, errorMessage: l.errorMessage, createdAt: l.createdAt })),
      recentRequests: allLogs.slice(0, 30).map((l: any) => ({ endpoint: l.endpoint, success: l.success, costCents: Number(l.estimatedCostCents || 0), createdAt: l.createdAt })),
    });
  } catch (e) {
    console.error("[/api/admin/stats]", e);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
