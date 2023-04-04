import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

// My components
import VideoPlayer from "../../components/user/VideoPlayer";
import UnitText from "../../components/user/UnitText";
import SecCard from "../../components/common/SecCard";
import UnitActivity from "../../components/user/UnitActivity";
import HeaderCard from "../../components/common/HeaderCard";
import Loader from "../../components/common/Loader";

// My css
import "../../css/user/u-single-unit-page.css";
import css from "../../css/user/single-unit-page.module.css";

import { SERVER_ORIGIN, vars } from "../../utilities/constants";

///////////////////////////////////////////////////////////////////////////////////////////////////

const UserSingleUnit = () => {
  const [unit, setUnit] = useState({
    video: null,
    text: "",
    activities: [],
  });
  const [isCertBtnDisabled, setIsCertBtnDisabled] = useState(true);
  const [isQuizBtnDisabled, setIsQuizBtnDisabled] = useState(false);
  // const [courseInfo, setCourseInfo] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);
  const [certId, setCertId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getUnit() {
      setIsLoading(true);
      const { verticalId, courseId, unitId } = params;

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/user/auth/verticals/${verticalId}/courses/${courseId}/units/${unitId}`,
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
          } else if (response.status === 404) {
            navigate("/user/resource-not-found");
          } else {
            toast.error(result.statusText);
          }
        } else if (response.ok && response.status === 200) {
          setUnit(result.unit);
          setVideoInfo(result.unit.video);
          setIsQuizBtnDisabled(!result.isEligibleToTakeQuiz);
          // setCourseInfo(result.courseInfo);
          // setUserInfo(result.userInfo);

          setCertId(result.certId);

          setIsCertBtnDisabled(!result.isCertGenerated);

          // console.log(result);

          // we also have userDoc here
        } else {
          // for future
        }
      } catch (err) {
        // console.log(err.message);
        setIsLoading(false);
      }
    }

    getUnit();
  }, []);

  function handleOpenQuizClick() {
    const { verticalId, courseId, unitId } = params;

    navigate(
      `/user/verticals/${verticalId}/courses/${courseId}/units/${unitId}/quiz`
    );
  }

  function handleGetCertificate() {
    // const userMongoId = userInfo._id;
    // const { verticalId, courseId, unitId } = params;

    // console.log(certId);
    navigate(`/user/certificate/${certId}`);
  }

  const element = (
    <div className={css.outerDiv}>
      {unit.video !== null ? <VideoPlayer video={unit.video} /> : null}

      {unit.video ? (
        <div className={css.common}>
          <HeaderCard>
            {unit.video.title && unit.video.title.length > 0 ? (
              <h1 className={css.vdoTitle}>{unit.video.title}</h1>
            ) : null}
            {unit.video.desc && unit.video.desc.length > 0 ? (
              <p className={css.vdoDesc}>
                What you'll learn: {unit.video.desc}
              </p>
            ) : null}
          </HeaderCard>
        </div>
      ) : null}

      {unit.text && unit.text.length > 0 ? (
        <div className={css.common}>
          <SecCard>
            <h2 className={css.secHeading}>Text to read</h2>
            <UnitText text={unit.text} />
          </SecCard>
        </div>
      ) : null}

      {unit.activities && unit.activities.length > 0 ? (
        <div className={css.common}>
          <SecCard>
            <h2 className={css.secHeading}>Activities</h2>

            {unit.activities.map((activity, index) => {
              return (
                <div key={index}>
                  <UnitActivity index={index} activity={activity} />
                </div>
              );
            })}
          </SecCard>
        </div>
      ) : null}

      {unit.quiz && unit.quiz.length > 0 ? (
        <div className="row">
          <div className={`${css.quizDiv} ${css.common} col-lg-6 col-md-6`}>
            <SecCard>
              <h2 className={css.secHeading}>Quiz</h2>

              <p className={css.secText}>
                {isQuizBtnDisabled
                  ? `Note: You need to watch atleast ${vars.video.MIN_WATCH_TIME_IN_PERCENT}% of the video to unlock the quiz. (Kindly refresh the page after watching video to unlock the quiz.)`
                  : "Quiz has been unlocked, click the button below to take quiz."}
              </p>

              <button
                className={css.secBtn}
                onClick={handleOpenQuizClick}
                disabled={isQuizBtnDisabled}
              >
                {isQuizBtnDisabled ? "Quiz Locked" : "Open Quiz"}
              </button>
            </SecCard>
          </div>

          <div className={`${css.certDiv} ${css.common} col-lg-6 col-md-6`}>
            <SecCard>
              <h2 className={css.secHeading}>Certificate</h2>

              <p className={css.secText}>
                {isCertBtnDisabled
                  ? `Note: To get the certificate you have to score atleast ${vars.quiz.CUT_OFF_IN_PERCENT}% in the quiz.`
                  : "Congratulations! Your certificate has been generated. Click on the button below to download your certificate."}
              </p>
              <button
                className={css.secBtn}
                onClick={handleGetCertificate}
                disabled={isCertBtnDisabled}
              >
                {isCertBtnDisabled ? "Certificate Locked" : "Get Certificate"}
              </button>
            </SecCard>
          </div>
        </div>
      ) : null}
    </div>
  );

  return <>{isLoading ? <Loader /> : element}</>;
};

export default UserSingleUnit;
