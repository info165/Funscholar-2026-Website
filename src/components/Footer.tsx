"use client";

import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Our Works" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact Us" },
];

// Mirrors the four cards in the homepage "School Solutions We Offer" section.
// Every entry links to #solutions — keep in step with SchoolSolutions.tsx.
const solutions = [
  "Experiential Learning Kits",
  "ATL + Robotics Labs",
  "Smart Classroom Solutions",
  "Robotics Training Program",
];

// Twitter/YouTube icons stay defined in SocialIcon below, so re-adding a
// channel is just another entry here.
const socials = [
  { name: "linkedin", href: "https://www.linkedin.com/company/funscholar/", label: "LinkedIn" },
  { name: "facebook", href: "https://www.facebook.com/funscholar", label: "Facebook" },
  { name: "instagram", href: "https://www.instagram.com/funscholar/", label: "Instagram" },
];

const SocialIcon = ({ name, className = "" }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactElement> = {
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

function AnimatedCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-[90rem] mx-auto px-6 pt-20 lg:pt-24 pb-16"
    >
      <div
        className="relative overflow-hidden rounded-[3rem] p-10 sm:p-12 lg:p-16 noise-overlay shadow-[0_50px_100px_-40px_rgba(232,83,10,0.6)]"
        style={{
          // Warm key light in the top-left falling to a deep burnt edge, so the
          // panel reads as a lit surface rather than one flat sheet of orange.
          backgroundImage:
            "radial-gradient(110% 85% at 14% 8%, rgba(255,201,150,0.55) 0%, rgba(255,201,150,0) 58%), linear-gradient(135deg, #ff8a3a 0%, #ff6a1a 38%, #e8530a 70%, #c84304 100%)",
        }}
      >
        {/* Ambient drift */}
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-60 -right-52 w-[560px] h-[560px] bg-white/15 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -45, 0], y: [0, 45, 0], scale: [1, 0.88, 1] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-56 -left-52 w-[520px] h-[520px] bg-[#ffb066]/25 rounded-full blur-3xl pointer-events-none"
        />

        {/* Dot field */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Edge craft: inset vignette, hairline ring, lit top edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 170px 50px rgba(138,40,0,0.30)" }}
        />
        <div className="absolute inset-0 rounded-[3rem] ring-1 ring-inset ring-white/20 pointer-events-none" />
        <div className="absolute inset-x-24 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 font-display text-5xl sm:text-6xl lg:text-[5rem] font-semibold tracking-[-0.035em] leading-[0.92] text-white [text-shadow:0_2px_24px_rgba(120,35,0,0.25)]"
          >
            Shaping the
            <br />
            <span className="italic font-serif font-light">future of learning,</span>
            <br />
            together.
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-4 w-full"
          >
            <Link
              href="/contact"
              className="group/btn w-full inline-flex items-center justify-between gap-6 pl-9 pr-3 py-3 rounded-full bg-white text-[#0a0a0a] font-semibold text-base lg:text-lg shadow-[0_22px_45px_-18px_rgba(90,25,0,0.65)] hover:shadow-[0_28px_58px_-18px_rgba(90,25,0,0.75)] transition-shadow duration-500"
            >
              <span>Contact Us</span>
              <span className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#ff8a3a] to-[#e8530a] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                <ArrowUpRight className="w-5 h-5 text-white transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </span>
            </Link>

            <Link
              href="/#solutions"
              className="group/btn w-full inline-flex items-center justify-between gap-6 pl-9 pr-3 py-3 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/25 text-white font-semibold text-base lg:text-lg hover:bg-white/[0.2] hover:border-white/45 transition-colors duration-500"
            >
              <span>View Solutions</span>
              <span className="w-12 h-12 shrink-0 rounded-full border border-white/35 bg-white/10 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover/btn:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function FooterHeading({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <h4
      className={`flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-white/40 mb-6 ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="w-1 h-1 rounded-full bg-[#ff6a1a]" />
      {children}
    </h4>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#ff6a1a]/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#ff6a1a]/5 rounded-full blur-[150px]" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-overlay" />

      {/* CTA */}
      <AnimatedCTA />

      {/* Main footer */}
      <div className="relative border-t border-white/[0.07]">
        {/* lit top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        <div className="max-w-[90rem] mx-auto px-6 py-20 lg:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="sm:col-span-2 lg:col-span-4 lg:pr-10"
            >
              <Link href="/" className="inline-flex items-center group mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.png"
                  alt="Funscholar"
                  className="h-16 w-auto transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </Link>

              <div className="flex flex-col gap-3">
                {[
                  { icon: Mail, value: "info@funscholar.com", href: "mailto:info@funscholar.com" },
                  { icon: Phone, value: "+91-9589587054", href: "tel:+919589587054" },
                  // Address isn't actionable, so it renders as plain text.
                  { icon: MapPin, value: "Kolkata, India", href: undefined },
                ].map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <>
                      <span className="w-9 h-9 shrink-0 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#ff6a1a]/15 group-hover:border-[#ff6a1a]/45">
                        <Icon className="w-[0.95rem] h-[0.95rem] text-[#ff6a1a]" strokeWidth={1.75} />
                      </span>
                      {c.value}
                    </>
                  );

                  return c.href ? (
                    <a
                      key={c.value}
                      href={c.href}
                      className="group inline-flex items-center gap-3 text-sm text-white/55 hover:text-white transition-colors duration-300 w-fit"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div
                      key={c.value}
                      className="inline-flex items-center gap-3 text-sm text-white/55 w-fit"
                    >
                      {inner}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Explore */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="lg:col-span-3"
            >
              <FooterHeading>Explore</FooterHeading>
              <ul className="space-y-3.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block text-[0.95rem] text-white/55 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <FooterHeading>Solutions</FooterHeading>
              <ul className="space-y-3.5">
                {solutions.map((s) => (
                  <li key={s}>
                    <Link
                      href="/#solutions"
                      className="inline-block text-[0.95rem] text-white/55 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Connect */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="lg:col-span-2"
            >
              {/* w-fit shrinks the block to the icon row so the heading
                  centres over the icons, not the whole column. */}
              <div className="w-fit">
                <FooterHeading center>Connect</FooterHeading>
                <div className="flex gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/65 hover:text-white hover:bg-[#ff6a1a] hover:border-[#ff6a1a] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <SocialIcon name={s.name} className="w-[1.05rem] h-[1.05rem]" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />
        </div>

        {/* Bottom bar */}
        <div className="max-w-[90rem] mx-auto px-6 py-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-[0.8rem] text-white/35 order-2 md:order-1">
            © {new Date().getFullYear()} Funscholar Innovations Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-7 text-[0.8rem] text-white/35 order-1 md:order-2">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="relative hover:text-white/80 transition-colors duration-300 group"
              >
                {item}
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-[#ff6a1a] group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
            /* Fixed button floats over both light and dark sections, so it
               needs an opaque fill of its own rather than a translucent one. */
            className="group flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff8a3a] to-[#e8530a] text-white ring-1 ring-white/25 shadow-[0_14px_34px_-10px_rgba(232,83,10,0.7)] hover:shadow-[0_18px_44px_-10px_rgba(232,83,10,0.9)] transition-shadow duration-300"
            style={{ width: 52, height: 52 }}
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={2.25} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
