import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";



import {toast} from 'react-toastify';


import ErrorPage from "../error/ErrorPage";
import MainPage from "../components/MainPage";

const Layout = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDelay, setIsHoveredDelay] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  let timeoutId = null;

  // const onMouseEnter = () => {
  //   if (isChecked) return;
  //   setIsHovered(true);
  //   timeoutId = setTimeout(() => {
  //     setIsHoveredDelay(true);
  //   }, 200);
  // };

  // const onMouseLeave = () => {
  //   if (isChecked) return;
  //   setIsHovered(false);
  //   if (timeoutId) {
  //     clearTimeout(timeoutId);
  //   }
  //   setTimeout(() => {
  //     setIsHoveredDelay(false);
  //   }, 0);
  // };

  // const isSidebarFixed = (e) => {
  //   const checked = e.target.checked;
  //   setIsChecked(checked);
  //   if (checked) {
  //     setIsHovered(true);
  //     setIsHoveredDelay(true);
  //   } else {
  //     setIsChecked(false);
  //   }
  // };

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

  const [adminData, setAdminData] = useState(null)

  const handleGetAdminData = ()=>{
    // adminProfile().then(response => {  
    //   if(response.data.code === 200){
    //     setAdminData(response.data.data[0]);
    //   }else{
    //     if(response.data.Flag === false){
    //       toast(response.data?.message, {
    //         position: "top-right",
    //         autoClose: 2000,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         className: "djfy-toast border-gradient",
    //       });
    //       navigate("/")
    //       localStorage.removeItem('token')
    //     }else{
    //       toast(response.data?.message, {
    //         position: "top-right",
    //         autoClose: 2000,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         className: "djfy-toast border-gradient",
    //       });
    //     }
    //   }
    // })
  }
  useEffect(()=>{
    handleGetAdminData();
  },[])
  return (
    <>
      <div
        className={`w-full dashboard-sidebar-open ${isHovered ? "absolute" : ""}`}
      >
        
        <Routes>
          <Route path='mainPage' element={<MainPage />} />
       
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      
      </div>
    </>
  );
};

export default Layout;
