import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return NextResponse.json({ error: "Admin dashboard not configured" }, { status: 503 });
  }
  if (authHeader !== `Bearer ${expectedPassword}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [allLogs, todayLogs, monthLogs, totalExplanations, totalPhishingChecks] = await Promise.all([
      db.usageLog.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
      db.usageLog.findMany({ where: { createdAt: { gte: startOfToday } } }),
      db.usageLog.findMany({ where: { createdAt: { gte: startOfMonth } } }),
      db.explanation.count({ where: { isPhishing: false } }),
      db.explanation.count({ where: { isPhishing: true } }),
    ]);

    const sumCost = (logs: typeof allLogs) => logs.reduce((sum, l) => sum + l.estimatedCostCents, 0);
    const failedToday = todayLogs.filter(l => !l.success).length;
    const failedMonth = monthLogs.filter(l => !l.success).length;

    return NextResponse.json({
      today: {
        requests: todayLogs.length,
        failed: failedToday,
        costCents: sumCost(todayLogs),
      },
      month: {
        requests: monthLogs.length,
        failed: failedMonth,
        costCents: sumCost(monthLogs),
      },
      allTime: {
        requests: allLogs.length,
        costCents: sumCost(allLogs),
      },
      totals: {
        explanations: totalExplanations,
        phishingChecks: totalPhishingChecks,
      },
      recentFailures: allLogs.filter(l => !l.success).slice(0, 15).map(l => ({
        endpoint: l.endpoint,
        errorMessage: l.errorMessage,
        createdAt: l.createdAt,
      })),
      recentRequests: allLogs.slice(0, 30).map(l => ({
        endpoint: l.endpoint,
        success: l.success,
        costCents: l.estimatedCostCents,
        createdAt: l.createdAt,
      })),
    });
  } catch (e) {
    console.error("[/api/admin/stats]", e);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
