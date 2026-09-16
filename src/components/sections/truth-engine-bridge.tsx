"use client";

import * as React from "react";
import type { DocumentReport, ReportItem } from "@/lib/document-report";

function section(title: string, items: ReportItem[]): string[] {
  if (!items.length) return [];
  return ["", `**${title}**`, ...items.map((item) => `- ${item.value}`)];
}

function renderReport(report: DocumentReport): string {
  const lines: string[] = [
    "",
    "**KLARIUM TRUTH LAYER**",
    `- Document type: ${report.identity.documentType}`,
    report.identity.purpose ? `- Purpose: ${report.identity.purpose}` : "",
    report.quickUnderstanding ? `- Quick understanding: ${report.quickUnderstanding}` : "",
    ...section("Verified facts", report.verifiedFacts),
    ...section("Dates & deadlines", report.datesAndDeadlines),
    ...section("Amounts & entities", report.amountsAndEntities),
    ...section("Obligations & requests", report.obligationsAndRequests),
    ...section("What needs attention", report.attention),
    ...section("What is uncertain", report.uncertainty),
    ...(report.nextSteps.length ? ["", "**What to do next**", ...report.nextSteps.map((item) => `- ${item}`)] : []),
    ...(report.questionsToVerify.length ? ["", "**What to ask / verify**", ...report.questionsToVerify.map((item) => `- ${item}`)] : []),
    report.simpleConclusion ? "" : "",
    report.simpleConclusion ? `**In simple words**\n${report.simpleConclusion}` : "",
    report.safety.disclaimer ? `**Safety note**\n${report.safety.disclaimer}` : "",
  ];

  return lines.filter((line, index) => line || (index > 0 && lines[index - 1])).join("\n");
}

/**
 * Adapter for the current result UI: enriches /api/explain responses with the
 * normalized Truth Report until the result component accepts DocumentReport directly.
 */
export function TruthEngineBridge() {
  React.useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await originalFetch(input, init);
      const url = typeof input === "string" ? input : input instanceof Request ? input.url : input.toString();

      if (!url.endsWith("/api/explain") || !response.ok) return response;

      try {
        const source = await response.clone().json();
        if (typeof source?.explanation !== "string" || !source.explanation.trim()) return response;

        const reportResponse = await originalFetch("/api/document-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            explanation: source.explanation,
            detectedType: source.detectedType ?? "document",
          }),
        });

        if (!reportResponse.ok) return response;
        const reportData = await reportResponse.json();
        if (!reportData?.report) return response;

        const enriched = {
          ...source,
          explanation: `${source.explanation.trim()}\n\n${renderReport(reportData.report)}`,
        };

        return new Response(JSON.stringify(enriched), {
          status: response.status,
          statusText: response.statusText,
          headers: { "Content-Type": "application/json" },
        });
      } catch {
        return response;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
