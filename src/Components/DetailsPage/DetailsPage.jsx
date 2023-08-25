import { useLocation } from "react-router-dom";
import classes from "./DetailsPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, fetchQuestionAnswers } from "../../services/AnswerServices";
import Editor from "../Editor/Editor";
import Answer from "../Answer/Answer";
import Question from "../Question/Question";

const DetailsPage = () => {
  const [newAnswer, setNewAnswer] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const answers = useSelector((state) => state.answers.answers);
  const dispatch = useDispatch();
  const location = useLocation();
  const { from } = location.state;
  const props = from;
  const { questionId } = props;

  useEffect(() => {
    dispatch(fetchQuestionAnswers(questionId));
  }, [dispatch, questionId]);

  const getNewAnswer = (answer) => {
    setNewAnswer(answer);
  };

  const submitAnswerHandle = () => {
    if (newAnswer) {
      const body = {
        answerId: 0,
        questionId: questionId,
        content: newAnswer,
        creationDate: "2023-08-21T08:54:38.765Z",
        userId: 1,
      };
      dispatch(addAnswer(body));
      setAnswerSubmitted(true);
      setTimeout(() => {
        setAnswerSubmitted(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Question question={props} />
        <div className={classes.answers}>
          {answers !== null && answers?.length > 0
            ? answers?.map((answer) => (
                <Answer key={answer.answerId} answer={answer} />
              ))
            : "Not answers yet!"}

          {/* <div className={classes.answer}>
            Answer 2
            <div className={classes.comment}>Comments for Answer 2</div>
          </div> */}
        </div>
        <div className={classes.answerInput}>
          <div className={classes.editor}>
            <Editor
              placeholder="Please enter your answer and hit submit...."
              setContent={getNewAnswer}
              shouldClear={answerSubmitted}
            />
          </div>
          <button className={classes.btn} onClick={submitAnswerHandle}>
            Submit Answer
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
