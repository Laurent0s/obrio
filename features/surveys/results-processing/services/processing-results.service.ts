import { Survey } from "@/types/survey";
import { Question } from "@/types/questions";
import { Result, WeakAnswers } from "@/types/answers";
import routes from "@/constants/routes";

import {
  clearTransitionsFromDirectives,
  makeAnswerTemplate,
} from "../../engine";
import { getNextRoute } from "../../engine/services/transition-evaluation.service";
import { SurveyProcessingError } from "../../engine/survey-processing.error";

const buildSurveyProgressChain = (
  survey: Survey,
  answers: WeakAnswers,
): string[] => {
  const { startQuestionId } = survey;

  const chain = [startQuestionId];

  let questionId: string = startQuestionId;
  let route: string | null;
  let counter = 0;

  survey.transitions = clearTransitionsFromDirectives(survey.transitions);

  while (true) {
    route = getNextRoute(questionId, survey, answers);

    if (route === routes.SURVEY_RESULTS({ surveyId: survey.id })) {
      break;
    }

    questionId = route.split("/").at(-1) as string;

    chain.push(questionId);

    counter++;

    if (counter > survey.questions.length) {
      throw new SurveyProcessingError({
        code: 500,
        message:
          "Infinite loop is detected during building survey progress chain. Likely, survey progress data is invalid",
      });
    }
  }

  return chain;
};

export const getSurveyResults = (
  survey: Survey,
  answers: WeakAnswers,
): Result[] => {
  const valuableAnswersIds = buildSurveyProgressChain(survey, answers);

  return valuableAnswersIds.map((id) => {
    const question = survey.questions.find((q) => q.id === id) as Question;

    return {
      questionId: id,
      questionText: question.params.title,
      answerText: makeAnswerTemplate(id),
    };
  });
};
