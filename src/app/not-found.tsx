import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export const metadata = {
  title: "Page not found — Funscholar",
};

const suggestions = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Our Works" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact Us" },
];

export default function NotFound() {
  return (
    <main className="bg-[#fdfaf7]">
      <section className="relative pt-[9rem] lg:pt-[10rem] pb-24 lg:pb-28 overflow-x-clip">
        {/* Same masked dot field the other sections use, so a wrong URL still
            lands somewhere that looks like the site. */}
        <div
          className="absolute inset-x-0 top-0 h-72 opacity-[0.5] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ff6a1a 1.2px, transparent 1.2px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#ff6a1a]">
            Error 404
          </span>

          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-[-0.035em] leading-[1.08] text-[#0a0a0a]">
            This page took an
            <br />
            <span className="italic font-serif font-light text-gradient-orange inline-block pt-[0.14em] pb-[0.24em] -mb-[0.24em]">
              unexpected detour.
            </span>
          </h1>

          <p className="mt-5 mx-auto max-w-md text-[#6b6b6b] text-base lg:text-[1.05rem] leading-relaxed">
            The link may be out of date, or the page may have moved. Everything
            else is right where you left it.
          </p>

          <Link
            href="/"
            className="group/btn mt-9 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff7a24] to-[#f25c07] text-white font-semibold cursor-pointer shadow-lift-3 hover:shadow-[0_22px_46px_-16px_rgba(242,92,7,0.9)] transition-shadow duration-500"
          >
            <Home className="w-[1.05rem] h-[1.05rem]" strokeWidth={1.9} />
            Back to home
          </Link>

          <div className="mt-14">
            <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-[#8a8a8a]">
              Or head somewhere useful
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {suggestions.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-black/[0.06] text-[0.9rem] text-[#0a0a0a] shadow-elev-1 hover:border-[#ff6a1a]/30 hover:shadow-lift-1 transition-all duration-400"
                >
                  {s.label}
                  <ArrowRight className="w-3.5 h-3.5 text-[#ff6a1a] transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
