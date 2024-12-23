import routes from "@/constants/routes";
import { Answers } from "@/types/answers";
import { SurveyProcessResultsResponse } from "@/app/api/surveys/[surveyId]/process-results/types";
import { SurveyProcessingError } from "../../engine/survey-processing.error";
import { getWeakAnswers } from "../utils";

export const fetchProcessedResults = async (
  surveyId: string,
  answers: Answers,
): Promise<SurveyProcessResultsResponse> => {
  const weakAnswers = getWeakAnswers(answers);

  try {
    const res = await fetch(routes.API_PROCESS_SURVEY_RESULTS({ surveyId }), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers: weakAnswers }),
    });
    return await res.json();
  } catch (e) {
    throw new SurveyProcessingError({
      code: 400,
      message: "Cannot request processed results",
      originalError: e,
    });
  }
};
