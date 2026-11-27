import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/validation";

/**
 * POST /api/enquiry
 *
 * Validates the lead server-side and forwards it as JSON to ENQUIRY_WEBHOOK_URL
 * (CRM, Zapier/Make, Google Apps Script → Sheets, email service, etc.).
 * Returns { ok: true, leadId } ONLY when the webhook accepted the lead, so the
 * client never shows a fake success and never fires a false conversion.
 */

const MIN_FILL_MS = 2500; // humans don't complete the form faster than this
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map(); // best-effort, per server instance

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

const fail = (error, status) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request) {
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";

  if (rateLimited(ip)) {
    return fail("Too many enquiries from this connection. Please call or WhatsApp us instead.", 429);
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 10_000) return fail("Enquiry is too large.", 413);
    body = JSON.parse(raw);
  } catch {
    return fail("Invalid request.", 400);
  }

  // Spam protection: honeypot + minimum fill time.
  const startedAt = Number(body.startedAt);
  if (body.company_website || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return fail("We couldn't verify this submission.", 400);
  }

  const { data, errors } = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    console.error("[enquiry] ENQUIRY_WEBHOOK_URL is not configured – lead was NOT stored.");
    return fail("Our online enquiry service is temporarily unavailable.", 503);
  }

  const leadId = crypto.randomUUID();
  const attribution = Object.fromEntries(
    Object.entries(body.attribution || {})
      .filter(([k, v]) => /^(utm_\w+|gclid|gbraid|wbraid)$/.test(k) && typeof v === "string")
      .map(([k, v]) => [k, v.slice(0, 200)])
  );

  const lead = {
    leadId,
    submittedAt: new Date().toISOString(),
    ...data,
    mobile: `+91${data.mobile}`,
    pageUrl: String(body.pageUrl || "").slice(0, 500),
    attribution,
    meta: {
      ip,
      userAgent: (request.headers.get("user-agent") || "").slice(0, 300),
      referer: (request.headers.get("referer") || "").slice(0, 500),
    },
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_TOKEN && { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }),
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[enquiry] Webhook responded ${res.status}`);
      return fail("We couldn't send your enquiry right now.", 502);
    }
  } catch (err) {
    console.error("[enquiry] Webhook request failed:", err?.message);
    return fail("We couldn't send your enquiry right now.", 502);
  }

  return NextResponse.json({ ok: true, leadId }, { status: 201 });
}

export function GET() {
  return fail("Method not allowed.", 405);
}
