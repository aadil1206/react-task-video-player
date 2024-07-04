import React, { useRef, useState } from "react";
import Context from "./index";
import getYouTubeID from "get-youtube-id";
import { v4 as uuidv4 } from "uuid";

const ContextProvider = ({ children }) => {
  const language = ["java", "javascript"];
  const [toggle, settoggle] = useState(language[0]);
  const [baseImage, setBaseImage] = useState("");
  const [TimeStamp, setTimeStamp] = useState("");
  const [Image, setImage] = useState("");
  const videoRef = useRef(null);

  const [id, setId] = useState(null);
  const [player, setPlayer] = useState(null);
  const handleInput = (e) => {
    setId(getYouTubeID(e.target.value));
    
  };
  const toggling = () => {
    if (toggle === language[0]) {
      settoggle(language[1]);
    } else {
      settoggle(language[0]);
    }
  };
  const handleSeek = (props) => {
    player.seekTo(props + 0);
  };
  const [notes, setNotes] = useState([]);
  const handleNotes = (props) => {
    const currentTime = player.getCurrentTime();
    const newDate = new Date();
    let date = newDate.getDate();
    let year = newDate.getFullYear();

    const month = newDate.toLocaleString("default", { month: "long" });
    const datefull = `${date} ${month} ${year}`;
    
    setNotes([
      ...notes,
      { videoID: id, note: props, timestamp: currentTime, currentDate: datefull,useId:uuidv4() },
    ]);
  };
  console.log(notes)
  const removeNotes = (id) => {
    setNotes(
      notes.map((item) => {
        if (item.useId === id) {
          return {
            ...item,
            videoID: null,
          };
        }
        return item;
      })
    );
  };
  const updateNotes = (props) => {
    const newNote = props[1];
    setNotes(
      notes.map((item) => {
        if (item.useId === props[0]) {
          return {
            ...item,
            note: newNote,
          };
        }
        return item;
      })
    );
  };

  return (
    <Context.Provider
      value={{
        toggle,
        toggling,
        language,
        handleInput,
        notes,
        baseImage,
        setBaseImage,
        handleSeek,
        videoRef,
        id,
        player,
        removeNotes,
        handleNotes,
        setPlayer,
        TimeStamp,
        setTimeStamp,
        updateNotes,
        Image,
        setImage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
