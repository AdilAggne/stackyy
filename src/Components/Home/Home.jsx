import { useState, useEffect } from "react";
import classes from "./Home.module.css";
import Hero from "../Hero/Hero";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getPaginatedQuestions } from "../../services/PostServices";
import Pagination from "../Pagination/Pagination";
import { fetchQuestions } from "../../services/QuestionServices";

function Home() {
  const [showAlert, setShowAlert] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  const addNewQuestion = () => {
    navigate("/new");
  };

  return (
    <div className={classes.container}>
      {showAlert && (
        <div className={classes.alert}>
          <p>
            Don't see any data? Maybe try refreshing the page, still same? Then
            server is offline, wait till its get back!
          </p>
          <div className={classes.closeBtn} onClick={() => setShowAlert(false)}>
            X
          </div>
        </div>
      )}
      <Hero />
      <div className={classes.buttons}>
        <div className={classes.search}></div>
        <div
          className={classes.newQuestionBtn}
          onClick={addNewQuestion}
          onKeyDown={(e) => {
            if (e.code === "Space" || e.code === "Enter") addNewQuestion();
          }}
          tabIndex={1}
        >
          +
        </div>
        <div className={classes.pagination}>
          <Pagination
            pages={totalPages}
            page={page}
            perPage={perPage}
            setPage={setPage}
            setPerPage={setPerPage}
            setTotalPages={setTotalPages}
          />
        </div>
      </div>
      <div className={classes.questions}>
        {state.questions !== null && state.questions?.length > 0 ? (
          state.questions?.map((question, index) => {
            return (
              <Card key={question.questionId} props={question} index={index} />
            );
          })
        ) : (
          <p>Please ask some questions!!</p>
        )}
      </div>
    </div>
  );
}

export default Home;
