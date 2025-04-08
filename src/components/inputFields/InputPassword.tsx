// ** React Imports
import { useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';

// ** Third Party Components

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputPassword = (props) => {
  const {
    label,
    htmlFor,
    placeholder,
    error,
    errorMsg,
    forgotPassword,
    value,
    onChange,
  } = props;

  const [inputVisibility, setInputVisibility] = useState(false);

  const renderIcon = () => {
    if (inputVisibility === false) {
      return <AiOutlineEyeInvisible size={20} />;
    } else {
      return <AiOutlineEye size={20} />;
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-start">
        {label ? (
          <label className="text-[#121212]" htmlFor={htmlFor}>
            {label}
          </label>
        ) : null}
        {forgotPassword ? (
          <Link to={"/forgotPassword"} className="text-[#F7AA16]">
            Forgot Password?
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="relative">
        <input
          type={inputVisibility === false ? "password" : "text"}
          placeholder={placeholder ? placeholder : "············"}
          className={`w-full py-2 px-3 rounded-md bg-[#d9d9d940] text-[#121212] text-sm placeholder:text-[#ffffff80] ${
            error ? "border border-red-500" : ""
          }`}
          value={value}
          onChange={onChange}
          autoComplete="on"
        />
        <div
          className="cursor-pointer absolute right-2 top-[50%] translate-y-[-50%]"
          onClick={() => setInputVisibility(!inputVisibility)}
        >
          {renderIcon()}
        </div>
      </div>
      {error ? (
        <div
          className={`error-msg break-words text-red-500 text-sm ${
            error ? "active" : ""
          }`}
        >
          {errorMsg}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InputPassword;
