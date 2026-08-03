"use client";

import { motion, useInView, useReducedMotion, type Transition } from "framer-motion";
import { Fragment, useRef } from "react";
import { Rocket, Handshake, Trophy, TrendingUp, Globe, Brain } from "lucide-react";

// Real milestones from funscholar.com's live "Our Journey" section.
const milestones = [
  {
    icon: Rocket,
    tag: "2015",
    title: "Company Incorporated",
    desc: "Started with a vision to transform education.",
  },
  {
    icon: Handshake,
    tag: "2017",
    title: "ATL Program & Global MoUs",
    desc: "Enlisted for ATL Program (NITI Aayog); MoUs with companies in USA, China, and Hong Kong.",
  },
  {
    icon: Trophy,
    tag: "2018",
    title: "Best Startup Award",
    desc: "Received Best Startup Award; expanded to 5 states and completed ATL in 500 schools.",
  },
  {
    icon: TrendingUp,
    tag: "2020",
    title: "National Expansion",
    desc: "Reached 12 states, completed 1,000+ schools; in-house R&D team created for Make in India products.",
  },
  {
    icon: Globe,
    tag: "2022",
    title: "Multi-State Reach",
    desc: "Reached 22 states and covered 2,200+ schools.",
  },
  {
    icon: Brain,
    tag: "2025",
    title: "AI Platform Launch",
    desc: "Launched AI-powered teaching and assessment platform.",
  },
];

/**
 * The connecting rail above each row of three: a hairline that draws itself
 * left-to-right, with a node lighting up over each card as it passes.
 */
function TimelineRail({
  inView,
  reduceMotion,
  delay,
  markLast,
}: {
  inView: boolean;
  reduceMotion: boolean;
  delay: number;
  markLast: boolean;
}) {
  const draw: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] };

  return (
    <div className="hidden lg:block col-span-full relative h-7" aria-hidden>
      {/* Rail runs between the first and last node, not edge to edge. */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={draw}
        style={{ left: "16.666%", right: "16.666%" }}
        className="absolute top-1/2 -translate-y-1/2 h-px origin-left bg-gradient-to-r from-[#ffd4ac] via-[#ff8c3a] to-[#ffd4ac]"
      />

      {[0, 1, 2].map((n) => {
        const isCurrent = markLast && n === 2;
        const nodeDelay = reduceMotion ? 0 : delay + 0.3 + n * 0.3;
        return (
          <motion.span
            key={n}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.45, delay: nodeDelay, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ left: `${(n + 0.5) * (100 / 3)}%` }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <span
              className={`block rounded-full bg-[#ff6a1a] ${
                isCurrent
                  ? "w-3.5 h-3.5 ring-4 ring-[#ff6a1a]/20 shadow-[0_0_14px_3px_rgba(255,106,26,0.45)]"
                  : "w-2.5 h-2.5 ring-4 ring-white"
              }`}
            />
            {/* short drop connecting the node down toward its card */}
            <span className="absolute left-1/2 top-full -translate-x-1/2 w-px h-3 bg-gradient-to-b from-[#ff6a1a]/45 to-transparent" />
          </motion.span>
        );
      })}
    </div>
  );
}

export default function OurJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative pt-12 lg:pt-16 pb-20 lg:pb-24 bg-white overflow-hidden noise-overlay"
    >
      {/* Ambient warmth + a fine dot field so the white isn't a flat sheet */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#ff6a1a]/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,106,26,0.10) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 75%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-[#0a0a0a] leading-[1.1]">
            Our{" "}
            {/* Fraunces' italic capital J drops well below the baseline, and
                background-clip:text only paints inside the box — so the paint
                box is padded out and the margin pulled back to match. */}
            <span className="italic font-serif font-light text-gradient-orange inline-block pt-[0.16em] pb-[0.34em] -mb-[0.34em]">
              Journey.
            </span>
          </h2>
        </motion.div>

        {/* Milestone cards — three across so each has room to breathe; six in a
            single row forced every title and description to wrap repeatedly.
            The rails are col-span-full grid items, so they force a row break at
            lg and drop out of the flow entirely below it. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {milestones.map((m, i) => {
            const isLast = i === milestones.length - 1;
            const Icon = m.icon;
            const startsRow = i % 3 === 0;
            return (
              <Fragment key={m.title}>
                {startsRow && (
                  <TimelineRail
                    inView={inView}
                    reduceMotion={!!reduceMotion}
                    delay={i === 0 ? 0.15 : 0.5}
                    markLast={i !== 0}
                  />
                )}
                <motion.div
                  initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className={`group relative flex flex-col items-center text-center p-6 lg:p-7 rounded-[1.5rem] overflow-hidden transition-shadow duration-500 ${
                  isLast
                    ? "bg-gradient-to-br from-[#ffb066] via-[#ff8c3a] to-[#e8530a] shadow-lift-3 hover:shadow-[0_38px_78px_-18px_rgba(232,83,10,0.7)]"
                    : "bg-gradient-to-b from-white to-[#fffaf4] shadow-elev-2 hover:shadow-lift-2"
                }`}
              >
                {/* Hairline frame + lit top edge — reads as a real surface
                    catching light rather than a flat rectangle. */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset transition-colors duration-500 ${
                    isLast
                      ? "ring-white/25"
                      : "ring-black/[0.06] group-hover:ring-[#ff6a1a]/30"
                  }`}
                />
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                    isLast ? "via-white/60" : "via-white"
                  }`}
                />
                {/* Warm bloom that lifts in on hover */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                    isLast ? "bg-white/25" : "bg-[#ff6a1a]/15"
                  }`}
                />
                {/* Oversized year sits behind the content as a quiet watermark. */}
                <span
                  aria-hidden
                  className={`pointer-events-none select-none absolute -top-3 right-4 font-display text-[3.6rem] font-bold leading-none tracking-tighter ${
                    isLast ? "text-white/[0.14]" : "text-[#ff6a1a]/[0.07]"
                  }`}
                >
                  {m.tag}
                </span>

                <div
                  className={`relative w-[3.6rem] h-[3.6rem] rounded-[1.15rem] flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-[1.08] group-hover:-rotate-3 ${
                    isLast
                      ? "bg-white/[0.18] backdrop-blur-sm ring-1 ring-inset ring-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"
                      : "bg-gradient-to-br from-[#fff4ea] to-[#ffdcb2] ring-1 ring-inset ring-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_10px_24px_-10px_rgba(255,106,26,0.45)]"
                  }`}
                >
                  {isLast && (
                    <motion.span
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-[1.15rem] border border-white/50"
                    />
                  )}
                  <Icon className={`relative w-6 h-6 ${isLast ? "text-white" : "text-[#ff6a1a]"}`} strokeWidth={1.6} />
                </div>

                <span
                  className={`relative text-[0.72rem] font-bold tracking-[0.22em] uppercase ${
                    isLast ? "text-white/90" : "text-[#ff6a1a]"
                  }`}
                >
                  {m.tag}
                </span>

                <h3
                  className={`relative mt-2.5 font-display text-lg lg:text-[1.2rem] font-bold tracking-[-0.015em] leading-snug ${
                    isLast ? "text-white" : "text-[#0a0a0a]"
                  }`}
                >
                  {m.title}
                </h3>

                <div
                  className={`relative w-10 h-px my-4 transition-all duration-500 group-hover:w-14 ${
                    isLast
                      ? "bg-gradient-to-r from-transparent via-white/70 to-transparent"
                      : "bg-gradient-to-r from-transparent via-[#ff6a1a]/60 to-transparent"
                  }`}
                />

                <p
                  className={`relative text-[0.875rem] leading-relaxed max-w-[26ch] ${
                    isLast ? "text-white/90" : "text-[#6b6b6b]"
                  }`}
                >
                  {m.desc}
                </p>
                </motion.div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
