"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { image: "/images/hero-1.jpg", focus: "AI", position: "center", size: "cover" },
  { image: "/images/hero-2.jpg", focus: "Robotics", position: "center", size: "cover" },
  { image: "/images/hero-3.jpg", focus: "STEM", position: "center", size: "cover" },
  { image: "/images/hero-4.jpg", focus: "Innovation", position: "center", size: "cover" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (elapsed >= duration) {
        setIndex((i) => (i + 1) % slides.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index]);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black">
      {/* Background images with Ken Burns */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 ken-burns"
            style={{
              backgroundImage: `url(${slides[index].image})`,
              backgroundPosition: slides[index].position,
              backgroundSize: slides[index].size,
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          {/* Orange accent glow */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#ff6a1a]/20 to-transparent mix-blend-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Top dark strip for header legibility */}
      <div className="absolute top-0 inset-x-0 h-[160px] bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none z-[5]" />

      {/* Static hero content — EMPOWERING EDUCATION WITH AI */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start pt-[100px] pb-20 lg:pt-[110px] lg:pb-28 px-6 lg:px-16 max-w-[1600px] mx-auto">
        <div className="max-w-5xl mt-16 lg:mt-24">
          <h1
            className="font-display text-white leading-[1.15] tracking-[-0.02em] font-medium"
            style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="block overflow-hidden"
            >
              Empowering
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
              className="block overflow-hidden"
            >
              Education
            </motion.span>
            <span className="block overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={slides[index].focus}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -34 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block italic font-serif font-light bg-gradient-to-r from-[#ffb380] via-[#ff6a1a] to-[#ffb380] bg-clip-text text-transparent"
                  style={{ filter: "drop-shadow(0 0 36px rgba(255,106,26,0.35))" }}
                >
                  with {slides[index].focus}.
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </div>

        {/* Slide indicators */}
        <div className="mt-auto pt-12 flex items-center gap-6">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="group relative h-1 rounded-full overflow-hidden transition-all duration-500"
                style={{ width: i === index ? 80 : 32 }}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className="absolute inset-0 bg-white/25" />
                {i === index && (
                  <motion.span
                    key={`progress-${index}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    style={{ transformOrigin: "left" }}
                    className="absolute inset-0 bg-gradient-to-r from-[#ff6a1a] to-[#ffb380]"
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-white/80" />}
              </button>
            ))}
          </div>
          <div className="text-white/70 text-xs font-medium tabular-nums tracking-wider">
            <span className="text-white font-semibold">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-2">/</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-6 lg:right-16 z-10 hidden lg:flex flex-col items-center gap-3">
        <span className="text-white/60 text-[0.65rem] tracking-[0.3em] uppercase rotate-90 origin-center translate-y-8">
          Scroll
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-white/60 to-transparent mt-16" />
      </div>
    </section>
  );
}
