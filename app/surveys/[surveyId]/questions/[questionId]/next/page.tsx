import { redirect } from "next/navigation";
import { fetchSurvey } from "@/features/surveys/engine/services/fetching.service";

import { getNextRoute } from "@/features/surveys/engine/services/transition-evaluation.service";

export default async function NextQuestionPage({
  params,
  searchParams,
}: {
  params: Promise<{ surveyId: string; questionId: string }>;
  searchParams: Promise<{ answer?: string }>;
}) {
  const { surveyId, questionId } = await params;
  const { answer } = await searchParams;

  const survey = await fetchSurvey(surveyId);

  if (!answer) {
    throw new Error("Answer is not provided");
  }

  redirect(
    getNextRoute(questionId, survey, { [questionId]: JSON.parse(answer) }),
  );
}
