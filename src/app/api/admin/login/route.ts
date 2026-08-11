import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

const COOKIE_NAME = "klarium_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

function sign(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

function validPassword(input: string, expected: string) {
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(expected, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return NextResponse.json({ error: "Admin dashboard is not configured. Add ADMIN_PASSWORD to the Vercel Production environment and redeploy." }, { status: 503 });

  let body: { password?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const password = typeof body.password === "string" ? body.password : "";

  if (!validPassword(password, expected)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = `${expires}.${sign(String(expires), expected)}`;
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}

export { COOKIE_NAME, sign };
