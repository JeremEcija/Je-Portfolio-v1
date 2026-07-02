import { Github, Linkedin, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const contactLinks = [
  {
    label: "GitHub",
    href: SITE_CONFIG.social.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: SITE_CONFIG.social.linkedin,
    icon: Linkedin,
  },
  {
    label: "Gmail",
    href: `mailto:${SITE_CONFIG.email}`,
    icon: Mail,
  },
];

export function ContactCta() {
  return (
    <section id="contact" className="pb-24 pt-6">
      <div className="border-y border-[#a2cb8b]/10 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#c44545]">
            04 - Contact
          </p>
          <h2 className="mt-5 text-5xl font-black text-[#f7fbe8] sm:text-6xl lg:text-7xl">
            Let&apos;s Create{" "}
            <span className="font-serif font-normal italic">something.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#e8f5bd]/72 sm:text-lg">
            Open to freelance, part-time, and side projects worth losing sleep
            over.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {contactLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-[#a2cb8b]/12 bg-[#161d12] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#e8f5bd] transition-colors hover:border-[#a2cb8b]/30 hover:bg-[#1b2416]"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
