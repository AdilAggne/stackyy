import { createSlice } from "@reduxjs/toolkit";
import {
  fetchQuestions,
  getPaginatedQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../services/QuestionServices";

const initialState = {
  questions: [],
  id: 0,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
    builder.addCase(getPaginatedQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.questions = state.questions.filter(
        (question) => question.questionId !== action.payload
      );
    });
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
      state.questions = state.questions.map((question) =>
        question.id === action.payload.questionId ? action.payload : question
      );
    });
  },
});
