import ContactView from "@/components/ContactView";

export const metadata = {
  title: "Contact Us — Funscholar",
  description:
    "Talk to Funscholar about robotics labs, ATL setup, smart classrooms or teacher training for your school. Based in Kolkata, working across India.",
};

// Thin server wrapper: the page itself is a client component, and Next ignores
// a metadata export from one of those.
export default function ContactPage() {
  return <ContactView />;
}
