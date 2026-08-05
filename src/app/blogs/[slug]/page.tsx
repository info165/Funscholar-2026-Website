import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar, User, ImageIcon } from "lucide-react";
import { posts, getPost } from "@/lib/posts";

/** One page per post at build time — required for the static export. */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found — Funscholar" };
  return { title: `${post.title} — Funscholar`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="bg-[#fdfaf7]">
      <article>
        {/* Title block */}
        <header className="relative pt-[7.5rem] lg:pt-[8.5rem] pb-10 lg:pb-12 overflow-x-clip">
          {/* Same scroll cue as the home page hero, in dark-on-light. Decorative,
              so hidden from assistive tech. */}
          <div
            aria-hidden
            className="absolute -bottom-4 right-6 lg:right-16 z-10 hidden lg:flex flex-col items-center gap-3"
          >
            <span className="text-[#8a8a8a] text-[0.65rem] tracking-[0.3em] uppercase rotate-90 origin-center translate-y-8">
              Scroll
            </span>
            <div className="w-px h-20 bg-gradient-to-b from-[#ff6a1a]/55 to-transparent mt-16" />
          </div>

          {/* Masked dot field, fading out before it reaches the copy */}
          <div
            className="absolute inset-x-0 top-0 h-64 opacity-[0.45] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #ff6a1a 1.2px, transparent 1.2px)",
              backgroundSize: "24px 24px",
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />

          <div className="relative max-w-3xl mx-auto px-6">
            {/* Each of these is its own block. Left inline they share a line,
                which is what put the category chip beside the back link. */}
            <div>
              <Link
                href="/blogs"
                className="group inline-flex items-center gap-3 text-[0.9rem] text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors duration-300"
              >
                <span className="w-9 h-9 rounded-full bg-white border border-black/[0.07] shadow-elev-1 flex items-center justify-center group-hover:border-[#ff6a1a]/40 group-hover:bg-[#fff1e6] transition-colors duration-300">
                  <ArrowLeft
                    className="w-[1.05rem] h-[1.05rem] text-[#ff6a1a] transition-transform duration-300 group-hover:-translate-x-0.5"
                    strokeWidth={1.9}
                  />
                </span>
                All articles
              </Link>
            </div>

            <div className="mt-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fff1e6] border border-[#ff6a1a]/20 px-4 py-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[#ff6a1a]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a1a]" />
                {post.category}
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.1rem] sm:text-[2.7rem] lg:text-[3.15rem] font-bold tracking-[-0.033em] leading-[1.12] text-[#0a0a0a]">
              {post.title}
            </h1>

            <p className="mt-5 text-[#6b6b6b] text-lg leading-relaxed">{post.excerpt}</p>

            {/* Byline sits on its own rule, so the header closes cleanly before
                the banner rather than trailing off. */}
            <div className="mt-8 pt-6 border-t border-black/[0.07] flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.85rem] text-[#6b6b6b]">
              <span className="inline-flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#fff1e6] flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-[#ff6a1a]" strokeWidth={1.9} />
                </span>
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#ff6a1a]/70" strokeWidth={1.8} />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ff6a1a]/70" strokeWidth={1.8} />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Banner */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative aspect-[21/9] rounded-[1.75rem] overflow-hidden bg-gradient-to-br from-[#fff3e8] to-[#ffdfc4] border border-black/[0.05] shadow-elev-3">
            {post.thumbnail ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={post.thumbnail}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                {/* No artwork yet — keep the frame deliberate rather than blank. */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-[#ff6a1a]/30" strokeWidth={1.4} />
                </span>
                <span
                  className="absolute inset-0 opacity-[0.13] pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, #ff6a1a 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 pt-8 lg:pt-10 pb-16 lg:pb-20">
          {post.content.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="font-display text-[1.5rem] lg:text-[1.75rem] font-bold tracking-[-0.022em] leading-snug text-[#0a0a0a] mt-12 lg:mt-14 mb-4 first:mt-0"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "ul") {
              return (
                <ul key={i} className="my-7 space-y-3.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3.5">
                      <span className="mt-[0.6rem] w-[6px] h-[6px] shrink-0 rounded-full bg-[#ff6a1a]" />
                      <span className="text-[#4b4b4b] text-[1.03rem] leading-[1.8]">{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="my-10 border-l-[3px] border-[#ff6a1a] pl-6 lg:pl-7"
                >
                  <p className="font-serif italic text-[1.25rem] lg:text-[1.4rem] leading-[1.55] text-[#0a0a0a]">
                    {block.text}
                  </p>
                </blockquote>
              );
            }

            return (
              <p key={i} className="text-[#4b4b4b] text-[1.06rem] leading-[1.85] mb-6">
                {block.text}
              </p>
            );
          })}
        </div>
      </article>

      {/* Keep reading */}
      {others.length > 0 && (
        <section className="border-t border-black/[0.06] py-14 lg:py-18">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-display text-2xl lg:text-[1.9rem] font-bold tracking-[-0.025em] text-[#0a0a0a] mb-8">
              Keep reading
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blogs/${p.slug}`}
                  className="group flex flex-col rounded-[1.5rem] bg-white border border-black/[0.05] shadow-elev-1 hover:shadow-lift-2 hover:border-[#ff6a1a]/30 transition-all duration-500 p-6"
                >
                  <span className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#ff6a1a]">
                    {p.category}
                  </span>
                  <h3 className="mt-3 font-display text-lg lg:text-xl font-bold tracking-[-0.012em] leading-snug text-[#0a0a0a] group-hover:text-[#ff6a1a] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[#6b6b6b] text-sm leading-relaxed">{p.excerpt}</p>
                  <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0a0a0a]">
                    Read More
                    <ArrowRight className="w-4 h-4 text-[#ff6a1a] transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
