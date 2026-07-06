"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

export const JE_STOPS = ["home", "tech-stack", "projects", "contact"] as const;

type JeStop = (typeof JE_STOPS)[number];
export type JeTravelDirection = "down" | "up";
export type JeTravelPhase = "idle" | "depart" | "arrive";
export type JeScrollDrift = "down" | "up" | null;

type JeNavigatorContextValue = {
  active: boolean;
  walking: boolean;
  step: number;
  displayStep: number;
  currentStop: JeStop;
  displayStop: JeStop;
  nextStop: JeStop | null;
  travelDirection: JeTravelDirection | null;
  travelPhase: JeTravelPhase;
  scrollDrift: JeScrollDrift;
  activate: () => void;
  moveToNext: () => void;
  moveToHome: () => void;
  setStepBySection: (sectionId: string) => void;
};

const JeNavigatorContext = createContext<JeNavigatorContextValue | null>(null);

const DEPART_MS = 520;
const ARRIVE_MS = 560;
const SCROLL_DELAY_MS = 500;
const SCROLL_ARRIVE_MS = 620;

type TravelSource = "click" | "scroll";

export function JeNavigatorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [active, setActive] = useState(false);
  const [walking, setWalking] = useState(false);
  const [step, setStep] = useState(0);
  const [displayStep, setDisplayStep] = useState(0);
  const [travelDirection, setTravelDirection] =
    useState<JeTravelDirection | null>(null);
  const [travelPhase, setTravelPhase] = useState<JeTravelPhase>("idle");
  const [scrollDrift, setScrollDrift] = useState<JeScrollDrift>(null);
  const stepRef = useRef(0);
  const displayStepRef = useRef(0);
  const walkingRef = useRef(false);
  const manualNavigationRef = useRef(false);
  const pendingTargetRef = useRef<number | null>(null);
  const travelTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    displayStepRef.current = displayStep;
  }, [displayStep]);

  const clearTravelTimeouts = useCallback(() => {
    travelTimeoutsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });
    travelTimeoutsRef.current = [];
  }, []);

  const queueTravelTimeout = useCallback((callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(callback, delay);
    travelTimeoutsRef.current.push(timeoutId);
  }, []);

  const finishTravel = useCallback(() => {
    setTravelPhase("idle");
    setTravelDirection(null);
    walkingRef.current = false;
    setWalking(false);
  }, []);

  const runTravel = useCallback(
    (fromStep: number, targetStep: number, source: TravelSource) => {
      if (
        targetStep < 0 ||
        targetStep >= JE_STOPS.length ||
        targetStep === fromStep
      ) {
        return;
      }

      if (walkingRef.current && source === "scroll") {
        return;
      }

      clearTravelTimeouts();

      const targetId = JE_STOPS[targetStep];
      const direction: JeTravelDirection =
        targetStep > fromStep ? "down" : "up";
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const scrollDelay =
        source === "click"
          ? prefersReducedMotion
            ? 0
            : SCROLL_DELAY_MS
          : prefersReducedMotion
            ? 0
            : 180;
      const arriveDuration = prefersReducedMotion
        ? 0
        : source === "click"
          ? ARRIVE_MS
          : SCROLL_ARRIVE_MS;
      const totalDuration = scrollDelay + arriveDuration + 160;

      setActive(true);
      setTravelDirection(direction);
      setWalking(true);
      walkingRef.current = true;

      if (source === "scroll") {
        setStep(targetStep);
        setDisplayStep(targetStep);
        setTravelPhase("arrive");

        queueTravelTimeout(() => {
          finishTravel();
        }, arriveDuration + 160);

        return;
      }

      manualNavigationRef.current = true;
      pendingTargetRef.current = targetStep;
      setTravelPhase("depart");
      setDisplayStep(fromStep);

      queueTravelTimeout(() => {
        setStep(targetStep);
        setDisplayStep(targetStep);
        setTravelPhase("arrive");

        if (source === "click") {
          document.getElementById(targetId)?.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        }
      }, scrollDelay);

      queueTravelTimeout(() => {
        finishTravel();

        if (source === "click") {
          queueTravelTimeout(() => {
            manualNavigationRef.current = false;
            pendingTargetRef.current = null;
          }, 1200);
        }
      }, totalDuration);
    },
    [clearTravelTimeouts, finishTravel, queueTravelTimeout]
  );

  const setStepBySection = useCallback(
    (sectionId: string) => {
      const nextIndex = JE_STOPS.indexOf(sectionId as JeStop);

      if (nextIndex === -1 || nextIndex === stepRef.current) {
        return;
      }

      runTravel(stepRef.current, nextIndex, "scroll");
    },
    [runTravel]
  );

  const activate = useCallback(() => {
    setActive(true);
  }, []);

  const moveToStep = useCallback(
    (targetStep: number) => {
      if (walkingRef.current) {
        return;
      }

      const currentStep = stepRef.current;

      if (
        targetStep < 0 ||
        targetStep >= JE_STOPS.length ||
        targetStep === currentStep
      ) {
        return;
      }

      runTravel(currentStep, targetStep, "click");
    },
    [runTravel]
  );

  const moveToNext = useCallback(() => {
    const currentStep = stepRef.current;

    if (currentStep >= JE_STOPS.length - 1) {
      return;
    }

    moveToStep(currentStep + 1);
  }, [moveToStep]);

  const moveToHome = useCallback(() => {
    moveToStep(0);
  }, [moveToStep]);

  useEffect(() => {
    const sections = JE_STOPS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    if (sections.length === 0) {
      return;
    }

    const getClosestSectionId = () => {
      const viewportAnchor = window.innerHeight * 0.32;
      let closestSectionId = sections[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionAnchor = rect.top + Math.min(rect.height * 0.35, 220);
        const distance = Math.abs(sectionAnchor - viewportAnchor);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSectionId = section.id;
        }
      });

      return closestSectionId;
    };

    const syncSectionFromViewport = () => {
      if (manualNavigationRef.current) {
        return;
      }

      const currentId = getClosestSectionId();
      setStepBySection(currentId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (manualNavigationRef.current) {
          if (pendingTargetRef.current !== null) {
            const targetId = JE_STOPS[pendingTargetRef.current];
            const arrived = entries.find(
              (entry) =>
                entry.target.id === targetId &&
                entry.isIntersecting &&
                entry.intersectionRatio >= 0.2
            );

            if (arrived) {
              setStep(pendingTargetRef.current);
              setDisplayStep(pendingTargetRef.current);
            }
          }

          return;
        }

        const hasVisibleEntry = entries.some((entry) => entry.isIntersecting);

        if (hasVisibleEntry) {
          syncSectionFromViewport();
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-12% 0px -35% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", syncSectionFromViewport, { passive: true });
    window.addEventListener("resize", syncSectionFromViewport);
    syncSectionFromViewport();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncSectionFromViewport);
      window.removeEventListener("resize", syncSectionFromViewport);
    };
  }, [setStepBySection]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let driftTimeout: number | undefined;

    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;

      if (Math.abs(delta) > 1) {
        setScrollDrift(delta > 0 ? "down" : "up");
        setActive(true);
      }

      lastScrollY = window.scrollY;

      if (driftTimeout) {
        window.clearTimeout(driftTimeout);
      }

      driftTimeout = window.setTimeout(() => {
        setScrollDrift(null);
      }, 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (driftTimeout) {
        window.clearTimeout(driftTimeout);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTravelTimeouts();
    };
  }, [clearTravelTimeouts]);

  const value = useMemo<JeNavigatorContextValue>(() => {
    return {
      active,
      walking,
      step,
      displayStep,
      currentStop: JE_STOPS[step],
      displayStop: JE_STOPS[displayStep],
      nextStop: step < JE_STOPS.length - 1 ? JE_STOPS[step + 1] : null,
      travelDirection,
      travelPhase,
      scrollDrift,
      activate,
      moveToNext,
      moveToHome,
      setStepBySection,
    };
  }, [
    active,
    walking,
    step,
    displayStep,
    travelDirection,
    travelPhase,
    scrollDrift,
    activate,
    moveToHome,
    moveToNext,
    setStepBySection,
  ]);

  return (
    <JeNavigatorContext.Provider value={value}>
      {children}
    </JeNavigatorContext.Provider>
  );
}

export function useJeNavigator() {
  const context = useContext(JeNavigatorContext);

  if (!context) {
    throw new Error("useJeNavigator must be used inside JeNavigatorProvider.");
  }

  return context;
}
