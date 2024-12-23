import { combineReducers } from "@reduxjs/toolkit";
import { surveysProgressReducer } from "@/store/slices";

export const RootReducer = combineReducers({
  surveysProgress: surveysProgressReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
