"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlurImage from "@/components/BlurImage";
import { Box, Bot, Monitor, GraduationCap, Check } from "lucide-react";

const solutions = [
  {
    icon: Box,
    title: ["Experiential", "Learning Kits"],
    bullets: ["Balvatika to Class V materials", "NIPUN-aligned content", "Bilingual worksheets"],
    image: "/images/tlm-fln-kits.png",
    type: "photo" as const,
    imgZoom: "",
    plainBg: true,
    cardBg: "bg-gradient-to-br from-[#ffe9d4] to-[#ffc98f]",
    fadeHex: "#ffc98f",
    barBg: "bg-[#ff6a1a]",
    checkColor: "text-[#ff6a1a]",
    checkBorder: "border-[#ff6a1a]/30",
  },
  {
    icon: Bot,
    title: ["Robotics Labs"],
    bullets: ["Cretile kits & 3D printing", "AI-ML Lab setup", "Compliance-ready infrastructure"],
    image: "/images/atl-robotics-kit.png",
    type: "photo" as const,
    imgZoom: "scale-[1.55]",
    plainBg: false,
    cardBg: "bg-gradient-to-br from-[#e9e0ff] to-[#c9b3ff]",
    fadeHex: "#c9b3ff",
    barBg: "bg-[#8b5cf6]",
    checkColor: "text-[#8b5cf6]",
    checkBorder: "border-[#8b5cf6]/30",
  },
  {
    icon: Monitor,
    title: ["Smart Classroom", "Solutions"],
    bullets: ["Interactive flat panels", "Digital content & LMS", "Teacher training & support"],
    image: "/images/smart-classroom-solution.png",
    type: "photo" as const,
    imgZoom: "",
    plainBg: false,
    cardBg: "bg-gradient-to-br from-[#d3f5e0] to-[#9fe6bd]",
    fadeHex: "#9fe6bd",
    barBg: "bg-[#22c55e]",
    checkColor: "text-[#22c55e]",
    checkBorder: "border-[#22c55e]/30",
  },
  {
    icon: GraduationCap,
    title: ["Robotics", "Training Program"],
    bullets: ["Hands-on learning", "Project-based approach", "Future-ready skills"],
    image: "/images/robotics-training.png",
    type: "photo" as const,
    imgZoom: "",
    plainBg: false,
    cardBg: "bg-gradient-to-br from-[#cfe2ff] to-[#9dc3ff]",
    fadeHex: "#9dc3ff",
    barBg: "bg-[#3b82f6]",
    checkColor: "text-[#3b82f6]",
    checkBorder: "border-[#3b82f6]/30",
  },
];

function Card({ solution, index }: { solution: (typeof solutions)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = solution.icon;
  const isPhoto = solution.type === "photo";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/60 min-h-[20rem] lg:min-h-[22rem] shadow-[0_20px_50px_-25px_rgba(0,0,0,0.18)] hover:shadow-elev-3 transition-shadow duration-500 ${solution.cardBg}`}
    >
      {/* dotted texture */}
      <div
        className="absolute top-8 right-10 w-28 h-20 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0a0a0a 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-10 max-w-[58%] sm:max-w-[55%]">
        {/* Physical chip: light plate with a lit top edge and a grounded shadow,
            accent carried by the icon rather than a flat block of colour. */}
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-b from-white to-[#edeef0] border border-black/[0.07] shadow-[0_14px_26px_-14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.95)] flex items-center justify-center mb-5">
          <Icon className={`w-[1.35rem] h-[1.35rem] ${solution.checkColor}`} strokeWidth={1.5} />
        </div>
        {/* Always reserves two lines. The content block is vertically centred,
            so a one-line title would otherwise make the whole card's contents
            shorter and pull its icon out of line with the others. */}
        <h3 className="font-display text-xl sm:text-2xl lg:text-[1.7rem] font-bold text-[#0a0a0a] leading-tight min-h-[2.5em]">
          {solution.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <div className={`w-10 h-1 rounded-full ${solution.barBg} my-4`} />
        <ul className="space-y-2.5">
          {solution.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-[#4b4b4b] text-[0.85rem] sm:text-[0.9rem]">
              <span
                className={`w-4 h-4 rounded-full border ${solution.checkBorder} flex items-center justify-center shrink-0`}
              >
                <Check className={`w-2.5 h-2.5 ${solution.checkColor}`} strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {isPhoto ? (
        <div className="absolute inset-y-0 right-0 w-[46%] sm:w-[48%] overflow-hidden">
          <BlurImage
            src={solution.image}
            alt={solution.title.join(" ")}
            className="w-full h-full"
            imgClassName={`w-full h-full object-cover transition-transform duration-700 ${solution.imgZoom || "group-hover:scale-[1.04]"}`}
          />
          <div
            className="absolute inset-y-0 left-0 w-14"
            style={{ backgroundImage: `linear-gradient(to right, ${solution.fadeHex}, transparent)` }}
          />
          {solution.plainBg && (
            <div
              className="absolute inset-0 mix-blend-multiply pointer-events-none"
              style={{ backgroundColor: solution.fadeHex, opacity: 0.4 }}
            />
          )}
        </div>
      ) : (
        <div className="absolute inset-y-0 right-0 w-[42%] sm:w-[45%] flex items-center justify-center p-5">
          <div className="w-full max-w-[15rem] aspect-[4/3] rounded-2xl bg-white shadow-[0_20px_45px_-15px_rgba(0,0,0,0.2)] border border-black/[0.04] flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-[1.03]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={solution.image}
              alt={solution.title.join(" ")}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function SchoolSolutions() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="solutions"
      className="relative scroll-mt-24 py-20 lg:py-24 bg-white overflow-hidden noise-overlay"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={ref} className="relative max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="relative font-display text-[2.75rem] sm:text-5xl lg:text-[4.25rem] font-bold text-[#0a0a0a] leading-[1.02]">
            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(12px)", letterSpacing: "0.01em" }}
              animate={
                inView
                  ? { opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "-0.035em" }
                  : {}
              }
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              School Solutions
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 1, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              // text-gradient-orange clips its background to the glyphs, and
              // Fraunces' double-sided italic "f" (the "ff" in Offer) overshoots
              // the 1.02 line box. Pad the paint box out and cancel it with
              // matching negative margins so the layout is unchanged.
              className="block italic font-serif font-light tracking-[-0.02em] text-gradient-orange pt-[0.16em] -mt-[0.16em] pb-[0.2em] -mb-[0.2em]"
            >
              We Offer.
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="relative mt-6 text-[#6b6b6b] text-base lg:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Comprehensive educational technology solutions designed for
            modern learning environments.
          </motion.p>

        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution, i) => (
            <Card key={solution.title.join(" ")} solution={solution} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
