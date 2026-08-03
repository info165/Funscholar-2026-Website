"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, Volume2, Settings, Maximize2 } from "lucide-react";

// PLACEHOLDER — replace all three before this goes live.
// Left as explicit placeholders rather than sample values so no real school is
// ever credited with words it didn't say.
const featured = {
  quote: "Text will added here",
  source: "School Name",
  role: "Teacher Position",
};

function GridTexture() {
  return (
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-28 bg-white overflow-hidden">
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#ff6a1a]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
        {/* Left: heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-5xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-[-0.03em] leading-[1.05] text-[#0a0a0a]">
            Trusted by educators.
            <br />
            <span className="italic font-serif font-light text-gradient-orange">Loved by students.</span>
          </h2>
          <div className="w-10 h-px bg-[#ff6a1a] my-6" />
          <p className="max-w-sm text-[#6b6b6b] text-base lg:text-lg leading-relaxed">
            Watch how Funscholar has made a meaningful difference through
            creativity, dedication, and results.
          </p>
        </motion.div>

        {/* Right: video shown on a laptop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          {/* Lid — brushed-aluminium shell around a black bezel */}
          <div className="relative rounded-[1.15rem] p-[0.7rem] bg-gradient-to-b from-[#55555b] via-[#313136] to-[#26262b] shadow-elev-4">
            {/* top edge highlight */}
            <div className="absolute inset-x-10 top-px h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
            {/* shell hairline */}
            <div className="absolute inset-0 rounded-[1.15rem] ring-1 ring-inset ring-white/10 pointer-events-none" />

            {/* Webcam */}
            <span className="absolute top-[0.25rem] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-[#141416] ring-1 ring-white/10 flex items-center justify-center">
              <span className="w-[2.5px] h-[2.5px] rounded-full bg-[#3f4d57]" />
            </span>

            <div className="group relative aspect-video rounded-[0.6rem] overflow-hidden bg-[#0a0a0a] cursor-pointer">
              <GridTexture />
              <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#ff6a1a]/25 rounded-full blur-[100px]" />

              {/* Brand tag */}
              <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#ff6a1a]" />
                <span className="text-white text-sm font-medium">Funscholar</span>
              </div>

              {/* Center play button */}
              <button
                type="button"
                aria-label="Play video"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4.5rem] h-[4.5rem] rounded-full border-2 border-white flex items-center justify-center group-hover:scale-105 group-hover:bg-white/10 transition-all duration-300"
              >
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </button>

              {/* Bottom control bar */}
              <div className="absolute bottom-0 inset-x-0 px-5 pb-4 pt-12 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="relative h-1 rounded-full bg-white/25 mb-3.5">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-[#ff6a1a]" style={{ width: "35%" }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#ff6a1a]"
                    style={{ left: "35%" }}
                  />
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <Play className="w-4 h-4 fill-white" />
                    <span className="text-sm tabular-nums">0:00 / 2:15</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/90">
                    <Volume2 className="w-4 h-4" />
                    <Settings className="w-4 h-4" />
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Glass sheen across the panel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0 pointer-events-none" />
            </div>
          </div>

          {/* Hinge + base — slightly wider than the lid, as on a real machine */}
          <div className="relative left-1/2 -translate-x-1/2 w-[106%]">
            <div className="relative h-[0.95rem] rounded-b-[0.7rem] bg-gradient-to-b from-[#4a4a51] via-[#2b2b31] to-[#131316] shadow-[0_22px_28px_-18px_rgba(0,0,0,0.8)]">
              {/* hinge seam */}
              <div className="absolute inset-x-0 top-0 h-px bg-black/60" />
              <div className="absolute inset-x-0 top-px h-px bg-white/12" />
              {/* thumb notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[13%] h-[0.3rem] rounded-b-full bg-[#0d0d0f]/80" />
            </div>
          </div>

          {/* Contact shadow on the surface */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[78%] h-6 bg-black/25 rounded-[50%] blur-xl pointer-events-none" />

          {/* Pull-quote + attribution for the featured video */}
          <motion.figure
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mt-12 lg:mt-14"
          >
            {/* oversized ghost quote mark */}
            <span
              aria-hidden
              className="absolute -top-8 -left-2 font-serif text-[5.5rem] leading-none text-[#ff6a1a]/[0.16] select-none pointer-events-none"
            >
              &ldquo;
            </span>

            <blockquote className="relative pl-6 font-serif italic font-light text-xl sm:text-2xl lg:text-[1.6rem] leading-[1.4] text-[#0a0a0a]">
              {featured.quote}
            </blockquote>

            <figcaption className="mt-4 pl-6 flex items-center gap-2.5 text-sm">
              <span className="w-6 h-px bg-[#ff6a1a] shrink-0" />
              <span className="font-semibold text-[#0a0a0a]">{featured.source}</span>
              <span className="text-[#c4c4c4]">·</span>
              <span className="text-[#8a8a8a]">{featured.role}</span>
            </figcaption>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
}
