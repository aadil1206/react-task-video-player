import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "../Layout/Layout";
import ForgotPassword from "../Authentication/ForgotPassword";
import ResetPassword from "../Authentication/ResetPassword";
import PrivateRoutes from "./PrivateRoute";
import ErrorPage from "../error/ErrorPage";

const Login = lazy(() => import("../Authentication/Login"));

const AllRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/*" element={<Layout />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default AllRoutes;
