import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Context from "../components/context";
import React from "react";

const PrivateRoutes = () => {
  const token = localStorage.getItem("email");
  const token2 = localStorage.getItem("password");
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context must be used within a Provider");
  }

  const { EmailDB, setEmailDB, PasswordDB, setPasswordDB } = context;

  return EmailDB && PasswordDB ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
