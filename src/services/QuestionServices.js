import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = process.env.REACT_APP_BASE_URL;

export const fetchQuestions = createAsyncThunk(
  "question/fetchQuestions",
  async () => {
    // Note the use of the "rejectWithValue" callback
    try {
      let res = await fetch(`${baseURL}/api/Question`);
      console.log("response from res: ", res);
      res = await res.json();
      console.log("res: ", res);
      return res;
    } catch (error) {
      console.log("error in fetchQuestions");
      // throw error;
    }
  }
);

// Error handling: https://hackernoon.com/api-error-handling-in-react

export const addQuestion = createAsyncThunk(
  "question/addQuestion",
  async (newQuestion) => {
    const response = await fetch(`${baseURL}/api/Question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });
    const data = await response.json();
    return data; // Return the newly added article object for updating the state
  }
);

export const getQuestion = async (id) => {
  let res = await fetch(`${baseURL}/api/Question/${id}`);
  res = await res.json();
  return res;
};

// Need to create this API
export const getQuestionsCount = async () => {
  try {
    let res = await fetch(`${baseURL}/api/Question/Count`);
    res = await res.json();
    return res;
  } catch (error) {
    console.log("error in getQuestionsCount");
  }
};

// Need to create this API
export const getPaginatedQuestions = createAsyncThunk(
  "question/getPaginatedQuestions",
  async (options) => {
    try {
      let res = await fetch(
        `${baseURL}/api/Question/paginated?page=${options.page}&pageSize=${options.perPage}`
      );
      res = await res.json();
      return res;
    } catch (error) {
      console.log("error at getPaginatedQuestions");
      // throw error;
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "question/updateQuestion",
  async (updateQuestion) => {
    const response = await fetch(
      `${baseURL}/api/Question/${updateQuestion.questionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateQuestion),
      }
    );
    const data = await response.json();
    return data; // Return the updated article object for updating the state
  }
);

export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (questionId) => {
    await fetch(`${baseURL}/api/Question/${questionId}`, {
      method: "DELETE",
    });
    return questionId; // Return the ID of the deleted article for updating the state
  }
);
