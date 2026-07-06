import { JeSectionMarker } from "@/components/je/JeSectionMarker";

type StackItem = {
  label: string;
  icon?: string;
};

const stackGroups: {
  id: string;
  title: string;
  items: StackItem[];
}[] = [
  {
    id: "01",
    title: "Languages & Frameworks",
    items: [
      { label: "Laravel", icon: "/images/stack/laravel.svg" },
      { label: "React.js", icon: "/images/stack/react.svg" },
      { label: "Vue.js", icon: "/images/stack/vue.svg" },
      { label: "Tailwind CSS", icon: "/images/stack/tailwindcss.svg" },
      { label: "Bootstrap", icon: "/images/stack/bootstrap.svg" },
      { label: "PHP", icon: "/images/stack/php.svg" },
      { label: "Java", icon: "/images/stack/javascript.svg" },
      { label: "Javascript", icon: "/images/stack/javascript.svg" },
      { label: "Node.js", icon: "/images/stack/nodejs.svg" },
      { label: "Typescript", icon: "/images/stack/typescript.svg" },
    ],
  },
  {
    id: "02",
    title: "Databases, Tools & Platforms",
    items: [
      { label: "MySQL", icon: "/images/stack/mysql.svg" },
      { label: "PostgreSQL", icon: "/images/stack/postgresql.svg" },
      { label: "Firebase", icon: "/images/stack/firebase.svg" },
      { label: "Supabase", icon: "/images/stack/supabase.svg" },
      { label: "Git", icon: "/images/stack/git.svg" },
      { label: "GitHub", icon: "/images/stack/github.svg" },
      { label: "Vercel", icon: "/images/stack/vercel.svg" },
      { label: "shadcn/ui", icon: "/images/stack/shadcnui.svg" },
      { label: "Figma", icon: "/images/stack/figma.svg" },
      { label: "Canva", icon: "/images/stack/canvas.svg" },
    ],
  },
];

const totalTechnologies = stackGroups.reduce(
  (sum, group) => sum + group.items.length,
  0
);

function StackCard({
  item,
  compact = false,  
}: {
  item: StackItem;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border border-[#a2cb8b]/12 bg-[#161d12] transition-colors hover:border-[#a2cb8b]/30 hover:bg-[#1b2416] ${
        compact ? "min-h-20 p-3" : "min-h-28 p-4"
      }`}
    >
      {item.icon ? (
        <span
          aria-hidden="true"
          className={`block bg-[#e8f5bd] ${
            compact ? "h-7 w-7" : "h-9 w-9"
          }`}
          style={{
            WebkitMaskImage: `url(${item.icon})`,
            maskImage: `url(${item.icon})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      ) : (
        <div
          className={`rounded-full bg-[#5b7e3c]/30 ${
            compact ? "h-2 w-2" : "h-3 w-3"
          }`}
        />
      )}

      <span
        className={`font-medium uppercase tracking-[0.16em] text-[#e8f5bd]/78 ${
          compact ? "text-[11px]" : "text-sm"
        }`}
      >
        {item.label}
      </span>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="tech-stack" className="pb-20 pt-4">
      <JeSectionMarker stop="tech-stack" title="Checkpoint 02" />
      <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#c44545]">
            02 - Toolkit
          </p>
          <h2 className="mt-3 text-4xl font-black text-[#f7fbe8] sm:text-5xl">
            Tech' Stack
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[#e8f5bd]/72 sm:text-base">
          {totalTechnologies} technologies across languages, frameworks, databases,
          tools, and platforms.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        {stackGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-[28px] border border-[#a2cb8b]/12 bg-[#12180f] p-5 sm:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="rounded-md border border-[#5b7e3c]/50 bg-[#5b7e3c]/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e8f5bd]">
                  {group.id}
                </span>
                <h3 className="text-lg font-semibold text-[#f7fbe8]">
                  {group.title}
                </h3>
              </div>
              <span className="text-sm text-[#a2cb8b]/55">
                {group.items.length}
              </span>
            </div>

            <div
              className={`grid gap-3 ${
                group.id === "01"
                  ? "grid-cols-3 sm:grid-cols-4"
                  : "grid-cols-2 sm:grid-cols-3"
              }`}
            >
              {group.items.map((item) => (
                <StackCard
                  key={item.label}
                  item={item}
                  compact={group.id === "01"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
