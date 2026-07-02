import { Project } from "@/types";

// Edit this array to add/remove/update your projects.
// Every page that lists or displays projects reads from here.
export const projects: Project[] = [
  {
    slug: "example-project-one",
    title: "Example Project One",
    description: "A short one-liner describing what this project does.",
    longDescription:
      "A longer explanation of the problem this project solves, the stack used, and what you're proud of about it. Replace this with your real project details.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    imageUrl: "/images/project-placeholder.svg",
    screenshots: [
      "/images/project-placeholder.svg",
      "/images/project-placeholder.svg",
      "/images/project-placeholder.svg",
    ],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/your-username/example-project-one",
    featured: true,
  },
  {
    slug: "example-project-two",
    title: "Example Project Two",
    description: "Another short description of a second project.",
    longDescription:
      "Details about the second project go here. Explain the tech stack, your role, and any interesting challenges you solved.",
    tags: ["React", "Node.js", "PostgreSQL"],
    imageUrl: "/images/project-placeholder.svg",
    screenshots: [
      "/images/project-placeholder.svg",
      "/images/project-placeholder.svg",
    ],
    repoUrl: "https://github.com/your-username/example-project-two",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
