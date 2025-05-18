import React from "react";
import { createContext } from "react";

interface Note {
  videoID: string;
  note: string;
  timestamp: number;
  currentDate: string;
  useId: string;
}

type AuthContextType = {
    EmaiDB: string;
    setEmailDB: (value: string) => void;
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
  };

export const Context = createContext<AuthContextType|undefined>(undefined);


export default Context;
