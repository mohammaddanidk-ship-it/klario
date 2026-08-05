// Rate limiter + abuse protection — zero cost, no external service, all in-memory
const requests = new Map<string, number[]>();
const dailyRequests = new Map<string, { count: number; day: string }>();
const recentHashes = new Map<string, number>(); // content hash -> timestamp

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 10;
const DAILY_MAX = 50;
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; reason?: string } {
  const now = Date.now();

  // Daily cap check
  const today = todayKey();
  const daily = dailyRequests.get(identifier);
  if (daily && daily.day === today && daily.count >= DAILY_MAX) {
    return { allowed: false, remaining: 0, reason: "You've reached today's usage limit. Please try again tomorrow." };
  }

  // 10-minute window check
  const timestamps = requests.get(identifier) ?? [];
  const recent = timestamps.filter(t => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, reason: "You've reached the limit of 10 requests per 10 minutes. Please wait a few minutes." };
  }

  // Passed both checks — record this request
  recent.push(now);
  requests.set(identifier, recent);

  if (daily && daily.day === today) {
    dailyRequests.set(identifier, { count: daily.count + 1, day: today });
  } else {
    dailyRequests.set(identifier, { count: 1, day: today });
  }

  // Periodic cleanup to prevent unbounded memory growth
  if (requests.size > 5000) {
    for (const [key, val] of requests.entries()) {
      if (val.every(t => now - t > WINDOW_MS)) requests.delete(key);
    }
  }
  if (dailyRequests.size > 5000) {
    for (const [key, val] of dailyRequests.entries()) {
      if (val.day !== today) dailyRequests.delete(key);
    }
  }

  return { allowed: true, remaining: MAX_REQUESTS - recent.length };
}

// Simple content hash for duplicate detection — no crypto library needed
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
}

export function checkDuplicate(content: string): { isDuplicate: boolean } {
  const now = Date.now();
  const hash = simpleHash(content.trim().toLowerCase().slice(0, 500));

  // Cleanup old hashes
  for (const [key, ts] of recentHashes.entries()) {
    if (now - ts > DUPLICATE_WINDOW_MS) recentHashes.delete(key);
  }

  if (recentHashes.has(hash)) {
    return { isDuplicate: true };
  }
  recentHashes.set(hash, now);
  return { isDuplicate: false };
}

export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}

// Basic bot heuristic — checks for missing/suspicious user-agent
export function looksLikeBot(req: Request): boolean {
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua) return true;
  const botPatterns = /bot|crawler|spider|scraper|curl|wget|python-requests|headless/i;
  return botPatterns.test(ua);
}

// Basic prompt-injection guard — strips common override attempts before sending to Claude
export function sanitizeUserInput(text: string): string {
  return text
    .replace(/ignore (all )?previous instructions/gi, "[filtered]")
    .replace(/system prompt/gi, "[filtered]")
    .replace(/you are now/gi, "[filtered]")
    .slice(0, 8000); // hard length cap regardless of content
}

