import { NextRequest, NextResponse } from "next/server";
import { buildDocumentReport } from "@/lib/document-report";
import { enrichTruthReport, getTruthSignals } from "@/lib/truth-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const explanation = typeof body?.explanation === "string" ? body.explanation.trim() : "";
    const detectedType = typeof body?.detectedType === "string" ? body.detectedType.trim() : "document";

    if (!explanation) {
      return NextResponse.json({ error: "No explanation provided" }, { status: 400 });
    }

    const baseReport = buildDocumentReport(explanation, detectedType);
    const report = enrichTruthReport(baseReport);

    return NextResponse.json({
      report,
      signals: getTruthSignals(report),
    });
  } catch {
    return NextResponse.json({ error: "Invalid report request" }, { status: 400 });
  }
}
