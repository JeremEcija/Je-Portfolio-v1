"use client";

import { JeControlBar } from "@/components/je/JeControlBar";
import { useJeNavigator } from "@/components/je/JeNavigatorContext";

export function JeNavigator() {
  const { displayStop } = useJeNavigator();

  if (displayStop !== "home") {
    return null;
  }

  return <JeControlBar variant="hero" spriteSize="md" />;
}
