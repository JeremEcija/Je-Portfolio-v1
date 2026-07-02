import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20">
      <nav className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full border border-[#a2cb8b]/20 bg-[#182013]/80 px-5 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.28)] backdrop-blur">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8f5bd]"
        >
          {SITE_CONFIG.name}
        </Link>
        <ul className="flex gap-4 text-xs font-medium uppercase tracking-[0.2em] text-[#a2cb8b] sm:gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-[#e8f5bd]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
