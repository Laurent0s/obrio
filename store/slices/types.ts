import { Answers } from "@/types/answers";

export interface SingleSurveyProgress {
  answers: Answers;
  currentQuestionId: string | null;
}

export type SurveysProgressState = {
  byId: Record<string, SingleSurveyProgress>;
  currentId: string | null;
};
