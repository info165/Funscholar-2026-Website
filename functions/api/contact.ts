/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * The site itself is a static export, but Resend's API key is a real
 * credential: anyone holding it can send mail as you. So it can never reach the
 * browser. This one file runs on Cloudflare's edge, keeps the key server-side,
 * and forwards submissions to Resend.
 *
 * Required environment variables (Pages → Settings → Environment variables):
 *   RESEND_API_KEY     secret, from resend.com/api-keys
 *   CONTACT_TO_EMAIL   inbox that should receive enquiries
 *   CONTACT_FROM_EMAIL optional. Must be on a domain verified with Resend.
 *                      Falls back to Resend's test sender, which can only
 *                      deliver to your own account address.
 */

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL?: string;
}

/** Trim, coerce to string, and cap the length. */
function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Submitted text goes into an HTML email, so it has to be escaped. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * Per-IP submission times.
 *
 * Best-effort only. Each Worker isolate keeps its own copy and they are
 * short-lived, so this catches naive floods rather than a determined attacker.
 * A KV namespace would be the real fix if it ever matters.
 */
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(ip, hits);
    return true;
  }

  hits.push(now);
  recent.set(ip, hits);
  return false;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const data = (body ?? {}) as Record<string, unknown>;

  // Honeypot — hidden from people, filled by bots. Report success so the bot
  // doesn't come back probing for the real check, but send nothing.
  if (field(data.botcheck, 200)) {
    return json({ ok: true });
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (rateLimited(ip)) {
    return json(
      { ok: false, error: "Too many messages just now. Please try again shortly." },
      429,
    );
  }

  const name = field(data.name, 120);
  const email = field(data.email, 190);
  const organization = field(data.organization, 190);
  const message = field(data.message, 5000);

  if (!name || !email || !organization || !message) {
    return json({ ok: false, error: "All fields are required." }, 400);
  }

  // Deliberately loose — real addresses take shapes strict patterns reject.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Enter a valid email address." }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return json({ ok: false, error: "Could not send your message. Please try again." }, 500);
  }

  const from = env.CONTACT_FROM_EMAIL ?? "Funscholar Website <onboarding@resend.dev>";

  const html = `
    <h2 style="font-family:sans-serif;margin:0 0 16px">New enquiry from the website</h2>
    <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
      <tr><td style="padding:6px 16px 6px 0"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 16px 6px 0"><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="padding:6px 16px 6px 0"><strong>Organisation</strong></td><td>${escapeHtml(organization)}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:15px;margin:20px 0 6px"><strong>Message</strong></p>
    <p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [env.CONTACT_TO_EMAIL],
        subject: `New enquiry from ${name} — ${organization}`,
        // So hitting reply in your mail client writes back to the enquirer.
        reply_to: email,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] resend rejected the send:", res.status, detail);
      return json({ ok: false, error: "Could not send your message. Please try again." }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return json({ ok: false, error: "Could not send your message. Please try again." }, 500);
  }
}
