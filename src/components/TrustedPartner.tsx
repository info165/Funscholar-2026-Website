"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const partnerSnapshots = [
  { src: "/images/Atal_Innovation_Mission_logo.png", label: "ATAL Innovation Mission" },
  // PNG (not the original JPG): its baked-in grey backdrop was cleared to alpha.
  { src: "/images/kendriya_vidyalaya_sangathan_logo.png", label: "Kendriya Vidyalaya Sangathan" },
  // Black line-art emblem on transparent — no contrast fix needed.
  { src: "/images/ministry-of-education.png", label: "Ministry of Education" },
  { src: "/images/navodaya-vidyalaya-samiti.avif", label: "Navodaya Vidyalaya Samiti" },
];

export default function TrustedPartner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section className="relative py-28 lg:py-40 bg-[#0a0a0a] overflow-hidden text-white">
      {/* Animated orange gradient orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#ff6a1a]/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#ff6a1a]/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.95] font-semibold tracking-[-0.035em] text-balance"
          >
            Where{" "}
            <span className="italic font-serif font-light bg-gradient-to-r from-[#ffb380] via-[#ff6a1a] to-[#ffb380] bg-clip-text text-transparent">
              AI and Robotics
            </span>{" "}
            meets the classroom.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl"
          >
            Funscholar powers classrooms with AI and robotics, partnering with
            governments, institutions, and educators through initiatives like the
            ATAL Innovation Mission and Kendriya Vidyalayas to bring intelligent
            technology into schools at scale, without compromising on depth,
            quality, or joy.
          </motion.p>
        </div>

        {/* Partnership snapshots — real partner logos */}
        <div className="mt-20 lg:mt-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {partnerSnapshots.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-white/[0.035] border border-white/[0.08] backdrop-blur-xl overflow-hidden transition-[background-color,border-color,box-shadow] duration-500 hover:bg-white/[0.06] hover:border-[#ff6a1a]/40 hover:shadow-lift-2"
              >
                {/* top specular edge */}
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                {/* warm corner bloom, revealed on hover */}
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#ff6a1a]/25 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative flex flex-col items-center gap-5 p-6 lg:p-7">
                  {/* light badge — these are multi-colour government emblems, so they
                      need a light plate to stay legible on the dark section */}
                  <div className="w-full h-28 lg:h-[7.5rem] rounded-2xl bg-gradient-to-b from-white to-[#f2f2f3] shadow-[0_12px_28px_-14px_rgba(0,0,0,0.75)] flex items-center justify-center p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.label}
                      className="max-h-full max-w-[86%] w-auto object-contain"
                    />
                  </div>
                  <span className="text-white/55 text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-center leading-tight group-hover:text-white/85 transition-colors duration-500">
                    {p.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
