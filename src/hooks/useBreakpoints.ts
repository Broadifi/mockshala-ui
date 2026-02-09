const TAILWIND_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof TAILWIND_BREAKPOINTS;

import { useEffect, useState } from "react";

export function useBreakpoints(breakpoint: Breakpoint) {
  const px = TAILWIND_BREAKPOINTS[breakpoint];
  const query = `(min-width: ${px}px)`;

  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener(); // set initial value
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

