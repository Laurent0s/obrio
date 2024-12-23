const routes = Object.freeze({
  HOME: "/",
  ABOUT: "/about",
  SURVEYS: "/surveys",
  SURVEY: ({ surveyId }: { surveyId: string }) => `/surveys/${surveyId}`,
  SURVEY_RESULTS: ({ surveyId }: { surveyId: string }) =>
    `/surveys/${surveyId}/results`,
  SURVEY_QUESTIONS: ({ surveyId }: { surveyId: string }) =>
    `/surveys/${surveyId}/questions`,
  SURVEY_QUESTION: ({
    surveyId,
    questionId,
  }: {
    surveyId: string;
    questionId: string;
  }) => `/surveys/${surveyId}/questions/${questionId}`,
  SURVEY_NEXT_QUESTION: ({
    surveyId,
    questionId,
    answer,
  }: {
    surveyId: string;
    questionId: string;
    answer: string;
  }) => `/surveys/${surveyId}/questions/${questionId}/next?answer=${answer}`,
  TEST_SURVEY: "/surveys/test-survey",
  API_BASE: "/api",
  API_PROCESS_SURVEY_RESULTS: ({ surveyId }: { surveyId: string }) =>
    `/api/surveys/${surveyId}/process-results`,
});

export default routes;
