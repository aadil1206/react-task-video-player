import React from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import "../App.css";
import { useContext, useState } from "react";

import Context from "./context";

const Video = () => {
  const [url, seturl] = useState(null);
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context must be used within a Provider");
  }

  const { handleInput, id, videoRef, player, setPlayer } = context;
  const opts: YouTubeProps["opts"] = {
    height: "400",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleReady = (event: { target: YouTubePlayer }) => {
    videoRef.current = event.target;
  };
  console.log(player);
  return (
    <div className="video-main">
      <div className="d-flex justify-content-between align-items-center col-12 mb-3 urlmain">
        <p className="videoMain-text col-6">Video Player With Notes</p>
        <div className="col-6 d-flex flex-column">
          <p className="url-text">Paste Your Youtube Url here</p>
          <input
            type="text"
            onChange={handleInput}
            className="col-12 col-sm-12 border-[1px] border-[#121212] rounded-[8px] h-[34px] px-3"
          />
        </div>
      </div>
      <YouTube videoId={id} opts={opts} onReady={handleReady} />
      <div className="d-flex flex-column justify-content-start mb-3">
        <p className="videoTitleMain">Video title goes here</p>
        <p>This is the description of the video</p>
      </div>
    </div>
  );
};

export default Video;
