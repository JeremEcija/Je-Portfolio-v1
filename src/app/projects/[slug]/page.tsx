import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfidentialProjectNotice } from "@/components/sections/ConfidentialProjectNotice";
import { getProjectBySlug, projects } from "@/data/projects";

interface Props {
  params: { slug: string };
}

// Pre-render every project page at build time.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-16">
      <h1 className="text-3xl font-bold">{project!.title}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        {project!.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        {project!.longDescription ?? project!.description}
      </p>
      <div className="mt-8">
        {project!.confidential ? (
          <ConfidentialProjectNotice project={project!} />
        ) : (
          <div className="flex gap-4">
            {project!.liveUrl && (
              <Button asChild>
                <a href={project!.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Site
                </a>
              </Button>
            )}
            {project!.repoUrl && (
              <Button asChild variant="outline">
                <a href={project!.repoUrl} target="_blank" rel="noopener noreferrer">
                  View Code
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
