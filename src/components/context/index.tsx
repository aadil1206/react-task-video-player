import React from "react";
import { createContext } from "react";

type AuthContextType = {
    EmaiDB: string;
    setEmailDB: (value: string) => void;
    PasswordDB: string;
    setPasswordDB: (value: string) => void;
  };

export const Context = createContext<AuthContextType|undefined>(undefined);


export default Context;
