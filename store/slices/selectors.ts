import { createSelector } from "reselect";
import { selectRoot } from "@/store/RootSelector";

const selectSurveysProgress = createSelector(
  selectRoot,
  (state) => state.surveysProgress,
);

export const selectCurrentSurveyId = createSelector(
  selectSurveysProgress,
  (state) => state.currentId,
);

export const selectCurrentSurveyProgress = createSelector(
  [selectSurveysProgress, selectCurrentSurveyId],
  (state, currentId) => {
    return currentId ? state.byId[currentId] : null;
  },
);

export const selectCurrentQuestionId = createSelector(
  selectCurrentSurveyProgress,
  (state) => state?.currentQuestionId,
);

export const selectCurrentAnswer = createSelector(
  [selectCurrentSurveyProgress, selectCurrentQuestionId],
  (state, currentQuestionId) => {
    if (state === null) {
      return null;
    }

    return currentQuestionId ? state.answers[currentQuestionId] : null;
  },
);

export const selectCurrentSurveyAnswers = createSelector(
  selectCurrentSurveyProgress,
  (state) => (state ? state.answers : null),
);
