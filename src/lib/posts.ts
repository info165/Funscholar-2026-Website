import type { BlogCard } from "@/components/BlogsView";

/**
 * Blog posts, held in code.
 *
 * These previously came from a MySQL table, which was removed so the site can
 * deploy without a database. Add a post by adding an entry here — newest first,
 * since the list renders in order.
 *
 * `thumbnail` takes a path under /public (e.g. "/images/blogs/post.jpg") or null
 * for the styled placeholder frame.
 */
export const posts: BlogCard[] = [
  {
    id: 3,
    title: "Beyond textbooks: 12 experiments that changed how kids see science",
    category: "STEM",
    excerpt:
      "Our most-loved hands-on STEM activities — and the learning science behind why they work.",
    readTime: "5 min read",
    thumbnail: null,
  },
  {
    id: 2,
    title: "Funscholar AI: Personalized learning at a national scale",
    category: "AI in Education",
    excerpt:
      "Inside India's first student intelligence platform — and how it's reshaping outcomes for millions.",
    readTime: "8 min read",
    thumbnail: null,
  },
  {
    id: 1,
    title: "Why every Indian school needs a robotics program by 2026",
    category: "Robotics",
    excerpt:
      "From problem-solving to career readiness — the case for making robotics a core subject, not an elective.",
    readTime: "6 min read",
    thumbnail: null,
  },
];
