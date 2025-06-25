import React from "react";
import { createContext } from "react";
import { YouTubePlayer } from "react-youtube";

interface Note {
  videoID: string;
  note: string;
  timestamp: number | undefined;
  currentDate: string;
  useId: string;
}

type AuthContextType = {
  EmailDB: string;
  setEmailDB: (value: string) => void;
  videoRef: React.MutableRefObject<YouTubePlayer | null>;

  PasswordDB: string;
  setPasswordDB: (value: string) => void;
  language: string[];
  toggle: string;

  baseImage: string;
  setBaseImage: (value: string) => void;
  settoggle: (value: string) => void;
  toggling: () => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  notes: Note[];
  handleSeek: (time: number) => void;
  id: string | undefined;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  player: YouTubePlayer | null;
  setPlayer: React.Dispatch<React.SetStateAction<YouTubePlayer | null>>;
  removeNotes: (id: string) => void;
  handleNotes: (props: string) => void;
  TimeStamp: string;
  setTimeStamp: React.Dispatch<React.SetStateAction<string>>;
  updateNotes: ([id, newNote]: [string, string]) => void;

  Image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
};

export const Context = createContext<AuthContextType | undefined>(undefined);

export default Context;
