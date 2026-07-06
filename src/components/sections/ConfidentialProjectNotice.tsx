import { Lock } from "lucide-react";
import { Project } from "@/types";

export function getConfidentialNotice(project: Project): string {
  return (
    project.confidentialNotice ??
    `${project.title} is covered by a non-disclosure agreement. Live demos, source code, and detailed project information cannot be shared publicly.`
  );
}

export function ConfidentialProjectNotice({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-[#a2cb8b]/15 bg-[#161d12] px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 shrink-0 text-[#c44545]" />
        <p className="text-sm font-semibold text-[#f7fbe8]">Confidential Project</p>
      </div>
      <p className="mt-3 text-sm leading-7 text-[#e8f5bd]/78">
        {getConfidentialNotice(project)}
      </p>
    </div>
  );
}
