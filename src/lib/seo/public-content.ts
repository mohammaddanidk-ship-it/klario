export interface PublicSeoCandidate {
  title: string;
  description: string;
  explanation: string;
  faqs?: Array<{ question: string; answer: string }>;
}

/**
 * Public SEO pages must never contain visitor-submitted document text.
 * Only model-generated, generic, non-identifying content may pass through here.
 */
export function sanitizePublicSeoText(value: string): string {
  return value
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, "")
    .replace(/\b(?:\+?\d[\d\s().-]{7,}\d)\b/g, "")
    .replace(/\b(?:account|iban|routing|card|policy|claim|reference|case|passport|id)\s*(?:number|no\.?|#)?\s*[:=-]?\s*[A-Z0-9 -]{4,}\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function isQualitySeoCandidate(candidate: PublicSeoCandidate): boolean {
  const text = sanitizePublicSeoText(
    `${candidate.title} ${candidate.description} ${candidate.explanation} ${(candidate.faqs ?? []).map((f) => `${f.question} ${f.answer}`).join(" ")}`,
  );
  if (candidate.title.trim().length < 20) return false;
  if (candidate.description.trim().length < 80) return false;
  if (candidate.explanation.trim().length < 500) return false;
  if (text.length < 900) return false;
  if ((candidate.faqs ?? []).length < 3) return false;
  return true;
}
