import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[#a2cb8b]/15 bg-[#12180f]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 text-sm text-[#a2cb8b] sm:px-6">
        <p>
          © {new Date().getFullYear()} {SITE_CONFIG.name}
        </p>
        <div className="flex gap-4">
          <a
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#e8f5bd]"
          >
            GitHub
          </a>
          <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#e8f5bd]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
