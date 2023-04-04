import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";

// My components
import SecCard from "../../components/common/SecCard";
import Loader from "../../components/common/Loader";
import Party from "../../components/user/Party";

// My css
import css from "../../css/user/quiz-page.module.css";

import { SERVER_ORIGIN, vars } from "../../utilities/constants";
import {
  roundOffDecimalPlaces,
  refreshScreen,
  generateQuizInstructions,
} from "../../utilities/helper_functions";

// todo: a user must not be able to leave any question unanswered in the quiz

const UserQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [storedQuizScore, setStoredQuizScore] = useState(-1);
  const [isEligibleToTakeQuiz, setIsEligibleToTakeQuiz] = useState(false);

  const [response, setResponse] = useState([]);
  const [currQuizScore, setCurrQuizScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizScore, setShowQuizScore] = useState(false);
  const [hasPassedQuiz, setHasPassedQuiz] = useState(false);
  const [hasPassedQuizFirstTime, setHasPassedQuizFirstTime] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  //FOR COUNTDOWN COMPONENT
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      document.getElementById("quiz-submit-btn").click(); // auto submit
      // ! error here, see console
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  useEffect(() => {
    async function getQuiz() {
      setIsLoading(true);

      const { verticalId, courseId, unitId } = params;

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/user/auth/verticals/${verticalId}/courses/${courseId}/units/${unitId}/quiz`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const result = await response.json();
        // console.log(result);

        setIsLoading(false);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 401) {
            navigate("/user/login"); // login or role issue
          } else if (response.status === 403) {
            setIsEligibleToTakeQuiz(false);
          } else if (response.status === 404) {
            navigate("/user/resource-not-found");
          } else {
            toast.error(result.statusText);
          }
        } else if (response.ok && response.status === 200) {
          if (!result.quiz || result.quiz.length === 0) {
            navigate("/user/resource-not-found");
          }

          setQuiz(result.quiz);
          setStoredQuizScore(result.quizScoreInPercent);
          setIsEligibleToTakeQuiz(result.isEligibleToTakeQuiz);

          // console.log(result.quiz);

          let initialResponse = [];
          for (var counter = 0; counter < result.quiz.length; counter++) {
            initialResponse.push([false, false, false, false]);
          }

          setResponse(initialResponse);
        } else {
          // for future
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    getQuiz();
  }, []);

  async function handleSubmitQuiz() {
    // calculating the result
    let correctRespCnt = 0; // count of correct responses
    // console.log(response);

    for (let quizItemIdx = 0; quizItemIdx < quiz.length; quizItemIdx++) {
      let isRespCorrect = true;
      /* if default value of isRespCorrect is true, then this handles all the cases including the edge case when the user doesnot enter
      any response for a question, then it would be correct only if all the options of that question are false */
      // quiz[quizIdx].options.length
      for (let optIdx = 0; optIdx < 4; optIdx++) {
        isRespCorrect =
          isRespCorrect &&
          quiz[quizItemIdx].options[optIdx].isChecked ===
            response[quizItemIdx][optIdx];
      }

      correctRespCnt += isRespCorrect === true;
    }

    // console.log(correctRespCnt);

    let calculatedCurrQuizScore = (correctRespCnt * 100) / quiz.length;

    calculatedCurrQuizScore = roundOffDecimalPlaces(calculatedCurrQuizScore, 2); // round off to two decimal places
    // console.log(calculatedCurrQuizScore);

    // submitting result to server
    setIsLoading(true);

    const { verticalId, courseId, unitId } = params;

    try {
      const response = await fetch(
        `${SERVER_ORIGIN}/user/auth/verticals/${verticalId}/courses/${courseId}/units/${unitId}/quiz/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ quizScoreInPercent: calculatedCurrQuizScore }),
        }
      );

      const result = await response.json();
      // console.log(result);

      if (response.status >= 400 && response.status < 600) {
        if (response.status === 401) {
          navigate("/user/login"); // login or role issue
        } else if (response.status === 403) {
          navigate(-1);
        } else if (response.status === 404) {
          navigate("/user/resource-not-found");
        } else {
          toast.error(result.statusText); // todo: toast notify, dont redirect, allow user to re-press submit button
        }
      } else if (response.ok && response.status === 200) {
        setCurrQuizScore(calculatedCurrQuizScore);
        setHasPassedQuiz(result.hasPassedQuiz);
        setHasPassedQuizFirstTime(result.hasPassedQuizFirstTime);
        setShowQuiz(false);
        setShowQuizScore(true);
      } else {
        // for future
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // console.log(error.message);
    }
  }

  function handleResponseChange(e, quizItemIdx, optIdx) {
    setResponse((prevResponse) => {
      let newResponse = prevResponse;
      const isChecked = e.target.checked;
      newResponse[quizItemIdx][optIdx] = isChecked;
      // console.log(newResponse);
      // console.log(isChecked, quizItemIdx, optIdx);

      return newResponse;
    });
  }

  function handleStartQuizClick() {
    setShowQuiz(true);
  }

  const instructionsElement = (
    <div className={css.instOuterDiv}>
      <SecCard>
        <div>
          <p className={css.instTimeText}>
            Total duration: {quiz.length * 2} minutes
          </p>

          <h2 className={css.secHeading}>Instructions</h2>

          <ul className={css.instListText}>
            {generateQuizInstructions(quiz.length).map((instruction, index) => {
              return <li key={index}>{instruction}</li>;
            })}
          </ul>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            className={css.btn}
            style={{ marginBottom: "1rem" }}
            onClick={handleStartQuizClick}
            disabled={!isEligibleToTakeQuiz ? true : false}
          >
            {isEligibleToTakeQuiz ? "Start Quiz" : "Quiz Locked"}
          </button>

          <p className={css.instScoreText}>
            {storedQuizScore === -1
              ? "You never took this quiz before"
              : `Your latest quiz score is ${storedQuizScore}%`}
          </p>
        </div>
      </SecCard>
    </div>
  );

  const resultElement = (
    <div className={css.resultOuterDiv}>
      <SecCard>
        <h1 className={css.resultText}>Your score: {currQuizScore}%</h1>
        <h5 className={css.resultText}>
          {hasPassedQuiz
            ? hasPassedQuizFirstTime
              ? "Congratulations! your certificate has been unlocked"
              : "Your certificate has already been unlocked"
            : `Note: You need to score atleast ${vars.quiz.CUT_OFF_IN_PERCENT}% to pass the quiz`}
        </h5>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className={css.btn} onClick={refreshScreen}>
            Retake Quiz
          </button>
          <button
            className={css.btn}
            onClick={() => {
              // reference: https://stackoverflow.com/questions/65948671/how-to-go-back-to-previous-route-in-react-router-dom-v6
              if (window.history.state && window.history.state.idx > 0) {
                navigate(-1); // there's a page behind this
              } else {
                navigate("/", { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
              }
            }}
          >
            Go back to Unit
          </button>
        </div>
      </SecCard>

      {hasPassedQuizFirstTime ? <Party /> : null}
    </div>
  );

  const quizElement = (
    <div className={css.quizOuterDiv}>
      {quiz.length === 0 ? (
        <h1 className="nothingText">
          There are currently no questions in this quiz.
        </h1>
      ) : (
        <>
          <div className={css.quizTimerDiv}>
            <SecCard>
              <h4
                style={{
                  fontFamily: "var(--font-family-1)",
                }}
              >
                All the best! Quiz has been started. Tick the correct answers
                before the timer runs out.
              </h4>
              <div style={{ textAlign: "right", fontSize: "3rem" }}>
                <i className="fa-regular fa-clock"></i>{" "}
                <Countdown
                  date={
                    Date.now() +
                    quiz.length * vars.quiz.TIME_PER_QUE_IN_MIN * 60 * 1000
                  }
                  renderer={renderer}
                />
              </div>
            </SecCard>
          </div>

          <div className={css.quizDiv}>
            <SecCard>
              {quiz.map((quizItem, quizItemIdx) => {
                return (
                  <div key={quizItemIdx} className={css.quizItemDiv}>
                    <p>
                      {quizItemIdx + 1}. {quizItem.question}
                    </p>

                    {quizItem.options.map((option, optIdx) => {
                      return (
                        <div
                          key={quizItemIdx * 11 + optIdx + 1}
                          // style={{ display: "block" }}
                        >
                          <input
                            className="form-check-input"
                            style={{
                              marginLeft: "0.5rem",
                            }}
                            type="checkbox"
                            id={quizItemIdx * 11 + optIdx + 1}
                            // defaultChecked={response[quizItemIdx][optIdx]}
                            // checked={response[quizItemIdx][optIdx]}
                            value={response[quizItemIdx][optIdx]}
                            // checked={true}
                            onChange={(e) => {
                              handleResponseChange(e, quizItemIdx, optIdx);
                            }}
                          />
                          {/* <label style={{ border: "2px solid red" }}>
                            {option.text}
                          </label> */}
                          <p
                            style={{
                              border: "2px solid white",
                              display: "inline",
                              marginLeft: "0.7rem",
                            }}
                          >
                            {option.text}
                          </p>
                        </div>
                      );
                    })}

                    <hr />
                  </div>
                );
              })}

              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <button className={css.btn} onClick={handleSubmitQuiz}>
                  Submit Quiz
                </button>
              </div>
            </SecCard>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : showQuiz ? (
        quizElement
      ) : showQuizScore ? (
        resultElement
      ) : (
        instructionsElement
      )}
    </>
  );
};

export default UserQuiz;
