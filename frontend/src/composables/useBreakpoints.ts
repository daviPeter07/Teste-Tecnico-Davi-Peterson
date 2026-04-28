import { computed } from "vue";
import { useBreakpoints as useVueUseBreakpoints } from "@vueuse/core";

export function useBreakpoints() {
  const breakpoints = useVueUseBreakpoints({
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  });

  const isMobile = breakpoints.smaller("md");
  const isTablet = computed(() => breakpoints.between("md", "lg").value);
  const isDesktop = breakpoints.greaterOrEqual("lg");

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
