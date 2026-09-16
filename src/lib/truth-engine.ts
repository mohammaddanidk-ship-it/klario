import type { DocumentReport, ReportItem } from "@/lib/document-report";

export type TruthSignal = {
  kind: "verified" | "attention" | "uncertain" | "action";
  label: string;
  detail: string;
  reason: string;
};

function itemText(item: ReportItem): string {
  return `${item.label}: ${item.value}`;
}

function unique(values: string[]): string[] {
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))];
}

/**
 * Deterministic integrity layer. It never invents document facts; it identifies
 * places where the first-pass explanation needs evidence, confirmation or an
 * explicit next action.
 */
export function enrichTruthReport(report: DocumentReport): DocumentReport {
  const allItems = [
    ...report.verifiedFacts,
    ...report.datesAndDeadlines,
    ...report.amountsAndEntities,
    ...report.obligationsAndRequests,
    ...report.attention,
  ];

  const uncertain = [...report.uncertainty];
  const attention = [...report.attention];
  const nextSteps = [...report.nextSteps];
  const questions = [...report.questionsToVerify];
  const text = allItems.map(itemText).join(" ");

  if (report.safety.highStakes) {
    const hasVerification = /verify|confirm|doctor|pharmacist|lawyer|attorney|professional|official/i.test(
      `${nextSteps.join(" ")} ${questions.join(" ")}`
    );
    if (!hasVerification) {
      questions.push("Which important details should be confirmed with the appropriate qualified professional or issuing organization?");
    }
  }

  for (const item of report.verifiedFacts) {
    if (/likely|may|might|possibly|appears|seems|unclear|unknown|cannot|not visible|needs confirmation|ambiguous/i.test(item.value)) {
      uncertain.push(item.value);
    }
  }

  if (/[$€£¥₹₨]|\b(?:USD|EUR|GBP|PKR|INR|AED|SAR|amount|total|fee|balance|payment|price)\b/i.test(text)) {
    const hasAmountCheck = /amount|total|balance|fee|payment|receipt|invoice|transaction|reconcile|verify/i.test(
      `${nextSteps.join(" ")} ${questions.join(" ")}`
    );
    if (!hasAmountCheck) {
      attention.push({
        label: "Amounts",
        value: "The analysis contains financial or monetary information. Check the original document before acting on any amount, fee, balance or payment instruction.",
        importance: "important",
        evidence: { text: "Financial information was detected in the analysis.", source: "document", confidence: "medium" },
      });
      nextSteps.push("Verify important amounts, currency, fees and payment instructions against the original document.");
    }
  }

  if (/deadline|due date|expiry|expires|valid until|renewal|respond by|response required/i.test(text)) {
    const hasDateAction = /date|deadline|expiry|expires|valid|renew/i.test(`${nextSteps.join(" ")} ${questions.join(" ")}`);
    if (!hasDateAction) {
      attention.push({
        label: "Deadline check",
        value: "A date or deadline appears in the analysis. Confirm the exact date on the original document before relying on it.",
        importance: "critical",
        evidence: { text: "A date/deadline signal was detected.", source: "document", confidence: "medium" },
      });
      nextSteps.push("Confirm the exact deadline or expiry date from the original document.");
    }
  }

  if (/phishing|scam|suspicious|password|pin|otp|verification code|payment link|crypto/i.test(text)) {
    attention.push({
      label: "Security signal",
      value: "The analysis contains a security-sensitive request or suspicious-message signal. Do not rely on the message alone to verify the sender.",
      importance: "critical",
      evidence: { text: "Security-sensitive language was detected.", source: "document", confidence: "medium" },
    });
    nextSteps.push("Verify the sender through a trusted channel before sharing credentials, codes, money or sensitive information.");
  }

  return {
    ...report,
    uncertainty: uncertain.map((value) => ({
      label: "Needs confirmation",
      value,
      importance: "important",
      evidence: { text: value, source: "uncertain", confidence: "low" },
    })),
    attention,
    nextSteps: unique(nextSteps),
    questionsToVerify: unique(questions),
  };
}

export function getTruthSignals(report: DocumentReport): TruthSignal[] {
  const signals: TruthSignal[] = [];
  for (const item of report.verifiedFacts.slice(0, 12)) {
    signals.push({ kind: "verified", label: item.label, detail: item.value, reason: "Present in the analysis as a document detail." });
  }
  for (const item of report.attention.slice(0, 8)) {
    signals.push({ kind: "attention", label: item.label, detail: item.value, reason: "Requires attention before acting." });
  }
  for (const item of report.uncertainty.slice(0, 8)) {
    signals.push({ kind: "uncertain", label: item.label, detail: item.value, reason: "The available analysis does not support confident reliance." });
  }
  for (const step of report.nextSteps.slice(0, 8)) {
    signals.push({ kind: "action", label: "Next step", detail: step, reason: "Action derived from the document analysis." });
  }
  return signals;
}
