import { useEffect, useState } from "react";

/**
 * Hook to detect if the current viewport is mobile size
 * @param breakpoint - The breakpoint in pixels (default: 768px for md breakpoint)
 * @returns boolean indicating if the viewport is mobile size
 */
export default function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

