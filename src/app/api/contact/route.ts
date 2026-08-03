export const dynamic = "force-dynamic";

/** Trim, coerce to string, and cap at the column width. */
function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * Submission times per IP.
 *
 * Deliberately in-memory: it costs nothing and stops the naive floods that make
 * up most of this traffic. It is NOT airtight — serverless runs many instances,
 * each with its own copy, and all of it resets on cold start. A determined
 * attacker gets through. Move to Redis if that day comes.
 */
const recent = new Map<string, number[]>();

function clientIp(request: Request) {
  // Vercel sets x-forwarded-for; the first entry is the real client.
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(ip, hits);
    return true;
  }

  hits.push(now);
  recent.set(ip, hits);

  // Evict stale entries so the map can't grow without bound on a long-lived
  // instance.
  if (recent.size > 5000) {
    for (const [key, times] of recent) {
      if (times.every((t) => now - t >= WINDOW_MS)) recent.delete(key);
    }
  }

  return false;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;

  // Honeypot: hidden from people, irresistible to form-filling bots. Answer 200
  // so the bot records a success and doesn't come back to probe for the real
  // check — but write nothing.
  if (field(data.website, 200)) {
    return Response.json({ ok: true });
  }

  if (rateLimited(clientIp(request))) {
    return Response.json(
      { ok: false, error: "Too many messages just now. Please try again shortly." },
      { status: 429 },
    );
  }

  const name = field(data.name, 120);
  const email = field(data.email, 190);
  const organization = field(data.organization, 190);
  const message = field(data.message, 5000);

  if (!name || !email || !organization || !message) {
    return Response.json(
      { ok: false, error: "All fields are required." },
      { status: 400 },
    );
  }

  // Deliberately loose — real addresses take shapes strict patterns reject.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    // Fail loudly in the log but stay vague to the visitor — they can't fix it,
    // and the detail would only help someone probing the endpoint.
    console.error("[contact] WEB3FORMS_ACCESS_KEY is not set — submission dropped");
    return Response.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New enquiry from ${name}${organization ? ` — ${organization}` : ""}`,
        // Shown as the sender name; replies still go to the address below.
        from_name: "Funscholar Website",
        replyto: email,
        name,
        email,
        organization,
        message,
      }),
    });

    const result = (await res.json()) as { success?: boolean; message?: string };

    if (!res.ok || !result.success) {
      console.error("[contact] web3forms rejected the submission:", result.message);
      return Response.json(
        { ok: false, error: "Could not send your message. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return Response.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }
}
