import React from "react";
import YouTube from "react-youtube";
import "../App.css";
import { useContext, useState } from "react";
import Context from "./context";

const Video = () => {
  const [url, seturl] = useState(null);

  const { handleInput, id, videoRef, player, setPlayer } = useContext(Context);
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  
  const handleReady = (e) => {
    setPlayer(e.target);
  };
  return (
    <div className="video-main">
    <div className="d-flex justify-content-between align-items-center col-12 mb-3 urlmain">
    <p className="videoMain-text">Video Player With Notes</p>
      <input type="text" onChange={handleInput} className="col-12 col-sm-6" /></div>
      
      <YouTube videoId={id} opts={opts} ref={videoRef} onReady={handleReady} />
      <div className="d-flex flex-column justify-content-start mb-3">
        <p className="videoTitleMain">Video title goes here</p>
        <p>This is the description of the video</p>
      </div>
    </div>
  );
};

export default Video;
