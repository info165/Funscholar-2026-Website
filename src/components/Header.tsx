"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Our Works" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact Us" },
];

/** Marks a nav item current, including on nested routes like /blogs/some-post. */
function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change — adjust state during render rather than
  // in an effect, since this isn't synchronizing with an external system.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Inner pages have a light hero background, so the header must stay solid there;
  // only the homepage has a full-bleed dark hero image to justify a transparent header.
  const solid = scrolled || pathname !== "/";

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-500 ${
          scrolled ? "py-1" : "py-3"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-10">
          <div
            className={`flex items-center justify-between rounded-2xl transition-all duration-500 ${
              solid
                ? "bg-white/80 backdrop-blur-2xl border border-black/5 shadow-elev-1 py-2 px-4"
                : "bg-transparent border border-transparent py-3 px-[1.1rem]"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Funscholar"
                className={`w-auto transition-all duration-500 ${scrolled ? "h-14" : "h-[4.5rem]"}`}
              />
            </Link>

            {/* Desktop nav — centered between the logo and CTA */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 text-[0.88rem] transition-colors duration-300 group ${
                      scrolled ? "py-1.5" : "py-2"
                    } ${
                      active
                        ? "text-[#ff6a1a] font-semibold"
                        : solid
                          ? "text-[#0a0a0a]/70 hover:text-[#0a0a0a] font-medium"
                          : "text-white/80 hover:text-white font-medium"
                    }`}
                  >
                    {/* Lit capsule marks the current page; inactive items get a
                        whisper of the same shape on hover so it reads as one system. */}
                    {active ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#ff6a1a]/[0.16] to-[#ff6a1a]/[0.07] ring-1 ring-inset ring-[#ff6a1a]/25 shadow-[0_4px_14px_-6px_rgba(255,106,26,0.55)]"
                      />
                    ) : (
                      <span
                        className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          solid ? "bg-black/[0.04]" : "bg-white/10"
                        }`}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className={`group relative inline-flex items-center gap-2 px-5 rounded-full text-[0.85rem] font-medium overflow-hidden transition-all duration-500 ${
                  scrolled ? "py-2" : "py-2.5"
                } ${
                  solid
                    ? "bg-[#0a0a0a] text-white"
                    : "bg-white text-[#0a0a0a]"
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#ff6a1a] to-[#ff9248] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative group-hover:text-white transition-colors duration-500">
                  Get in Touch
                </span>
                <svg
                  className="relative w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5L8 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                solid
                  ? "hover:bg-black/5 text-[#0a0a0a]"
                  : "hover:bg-white/10 text-white"
              }`}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <motion.nav
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pt-28 px-6 flex flex-col gap-1"
            >
              {navLinks.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex items-center justify-between py-4 border-b border-black/5 text-2xl font-display font-semibold tracking-tight transition-colors ${
                        active ? "text-[#ff6a1a] pl-4" : "text-[#0a0a0a]"
                      }`}
                    >
                      {/* Orange rule stands in for the desktop capsule. */}
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-full bg-[#ff6a1a]" />
                      )}
                      {link.label}
                      <span className={active ? "text-[#ff6a1a]" : "text-[#ff6a1a]/40"}>→</span>
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center px-6 py-4 rounded-full bg-[#ff6a1a] text-white font-medium"
              >
                Get in Touch
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
