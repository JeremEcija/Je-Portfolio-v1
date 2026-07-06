import { Project } from "@/types";

// Edit this array to add/remove/update your projects.
// Every page that lists or displays projects reads from here.
export const projects: Project[] = [
  {
    slug: "delicious-ordering-system",
    title: "Ordering System",
    description: "A sleek, responsive restaurant landing page featuring an interactive slide-out ordering menu.",
    longDescription: "Delicious is a modern front-end restaurant application designed to showcase a premium dining experience. It features a fully responsive design, custom menu filtering for 'Best Sellers' and 'Set Meals', and a dynamic, client-side slide-out cart panel that tracks user selections in real time. Built with performance and clean aesthetics in mind, this project demonstrates smooth UI interactions and modular component architecture.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    imageUrl: "/images/ordering/ord-1.png",
    screenshots: [
      "/images/ordering/ord-1.png",
      "/images/ordering/ord-2.png",
      "/images/ordering/ord-3.png",
      "/images/ordering/ord-4.png",
    ],
    liveUrl: "https://ordering-system-ruddy-mu.vercel.app/",
    featured: false,
  },
  {
    slug: "alumhub-alumni-engagement-system",
    title: "AlumHub (Capstone Project)",
    description: "A centralized alumni tracking and career opportunity web application built for Cavite State University - CCAT Campus.",
    longDescription:
      "AlumHub is a comprehensive web application developed for the Department of Computer Studies to enhance alumni engagement and monitor graduate employability. The platform bridges the gap between the institution and its graduates by offering an interactive community forum for real-time job postings, a student engagement leaderboard, and dynamic profile management. For administrators, the system features an analytical reporting dashboard tracking employment statistics alongside integrated email and SMS blast modules to seamlessly distribute surveys and department updates.",
    tags: ["HTML", "CSS", "JavaScript", "Firebase"],
    confidential: false,
    confidentialNotice:
      "AlumHub is covered by a non-disclosure agreement. Live demos, source code, and detailed project information cannot be shared publicly.",
    imageUrl: "/images/alumhub/alum-1.png",
    screenshots: [
      "/images/alumhub/alum-1.png",
      "/images/alumhub/alum-2.png",
      "/images/alumhub/alum-3.png",
      "/images/alumhub/alum-4.png",
      "/images/alumhub/alum-5.png",
      "/images/alumhub/alum-6.png",
      "/images/alumhub/alum-7.png",
    ],
    featured: false,
    
  },
  {
    slug: "projecttrack-management-system",
    title: "Project Tracker",
    description: "A centralized department-level project management platform featuring active progress tracking, task delegation, and team discussions.",
    longDescription: "ProjectTrack is a collaborative workspace application built to monitor, manage, and distribute project tasks across internal departments. The platform provides administrators and team members with an aggregate analytics dashboard highlighting total workloads, pending items, and active bottleneck warnings. It supports fine-grained task management workflows, including dynamic task reassignments via an inline transfer modal, status tracking indicators (pending, in-progress, overdue, declined), and contextual item-by-item team chat boards to foster real-time collaboration.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    confidential: true,
    confidentialNotice:
      "Project Tracker is covered by a non-disclosure agreement. Live demos, source code, and detailed project information cannot be shared publicly.",
    imageUrl: "/images/project-tracker/proj-1.png",
    screenshots: [
      "/images/project-tracker/proj-1.png",
      "/images/project-tracker/proj-2.png",
      "/images/project-tracker/proj-3.png",
      "/images/project-tracker/proj-4.png",
      "/images/project-tracker/proj-5.png"
    ],
    featured: false,
  },
  {
    slug:"purchasing-and-inventory-management-system",
    title:"Purchasing & Inventory Management System",
    description: "An enterprise-grade procurement and stock tracking system designed to bridge departmental material requests with warehouse operations.",
    longDescription: "This is a full-scale Purchasing and Inventory System developed to streamline stock tracking, supplier coordination, and cross-departmental supply chains. The application allows individual departments to submit specialized Material Requests for physical assets or recipe ingredients, which are routed directly to the warehouse department for fulfillment or procurement. It features a robust multi-role portal and an automated reporting engine capable of generating audited insights—including Receiving Reports (RR), Asset Tagging, Inventory Counts, and comprehensive Vendor Purchase metrics.",
    tags: ["Laravel", "Blade","Javascript", "Axios","Tailwind CSS", "MySQL", "Hostinger"],
    confidential: true,
    confidentialNotice:
      "Purchasing & Inventory Management System is covered by a non-disclosure agreement. Live demos, source code, and detailed project information cannot be shared publicly.",
    imageUrl: "/images/inv-po/inv.png",
    screenshots: [
      "/images/inv-po/inv.png",
    ],
    featured: true,
  },

];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
