import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn/ui's standard class-merging helper.
// Combines conditional classes (clsx) and resolves Tailwind conflicts (twMerge),
// e.g. cn("px-2", condition && "px-4") correctly keeps only "px-4".
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(start: string, end?: string) {
  return `${start} — ${end ?? "Present"}`;
}
