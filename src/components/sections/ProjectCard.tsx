import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Project } from "@/types";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="group h-full overflow-hidden rounded-[28px] border-[#a2cb8b]/12 bg-[#12180f] transition-colors hover:border-[#a2cb8b]/32 hover:bg-[#161d12]">
        <div className="relative border-b border-[#a2cb8b]/10 bg-[linear-gradient(180deg,_#12180f_0%,_#182013_100%)] p-4">
          <div className="absolute left-4 top-4 rounded-md border border-[#5b7e3c]/45 bg-[#5b7e3c]/12 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e8f5bd]">
            #{String(index + 1).padStart(2, "0")}
          </div>
          <div className="absolute right-4 top-4 rounded-full border border-[#a2cb8b]/18 bg-[#161d12] p-2 text-[#e8f5bd] transition-colors group-hover:border-[#e8f5bd]/35 group-hover:text-[#f7fbe8]">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
          <div className="flex min-h-[220px] items-center justify-center rounded-[20px] border border-[#a2cb8b]/8 bg-[#161d12]">
            <div className="text-center">
              <p className="text-3xl font-black uppercase tracking-tight text-[#f7fbe8]">
                {project.title.split(" ")[0]}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.26em] text-[#a2cb8b]/65">
                Project Preview
              </p>
            </div>
          </div>
        </div>
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-[#f7fbe8]">
            {project.title}
          </CardTitle>
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
    </Link>
  );
}
