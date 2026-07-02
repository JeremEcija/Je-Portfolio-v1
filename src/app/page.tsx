import { ContactCta } from "@/components/sections/ContactCta";
import { Hero } from "@/components/sections/Hero";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { TechStack } from "@/components/sections/TechStack";
import { projects } from "@/data/projects";

export default function HomePage() {
  const showcasedProjects = projects;

  return (
    <>
      <Hero />
      <TechStack />
      <ProjectsShowcase projects={showcasedProjects} />
      <ContactCta />
    </>
  );
}
