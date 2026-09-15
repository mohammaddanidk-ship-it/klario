export type ReportEvidence = {
  text: string;
  source: "document" | "context" | "uncertain";
  confidence: "high" | "medium" | "low";
};

export type ReportItem = {
  label: string;
  value: string;
  importance?: "normal" | "important" | "critical";
  evidence?: ReportEvidence;
};

export type DocumentReport = {
  schemaVersion: "1.0";
  identity: {
    documentType: string;
    confidence: "high" | "medium" | "low" | "unknown";
    purpose: string;
  };
  quickUnderstanding: string;
  verifiedFacts: ReportItem[];
  datesAndDeadlines: ReportItem[];
  amountsAndEntities: ReportItem[];
  obligationsAndRequests: ReportItem[];
  attention: ReportItem[];
  uncertainty: ReportItem[];
  nextSteps: string[];
  questionsToVerify: string[];
  simpleConclusion: string;
  safety: { highStakes: boolean; disclaimer?: string };
};

type ReportSection =
  | "quickUnderstanding"
  | "verifiedFacts"
  | "datesAndDeadlines"
  | "amountsAndEntities"
  | "obligationsAndRequests"
  | "attention"
  | "uncertainty"
  | "nextSteps"
  | "questionsToVerify"
  | "simpleConclusion";

const SECTION_ALIASES: Record<string, ReportSection | null> = {
  "quick understanding": "quickUnderstanding",
  "what this means": "verifiedFacts",
  "key details": "verifiedFacts",
  "what it means for you": "obligationsAndRequests",
  "what needs attention": "attention",
  "what to do next": "nextSteps",
  "what to ask / verify": "questionsToVerify",
  "what to ask/verify": "questionsToVerify",
  "in simple words": "simpleConclusion",
};

function clean(value: string): string {
  return value.replace(/^[-•]\s+/, "").replace(/^\*+|\*+$/g, "").trim();
}

function sectionName(line: string): string {
  return line.replace(/^#+\s*/, "").replace(/^\d+\.\s*/, "").replace(/\*+/g, "").trim().toLowerCase();
}

function confidenceFor(value: string): ReportEvidence["confidence"] {
  if (/unclear|unknown|cannot|can't|not visible|needs confirmation|ambiguous|blurry|cropped/i.test(value)) return "low";
  if (/likely|may|might|possibly|appears|seems/i.test(value)) return "medium";
  return "high";
}

function classifyItems(lines: string[]): ReportItem[] {
  return lines.map(clean).filter(Boolean).map((value) => ({
    label: value.split(":")[0]?.trim().slice(0, 80) || "Detail",
    value,
    importance: /urgent|deadline|warning|risk|critical|must|do not/i.test(value) ? "important" : "normal",
    evidence: {
      text: value,
      source: confidenceFor(value) === "low" ? "uncertain" : "document",
      confidence: confidenceFor(value),
    },
  }));
}

/** Converts Klarium's human-readable analysis into a stable, non-inventive product schema. */
export function buildDocumentReport(explanation: string, detectedType = "document"): DocumentReport {
  const lines = explanation.split(/\r?\n/);
  const sections = new Map<string, string[]>();
  let current = "quick understanding";

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const name = sectionName(trimmed);
    if (SECTION_ALIASES[name]) {
      current = name;
      if (!sections.has(current)) sections.set(current, []);
      continue;
    }
    if (/^\*\*(document type|what it is):\*\*/i.test(trimmed)) {
      const value = clean(trimmed.replace(/^\*\*(document type|what it is):\*\*/i, ""));
      if (value) {
        if (!sections.has("identity")) sections.set("identity", []);
        sections.get("identity")!.push(value);
      }
      continue;
    }
    sections.get(current)?.push(trimmed);
  }

  const identityLines = sections.get("identity") ?? [];
  const purpose = identityLines.find((x) => !/^(likely )?document type/i.test(x)) ?? "";
  const type = detectedType || identityLines[0] || "document";
  const identityConfidence: DocumentReport["identity"]["confidence"] = /likely|uncertain|unknown/i.test(type) ? "medium" : "high";
  const values = (name: string) => sections.get(name) ?? [];
  const quick = values("quick understanding");
  const key = values("key details");
  const meaning = values("what this means");
  const attention = values("what needs attention");
  const actions = values("what to do next");
  const questions = values("what to ask / verify");
  const simple = values("in simple words");
  const implications = values("what it means for you");
  const mergedFacts = [...key, ...meaning].filter(Boolean);
  const highStakes = /medical|prescription|health|legal|court|tax|financial|bank|insurance|visa|immigration|employment/i.test(type + " " + explanation);
  const uncertainty = lines.filter((line) => /unclear|uncertain|not visible|needs confirmation|cannot be determined|ambiguous|blurry|cropped|missing/i.test(line)).map(clean).filter(Boolean);

  return {
    schemaVersion: "1.0",
    identity: { documentType: type, confidence: identityConfidence, purpose },
    quickUnderstanding: quick.map(clean).join(" ") || purpose,
    verifiedFacts: classifyItems(mergedFacts),
    datesAndDeadlines: classifyItems(lines.filter((x) => /deadline|due date|expiry|expires|date|appointment|valid until|renewal/i.test(x))),
    amountsAndEntities: classifyItems(lines.filter((x) => /[$€£¥₹₨]|\b(?:USD|EUR|GBP|PKR|INR|AED|SAR|amount|total|fee|price|balance|name|issuer|company|bank|doctor|patient|tenant|landlord|employee|employer)\b/i.test(x))),
    obligationsAndRequests: classifyItems(implications),
    attention: classifyItems(attention),
    uncertainty: classifyItems(uncertainty),
    nextSteps: actions.map(clean).filter(Boolean),
    questionsToVerify: questions.map(clean).filter(Boolean),
    simpleConclusion: simple.map(clean).join(" ") || quick.map(clean).join(" "),
    safety: {
      highStakes,
      disclaimer: highStakes ? "This explanation is informational. For high-stakes medical, legal, financial, tax, immigration or insurance decisions, verify important details with the appropriate qualified professional or issuing organization." : undefined,
    },
  };
}
