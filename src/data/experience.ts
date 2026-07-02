import { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    role: "Your Job Title",
    company: "Company Name",
    startDate: "2024",
    endDate: undefined, // undefined renders as "Present"
    summary: "One or two sentences about what you did in this role.",
  },
  {
    role: "Previous Job Title",
    company: "Previous Company",
    startDate: "2022",
    endDate: "2024",
    summary: "One or two sentences about this role.",
  },
];
