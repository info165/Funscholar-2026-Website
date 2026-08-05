import Hero from "@/components/Hero";
import SchoolSolutions from "@/components/SchoolSolutions";
import TrustedPartner from "@/components/TrustedPartner";
// Hidden until there is a real testimonial to show — the section currently
// holds placeholder copy. Restore by uncommenting both this and <Testimonials />
// below; the component itself is untouched.
// import Testimonials from "@/components/Testimonials";

export const metadata = {
  title: "Funscholar — Experiential Learning, Robotics & AI for Schools",
  description: "Funscholar - Transforming Education With Technology",
};

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <SchoolSolutions />
      <TrustedPartner />
      {/* <Testimonials /> */}
    </main>
  );
}
