import Hero from "@/components/Hero";
import SchoolSolutions from "@/components/SchoolSolutions";
import TrustedPartner from "@/components/TrustedPartner";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <SchoolSolutions />
      <TrustedPartner />
      <Testimonials />
    </main>
  );
}
