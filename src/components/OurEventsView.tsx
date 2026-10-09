"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Building2,
  Swords,
  Dumbbell,
  Anchor,
  Crown,
  Trophy,
  ArrowUpRight,
  Camera,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const glance = [
  { icon: CalendarDays, label: "Date", value: "29 September 2026" },
  { icon: MapPin, label: "Venue", value: "Indian Museum, Kolkata" },
  { icon: Building2, label: "Organised by", value: "Funscholar" },
  { icon: Swords, label: "Format", value: "Three arenas, one champion" },
];

const marquee = [
  "Robo-Push",
  "Robo-Pull",
  "Robo-War",
  "Dangal of Robots",
  "Season 2026",
  "Indian Museum, Kolkata",
  "Organised by Funscholar",
];

const arenas = [
  {
    n: "01",
    icon: Dumbbell,
    image: "/images/events/brl-arena-push.jpg",
    title: "Robo-Push",
    tagline: "Push the weight past the line.",
  },
  {
    n: "02",
    icon: Anchor,
    image: "/images/events/brl-arena-pull.jpg",
    title: "Robo-Pull",
    tagline: "Haul the load down the track.",
  },
  {
    n: "03",
    icon: Swords,
    image: "/images/events/brl-arena-war.jpg",
    title: "Robo-War",
    tagline: "Last robot standing.",
  },
];

const gallery = [
  { src: "/images/events/brl-gallery-01.jpg", alt: "Students celebrating a win at the Bharat Robotics League", wide: true },
  { src: "/images/events/brl-gallery-02.jpg", alt: "A match in progress as the crowd cheers on", wide: false },
  { src: "/images/events/brl-gallery-03.jpg", alt: "Students driving their robot on the Robo-War arena", wide: false },
  { src: "/images/events/brl-gallery-04.jpg", alt: "A team guiding their robot across the arena", wide: true },
  { src: "/images/events/brl-gallery-05.jpg", alt: "Last-minute adjustments to a robot before a match", wide: true },
  { src: "/images/events/brl-gallery-06.jpg", alt: "A competition robot on the Robo-War floor", wide: false },
  { src: "/images/events/brl-gallery-07.jpg", alt: "Two students with their robot controller between matches", wide: false },
  { src: "/images/events/brl-gallery-08.jpg", alt: "Robots facing off on the Robo-War arena", wide: true },
  { src: "/images/events/brl-gallery-09.jpg", alt: "A student setting up a robot on the Robo-Pull track", wide: true },
  { src: "/images/events/brl-gallery-10.jpg", alt: "Teams competing on the Robo-War arena", wide: false },
  { src: "/images/events/brl-gallery-11.jpg", alt: "Teams lined up at the Robo-Push arena", wide: false },
  { src: "/images/events/brl-gallery-12.jpg", alt: "A match being filmed on the Robo-Push arena", wide: true },
  { src: "/images/events/brl-gallery-13.jpg", alt: "The Robo-Pull track with the Dangal of Robots banners", wide: true },
  { src: "/images/events/brl-gallery-14.jpg", alt: "A robot lined up on the Robo-Push arena", wide: false },
  { src: "/images/events/brl-gallery-15.jpg", alt: "The host and teams around the Robo-War arena", wide: false },
  { src: "/images/events/brl-gallery-16.jpg", alt: "A robot pulling its load along the Robo-Pull track", wide: true },
];

const trophies = ["BRL 2026 Champion", "Robo-War Winner", "Robo-Pull Winner", "Robo-Push Winner"];

const winners = [
  "/images/events/brl-winners-1.jpg",
  "/images/events/brl-winners-2.jpg",
  "/images/events/brl-winners-3.jpg",
  "/images/events/brl-winners-4.jpg",
];

function Photo({
  src,
  alt,
  className,
  style,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={1280}
      height={720}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#ff8a3a]">
      <span className="w-6 h-px bg-current" />
      {children}
    </span>
  );
}

function Tile({
  src,
  alt,
  className = "",
  delay = 0,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      {...reveal(delay)}
      className={`group relative overflow-hidden rounded-[1.25rem] lg:rounded-[1.5rem] bg-[#f3efe9] shadow-elev-2 ${className}`}
    >
      <Photo
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      {children}
    </motion.div>
  );
}

export default function OurEventsView() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const reelRef = useRef<HTMLVideoElement>(null);

  // React leaves the muted attribute out of server markup, so the browser can
  // refuse autoplay before hydration; set it explicitly and start playback.
  useEffect(() => {
    const v = reelRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (lightbox === null && !videoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
        setVideoOpen(false);
      }
      if (lightbox === null) return;
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, videoOpen]);

  return (
    <main className="bg-[#fdfaf7]">
      {/* Hero */}
      <section className="relative min-h-[min(88vh,52rem)] lg:min-h-[min(92vh,60rem)] flex items-end bg-[#0a0a0a] text-white overflow-hidden">
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute inset-0"
        >
          <Photo
            src="/images/events/brl-hero.jpg"
            alt="A student placing his robot at the start line of a Bharat Robotics League arena"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "80% 35%" }}
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/75 via-[#0a0a0a]/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 pt-44 pb-24 lg:pb-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="max-w-3xl"
          >
            <h1 className="font-display font-bold tracking-[-0.035em] leading-[1.0] text-[3rem] sm:text-[4rem] lg:text-[5.2rem]">
              Bharat Robotics League
              <span className="block mt-3 italic font-serif font-light text-gradient-orange pt-[0.1em] pb-[0.08em] text-[0.62em]">
                Dangal of Robots.
              </span>
            </h1>

            <p className="mt-5 text-white/75 text-[1.05rem] lg:text-[1.15rem] max-w-xl">
              Funscholar&apos;s competitive robotics league for school teams.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {[
                { icon: CalendarDays, text: "29 September 2026" },
                { icon: MapPin, text: "Indian Museum, Kolkata" },
                { icon: Building2, text: "Organised by Funscholar" },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <li
                    key={m.text}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur px-3.5 py-2 text-[0.84rem] text-white/90"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#ff8a3a]" strokeWidth={2.2} />
                    {m.text}
                  </li>
                );
              })}
            </ul>

            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href="#gallery"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-[#ff7d33] to-[#f25c07] text-white px-7 py-3.5 text-[0.92rem] font-semibold inset-ring inset-ring-white/25 inset-shadow-[0_1px_0_rgba(255,255,255,0.35)] shadow-lift-2 hover:shadow-lift-3 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Camera className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.2} />
                See the Highlights
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* At a glance */}
      <section className="relative z-10 -mt-12 lg:-mt-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {glance.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={g.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-black/[0.06] hover:border-[#ff6a1a]/35 shadow-elev-2 hover:shadow-lift-2 hover:-translate-y-1 transition-all duration-500 px-6 py-6 flex items-center gap-4"
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6a1a]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#ff6a1a]/[0.1] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[#ff8a3a] to-[#e8530a] inset-ring inset-ring-white/30 shadow-lift-1 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </span>
                  <div className="relative min-w-0">
                    <div className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#8a8a8a]">
                      {g.label}
                    </div>
                    <div className="mt-0.5 font-display font-semibold text-[1rem] text-[#0a0a0a] leading-snug">
                      {g.value}
                    </div>
                  </div>
                  <span className="pointer-events-none absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-[#ff8a3a] to-[#e8530a] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mosaic */}
      <section className="relative py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...reveal()} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.9rem] font-bold tracking-[-0.032em] leading-[1.14] text-[#0a0a0a]">
                Built by students.
                <span className="italic font-serif font-light text-gradient-orange pt-[0.14em] inline-block ml-3">
                  Decided on the floor.
                </span>
              </h2>
            </div>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-12 gap-3 lg:gap-4">
            <motion.div
              {...reveal()}
              className="group relative overflow-hidden rounded-[1.25rem] lg:rounded-[1.5rem] bg-[#0a0a0a] shadow-elev-3 col-span-2 md:col-span-3 md:row-span-2 aspect-[9/16]"
            >
              <video
                ref={reelRef}
                src="/videos/brl-recap.mp4"
                poster="/images/events/brl-recap-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Bharat Robotics League 2026 recap"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 pointer-events-none" />
              <div className="absolute inset-0 rounded-[1.25rem] lg:rounded-[1.5rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/15 px-3 py-1.5 text-[0.64rem] font-bold tracking-[0.16em] uppercase text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a1a] animate-pulse" />
                Recap
              </span>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="absolute inset-x-4 bottom-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.12] hover:bg-white/[0.22] backdrop-blur-md border border-white/20 px-4 py-2.5 text-[0.8rem] font-semibold text-white transition-colors duration-300"
              >
                <Play className="w-3.5 h-3.5 fill-current" strokeWidth={2} />
                Watch with sound
              </button>
            </motion.div>
            <Tile
              src="/images/events/brl-story-1.jpg"
              alt="Two students celebrating with their fists in the air after a match"
              className="col-span-2 md:col-span-5 md:row-span-2 aspect-[4/3] md:aspect-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute left-5 bottom-5 text-white">
                <div className="text-[0.62rem] font-bold tracking-[0.16em] uppercase text-[#ff8a3a]">
                  The moment
                </div>
                <div className="font-display font-semibold text-[1.05rem]">A match won on the floor.</div>
              </div>
            </Tile>
            <Tile
              src="/images/events/brl-identity.jpg"
              alt="The Funscholar team in front of the Bharat Robotics League backdrop"
              className="col-span-2 md:col-span-4 aspect-[16/9] md:aspect-auto"
              delay={0.08}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute left-5 bottom-5 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-2 text-[0.76rem] font-medium text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a1a]" />
                Organised by Funscholar
              </div>
            </Tile>
            <Tile
              src="/images/events/brl-story-2.jpg"
              alt="Students concentrating on their controllers mid-match"
              className="col-span-1 md:col-span-2 aspect-[4/3] md:aspect-auto"
              delay={0.14}
            />
            <Tile
              src="/images/events/brl-story-4.jpg"
              alt="A competition robot on the Robo-War arena"
              className="col-span-1 md:col-span-2 aspect-[4/3] md:aspect-auto"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* The Arenas */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="border-b border-white/10 py-4 overflow-hidden">
          <motion.div
            className="flex w-max whitespace-nowrap text-[0.74rem] font-semibold tracking-[0.22em] uppercase text-white/55"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          >
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i} className="flex items-center">
                <span className="px-6">{m}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a1a]" />
              </span>
            ))}
          </motion.div>
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full bg-[#ff6a1a]/[0.08] blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <motion.div {...reveal()}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.9rem] font-bold tracking-[-0.032em] leading-[1.14]">
              Three challenges.
              <span className="italic font-serif font-light text-gradient-orange pt-[0.14em] inline-block ml-3">
                One champion.
              </span>
            </h2>
          </motion.div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 lg:gap-5">
            {arenas.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.article
                  key={a.n}
                  {...reveal(i * 0.1)}
                  className="group relative rounded-[1.5rem] overflow-hidden aspect-[4/3] sm:aspect-[4/5] ring-1 ring-white/10 hover:ring-[#ff6a1a]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift-3"
                >
                  <Photo
                    src={a.image}
                    alt={a.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/25 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-black/50 backdrop-blur border border-white/15 px-3 py-1 text-[0.66rem] font-bold tracking-[0.16em] text-white/90">
                    {a.n}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff8a3a] to-[#e8530a] ring-1 ring-white/20 shadow-lift-1 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-bold">{a.title}</h3>
                    <p className="mt-1 italic font-serif text-[1.05rem] text-[#ff8a3a]">{a.tagline}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights gallery */}
      <section id="gallery" className="relative py-16 lg:py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...reveal()} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.9rem] font-bold tracking-[-0.032em] leading-[1.14] text-[#0a0a0a]">
                Moments from
                <span className="italic font-serif font-light text-gradient-orange pt-[0.14em] inline-block ml-3">
                  the floor.
                </span>
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 text-[#6b6b6b] text-[0.85rem]">
              <Camera className="w-4 h-4 text-[#ff6a1a]" strokeWidth={2} />
              Tap any photo to view it full size
            </span>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            {gallery.map((g, i) => (
              <motion.button
                key={g.src}
                type="button"
                onClick={() => setLightbox(i)}
                {...reveal((i % 4) * 0.06)}
                aria-label={`View photo: ${g.alt}`}
                className={`group relative overflow-hidden rounded-[1.1rem] md:rounded-[1.4rem] bg-[#f3efe9] shadow-elev-1 hover:shadow-lift-2 transition-shadow duration-500 ${
                  g.wide
                    ? "col-span-2 md:col-span-4 aspect-[16/9]"
                    : "col-span-1 md:col-span-2 aspect-[4/3] md:aspect-auto h-full"
                }`}
              >
                <Photo
                  src={g.src}
                  alt={g.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute right-3 bottom-3 w-9 h-9 rounded-full bg-white/90 text-[#0a0a0a] flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.2} />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Honours */}
      <section className="relative py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...reveal()}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.9rem] font-bold tracking-[-0.032em] leading-[1.14] text-[#0a0a0a]">
              Four trophies.
              <span className="italic font-serif font-light text-gradient-orange pt-[0.14em] inline-block ml-3">
                Earned on the floor.
              </span>
            </h2>
          </motion.div>

          <div className="mt-10 grid lg:grid-cols-12 gap-4 lg:gap-5">
            <Tile
              src="/images/events/brl-trophies.jpg"
              alt="The four Bharat Robotics League 2026 trophies on the presentation table"
              className="lg:col-span-7 aspect-[16/9]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
                {trophies.map((t, i) => (
                  <span
                    key={t}
                    className={`inline-flex items-center gap-1.5 rounded-full backdrop-blur-md border px-3 py-1.5 text-[0.74rem] font-semibold text-white ${
                      i === 0
                        ? "bg-[#ff6a1a]/90 border-[#ff8a3a]"
                        : "bg-white/10 border-white/20"
                    }`}
                  >
                    {i === 0 ? (
                      <Crown className="w-3.5 h-3.5" strokeWidth={2.2} />
                    ) : (
                      <Trophy className="w-3.5 h-3.5" strokeWidth={2.2} />
                    )}
                    {t}
                  </span>
                ))}
              </div>
            </Tile>
            <Tile
              src="/images/events/brl-unveil.jpg"
              alt="The Bharat Robotics League trophies being unveiled"
              className="lg:col-span-5 aspect-[16/9] lg:aspect-auto"
              delay={0.08}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute left-5 bottom-5 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-2 text-[0.76rem] font-medium text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a1a]" />
                The unveiling
              </div>
            </Tile>
          </div>

          <div className="mt-4 lg:mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {winners.map((w, i) => (
              <Tile
                key={w}
                src={w}
                alt="A winning team receiving their trophy from the organisers"
                className="aspect-[4/3]"
                delay={i * 0.08}
              />
            ))}
          </div>
          <motion.p {...reveal()} className="mt-5 text-center text-[#6b6b6b] text-[0.9rem]">
            The winning teams of Season 2026 with the Funscholar team.
          </motion.p>
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden min-h-[34rem] lg:min-h-[46rem] flex items-start">
        <Photo
          src="/images/events/brl-group.jpg"
          alt="Everyone at the Bharat Robotics League gathered around the arena"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 20%" }}
        />
        {/* The headline sits in the empty ceiling band above the crowd: darken only
            that band for legibility, and fade the floor edge into the footer. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 from-0% via-[#0a0a0a]/40 via-28% to-transparent to-52%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] from-0% to-transparent to-16%" />
        <div className="relative max-w-7xl mx-auto px-6 pt-12 lg:pt-20 text-center text-white w-full">
          <motion.div {...reveal()} className="drop-shadow-[0_2px_22px_rgba(0,0,0,0.6)]">
            <Eyebrow>Season 2026</Eyebrow>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-[3.2rem] font-bold tracking-[-0.032em] leading-[1.12] max-w-3xl mx-auto">
              One floor. One league.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Recap video */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Recap video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 z-[80] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[calc(85vh*9/16)] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-elev-4 ring-1 ring-white/10"
            >
              <video
                src="/videos/brl-recap.mp4"
                poster="/images/events/brl-recap-poster.jpg"
                controls
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[80] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
              }}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i === null ? i : (i + 1) % gallery.length));
              }}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.figure
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl"
            >
              <Photo
                src={gallery[lightbox].src}
                alt={gallery[lightbox].alt}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
                priority
              />
              <figcaption className="mt-4 text-center text-white/60 text-sm">
                {gallery[lightbox].alt}
                <span className="text-white/35"> · {lightbox + 1} / {gallery.length}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
