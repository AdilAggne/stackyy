import { useDispatch } from "react-redux";
import classes from "./Answer.module.css";
import { deleteAnswer, updateAnswer } from "../../services/AnswerServices";
import { useEffect, useRef, useState } from "react";
import Editor from "../Editor/Editor";
import Modal from "../Modal/Modal";

const Answer = (props) => {
  const contentRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEditing) {
      contentRef.current.innerHTML = props.answer.content;
    }
  }, []);

  const handleEdit = () => {
    hideModalPopup();
    if (isEditing) {
      const body = {
        answerId: props.answer.answerId,
        questionId: props.answer.questionId,
        content: answer,
        creationDate: "2023-08-15T16:21:05.51",
        userId: props.answer.userId,
      };
      dispatch(updateAnswer(body));
    }
    setIsEditing((prevState) => !prevState);
  };

  const showModalPopup = () => {
    setShowModal(true);
  };

  const hideModalPopup = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    hideModalPopup();
    dispatch(deleteAnswer(props.answer.answerId));
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
          You are about to {isEditing ? "Edit" : "Delete"} this answer
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
      {!isEditing ? (
        <div ref={contentRef} className={classes.answer}></div>
      ) : (
        <Editor innerContent={props.answer.content} setContent={setAnswer} />
      )}
    </>
  );
};

export default Answer;
