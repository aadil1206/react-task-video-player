import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";

import ErrorPage from "../error/ErrorPage";
import MainPage from "../components/MainPage";

const Layout: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHoveredDelay, setIsHoveredDelay] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  let timeoutId: NodeJS.Timeout | null = null;

  const toggleSidebar = (): void => {
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
