import BlogsView from "@/components/BlogsView";
import { posts } from "@/lib/posts";

export const metadata = {
  title: "Blogs — Funscholar",
  description:
    "Ideas, innovations and inspiration shaping the future of education, AI and robotics — written for school leaders and educators across India.",
};

// Posts live in src/lib/posts.ts now, so this prerenders as static.
export default function BlogsPage() {
  return <BlogsView posts={posts} />;
}
