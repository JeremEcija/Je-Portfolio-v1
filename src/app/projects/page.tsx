import type { Metadata } from "next";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <section className="py-16">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
