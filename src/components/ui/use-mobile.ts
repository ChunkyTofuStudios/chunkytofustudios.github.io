import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const NARROW_BREAKPOINT = 1000;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

// Hook to detect narrow screens (less than 1000px) - used for navigation collapse
export function useIsNarrowScreen() {
  const [isNarrow, setIsNarrow] = React.useState(false);

  React.useEffect(() => {
    const checkNarrow = () => {
      setIsNarrow(window.innerWidth < NARROW_BREAKPOINT);
    };
    
    // Check on mount
    checkNarrow();
    
    // Listen for resize
    window.addEventListener('resize', checkNarrow);
    return () => window.removeEventListener('resize', checkNarrow);
  }, []);

  return isNarrow;
}
