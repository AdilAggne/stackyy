import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addQuestion, fetchQuestions } from "../../services/QuestionServices";
import classes from "./NewQuestion.module.css";
import Editor from "../Editor/Editor";

const NewQuestion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoHome = () => {
    navigate("/");
  };

  const saveNewQuestion = () => {
    if (content) {
      dispatch(
        addQuestion({
          id: 0,
          title: title,
          content: content,
          creationDate: "2023-08-22T05:30:07.879Z",
          userId: 1,
        })
      );
      gotoHome();
    }
  };

  const setNewContent = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className={classes.new}>
      <div className={classes.headers}>
        <div className={classes.backBtn} onClick={gotoHome}>
          Back
        </div>
        <div className={classes.saveBtn} onClick={saveNewQuestion}>
          Save
        </div>
      </div>
      <div className={classes.title}>
        <input
          type="text"
          className={classes.titleEditor}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxlength={99}
        />
      </div>
      <div className={classes.desc}>
        <Editor
          placeholder="Explain your question here..."
          setContent={setNewContent}
        />
      </div>
    </div>
  );
};

export default NewQuestion;
