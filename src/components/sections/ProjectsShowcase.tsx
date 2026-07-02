"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button type="button" onClick={onOpen} className="text-left">
      <Card className="group h-full overflow-hidden rounded-[28px] border-[#a2cb8b]/12 bg-[#12180f] transition-colors hover:border-[#a2cb8b]/32 hover:bg-[#161d12]">
        <div className="relative border-b border-[#a2cb8b]/10 bg-[linear-gradient(180deg,_#12180f_0%,_#182013_100%)] p-4">
          <div className="absolute left-4 top-4 rounded-md border border-[#5b7e3c]/45 bg-[#5b7e3c]/12 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e8f5bd]">
            #{String(index + 1).padStart(2, "0")}
          </div>
          <div className="absolute right-4 top-4 rounded-full border border-[#a2cb8b]/18 bg-[#161d12] p-2 text-[#e8f5bd] transition-colors group-hover:border-[#e8f5bd]/35 group-hover:text-[#f7fbe8]">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
          <div className="relative min-h-[220px] overflow-hidden rounded-[20px] border border-[#a2cb8b]/8 bg-[#161d12]">
            <Image
              src={project.imageUrl ?? "/images/project-placeholder.svg"}
              alt={`${project.title} preview`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-[#f7fbe8]">{project.title}</CardTitle>
          <CardDescription className="line-clamp-3 text-[#e8f5bd]/70">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#a2cb8b]/20 bg-[#5b7e3c]/20 px-2 py-0.5 text-xs text-[#e8f5bd]"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);

  const activeProject =
    activeProjectIndex !== null ? projects[activeProjectIndex] : null;

  const screenshots = useMemo(() => {
    if (!activeProject) return [];
    if (activeProject.screenshots && activeProject.screenshots.length > 0) {
      return activeProject.screenshots;
    }
    if (activeProject.imageUrl) {
      return [activeProject.imageUrl];
    }
    return ["/images/project-placeholder.svg"];
  }, [activeProject]);

  useEffect(() => {
    if (activeProjectIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProjectIndex(null);
      }
      if (event.shiftKey && event.key === "ArrowRight" && projects.length > 1) {
        showNextProject();
        return;
      }
      if (event.shiftKey && event.key === "ArrowLeft" && projects.length > 1) {
        showPreviousProject();
        return;
      }
      if (event.key === "ArrowRight" && screenshots.length > 1) {
        setActiveScreenshotIndex((prev) => (prev + 1) % screenshots.length);
      }
      if (event.key === "ArrowLeft" && screenshots.length > 1) {
        setActiveScreenshotIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProjectIndex, projects.length, screenshots.length]);

  function openProject(index: number) {
    setActiveProjectIndex(index);
    setActiveScreenshotIndex(0);
  }

  function closeProject() {
    setActiveProjectIndex(null);
    setActiveScreenshotIndex(0);
  }

  function showPreviousProject() {
    if (projects.length === 0 || activeProjectIndex === null) return;
    setActiveProjectIndex(
      (prev) => ((prev ?? 0) - 1 + projects.length) % projects.length
    );
    setActiveScreenshotIndex(0);
  }

  function showNextProject() {
    if (projects.length === 0 || activeProjectIndex === null) return;
    setActiveProjectIndex((prev) => ((prev ?? 0) + 1) % projects.length);
    setActiveScreenshotIndex(0);
  }

  function showPreviousScreenshot() {
    setActiveScreenshotIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }

  function showNextScreenshot() {
    setActiveScreenshotIndex((prev) => (prev + 1) % screenshots.length);
  }

  return (
    <>
      <section id="projects" className="pb-20 pt-4">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#c44545]">
              03 - Selected Work
            </p>
            <h2 className="mt-3 text-4xl font-black text-[#f7fbe8] sm:text-5xl">
              Things I&apos;ve <span className="font-serif font-normal italic">built.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#e8f5bd]/72 sm:text-base">
            Projects spanning workflows, automation, business tooling, and
            showcase experiences. Click any card to open details and screenshots.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onOpen={() => openProject(index)}
            />
          ))}
        </div>
      </section>

      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/70 px-4 py-6 backdrop-blur-sm sm:px-6"
          onClick={closeProject}
        >
          <div
            className="mx-auto grid h-full w-full max-w-7xl overflow-hidden rounded-[30px] border border-[#a2cb8b]/12 bg-[#0f140c] lg:grid-cols-[1.45fr_0.95fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex min-h-[360px] flex-col border-b border-[#a2cb8b]/10 lg:min-h-0 lg:border-b-0 lg:border-r">
              <div className="relative flex-1 bg-[#151515]">
                <Image
                  src={screenshots[activeScreenshotIndex] ?? "/images/project-placeholder.svg"}
                  alt={`${activeProject.title} screenshot ${activeScreenshotIndex + 1}`}
                  fill
                  className="object-contain p-6"
                />

                {screenshots.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousScreenshot}
                      className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#a2cb8b]/12 bg-[#0f140c]/90 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextScreenshot}
                      className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#a2cb8b]/12 bg-[#0f140c]/90 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 right-4 rounded-md border border-[#a2cb8b]/12 bg-[#0f140c]/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#e8f5bd]">
                  {String(activeScreenshotIndex + 1).padStart(2, "0")} /{" "}
                  {String(screenshots.length).padStart(2, "0")}
                </div>
              </div>

              {screenshots.length > 1 && (
                <div className="flex gap-3 overflow-x-auto border-t border-[#a2cb8b]/10 bg-[#11170e] p-4">
                  {screenshots.map((screenshot, index) => (
                    <button
                      key={`${activeProject.slug}-${index}`}
                      type="button"
                      onClick={() => setActiveScreenshotIndex(index)}
                      className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border ${
                        index === activeScreenshotIndex
                          ? "border-[#c44545]"
                          : "border-[#a2cb8b]/10"
                      }`}
                    >
                      <Image
                        src={screenshot}
                        alt={`${activeProject.title} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex min-h-0 flex-col bg-[#0c100a]">
              <div className="flex items-center justify-between border-b border-[#a2cb8b]/10 px-6 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#c44545]">
                  Project • {String((activeProjectIndex ?? 0) + 1).padStart(2, "0")}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPreviousProject}
                    className="rounded-full border border-[#a2cb8b]/12 p-2 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextProject}
                    className="rounded-full border border-[#a2cb8b]/12 p-2 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={closeProject}
                    className="rounded-full border border-[#a2cb8b]/12 p-2 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <h3 className="text-4xl font-black text-[#f7fbe8]">
                  {activeProject.title}
                </h3>
                <p className="mt-6 leading-8 text-[#e8f5bd]/78">
                  {activeProject.longDescription ?? activeProject.description}
                </p>

                <div className="mt-8 border-t border-[#a2cb8b]/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#a2cb8b]/55">
                    Built With
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#a2cb8b]/20 bg-[#5b7e3c]/20 px-3 py-1 text-xs text-[#e8f5bd]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-[#a2cb8b]/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#a2cb8b]/55">
                    Links
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {activeProject.liveUrl && (
                      <Button
                        asChild
                        className="rounded-xl bg-[#c44545] text-[#f7fbe8] hover:bg-[#ad3d3d]"
                      >
                        <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          Visit Live <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {activeProject.repoUrl && (
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl border-[#a2cb8b]/20 bg-transparent text-[#e8f5bd] hover:bg-[#161d12]"
                      >
                        <a href={activeProject.repoUrl} target="_blank" rel="noopener noreferrer">
                          View Code <Github className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#a2cb8b]/10 px-6 py-4 text-[10px] uppercase tracking-[0.26em] text-[#a2cb8b]/55">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <span>Esc Close</span>
                  <span>&larr;/&rarr; Gallery</span>
                  <span>Shift + &larr;/&rarr; Project</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
