import React from "react";
import { createContext } from "react";
import { YouTubePlayer } from 'react-youtube';

interface Note {
 videoID: string;
  note: string;
  timestamp: number|undefined;
  currentDate: string;
  useId: string;
}

type AuthContextType = {
    EmaiDB: string;
    setEmailDB: (value: string) => void;
      videoRef: React.RefObject<YouTubePlayer | null>; // <--- here
    PasswordDB: string;
    setPasswordDB: (value: string) => void;
    language: string[];
    toggle: string;
    
    baseImage:string;
    setBaseImage:(value: string) => void;
    settoggle: (value: string) => void;
    toggling: () => void; // ✅ Add this line
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    notes: Note[];
    handleSeek: (time: number) => void;
      id: string | null;             // id state
  setId: React.Dispatch<React.SetStateAction<string | null>>;  // setId function
    player: YouTubePlayer | null;
  setPlayer: React.Dispatch<React.SetStateAction<YouTubePlayer | null>>;
  };

export const Context = createContext<AuthContextType|undefined>(undefined);


export default Context;
