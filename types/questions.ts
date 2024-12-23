export interface Question<T extends ScreenType = ScreenType> {
  id: string;
  screenType: T;
  params: ScreenParamsMap[T];
}

export enum ScreenType {
  BINARY = "BINARY",
  MULTIPLE_OPTIONS = "MULTIPLE_OPTIONS",
}

export type ScreenParamsMap = {
  [ScreenType.BINARY]: BinaryParams;
  [ScreenType.MULTIPLE_OPTIONS]: MultipleOptionsParams;
};

export interface BinaryParams {
  title: string;
  description?: string;
}

export interface MultipleOptionsParams {
  title: string;
  description?: string;
  options: {
    name: string;
    label: string;
  }[];
}
