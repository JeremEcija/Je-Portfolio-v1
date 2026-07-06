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
import { ConfidentialProjectNotice } from "@/components/sections/ConfidentialProjectNotice";
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
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={closeProject}
        >
          <div
            className="mx-auto flex h-[100dvh] w-full max-w-7xl flex-col overflow-y-auto bg-[#0f140c] sm:my-4 sm:h-[calc(100dvh-2rem)] sm:overflow-hidden sm:rounded-[30px] sm:border sm:border-[#a2cb8b]/12 lg:grid lg:grid-cols-[1.45fr_0.95fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 flex-col border-b border-[#a2cb8b]/10 lg:min-h-0 lg:border-b-0 lg:border-r">
              <div className="relative h-[220px] bg-[#151515] sm:h-[280px] lg:h-auto lg:min-h-0 lg:flex-1">
                <Image
                  src={screenshots[activeScreenshotIndex] ?? "/images/project-placeholder.svg"}
                  alt={`${activeProject.title} screenshot ${activeScreenshotIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-contain p-3 sm:p-6"
                />

                {screenshots.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousScreenshot}
                      className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#a2cb8b]/12 bg-[#0f140c]/90 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30 sm:left-4 sm:h-11 sm:w-11"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextScreenshot}
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#a2cb8b]/12 bg-[#0f140c]/90 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30 sm:right-4 sm:h-11 sm:w-11"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 rounded-md border border-[#a2cb8b]/12 bg-[#0f140c]/90 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#e8f5bd] sm:bottom-4 sm:right-4 sm:px-3 sm:text-xs">
                  {String(activeScreenshotIndex + 1).padStart(2, "0")} /{" "}
                  {String(screenshots.length).padStart(2, "0")}
                </div>
              </div>

              {screenshots.length > 1 && (
                <div className="flex gap-2 overflow-x-auto border-t border-[#a2cb8b]/10 bg-[#11170e] p-3 sm:gap-3 sm:p-4">
                  {screenshots.map((screenshot, index) => (
                    <button
                      key={`${activeProject.slug}-${index}`}
                      type="button"
                      onClick={() => setActiveScreenshotIndex(index)}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border sm:h-20 sm:w-28 ${
                        index === activeScreenshotIndex
                          ? "border-[#c44545]"
                          : "border-[#a2cb8b]/10"
                      }`}
                    >
                      <Image
                        src={screenshot}
                        alt={`${activeProject.title} thumbnail ${index + 1}`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex min-h-0 flex-col bg-[#0c100a] lg:overflow-hidden">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#a2cb8b]/10 bg-[#0c100a] px-4 py-3 sm:px-6 sm:py-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#c44545] sm:text-xs sm:tracking-[0.32em]">
                  Project • {String((activeProjectIndex ?? 0) + 1).padStart(2, "0")}
                </p>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={showPreviousProject}
                    className="rounded-full border border-[#a2cb8b]/12 p-1.5 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30 sm:p-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextProject}
                    className="rounded-full border border-[#a2cb8b]/12 p-1.5 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30 sm:p-2"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={closeProject}
                    className="rounded-full border border-[#a2cb8b]/12 p-1.5 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30 sm:p-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:overflow-y-auto">
                <h3 className="text-2xl font-black text-[#f7fbe8] sm:text-3xl lg:text-4xl">
                  {activeProject.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#e8f5bd]/78 sm:mt-6 sm:text-base sm:leading-8">
                  {activeProject.longDescription ?? activeProject.description}
                </p>

                <div className="mt-6 border-t border-[#a2cb8b]/10 pt-5 sm:mt-8 sm:pt-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#a2cb8b]/55">
                    Built With
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
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

                <div className="mt-6 border-t border-[#a2cb8b]/10 pt-5 sm:mt-8 sm:pt-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#a2cb8b]/55">
                    Links
                  </p>
                  <div className="mt-3 sm:mt-4">
                    {activeProject.confidential ? (
                      <ConfidentialProjectNotice project={activeProject} />
                    ) : (
                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        {activeProject.liveUrl && (
                          <Button
                            asChild
                            className="h-11 w-full rounded-xl bg-[#c44545] text-[#f7fbe8] hover:bg-[#ad3d3d] sm:w-auto"
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
                            className="h-11 w-full rounded-xl border-[#a2cb8b]/20 bg-transparent text-[#e8f5bd] hover:bg-[#161d12] sm:w-auto"
                          >
                            <a href={activeProject.repoUrl} target="_blank" rel="noopener noreferrer">
                              View Code <Github className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden border-t border-[#a2cb8b]/10 px-6 py-4 text-[10px] uppercase tracking-[0.26em] text-[#a2cb8b]/55 sm:block">
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
