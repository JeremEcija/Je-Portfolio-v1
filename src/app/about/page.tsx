import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { formatDateRange } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="py-16">
      <h1 className="text-3xl font-bold">About Me</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Write a couple of paragraphs about your background, what you care
        about, and what kind of work you're looking for. Replace this
        placeholder text with your real bio.
      </p>

      <h2 className="mt-12 text-xl font-semibold">Experience</h2>
      <ul className="mt-4 space-y-6">
        {experience.map((item) => (
          <li key={`${item.company}-${item.role}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="font-medium">
                {item.role} · {item.company}
              </h3>
              <span className="text-sm text-muted-foreground">
                {formatDateRange(item.startDate, item.endDate)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
