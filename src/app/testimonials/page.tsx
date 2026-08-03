"use client";

import Testimonials from "@/components/Testimonials";

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
