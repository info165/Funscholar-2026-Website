import { db } from "@/db";
import { contacts } from "@/db/schema";

export const dynamic = "force-dynamic";

/** Trim, coerce to string, and cap at the column width. */
function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
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

  try {
    await db.insert(contacts).values({
      name,
      email,
      organization,
      message,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] insert failed:", err);
    return Response.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }
}
