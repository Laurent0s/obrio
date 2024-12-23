import { FC } from "react";

import { ScreenParamsMap, ScreenType } from "@/types/questions";

export type SubmitHandler = ({
  value,
  label,
}: {
  value: unknown;
  label: string;
}) => void;

export type ScreenProps<T> = {
  onSubmit: SubmitHandler;
  params: T;
};

export type ScreenComponent<T extends ScreenType> = FC<
  ScreenProps<ScreenParamsMap[T]>
>;
