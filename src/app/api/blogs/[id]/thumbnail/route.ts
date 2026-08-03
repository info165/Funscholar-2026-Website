import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * Serves a thumbnail that was uploaded straight into the row via phpMyAdmin
 * (`thumbnail_data`). Posts using `thumbnail_url` never hit this route.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const [row] = await db
      .select({ data: blogs.thumbnailData, mime: blogs.thumbnailMime })
      .from(blogs)
      .where(eq(blogs.id, numericId))
      .limit(1);

    if (!row?.data) return new Response("Not found", { status: 404 });

    return new Response(new Uint8Array(row.data), {
      headers: {
        "Content-Type": row.mime || "image/jpeg",
        // Cached by id, so bump the row's id or clear the cache after a swap.
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("[blog thumbnail] failed:", err);
    return new Response("Server error", { status: 500 });
  }
}
