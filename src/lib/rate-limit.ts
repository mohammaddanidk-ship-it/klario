// Simple in-memory rate limiter — zero cost, no external service
const requests = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 10;

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = requests.get(identifier) ?? [];
  const recent = timestamps.filter(t => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  recent.push(now);
  requests.set(identifier, recent);

  if (requests.size > 5000) {
    for (const [key, val] of requests.entries()) {
      if (val.every(t => now - t > WINDOW_MS)) requests.delete(key);
    }
  }

  return { allowed: true, remaining: MAX_REQUESTS - recent.length };
}

export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}
