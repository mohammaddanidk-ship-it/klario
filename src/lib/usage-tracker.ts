import { db } from "@/lib/db";

// Claude Sonnet 5 pricing (per million tokens) — update if pricing changes
const INPUT_COST_PER_M = 3.00;   // $3.00 per 1M input tokens
const OUTPUT_COST_PER_M = 15.00; // $15.00 per 1M output tokens

export function estimateCostCents(inputTokens: number, outputTokens: number): number {
  const inputCost = (inputTokens / 1_000_000) * INPUT_COST_PER_M * 100;
  const outputCost = (outputTokens / 1_000_000) * OUTPUT_COST_PER_M * 100;
  return inputCost + outputCost;
}

export async function logUsage(params: {
  endpoint: "explain" | "shield" | "followup";
  success: boolean;
  inputTokens?: number;
  outputTokens?: number;
  errorMessage?: string;
}) {
  try {
    const inputTokens = params.inputTokens ?? 0;
    const outputTokens = params.outputTokens ?? 0;
    await db.usageLog.create({
      data: {
        endpoint: params.endpoint,
        success: params.success,
        inputTokens,
        outputTokens,
        estimatedCostCents: estimateCostCents(inputTokens, outputTokens),
        errorMessage: params.errorMessage,
      },
    });
  } catch {
    // Never let logging failure break the actual request
  }
}
