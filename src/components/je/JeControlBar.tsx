"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { JE_STOPS, useJeNavigator } from "@/components/je/JeNavigatorContext";
import { JeSprite } from "@/components/je/JeSprite";

const STOP_LABELS: Record<(typeof JE_STOPS)[number], string> = {
  home: "Hero",
  "tech-stack": "Tech Stack",
  projects: "Projects",
  contact: "Contact",
};

const STOP_SHORT_LABELS: Record<(typeof JE_STOPS)[number], string> = {
  home: "Hero",
  "tech-stack": "Stack",
  projects: "Projects",
  contact: "Contact",
};

type JeControlBarProps = {
  variant?: "hero" | "section";
  title?: string;
  spriteSize?: "sm" | "md";
};

export function JeControlBar({
  variant = "section",
  title,
  spriteSize = "sm",
}: JeControlBarProps) {
  const {
    active,
    activate,
    moveToHome,
    moveToNext,
    nextStop,
    scrollDrift,
    step,
    travelDirection,
    travelPhase,
    walking,
  } = useJeNavigator();

  const isHero = variant === "hero";
  const isReturnAction = !nextStop;
  const ActionIcon = isReturnAction ? ArrowUp : ArrowDown;

  const handleJeClick = () => {
    if (!active) {
      activate();
      return;
    }

    if (!walking && nextStop) {
      moveToNext();
      return;
    }

    if (!walking && !nextStop) {
      moveToHome();
    }
  };

  const handleActionClick = () => {
    if (!active) {
      activate();
      return;
    }

    if (nextStop) {
      moveToNext();
      return;
    }

    moveToHome();
  };

  const helperText = !active
    ? "Tap JE to start"
    : nextStop
      ? "Tap JE to continue"
      : "Tap JE to return home";

  const actionLabel = nextStop
    ? `Go ${STOP_LABELS[nextStop]}`
    : "Back to Hero";
  const actionShortLabel = nextStop
    ? STOP_SHORT_LABELS[nextStop]
    : "Hero";

  return (
    <div
      className={
        isHero
          ? "w-full max-w-full sm:w-auto"
          : "mb-5 w-full max-w-full"
      }
    >
      <div className="flex w-full flex-col gap-3 rounded-2xl border border-[#a2cb8b]/14 bg-[#12180f]/92 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.18)] sm:inline-flex sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:rounded-full sm:px-3 sm:py-2">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={handleJeClick}
            aria-label={
              !active
                ? "Activate JE"
                : nextStop
                  ? `Move JE to ${STOP_LABELS[nextStop]}`
                  : "Return JE to Home"
            }
            className="flex h-11 w-11 shrink-0 items-center justify-center overflow-visible rounded-full border border-[#a2cb8b]/18 bg-[#161d12]/80 transition-colors hover:border-[#a2cb8b]/35 hover:bg-[#1b2416] sm:h-auto sm:w-auto sm:p-1"
          >
            <JeSprite
              size={isHero ? "md" : spriteSize}
              active={active}
              walking={walking}
              arrived={!isHero}
              travelDirection={travelDirection}
              travelPhase={travelPhase}
              scrollDrift={scrollDrift}
            />
          </button>

          <div className="min-w-0 flex-1 leading-tight">
            {title ? (
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a2cb8b]/65 sm:tracking-[0.24em]">
                {title}
              </p>
            ) : null}
            <p
              className={`${
                title ? "mt-1" : ""
              } text-[11px] font-medium uppercase tracking-[0.1em] text-[#e8f5bd]/78 sm:text-xs sm:tracking-[0.16em]`}
            >
              {isHero && !active ? "Click JE" : helperText}
            </p>
            {isHero && active ? (
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#e8f5bd]/45 sm:hidden">
                {String(step + 1).padStart(2, "0")} / {JE_STOPS.length}
              </p>
            ) : null}
          </div>

          {isHero && active ? (
            <span className="hidden shrink-0 text-[10px] font-medium uppercase tracking-[0.2em] text-[#e8f5bd]/48 sm:inline">
              {String(step + 1).padStart(2, "0")} / {JE_STOPS.length}
            </span>
          ) : null}
        </div>

        {active ? (
          <button
            type="button"
            onClick={handleActionClick}
            disabled={walking}
            className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-[#a2cb8b]/20 bg-[#a2cb8b]/8 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e8f5bd] transition-colors hover:bg-[#a2cb8b]/14 disabled:cursor-not-allowed disabled:opacity-45 sm:h-auto sm:w-auto sm:rounded-full sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.2em]"
          >
            <ActionIcon className="h-3.5 w-3.5 shrink-0" />
            <span className="sm:hidden">{actionShortLabel}</span>
            <span className="hidden sm:inline">{actionLabel}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
