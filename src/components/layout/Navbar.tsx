"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-20">
      <nav className="relative mx-auto mt-4 max-w-7xl rounded-full border border-[#a2cb8b]/20 bg-[#182013]/80 px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.28)] backdrop-blur sm:px-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8f5bd]"
            onClick={closeMenu}
          >
            {SITE_CONFIG.name}
          </Link>

          <ul className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.2em] text-[#a2cb8b] md:flex">
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

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="rounded-full border border-[#a2cb8b]/20 p-2 text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/35 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div
            id="mobile-nav-menu"
            className="absolute left-0 right-0 top-[calc(100%+0.75rem)] overflow-hidden rounded-2xl border border-[#a2cb8b]/20 bg-[#12180f]/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-[0.2em] text-[#a2cb8b] transition-colors hover:bg-[#1b2416] hover:text-[#e8f5bd]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
