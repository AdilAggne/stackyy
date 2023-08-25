import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = process.env.REACT_APP_BASE_URL;

export const fetchAnswers = createAsyncThunk(
  "question/fetchAnswers",
  async () => {
    // Note the use of the "rejectWithValue" callback
    try {
      let res = await fetch(`${baseURL}/api/Answer`);
      console.log("response from res: ", res);
      res = await res.json();
      console.log("res: ", res);
      return res;
    } catch (error) {
      console.log("error in fetchAnswers");
      // throw error;
    }
  }
);

export const fetchQuestionAnswers = createAsyncThunk(
  "question/fetchQuestionAnswers",
  async (questionId) => {
    // Note the use of the "rejectWithValue" callback
    try {
      let res = await fetch(`${baseURL}/api/Answer/questions/${questionId}`);
      console.log("response from res: ", res);
      res = await res.json();
      console.log("res: ", res);
      return res;
    } catch (error) {
      console.log("error in fetchAnswers");
      // throw error;
    }
  }
);

export const addAnswer = createAsyncThunk(
  "question/addAnswer",
  async (newAnswer) => {
    const response = await fetch(`${baseURL}/api/Answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnswer),
    });
    const data = await response.json();
    return data; // Return the newly added article object for updating the state
  }
);

export const getAnswer = async (id) => {
  let res = await fetch(`${baseURL}/api/Answer/all/${id}`);
  res = await res.json();
  return res;
};

// Need to create this API
export const getAnswersCount = async () => {
  try {
    let res = await fetch(`${baseURL}/api/Answer/Count`);
    res = await res.json();
    return res;
  } catch (error) {
    console.log("error in getAnswersCount");
  }
};

// Need to create this API
export const getPaginatedAnswers = createAsyncThunk(
  "question/getPaginatedAnswers",
  async (options) => {
    try {
      let res = await fetch(
        `${baseURL}/api/Answer/paginated?page=${options.page}&pageSize=${options.perPage}`
      );
      res = await res.json();
      return res;
    } catch (error) {
      console.log("error at getPaginatedAnswers");
      // throw error;
    }
  }
);

export const updateAnswer = createAsyncThunk(
  "question/updateAnswer",
  async (updateAnswer) => {
    const response = await fetch(
      `${baseURL}/api/answer/${updateAnswer.answerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateAnswer),
      }
    );
    const data = await response.json();
    return data; // Return the updated article object for updating the state
  }
);

export const deleteAnswer = createAsyncThunk(
  "question/deleteAnswer",
  async (answerId) => {
    await fetch(`${baseURL}/api/answer/${answerId}`, {
      method: "DELETE",
    });
    return answerId; // Return the ID of the deleted article for updating the state
  }
);
