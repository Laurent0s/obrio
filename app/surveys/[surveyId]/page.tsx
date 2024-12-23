import routes from "@/constants/routes";
import {
  fetchAllSurveys,
  fetchSurvey,
} from "@/features/surveys/engine/services/fetching.service";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const surveys = await fetchAllSurveys();
  return surveys.map(({ id }) => ({ surveyId: id }));
}

export default async function SurveyPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = await params;

  const { startQuestionId } = await fetchSurvey(surveyId);

  redirect(routes.SURVEY_QUESTION({ surveyId, questionId: startQuestionId }));
}
