import { db } from "@/db";
import { blogs } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import BlogsView, { type BlogCard } from "@/components/BlogsView";

// Posts are edited straight in the database, so never serve a cached list.
export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  let posts: BlogCard[] = [];

  try {
    const rows = await db
      .select({
        id: blogs.id,
        title: blogs.title,
        category: blogs.category,
        excerpt: blogs.excerpt,
        readTime: blogs.readTime,
        thumbnailUrl: blogs.thumbnailUrl,
        thumbnailMime: blogs.thumbnailMime,
      })
      .from(blogs)
      .where(eq(blogs.published, true))
      .orderBy(desc(blogs.createdAt));

    posts = rows.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      excerpt: r.excerpt,
      readTime: r.readTime,
      // A /public path wins; otherwise fall back to the blob uploaded via
      // phpMyAdmin. thumbnailMime is only set when blob data exists.
      thumbnail: r.thumbnailUrl || (r.thumbnailMime ? `/api/blogs/${r.id}/thumbnail` : null),
    }));
  } catch (err) {
    // A database hiccup shouldn't take the whole page down — render the
    // hero and an empty state instead of a 500.
    console.error("[blogs] query failed:", err);
  }

  return <BlogsView posts={posts} />;
}
