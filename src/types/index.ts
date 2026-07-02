export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageUrl?: string;
  screenshots?: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  startDate: string;
  endDate?: string; // omit for "Present"
  summary: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
