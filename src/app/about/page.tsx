"use client";

import OurJourney from "@/components/OurJourney";
import CountUp from "@/components/CountUp";
import BlurImage from "@/components/BlurImage";
import { motion } from "framer-motion";
import {
  Eye,
  Flag,
  Gem,
  CheckCircle2,
  FlaskConical,
  Building2,
  BookOpen,
  Bot,
  MapPin,
  IndianRupee,
} from "lucide-react";

const values = ["Innovation", "Integrity", "Impact", "Intelligence"];

// Figures taken from the live funscholar.com "A Trusted Partner in Large-Scale
// Education Transformation" section. Only the content-hours and orders figures
// carry a "+" there, so that's preserved rather than applied across the board.
// Split into number + affixes so the digits can count up independently.
const stats = [
  { icon: FlaskConical, value: 4000, label: "ATL Labs Delivered" },
  { icon: Building2, value: 1000, label: "PM SHRI Schools Upgraded" },
  { icon: BookOpen, value: 3000, suffix: "+", label: "Hours of Ed Content Created" },
  { icon: Bot, value: 100, label: "Robotics Labs Set Up" },
  { icon: MapPin, value: 22, label: "States Reached" },
  { icon: IndianRupee, value: 30, prefix: "₹", suffix: " Cr+", label: "in Orders Executed" },
];

export default function AboutPage() {
  return (
    <main className="bg-[#fdfaf7]">

      {/* Hero */}
      <section className="relative pt-[8rem] lg:pt-[8.5rem] pb-14 lg:pb-16 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-[2.6rem] sm:text-[3.3rem] lg:text-[4rem] font-bold tracking-[-0.035em] leading-[1.06] text-[#0a0a0a]">
              We believe learning
              <br />
              should be an{" "}
              <span className="italic font-serif font-light text-gradient-orange pt-[0.14em] pb-[0.2em] inline-block">
                experience.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-[#6b6b6b] text-base lg:text-[1.05rem] leading-relaxed">
              At Funscholar, we blend innovation with education to create
              meaningful learning experiences that inspire curiosity,
              creativity, and real-world impact.
            </p>

          </motion.div>

          {/* Cut-out subjects sitting on the brand shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-end justify-center"
          >
            {/* pale disc */}
            <div className="absolute right-[6%] top-[4%] w-[62%] aspect-square rounded-full bg-[#f3f1ee] pointer-events-none" />
            {/* orange petal */}
            <div className="absolute left-[10%] top-0 w-[58%] aspect-square bg-gradient-to-br from-[#ff8a3a] to-[#ef5a06] rounded-[52%_48%_46%_54%/58%_52%_48%_42%] -rotate-12 pointer-events-none" />
            {/* soft bloom */}
            <div className="absolute inset-x-[15%] bottom-[8%] h-1/3 bg-[#ff6a1a]/15 blur-3xl rounded-full pointer-events-none" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-hero-students.png"
              alt="Two students building a robotics kit together"
              width={612}
              height={408}
              /* Cut-out has no background, so the shadow follows the subjects
                 rather than sitting under a rectangle. */
              className="relative w-full h-auto object-contain"
              style={{ filter: "drop-shadow(0 26px 30px rgba(0,0,0,0.28))" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="relative pt-8 lg:pt-12 pb-6 lg:pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {[
            {
              icon: Eye,
              label: "Our Vision",
              body: (
                <p className="font-display text-xl lg:text-[1.4rem] font-semibold leading-snug text-[#0a0a0a]">
                  To make every Indian classroom a place where technology is
                  built, not just taught.
                </p>
              ),
            },
            {
              icon: Flag,
              label: "Our Mission",
              body: (
                <p className="font-display text-xl lg:text-[1.4rem] font-semibold leading-snug text-[#0a0a0a]">
                  To bring AI and robotics within reach of every school, through
                  immersive labs, empowered teachers, and a curriculum built for
                  genuine understanding.
                </p>
              ),
            },
            {
              icon: Gem,
              label: "Our Values",
              body: (
                <ul className="space-y-3">
                  {values.map((v) => (
                    <li key={v} className="flex items-center gap-2.5 text-[#0a0a0a] text-base lg:text-lg">
                      <CheckCircle2 className="w-5 h-5 text-[#ff6a1a] shrink-0" strokeWidth={2} />
                      {v}
                    </li>
                  ))}
                </ul>
              ),
            },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="rounded-[1.5rem] bg-white border border-black/[0.05] shadow-elev-2 hover:shadow-lift-2 transition-shadow duration-500 p-7 lg:p-8"
              >
                <span className="w-14 h-14 rounded-full bg-[#fff1e6] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#ff6a1a]" strokeWidth={1.75} />
                </span>
                <span className="block text-[0.7rem] font-bold tracking-[0.16em] uppercase text-[#ff6a1a] mb-4">
                  {c.label}
                </span>
                {c.body}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Journey — unchanged from the existing site section */}
      <OurJourney />

      {/* The Funscholar promise */}
      <section id="promise" className="relative scroll-mt-28 pb-14 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 rounded-[1.75rem] overflow-hidden bg-gradient-to-br from-[#fff6ef] to-[#ffe9d8] border border-black/[0.05] shadow-elev-3"
          >
            <BlurImage
              src="/images/about-promise-backpose.jpg"
              alt="Funscholar team member in a branded polo facing a packed student auditorium"
              width={1400}
              height={934}
              className="w-full h-full min-h-[16rem]"
            />

            <div className="p-8 lg:p-11">
              <h2 className="font-display text-[1.45rem] lg:text-[1.75rem] font-bold tracking-[-0.028em] leading-[1.15] text-[#0a0a0a]">
                We don&apos;t just teach.
                <br />
                We{" "}
                <span className="italic font-serif font-light text-gradient-orange inline-block pt-[0.14em] pb-[0.2em] -mb-[0.2em]">
                  inspire.
                </span>
              </h2>

              <p className="mt-4 text-[#6b6b6b] text-[0.95rem] lg:text-base leading-relaxed max-w-md">
                We are more than an organization — we are a movement of dreamers,
                doers, and believers committed to creating meaningful change
                through education.
              </p>

              {/* Each figure gets its own plate — bare stats on the panel read
                  as cramped because nothing separates one from the next. */}
              <div className="mt-9 lg:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-3.5">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.55, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="group/stat flex flex-col items-center text-center rounded-2xl bg-white/70 border border-white shadow-elev-1 hover:bg-white hover:shadow-lift-1 transition-all duration-500 p-4 lg:p-5"
                    >
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fff1e6] to-[#ffdcc0] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] transition-transform duration-500 group-hover/stat:scale-110">
                        <Icon className="w-[1.05rem] h-[1.05rem] text-[#ff6a1a]" strokeWidth={1.75} />
                      </span>

                      <div className="mt-5 font-display text-2xl lg:text-[1.8rem] font-bold tracking-[-0.025em] text-[#0a0a0a] leading-none tabular-nums">
                        <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                      </div>
                      <div className="mt-2.5 text-[#7c7c7c] text-[0.78rem] leading-snug">
                        {s.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
