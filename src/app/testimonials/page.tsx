import Testimonials from "@/components/Testimonials";

// Description deliberately omitted until the testimonial video is in place —
// the section still holds placeholder copy, and describing it would only help
// search engines surface a page that is not ready. Add one then.
export const metadata = {
  title: "Testimonials — Funscholar",
};

// No "use client" here — Testimonials carries its own directive, and a client
// page cannot export metadata.
export default function TestimonialsPage() {
  return (
    <main>
      {/* Extra top padding clears the fixed header — the shared section is
          spaced for mid-page use on the homepage. */}
      <div className="pt-16 lg:pt-20">
        <Testimonials />
      </div>
    </main>
  );
}
