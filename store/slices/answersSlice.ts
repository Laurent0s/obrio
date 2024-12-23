import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SurveysProgressState } from "@/store/slices/types";
import { makeSurvey } from "@/store/slices/helpers";

const initialState: SurveysProgressState = { byId: {}, currentId: null };

const surveyProgressSlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    setCurrentSurveyId: (
      state,
      action: PayloadAction<{ surveyId: string }>,
    ) => {
      state.currentId = action.payload.surveyId;
    },

    setCurrentQuestionId: (
      state,
      action: PayloadAction<{ surveyId: string; questionId: string }>,
    ) => {
      const { surveyId, questionId } = action.payload;

      if (!state.byId[surveyId]) {
        state.byId[surveyId] = makeSurvey();
      }

      state.byId[surveyId].currentQuestionId = questionId;
    },

    setAnswer: (
      state,
      action: PayloadAction<{
        surveyId: string;
        questionId: string;
        value: unknown;
        label: string;
      }>,
    ) => {
      const { surveyId, questionId, value, label } = action.payload;

      if (!state.byId[surveyId]) {
        state.byId[surveyId] = makeSurvey();
      }

      state.byId[surveyId].answers[questionId] = { label, value };
    },
  },
});

export const {
  reducer: surveysProgressReducer,
  actions: surveysProgressActions,
} = surveyProgressSlice;
