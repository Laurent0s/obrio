import { fetchAllSurveys } from "@/features/surveys/engine/services/fetching.service";

export async function ShowButton(questionId: string) {
  const surveys = await fetchAllSurveys();
  const startQuestionId = surveys[0]?.startQuestionId;

  return startQuestionId !== questionId;
}
