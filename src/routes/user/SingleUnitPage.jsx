import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

// My components
import VideoPlayer from "../../components/user/VideoPlayer";
import UnitText from "../../components/user/UnitText";
import SecCard from "../../components/user/SecCard";
import UnitActivity from "../../components/user/UnitActivity";
import HeaderCard from "../../components/common/HeaderCard";
import Loader from "../../components/common/Loader";

// My css
import "../../css/user/u-single-unit-page.css";
import css from "../../css/user/single-unit-page.module.css";

import { SERVER_ORIGIN } from "../../utilities/constants";

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
      console.log(params);
      setIsLoading(true);

      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/user/auth/verticals/${verticalId}/courses/${courseId}/units/${unitId}`,
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
            if (!("isLoggedIn" in result) || result.isLoggedIn === false) {
              navigate("/user/login");
            }
          } else if (response.status === 403) {
            if (result.userDoc) {
              if (result.userDoc.isPassReset === false) {
                toast.error("go to reset password");
              } else if (result.userDoc.isRegistered === false) {
                toast.error("go to registration page");
              }
            } else {
            }
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
      } catch (error) {
        console.log(error.message);
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

      <div className={css.common}>
        <HeaderCard>
          <h1 className={css.vdoTitle}>{videoInfo.title}</h1>
          <p className={css.vdoDesc}>What you'll learn: {videoInfo.desc}</p>
        </HeaderCard>
      </div>

      <div className={css.common}>
        <SecCard>
          <h2 className={css.secHeading}>Text to read</h2>
          <UnitText text={unit.text} />
        </SecCard>
      </div>

      <div className={css.common}>
        {unit.activities !== null ? (
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
        ) : null}
      </div>

      <div className="row">
        <div className={`${css.quizDiv} ${css.common} col-lg-6 col-md-6`}>
          <SecCard>
            <h2 className={css.secHeading}>Quiz</h2>

            <p className={css.secText}>
              {isQuizBtnDisabled
                ? "Note: You need to watch atleast 50% of the video to unlock the quiz. (Kindly refresh the page after watching video to unlock the quiz.)"
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
                ? "Note: To get the certificate you have to score atleast 65% in the quiz."
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
    </div>
  );

  return <>{isLoading ? <Loader /> : element}</>;
};

export default UserSingleUnit;
