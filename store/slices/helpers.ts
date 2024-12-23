import { SingleSurveyProgress } from "@/store/slices/types";

export const makeSurvey = (): SingleSurveyProgress => ({
  answers: {},
  currentQuestionId: null,
});
