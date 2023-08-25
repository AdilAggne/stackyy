import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { questionSlice } from "./questionSlice";
import { answerSlice } from "./answerSlice";

const rootReducer = combineReducers({
  questions: questionSlice.reducer,
  answers: answerSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
