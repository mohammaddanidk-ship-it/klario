import { NextRequest, NextResponse } from "next/server";
import { buildDocumentReport } from "@/lib/document-report";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const explanation = typeof body?.explanation === "string" ? body.explanation.trim() : "";
    const detectedType = typeof body?.detectedType === "string" ? body.detectedType.trim() : "document";

    if (!explanation) {
      return NextResponse.json({ error: "No explanation provided" }, { status: 400 });
    }

    return NextResponse.json({ report: buildDocumentReport(explanation, detectedType) });
  } catch {
    return NextResponse.json({ error: "Invalid report request" }, { status: 400 });
  }
}
