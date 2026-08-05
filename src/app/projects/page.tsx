"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Bot, GraduationCap, Lightbulb, Rocket, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Video = {
  number: string;
  title: string;
  /** Shown in the card body on the "More projects" cards. */
  desc?: string;
  duration: string;
  video: string;
  /** Branded still. When absent the video's own first frame is used. */
  poster?: string;
  /** Poster already carries the school name, so no text overlay is drawn. */
  brandedPoster?: boolean;
  /**
   * Source isn't 16:9, so it's fitted inside the frame with a blurred copy of
   * itself filling the gaps rather than being cropped.
   */
  letterbox?: boolean;
};

const videos: Video[] = [
  {
    number: "01",
    title: "DPS Ruby Park Public School",
    duration: "00:48",
    video: "/videos/dps-ruby-park.mp4",
    poster: "/images/dps-ruby-park-thumbnail.jpg",
    brandedPoster: true,
  },
  {
    number: "02",
    title: "Ruby Park Public School",
    duration: "02:15",
    video: "/videos/ruby-park-public-school.mp4",
    // Shot portrait (720×1280).
    letterbox: true,
  },
  {
    number: "03",
    title: "B.D.M International School",
    duration: "01:01",
    video: "/videos/bdmi.mp4",
  },
  {
    number: "04",
    title: "The Newtown School",
    duration: "00:14",
    video: "/videos/newtown-school.mp4",
    poster: "/images/newtown-school-thumbnail.jpg",
    // Poster is 16:9, but the video itself is 960×720 (4:3) — letterbox only
    // affects playback, so the still fills the frame while the clip is fitted.
    letterbox: true,
  },
];

// Positions are percentages of the square graphic, matched to the reference.
// A chip shows either a lucide icon or a short text label.
const orbitChips: {
  left: string;
  top: string;
  delay: number;
  icon?: LucideIcon;
  label?: string;
}[] = [
  { icon: Bot, left: "77%", top: "15%", delay: 0 },
  { label: "AI", left: "19%", top: "44%", delay: 0.8 },
  { icon: GraduationCap, left: "84%", top: "61%", delay: 1.6 },
  { icon: Lightbulb, left: "46%", top: "85%", delay: 2.4 },
];

export default function ProjectsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  const [featured, ...rest] = videos;

  return (
    <main className="bg-[#fdfaf7]">

      {/* Hero */}
      {/* Fixed header is 112px tall, so pt can't go below 7rem without the
          heading sliding under it — the rest of the lift comes from the gaps. */}
      <section ref={heroRef} className="relative pt-[7rem] lg:pt-[7.5rem] pb-8 lg:pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-[2.6rem] sm:text-[3.4rem] lg:text-[4.4rem] font-bold tracking-[-0.035em] leading-[1.06] text-[#0a0a0a]">
              Building Innovation.
              <br />
              {/* Padding keeps the descenders in "Creating Impact." inside the
                  background-clip:text paint box. */}
              <span className="italic font-serif font-light text-gradient-orange pt-[0.14em] pb-[0.2em] inline-block">
                Creating Impact.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-[#6b6b6b] text-base lg:text-[1.05rem] leading-relaxed">
              Explore our initiatives, workshops, and projects that empower
              learners and shape a better tomorrow.
            </p>

          </motion.div>

          {/* Decorative orbit graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[24rem] lg:max-w-[27rem] aspect-square"
          >
            {/* outer hairline ring */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] h-[88%] rounded-full border border-[#ff6a1a]/[0.14] pointer-events-none" />
            {/* inner hairline ring */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-[#ff6a1a]/[0.10] pointer-events-none" />
            {/* soft backing disc */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] h-[68%] rounded-full bg-gradient-to-br from-[#fffaf6] via-[#fff3ea] to-[#ffe7d6] shadow-[0_40px_70px_-40px_rgba(227,90,18,0.4)] pointer-events-none" />

            {/* accent dots sitting on the rings */}
            <span className="absolute left-[24%] top-[15%] w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff8a4a] pointer-events-none" />
            <span className="absolute left-[84%] top-[43%] w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb98d] pointer-events-none" />

            {/* play triangle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36%] pointer-events-none">
              <svg viewBox="0 0 120 120" className="w-full h-auto" aria-hidden>
                <defs>
                  <linearGradient id="playFace" x1="15%" y1="0%" x2="85%" y2="100%">
                    <stop offset="0%" stopColor="#ffa76e" />
                    <stop offset="45%" stopColor="#f5762e" />
                    <stop offset="100%" stopColor="#e0590f" />
                  </linearGradient>
                </defs>
                {/* extruded base gives the mark its thickness */}
                <path
                  d="M36 27 L92 60 L36 93 Z"
                  fill="#c2490a"
                  stroke="#c2490a"
                  strokeWidth="19"
                  strokeLinejoin="round"
                  opacity="0.5"
                  transform="translate(0 6)"
                />
                {/* face */}
                <path
                  d="M36 27 L92 60 L36 93 Z"
                  fill="url(#playFace)"
                  stroke="url(#playFace)"
                  strokeWidth="19"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 12px 20px rgba(224,89,15,0.35))" }}
                />
              </svg>
            </div>

            {/* floating chips */}
            {orbitChips.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: c.left, top: c.top }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 5.5 + i * 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: c.delay,
                    }}
                    className="w-[3.9rem] h-[3.9rem] lg:w-[4.4rem] lg:h-[4.4rem] rounded-[1.35rem] bg-white flex items-center justify-center shadow-[0_18px_36px_-16px_rgba(196,110,60,0.45)]"
                  >
                    {Icon ? (
                      <Icon className="w-7 h-7 text-[#f4732c]" strokeWidth={1.6} />
                    ) : (
                      /* Semibold + open tracking so the solid letterforms read
                         as light as the 1.6-stroke line icons beside them. */
                      <span className="font-display text-[1.15rem] lg:text-[1.3rem] font-semibold tracking-[0.06em] text-[#f4732c]">
                        {c.label}
                      </span>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured project */}
      <section id="featured" className="relative scroll-mt-28 pb-8 lg:pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] bg-white border border-black/[0.05] shadow-elev-3 p-6 sm:p-7 lg:p-9"
          >
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-9 items-center">
              {/* Text panel */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-bold text-[#ff6a1a]">
                    {featured.number}
                  </span>
                  <span className="h-px w-8 bg-[#ff6a1a]/50" />
                </div>

                <h2 className="mt-4 font-display text-2xl lg:text-[1.9rem] font-bold tracking-[-0.02em] text-[#0a0a0a] leading-tight">
                  DPS Ruby Park
                </h2>
                <p className="mt-1.5 text-[0.7rem] font-bold tracking-[0.16em] uppercase text-[#8a8a8a]">
                  AI &amp; Robotics Lab
                </p>

                <div className="w-10 h-[3px] rounded-full bg-[#ff6a1a] my-5" />

                <p className="text-[#6b6b6b] text-[0.95rem] leading-relaxed max-w-sm">
                  Empowering students with hands-on experience in AI and Robotics
                  through advanced labs and real-world projects.
                </p>

              </div>

              {/* Video — unchanged rendering */}
              <div className="lg:col-span-8">
                <VideoCard v={featured} index={0} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* More projects */}
      <section className="relative pt-6 lg:pt-10 pb-10 lg:pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-2xl lg:text-[2rem] font-bold tracking-[-0.02em] text-[#0a0a0a] mb-6">
            More projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {rest.map((v, i) => (
              <ProjectCard key={v.number} v={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Collaborate strip */}
      <section className="relative pt-12 lg:pt-18 pb-14 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6 rounded-[1.75rem] bg-gradient-to-r from-[#ffd9b5] to-[#ffb87d] border border-[#ff6a1a]/35 px-6 py-7 lg:px-9 lg:py-8"
          >
            <span className="w-16 h-16 shrink-0 rounded-full bg-white flex items-center justify-center shadow-[0_14px_30px_-14px_rgba(0,0,0,0.3)]">
              <Rocket className="w-7 h-7 text-[#ff6a1a]" strokeWidth={1.75} />
            </span>

            <div className="flex-1 text-center sm:text-left">
              <span className="block text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#ff6a1a] mb-1.5">
                Let&apos;s Collaborate
              </span>
              <p className="font-display text-xl lg:text-[1.6rem] font-bold tracking-[-0.02em] text-[#0a0a0a] leading-snug">
                Have an idea? Let&apos;s build something great together.
              </p>
            </div>

            <Link
              href="/contact"
              className="group/btn shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0a0a0a] text-white font-semibold text-sm hover:bg-[#ff6a1a] transition-colors duration-400"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}

/** The media panel: still frame, letterbox fill, and the centred play button. */
function VideoMedia({
  v,
  playing,
  onPlay,
  rounded,
  showOverlayLabel,
}: {
  v: Video;
  playing: boolean;
  onPlay: () => void;
  rounded: string;
  showOverlayLabel: boolean;
}) {
  // "#t=0.1" nudges the browser to paint the first frame as a still.
  const firstFrame = `${v.video}#t=0.1`;

  return (
    <div className={`group relative aspect-video overflow-hidden bg-[#0a0a0a] ${rounded}`}>
      {/* Blurred fill behind non-16:9 sources */}
      {v.letterbox && (
        <video
          src={firstFrame}
          muted
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-45 pointer-events-none"
        />
      )}

      {playing ? (
        <video
          src={v.video}
          poster={v.poster}
          controls
          autoPlay
          playsInline
          className={`relative w-full h-full ${v.letterbox ? "object-contain" : "object-cover"}`}
        />
      ) : (
        <>
          {/* Still frame */}
          {v.poster ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={v.poster}
              alt={v.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <video
              src={firstFrame}
              muted
              playsInline
              preload="metadata"
              aria-hidden
              className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.03] ${
                v.letterbox ? "object-contain" : "object-cover"
              }`}
            />
          )}

          {/* Depth + legibility */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_90px_25px_rgba(0,0,0,0.45)]" />
          {showOverlayLabel && !v.brandedPoster && (
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
          )}
          <div className={`absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none ${rounded}`} />

          {/* Title/duration on the video — only when there's no caption below */}
          {showOverlayLabel && !v.brandedPoster && (
            <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[#ff6a1a] font-semibold text-xs">{v.number}</span>
                <h3 className="mt-1 font-display text-xl lg:text-2xl font-bold text-white leading-tight truncate">
                  {v.title}
                </h3>
              </div>
              <span className="shrink-0 flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                <span className="text-[#ff6a1a] font-bold">{v.duration}</span>
                <span className="text-white/80 hidden sm:inline">Watch</span>
              </span>
            </div>
          )}

          {v.brandedPoster && (
            <span className="absolute bottom-5 left-6 flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
              <span className="text-[#ff6a1a] font-bold">{v.duration}</span>
              <span className="text-white/80">Watch</span>
            </span>
          )}

          {/* Solid orange disc in a white ring. Branded posters carry the school
              name down their left side, so those sit slightly right of centre. */}
          <button
            type="button"
            aria-label={`Play ${v.title}`}
            onClick={onPlay}
            style={{ left: v.poster ? "58%" : "50%" }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 lg:w-[4.6rem] lg:h-[4.6rem] rounded-full bg-[#ff6a1a] border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_16px_38px_-10px_rgba(0,0,0,0.55)]"
          >
            <Play className="w-6 h-6 lg:w-7 lg:h-7 text-white fill-white ml-1" strokeWidth={0} />
          </button>
        </>
      )}
    </div>
  );
}

/** Featured layout: full-bleed video with its label overlaid. */
function VideoCard({ v, index }: { v: Video; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[2rem] overflow-hidden border border-white/10 shadow-elev-3"
    >
      <VideoMedia
        v={v}
        playing={playing}
        onPlay={() => setPlaying(true)}
        rounded="rounded-[2rem]"
        showOverlayLabel
      />
    </motion.div>
  );
}

/** Grid layout: video on top, copy in a white body beneath. */
function ProjectCard({ v, index }: { v: Video; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [playing, setPlaying] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="flex flex-col rounded-[1.5rem] overflow-hidden bg-white border border-black/[0.05] shadow-elev-2 hover:shadow-lift-2 transition-shadow duration-500"
    >
      <VideoMedia
        v={v}
        playing={playing}
        onPlay={() => setPlaying(true)}
        rounded="rounded-none"
        showOverlayLabel={false}
      />

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-base font-bold text-[#ff6a1a]">{v.number}</span>
          <span className="h-px w-8 bg-[#ff6a1a]/50" />
        </div>

        <h3 className="mt-3 font-display text-lg lg:text-xl font-bold tracking-[-0.01em] text-[#0a0a0a] leading-snug">
          {v.title}
        </h3>

        {v.desc && (
          <p className="mt-2.5 text-[#6b6b6b] text-sm leading-relaxed">{v.desc}</p>
        )}

        <div className="mt-auto pt-5 flex items-center gap-2 text-xs">
          <span className="text-[#ff6a1a] font-bold">{v.duration}</span>
          <span className="text-[#a0a0a0]">Watch</span>
        </div>
      </div>
    </motion.article>
  );
}
