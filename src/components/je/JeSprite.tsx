"use client";

import type {
  JeScrollDrift,
  JeTravelDirection,
  JeTravelPhase,
} from "@/components/je/JeNavigatorContext";

type JeSpriteProps = {
  active?: boolean;
  walking?: boolean;
  size?: "sm" | "md";
  arrived?: boolean;
  travelDirection?: JeTravelDirection | null;
  travelPhase?: JeTravelPhase;
  scrollDrift?: JeScrollDrift;
};

export function JeSprite({
  active = false,
  walking = false,
  size = "md",
  arrived = false,
  travelDirection = null,
  travelPhase = "idle",
  scrollDrift = null,
}: JeSpriteProps) {
  const dimension = size === "sm" ? 36 : 44;
  const isDeparting = travelPhase === "depart";
  const isArriving = travelPhase === "arrive";
  const isDrifting = travelPhase === "idle" && !walking && scrollDrift !== null;

  const wrapperClassName = [
    "je-sprite",
    active ? "is-active" : "",
    walking && travelPhase === "idle" ? "is-walking" : "",
    arrived ? "is-arrived" : "",
    isDeparting && travelDirection === "down" ? "is-whoosh-down" : "",
    isDeparting && travelDirection === "up" ? "is-whoosh-up" : "",
    isArriving && travelDirection === "down" ? "is-arrive-down" : "",
    isArriving && travelDirection === "up" ? "is-arrive-up" : "",
    isDrifting && scrollDrift === "down" ? "is-drift-down" : "",
    isDrifting && scrollDrift === "up" ? "is-drift-up" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      aria-hidden="true"
      className={wrapperClassName}
      style={{ width: dimension, height: dimension }}
    >
      {(isDeparting || isArriving) && travelDirection ? (
        <span className={`je-trail je-trail-${travelDirection}`} />
      ) : null}
      {isDrifting && scrollDrift ? (
        <span className={`je-trail je-trail-drift-${scrollDrift}`} />
      ) : null}
      <svg
        viewBox="0 0 16 16"
        width={dimension}
        height={dimension}
        role="presentation"
        shapeRendering="crispEdges"
        className="je-sprite-body h-full w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.28)]"
      >
        <rect x="6" y="1" width="2" height="2" fill="#8cae73" />
        <rect x="8" y="1" width="2" height="2" fill="#8cae73" />
        <rect x="5" y="2" width="2" height="2" fill="#8cae73" />
        <rect x="9" y="2" width="2" height="2" fill="#8cae73" />

        <rect x="4" y="3" width="8" height="7" rx="1" fill="#5f784f" />
        <rect x="5" y="4" width="6" height="5" fill="#7d9a6a" />
        <rect x="6" y="5" width="1" height="1" fill="#161d12" />
        <rect x="9" y="5" width="1" height="1" fill="#161d12" />
        <rect x="7" y="7" width="2" height="1" fill="#e8f5bd" />

        <rect x="4" y="10" width="8" height="2" fill="#4d6241" />
        <rect className="je-leg je-leg-left" x="5" y="12" width="2" height="3" fill="#31402a" />
        <rect className="je-leg je-leg-right" x="9" y="12" width="2" height="3" fill="#31402a" />
        <rect className="je-tail" x="12" y="8" width="2" height="1" fill="#8cae73" />
        <rect className="je-tail" x="13" y="7" width="1" height="1" fill="#8cae73" />
      </svg>
    </span>
  );
}
