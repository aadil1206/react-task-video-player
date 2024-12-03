import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Context from "../components/context";

const PrivateRoutes = () => {
  const token = localStorage.getItem("email");
  const token2 = localStorage.getItem("password");
  const { EmaiDB, setEmailDB, PasswordDB, setPasswordDB } = useContext(Context);
  // let auth = {'token' : token }
  return EmaiDB && PasswordDB ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
