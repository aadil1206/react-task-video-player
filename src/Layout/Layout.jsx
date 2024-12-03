import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { toast } from "react-toastify";

import ErrorPage from "../error/ErrorPage";
import MainPage from "../components/MainPage";

const Layout = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDelay, setIsHoveredDelay] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  let timeoutId = null;

  const toggleSidebar = () => {
    if (!isChecked) {
      setIsHovered(true);
      timeoutId = setTimeout(() => {
        setIsHoveredDelay(true);
      }, 200);
    } else {
      setIsHovered(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setTimeout(() => {
        setIsHoveredDelay(false);
      }, 0);
    }

    setIsChecked(!isChecked);
  };
  return (
    <>
      <div
        className={`w-full dashboard-sidebar-open ${
          isHovered ? "absolute" : ""
        }`}
      >
        <Routes>
          <Route path="mainPage" element={<MainPage />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
};

export default Layout;
