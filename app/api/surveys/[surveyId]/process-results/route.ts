import { fetchSurvey } from "@/features/surveys/engine/services/fetching.service";
import { getSurveyResults } from "@/features/surveys/results-processing/services/processing-results.service";
import { WeakAnswers } from "@/types/answers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ surveyId: string }>;
  },
) {
  const { answers }: { answers: WeakAnswers } = await request.json();

 const {surveyId} = await params;

  const survey = await fetchSurvey(surveyId);
  const results = getSurveyResults(survey, answers);

  return NextResponse.json({
    message: "Survey results processed successfully",
    data: results,
    success: true,
  });
}
