export const SITE_CONFIG = {
  name: "Jeremiah Ecija",
  title: "Jeremiah Ecija — Full-Stack Developer",
  description:
    "Portfolio of Jeremiah Ecija, a full-stack developer building modern web systems.",
  url: "https://je-portfolio-v1.vercel.app/",
  email: "jeremiah.ecija04@gmail.com",
  social: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
  },
};

export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE_CONFIG.email)}`;
export const NAV_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#tech-stack", label: "Tech Stack" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];
