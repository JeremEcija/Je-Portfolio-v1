"use client";

import { JE_STOPS, useJeNavigator } from "@/components/je/JeNavigatorContext";
import { JeControlBar } from "@/components/je/JeControlBar";

export function JeSectionMarker({
  stop,
  title,
}: {
  stop: (typeof JE_STOPS)[number];
  title?: string;
}) {
  const { displayStop } = useJeNavigator();

  if (displayStop !== stop) {
    return null;
  }

  return <JeControlBar variant="section" title={title} spriteSize="sm" />;
}
