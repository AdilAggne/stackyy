import { useEffect, useRef, useState } from "react";
import classes from "./Question.module.css";
import Editor from "../Editor/Editor";
import { useDispatch } from "react-redux";
import {
  deleteQuestion,
  updateQuestion,
} from "../../services/QuestionServices";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

const Question = (props) => {
  const contentRef = useRef();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (title === "" && content === "") {
      setTitle(props.question.title);
      setContent(props.question.content);
    }
  }, []);

  useEffect(() => {
    if (contentRef && contentRef.current) {
      contentRef.current.innerHTML = content;
    }
  }, [content, isEditing]);

  const handleEdit = () => {
    hideModalPopup();
    setIsEditing((prevState) => !prevState);
    const body = {
      questionId: props.question.questionId,
      title: title,
      content: content,
      creationDate: "2023-08-21T10:55:45.262Z",
      userId: props.question.userId,
    };
    dispatch(updateQuestion(body));
  };

  const handleDelete = () => {
    hideModalPopup();
    dispatch(deleteQuestion(props.question.questionId));
    navigate("/");
  };

  const showModalPopup = () => {
    setShowModal(true);
  };

  const hideModalPopup = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          okHandle={() => {
            isEditing ? handleEdit() : handleDelete();
          }}
          cancelHandle={hideModalPopup}
        >
          You are about to {isEditing ? "Edit" : "Delete"} this Question
        </Modal>
      )}
      <div className={classes.header}>
        {!isEditing && (
          <button className={classes.btn} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        {isEditing && (
          <button className={classes.btn} onClick={showModalPopup}>
            Update
          </button>
        )}
        {!isEditing && (
          <button className={classes.btn} onClick={showModalPopup}>
            Delete
          </button>
        )}
      </div>
      <div className={classes.question}>
        {!isEditing && (
          <div className={classes.title}>{props.question.title}</div>
        )}
        {isEditing && (
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        )}
        {!isEditing && (
          <div ref={contentRef} className={classes.description}></div>
        )}
        {isEditing && <Editor innerContent={content} setContent={setContent} />}
      </div>
    </>
  );
};

export default Question;
