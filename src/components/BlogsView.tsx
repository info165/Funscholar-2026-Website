"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ImageIcon } from "lucide-react";
import type { Post } from "@/lib/posts";

export default function BlogsView({ posts }: { posts: Post[] }) {
  return (
    <main className="bg-[#fdfaf7]">
      {/* Hero — cutouts layered directly on the page rather than inside a
          frame, so the subject reads as part of the composition. overflow-x-clip
          lets the neural head overhang the right edge without adding a
          horizontal scrollbar. */}
      <section className="relative pt-[7.5rem] lg:pt-[8rem] pb-10 lg:pb-14 overflow-x-clip">
        {/* Warm ambient light behind the visual so the white doesn't read flat */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[46rem] h-[34rem] rounded-full bg-[#ff6a1a]/[0.05] blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-6 items-center">
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

            {/* Dot field, masked so it dissolves rather than stopping on a
                hard edge. */}
            <div
              className="mt-11 lg:mt-14 w-44 h-16 pointer-events-none hidden sm:block"
              style={{
                backgroundImage: "radial-gradient(circle, #ff6a1a 1.4px, transparent 1.4px)",
                backgroundSize: "16px 16px",
                opacity: 0.45,
                maskImage: "linear-gradient(115deg, black, transparent 85%)",
                WebkitMaskImage: "linear-gradient(115deg, black, transparent 85%)",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Aspect-ratio box so the cutout keeps its proportions at any
                width, sized by width and overhanging right. */}
            <div className="relative w-full aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/blogs-hero-mind.webp"
                alt="Translucent human head with a glowing neural network"
                /* Width is capped so the image's own height stays inside the
                   4/3 box — beyond about 110% it grows taller than the
                   container and the head gets clipped top and bottom. Pulled
                   left to close the gap the robot used to fill. */
                className="absolute top-[47%] -translate-y-1/2 left-[-2%] w-[102%] max-w-none select-none pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog grid */}
      <section className="relative pb-12 lg:pb-14">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-center text-[#8a8a8a] py-16">
              No posts published yet — add an entry to <code>src/lib/posts.ts</code> to see it here.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {posts.map((p, i) => (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col rounded-[1.5rem] overflow-hidden bg-white border border-black/[0.05] shadow-elev-2 hover:shadow-lift-2 transition-shadow duration-500"
                >
                  {/* The whole card is the link. Stretched over the article
                      rather than wrapping it, so the card keeps its layout and
                      the accessible name still comes from the title. */}
                  <Link
                    href={`/blogs/${p.slug}`}
                    className="absolute inset-0 z-20"
                    aria-label={p.title}
                  />
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
