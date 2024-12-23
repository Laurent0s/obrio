import { ScreenType } from "@/types/questions";
import { ScreenComponent } from "../types";
import { BinaryScreen } from "../_BinaryScreen";
import { MultipleOptionsScreen } from "../_MultipleOptionsScreen";

export const screens: Readonly<{
  [K in ScreenType]: ScreenComponent<K>;
}> = Object.freeze({
  [ScreenType.BINARY]: BinaryScreen as ScreenComponent<ScreenType.BINARY>,
  [ScreenType.MULTIPLE_OPTIONS]:
    MultipleOptionsScreen as ScreenComponent<ScreenType.MULTIPLE_OPTIONS>,
});

export const getScreens = <T extends ScreenType>(
  screenType: T,
): ScreenComponent<T> => {
  return screens[screenType] as ScreenComponent<T>;
};
