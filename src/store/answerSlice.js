import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAnswers,
  fetchQuestionAnswers,
  getPaginatedAnswers,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../services/AnswerServices";

const initialState = {
  answers: [],
  id: 0,
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAnswers.fulfilled, (state, action) => {
      state.answers = action.payload;
    });
    builder.addCase(fetchQuestionAnswers.fulfilled, (state, action) => {
      state.answers = action.payload;
    });
    builder.addCase(getPaginatedAnswers.fulfilled, (state, action) => {
      state.answers = action.payload;
    });
    builder.addCase(addAnswer.fulfilled, (state, action) => {
      if (state?.answers?.length > 0) {
        const answers = [...state?.answers];
        answers.push(action.payload);
        state.answers = answers;
      } else {
        state.answers = [action.payload];
      }
    });
    builder.addCase(deleteAnswer.fulfilled, (state, action) => {
      state.answers = state.answers.filter(
        (answer) => answer.answerId !== action.payload
      );
    });
    builder.addCase(updateAnswer.fulfilled, (state, action) => {
      state.answers = state.answers.map((answer) =>
        answer.id === action.payload.id ? action.payload : answer
      );
    });
  },
});
