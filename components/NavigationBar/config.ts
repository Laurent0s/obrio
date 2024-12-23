import { Theme } from "@/features/theming/types";

export const assetsPath: Record<Theme, { arrowLeft: string; logo: string }> =
  Object.freeze({
    light: {
      arrowLeft: "/icons/arrow-left.svg",
      logo: "/icons/logo.svg",
    },
    dark: {
      arrowLeft: "/icons/arrow-left-light.svg",
      logo: "/icons/logo-light.svg",
    },
  });
