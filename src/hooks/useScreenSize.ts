import { useWindowSize } from "@hooks/useWindowSize";
import { SCREEN_SIZE } from "@lib/constants";

export type TDevice = "mobile" | "tablet" | "desktop" | "wide-screen";
export type TScreenSize = "default" | "sm" | "md" | "lg" | "xl" | "2xl";

const useScreenSize = (): {
  device: "mobile" | "tablet" | "desktop" | "wide-screen";
  screenSize: "default" | "sm" | "md" | "lg" | "xl" | "2xl";
} => {
  const { width } = useWindowSize();

  let screenSize: TScreenSize;
  let device: TDevice = "wide-screen"; // Assign a default value to the device variable

  switch (true) {
    case width <= SCREEN_SIZE.sm:
      device = "mobile";
      break;
    case width <= SCREEN_SIZE.lg:
      device = "tablet";
      break;
    case width <= SCREEN_SIZE["2xl"]:
      device = "desktop";
      break;
    default:
      device = "wide-screen";
      break;
  }

  switch (true) {
    case width >= SCREEN_SIZE["2xl"]:
      screenSize = "2xl";
      break;
    case width >= SCREEN_SIZE.xl:
      screenSize = "xl";
      break;
    case width >= SCREEN_SIZE.lg:
      screenSize = "lg";
      break;
    case width >= SCREEN_SIZE.md:
      screenSize = "md";
      break;
    case width >= SCREEN_SIZE.sm:
      screenSize = "sm";
      break;
    default:
      screenSize = "default";
      break;
  }

  return {
    device,
    screenSize,
  };
};

export { useScreenSize };
