"use client";

import { motion } from "framer-motion";
import BlurImage from "@/components/BlurImage";
import { Clock, ArrowRight, Lightbulb, ImageIcon } from "lucide-react";

export type BlogCard = {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  /** Resolved on the server: a /public path, an API blob URL, or null. */
  thumbnail: string | null;
};

export default function BlogsView({ posts }: { posts: BlogCard[] }) {
  return (
    <main className="bg-[#fdfaf7]">
      {/* Hero */}
      {/* overflow-x-clip (not overflow-hidden) so the decorative frames still
          clip sideways while the floating badge can overhang the top edge.
          Extra top padding keeps that overhang clear of the fixed header. */}
      <section className="relative pt-[8.5rem] lg:pt-[9rem] pb-12 lg:pb-16 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-[2.85rem] sm:text-[3.7rem] lg:text-[4.5rem] font-bold tracking-[-0.035em] leading-[1.05] text-[#0a0a0a]">
              Ideas, insights,
              <br />
              <span className="italic font-serif font-light text-gradient-orange pt-[0.14em] pb-[0.2em] inline-block">
                and impact.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-[#6b6b6b] text-base lg:text-[1.05rem] leading-relaxed">
              Exploring the ideas, innovations, and inspiration shaping the
              future of education, AI, and robotics.
            </p>
          </motion.div>

          {/* Robot visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* decorative outline frames */}
            <div className="absolute -left-4 top-1/3 w-24 h-40 rounded-2xl border-2 border-[#ff6a1a]/40 pointer-events-none hidden sm:block" />
            <div className="absolute -right-3 top-16 w-24 h-44 rounded-2xl border-2 border-[#ff6a1a]/30 pointer-events-none hidden sm:block" />
            {/* dot field */}
            <div
              className="absolute -top-3 -right-6 w-28 h-20 opacity-40 pointer-events-none hidden sm:block"
              style={{
                backgroundImage: "radial-gradient(circle, #ff6a1a 1.5px, transparent 1.5px)",
                backgroundSize: "13px 13px",
              }}
            />

            <BlurImage
              src="/images/blogs-hero-robot.jpg"
              alt="Humanoid robot beside a neural-network data display"
              width={1200}
              height={800}
              className="relative w-full aspect-[4/3] rounded-[1.75rem] shadow-elev-4"
            />

            {/* floating badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 right-3 sm:right-6 z-10 w-40 rounded-[1.25rem] bg-gradient-to-br from-[#ff8a3a] to-[#ef5a06] p-4 shadow-[0_22px_45px_-18px_rgba(239,90,6,0.75)]"
            >
              <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <Lightbulb className="w-[1.1rem] h-[1.1rem] text-white" strokeWidth={1.75} />
              </span>
              <p className="text-white font-semibold text-sm leading-snug">
                Thoughts that spark progress.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog grid */}
      <section className="relative pb-12 lg:pb-14">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-center text-[#8a8a8a] py-16">
              No posts published yet — add a row to the <code>blogs</code> table to see it here.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {posts.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col rounded-[1.5rem] overflow-hidden bg-white border border-black/[0.05] shadow-elev-2 hover:shadow-lift-2 transition-shadow duration-500 cursor-pointer"
                >
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-[#fff3e8] to-[#ffdfc4] overflow-hidden">
                    {p.thumbnail ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <>
                        {/* No artwork on the row yet — keep the frame intentional. */}
                        <span className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-[#ff6a1a]/30" strokeWidth={1.5} />
                        </span>
                        <span
                          className="absolute inset-0 opacity-[0.12] pointer-events-none"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, #ff6a1a 1px, transparent 1px)",
                            backgroundSize: "16px 16px",
                          }}
                        />
                      </>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-5 lg:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#ff6a1a]">
                        {p.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#8a8a8a] shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                        {p.readTime}
                      </span>
                    </div>

                    <h2 className="mt-3 font-display text-lg lg:text-xl font-bold tracking-[-0.01em] text-[#0a0a0a] leading-snug group-hover:text-[#ff6a1a] transition-colors duration-300">
                      {p.title}
                    </h2>

                    <p className="mt-2.5 text-[#6b6b6b] text-sm leading-relaxed">{p.excerpt}</p>

                    <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0a0a0a]">
                      Read More
                      <ArrowRight className="w-4 h-4 text-[#ff6a1a] transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
