import BlogsView from "@/components/BlogsView";
import { posts } from "@/lib/posts";

// Posts live in src/lib/posts.ts now, so this prerenders as static.
export default function BlogsPage() {
  return <BlogsView posts={posts} />;
}
