"use client";

import { useAppSelector } from "@/store/store";
import { selectCurrentSurveyAnswers } from "@/store/slices/selectors";
import { enrichDeep } from "../utils";

export const useDynamicTextTemplates = () => {
  const answers = useAppSelector(selectCurrentSurveyAnswers) ?? {};

  const hydrateText = <T extends Array<unknown>>(...params: T) =>
    params.map(
      (parameter: unknown) =>
        enrichDeep(parameter, answers) as typeof parameter,
    ) as T;

  return { hydrateText };
};
