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

function hasRequiredGuideSections(explanation: string): boolean {
  const normalized = explanation.toLowerCase();
  const sectionSignals = [
    /what (this )?means|meaning|qué significa|ce que cela signifie|ما يعنيه|ما معنى/i,
    /what stands out|important|key points|puntos clave|points importants|النقاط المهمة/i,
    /what to do next|next steps|qué hacer|prochaines étapes|ما يجب فعله/i,
  ];
  return sectionSignals.filter((pattern) => pattern.test(normalized)).length >= 2;
}

function containsVisitorLikeContent(value: string): boolean {
  const normalized = value.toLowerCase();
  return [
    /\bmy (name|address|account|passport|policy|case|reference)\b/,
    /\b(i|we) (uploaded|sent|attached|received)\b/,
    /\bhere is my document\b/,
    /\bdear (sir|madam|doctor|team)\b/,
  ].some((pattern) => pattern.test(normalized));
}

function hasDuplicateFaqQuestions(faqs: Array<{ question: string; answer: string }>): boolean {
  const normalized = faqs.map((faq) => faq.question.toLowerCase().replace(/[^a-z0-9\u00c0-\u024f\u0600-\u06ff]+/g, " ").trim());
  return new Set(normalized).size !== normalized.length;
}

/**
 * Quality gate for the programmatic SEO layer.
 * This deliberately rejects thin, generic, or visitor-derived pages before
 * they can become public indexable content.
 */
export function isQualitySeoCandidate(candidate: PublicSeoCandidate): boolean {
  const raw = `${candidate.title} ${candidate.description} ${candidate.explanation} ${(candidate.faqs ?? [])
    .map((f) => `${f.question} ${f.answer}`)
    .join(" ")}`;
  const text = sanitizePublicSeoText(raw);

  if (candidate.title.trim().length < 20 || candidate.title.trim().length > 75) return false;
  if (candidate.description.trim().length < 80 || candidate.description.trim().length > 180) return false;
  if (candidate.explanation.trim().length < 500) return false;
  if (text.length < 900) return false;

  const faqs = candidate.faqs ?? [];
  if (faqs.length < 3 || faqs.length > 8) return false;
  if (faqs.some((faq) => faq.question.trim().length < 12 || faq.answer.trim().length < 40)) return false;
  if (hasDuplicateFaqQuestions(faqs)) return false;

  // A public guide needs actual explanatory structure, not a keyword paragraph.
  if (!hasRequiredGuideSections(candidate.explanation)) return false;

  // Reject likely visitor-specific material even if the basic PII scrub did not
  // catch it. Public SEO pages must explain a document type, never a person's case.
  if (containsVisitorLikeContent(text)) return false;

  // Avoid obvious keyword stuffing / repeated filler. A useful guide should have
  // enough lexical variety to say something substantive about the topic.
  const words = text
    .toLowerCase()
    .split(/[^a-z0-9\u00c0-\u024f\u0600-\u06ff]+/)
    .filter((word) => word.length >= 4);
  const uniqueRatio = words.length ? new Set(words).size / words.length : 0;
  if (uniqueRatio < 0.28) return false;

  return true;
}
