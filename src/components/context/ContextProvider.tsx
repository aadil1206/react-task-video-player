import React, { useRef, useState ,ChangeEvent} from "react";
import Context from "./index";
import getYouTubeID from "get-youtube-id";
import { v4 as uuidv4 } from "uuid";
import YouTube, { YouTubePlayer } from 'react-youtube';

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const language = ["java", "javascript"];
  const [toggle, settoggle] = useState(language[0]);
  const [baseImage, setBaseImage] = useState<string>("");
  const [TimeStamp, setTimeStamp] = useState("");
const [Image, setImage] = useState<File | null>(null);
  const [EmailDB, setEmailDB] = useState<string>("");

  type passowrddb ={

  }
  const [PasswordDB, setPasswordDB] = useState<string>("");
  
const videoRef = useRef<YouTubePlayer | null>(null);

  const [id, setId] = useState<string | undefined>(undefined);

const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
     const videoId = getYouTubeID(e.target.value) ?? "";
  setId(videoId);
  };
  const toggling = () => {
    if (toggle === language[0]) {
      settoggle(language[1]);
    } else {
      settoggle(language[0]);
    }
  };
  const handleSeek = (props:number) => {
    player?.seekTo(props +0, true);
  };

  interface Note {
    videoID: string;
    note: string; // or whatever type `props` is
    timestamp: number|undefined;
    currentDate: string;
    useId: string;
  }

  const [notes, setNotes] = useState<Note[]>([]);
  const handleNotes = async (props:string) => {
    const currentTime = await player?.getCurrentTime();
    const newDate = new Date();
    let date = newDate.getDate();
    let year = newDate.getFullYear();

    const month = newDate.toLocaleString("default", { month: "long" });
    const datefull = `${date} ${month} ${year}`;

    setNotes([
      ...notes,
      {
        videoID: id??"",
        note: props,
        timestamp: currentTime,
        currentDate: datefull,
        useId: uuidv4(),
      },
    ]);
  };
  console.log(notes);
  const removeNotes = (id:string) => {
    setNotes(
      notes.map((item) => {
        if (item.useId === id) {
          return {
            ...item,
            videoID: "",
          };
        }
        return item;
      })
    );
  };
const updateNotes = ([id, newNote]: [string, string]) => {
  setNotes(
    notes.map((item) => {
      if (item.useId === id) {
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
        settoggle,
        toggling,
        language,
        handleInput,
        notes,
        baseImage,
        setBaseImage,
        handleSeek,
        videoRef,
        id,
        setId,
        player,
        removeNotes,
        handleNotes,
        setPlayer,
        TimeStamp,
        setTimeStamp,
        updateNotes,
        Image,
        setImage,
        EmailDB,
        setEmailDB,
        PasswordDB,
        setPasswordDB,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
