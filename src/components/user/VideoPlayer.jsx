import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { SERVER_ORIGIN } from "../../utilities/constants";
import "../../css/user/react-player.css";
import { roundOffDecimalPlaces } from "../../utilities/helper_functions";
// const url = "https://www.youtube.com/watch?v=WQBldOTxN4M";

const VideoPlayer = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  let watchTimeInSec = 0;
  let seekPointInSec = 0;
  let startTimeInSec;
  let totalDurationInSec = 0;

  // get the total duration of the video
  function handleDuration(duration) {
    // console.log("handle duration");
    totalDurationInSec = duration;
  }

  // the current position of the seek-point in seconds wrt 0, runs every seconds
  function handleProgress(state) {
    seekPointInSec = state.playedSeconds;

    if (seekPointInSec < totalDurationInSec - 10) {
      // handlePause function will handle this
      return;
    }

    let endTimeInSec = performance.now() / 1000;
    watchTimeInSec = endTimeInSec - startTimeInSec;
    startTimeInSec = endTimeInSec;

    updateVdoProgress();
  }

  // this function runs when the play button is pressed and also when the vdo starts to run for the first time
  function handlePlay() {
    startTimeInSec = performance.now() / 1000;
  }

  // this function runs when the pause button is pressed and doesnot run when the vdo stops at the last
  function handlePause() {
    if (seekPointInSec >= totalDurationInSec - 10) {
      // handleProgress function will handle this
      return;
    }

    let endTimeInSec = performance.now() / 1000;
    watchTimeInSec = endTimeInSec - startTimeInSec;

    updateVdoProgress();
  }

  async function updateVdoProgress() {
    const { verticalId, courseId, unitId } = params;
    // console.log(params);

    let watchTimeInPercent = (watchTimeInSec * 100) / totalDurationInSec;
    watchTimeInPercent = roundOffDecimalPlaces(watchTimeInPercent, 2);
    // console.log(watchTimeInPercent);

    try {
        const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);
      const response = await fetch(
        `${SERVER_ORIGIN}/api/user/auth/verticals/${verticalId}/courses/${courseId}/units/${unitId}/video/update-progress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
            "Authorization": `Basic ${basicAuth}`,
          },
          body: JSON.stringify({ vdoWatchTimeInPercent: watchTimeInPercent }),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.status >= 400 && response.status < 600) {
        if (response.status === 401) {
          toast.error(
            `${result.statusText}, Please try to login in a new tab, or you might loose your progress`
          );
        } else if (response.status === 404) {
          toast.error(result.statusText);
        } else {
          toast.error(result.statusText);
        }
      } else if (response.ok && response.status === 200) {
        // console.log(result);
      } else {
        // for future
      }
    } catch (error) {
      // console.log(error.message);
    }
  }

  return (
    <div className="player-wrapper" style={{}}>
      <ReactPlayer
        url={props.video.vdoSrc}
        controls={true}
        className="react-player"
        width="100%"
        height="100%"
        onDuration={handleDuration}
        onProgress={handleProgress}
        onPlay={handlePlay}
        onPause={handlePause}
      />
    </div>
  );
};

export default VideoPlayer;
