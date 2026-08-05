import ProjectsView from "@/components/ProjectsView";

export const metadata = {
  title: "Our Works — Funscholar",
  description:
    "See Funscholar's work inside schools — robotics labs, smart classrooms and STEM programmes at DPS Ruby Park, B.D.M International, The Newtown School and more.",
};

// Thin server wrapper: the page itself is a client component, and Next ignores
// a metadata export from one of those.
export default function ProjectsPage() {
  return <ProjectsView />;
}
