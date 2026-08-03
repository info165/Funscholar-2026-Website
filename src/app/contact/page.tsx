"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const details = [
  { icon: Mail, label: "Email", value: "info@funscholar.com" },
  { icon: Phone, label: "Phone", value: "+91-9589587054" },
  { icon: MapPin, label: "Headquarters", value: "Kolkata, India" },
];

const FIELD_BASE =
  "w-full px-4 py-3.5 rounded-xl bg-white border text-[#0a0a0a] placeholder:text-[#b8b8b8] focus:ring-2 focus:outline-none transition-all duration-300";
const FIELD_OK = "border-black/10 focus:border-[#ff6a1a] focus:ring-[#ff6a1a]/15";
const FIELD_ERR = "border-[#e11d48] focus:border-[#e11d48] focus:ring-[#e11d48]/15";

const fieldClass = (invalid: boolean) => `${FIELD_BASE} ${invalid ? FIELD_ERR : FIELD_OK}`;

const labelClass = "block text-sm text-[#4b4b4b] mb-2";

/** Inline validation note — slides open under its field and out again. */
function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          key="err"
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <span className="flex items-center gap-1.5 pt-2 text-[0.8rem] text-[#e11d48]">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {message}
          </span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** All four fields are required; email additionally has to look like one. */
function validate(values: Record<string, string>) {
  const errors: Record<string, string> = {};
  if (!values.name?.trim()) errors.name = "Please enter your full name.";
  if (!values.email?.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "That doesn't look like a valid email.";
  if (!values.organization?.trim()) errors.organization = "Please enter your school or organization.";
  if (!values.message?.trim()) errors.message = "Please tell us how we can help.";
  return errors;
}

function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        backgroundImage: "radial-gradient(circle, #ff6a1a 1.5px, transparent 1.5px)",
        backgroundSize: "14px 14px",
      }}
    />
  );
}

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Clear the success note after a few seconds so it doesn't linger.
  // Errors stay put — those need to be read and acted on.
  useEffect(() => {
    if (status !== "sent") return;
    const timer = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  /** Drop a field's error the moment it becomes valid, without waiting for submit. */
  function clearWhenFixed(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const stillInvalid =
        !value.trim() || (name === "email" && !EMAIL_RE.test(value.trim()));
      if (stillInvalid) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const errors = validate(data);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("idle");
      setError("");
      // Send focus to the first problem so keyboard users aren't stranded.
      form.querySelector<HTMLElement>(`[name="${Object.keys(errors)[0]}"]`)?.focus();
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    setError("");

    try {
      // Handled by functions/api/contact.ts, a Cloudflare Pages Function. The
      // pages around it are static files; only this endpoint runs code, because
      // the Resend key must never reach the browser.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Parsed separately from the fetch: a non-JSON body means the endpoint
      // isn't there at all, which is a different problem from the request
      // failing, and blaming the visitor's connection for it sends them chasing
      // the wrong thing. Happens under `next dev`, where Pages Functions don't
      // run — use `npm run preview` to exercise this path locally.
      let json: { ok?: boolean; error?: string } | null = null;
      try {
        json = await res.json();
      } catch {
        console.error(`[contact] non-JSON response from /api/contact (${res.status})`);
        setError("The form isn't available right now. Please email us directly.");
        setStatus("error");
        return;
      }

      if (!res.ok || !json?.ok) {
        setError(json?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <main className="bg-[#fdfaf7]">

      <section className="relative pt-32 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
        {/* Ambient decoration */}
        <div className="absolute -top-24 -left-40 w-[30rem] h-[30rem] rounded-full border border-[#ff6a1a]/[0.07] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[26rem] h-[26rem] bg-[#ff6a1a]/[0.05] rounded-full blur-[110px] pointer-events-none" />
        <DotGrid className="absolute bottom-20 left-4 w-40 h-52 opacity-[0.18]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left — heading + details */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-[-0.035em] leading-[1.08] text-[#0a0a0a]">
                Let&apos;s build something
                <br />
                <span className="italic font-serif font-light text-gradient-orange pt-[0.14em] pb-[0.2em] inline-block">
                  meaningful together.
                </span>
              </h1>

              <div className="mt-9 space-y-3.5 max-w-lg">
                {details.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <motion.div
                      key={d.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/[0.06] shadow-elev-1 hover:border-[#ff6a1a]/30 hover:shadow-lift-1 transition-all duration-400"
                    >
                      <span className="w-12 h-12 shrink-0 rounded-xl bg-[#fff1e6] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#ffe2cb]">
                        <Icon className="w-5 h-5 text-[#ff6a1a]" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-[#8a8a8a]">
                          {d.label}
                        </div>
                        <div className="mt-0.5 text-[#0a0a0a] text-[0.95rem]">{d.value}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right — form + promises */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl bg-white border border-black/[0.05] shadow-elev-3 p-7 sm:p-9 lg:p-10 overflow-hidden"
              >
                <DotGrid className="absolute top-8 right-8 w-24 h-14 opacity-30" />

                {/* Card header */}
                <div className="relative flex items-center gap-4 mb-8">
                  <span className="w-14 h-14 shrink-0 rounded-full bg-[#fff1e6] flex items-center justify-center">
                    <Send className="w-6 h-6 text-[#ff6a1a]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl lg:text-[1.85rem] font-bold tracking-[-0.02em] text-[#0a0a0a]">
                      Send us a message
                    </h2>
                    <p className="mt-1 text-[#6b6b6b] text-sm">
                      We&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                </div>

                {/* noValidate: the browser's native bubbles are off-brand, so
                    validation is handled inline instead. */}
                <form className="relative space-y-5" onSubmit={handleSubmit} noValidate>
                  {/* Honeypot. "botcheck" is the field name Web3Forms rejects
                      on their side, so a filled one never reaches the inbox.
                      Positioned off-screen rather than display:none, since some
                      bots skip hidden inputs but not positioned ones. */}
                  <div className="absolute -left-[9999px] top-0 w-px h-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="botcheck">Leave this empty</label>
                    <input
                      id="botcheck"
                      name="botcheck"
                      type="checkbox"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full Name <span className="text-[#ff6a1a]">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        maxLength={120}
                        onChange={clearWhenFixed}
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        className={fieldClass(!!fieldErrors.name)}
                        placeholder="Your full name"
                      />
                      <FieldError id="name-error" message={fieldErrors.name} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address <span className="text-[#ff6a1a]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        maxLength={190}
                        onChange={clearWhenFixed}
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        className={fieldClass(!!fieldErrors.email)}
                        placeholder="Your email address"
                      />
                      <FieldError id="email-error" message={fieldErrors.email} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="organization" className={labelClass}>
                      School / Organization <span className="text-[#ff6a1a]">*</span>
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      maxLength={190}
                      onChange={clearWhenFixed}
                      aria-invalid={!!fieldErrors.organization}
                      aria-describedby={fieldErrors.organization ? "organization-error" : undefined}
                      className={fieldClass(!!fieldErrors.organization)}
                      placeholder="Institution name"
                    />
                    <FieldError id="organization-error" message={fieldErrors.organization} />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message <span className="text-[#ff6a1a]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      maxLength={5000}
                      onChange={clearWhenFixed}
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      className={`${fieldClass(!!fieldErrors.message)} resize-y`}
                      placeholder="How can we help you?"
                    />
                    <FieldError id="message-error" message={fieldErrors.message} />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group/btn w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff7a24] to-[#f25c07] text-white font-semibold cursor-pointer shadow-[0_18px_38px_-16px_rgba(242,92,7,0.75)] hover:shadow-[0_22px_46px_-16px_rgba(242,92,7,0.9)] transition-shadow duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <Loader2 className="w-[1.05rem] h-[1.05rem] animate-spin" />
                    ) : (
                      <Send className="w-[1.05rem] h-[1.05rem] transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    )}
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </button>

                  {/* Live region so the outcome is announced, not just shown. */}
                  <p aria-live="polite" className="min-h-[1.25rem] text-sm">
                    {status === "sent" && (
                      <span className="inline-flex items-center gap-2 text-[#15803d]">
                        <CheckCircle2 className="w-4 h-4" />
                        Thanks — your message has reached us.
                      </span>
                    )}
                    {status === "error" && (
                      <span className="inline-flex items-center gap-2 text-[#e11d48]">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </span>
                    )}
                  </p>
                </form>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
