import { Survey } from "@/types/survey";
import { Condition, Operator, Transition } from "@/types/transition";
import { WeakAnswers } from "@/types/answers";
import routes from "@/constants/routes";

import { SurveyProcessingError } from "../survey-processing.error";
import {
  extractExitPointDirectiveValue,
  FlowControlDirective,
  hasDirective,
} from "../utils";

const conditionsOperatorsMap: Readonly<
  Record<Operator, (a: unknown, b: unknown) => boolean>
> = Object.freeze({
  [Operator.EQUALS]: (a, b) => a === b,
});

const checkCondition = (
  condition: Condition,
  answers: Record<string, unknown>,
): boolean => {
  const { questionId, operator, value } = condition;
  return conditionsOperatorsMap[operator](answers[questionId], value);
};

export const selectTransitionsFromQuestion = (
  questionId: string,
  transitions: Transition[],
  answers: Record<string, unknown>,
): Transition[] => {
  return transitions
    .filter(({ from }) => from === questionId)
    .filter(({ conditions }) =>
      conditions ? conditions.every((el) => checkCondition(el, answers)) : true,
    );
};

export const excludeDefaultTransition = (transitions: Transition[]) =>
  transitions.filter(({ conditions }) => Boolean(conditions));

export const getNextRoute = (
  currentQuestionId: string,
  survey: Survey,
  answers: WeakAnswers,
): string => {
  const { finishQuestionId, id: surveyId } = survey;
  let { transitions } = survey;

  if (currentQuestionId === finishQuestionId) {
    return routes.SURVEY_RESULTS({ surveyId });
  }

  transitions = selectTransitionsFromQuestion(
    currentQuestionId,
    transitions,
    answers,
  );

  if (transitions.length > 1) {
    transitions = excludeDefaultTransition(transitions);
  }

  if (transitions.length !== 1) {
    throw new SurveyProcessingError({
      code: 400,
      message: "It cannot be moved to the next question",
    });
  }

  const route = transitions[0].to;

  if (hasDirective(FlowControlDirective.EXIT_POINT, route)) {
    return extractExitPointDirectiveValue(route);
  }

  return routes.SURVEY_QUESTION({ surveyId, questionId: route });
};
