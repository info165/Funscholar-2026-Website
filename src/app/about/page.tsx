import AboutView from "@/components/AboutView";

export const metadata = {
  title: "About Us — Funscholar",
  description:
    "Funscholar has delivered 4,000 ATL labs and reached 4,000+ schools across 22 states since 2015. Our mission, values and the journey so far.",
};

// Thin server wrapper: the page itself is a client component, and Next ignores
// a metadata export from one of those.
export default function AboutPage() {
  return <AboutView />;
}
