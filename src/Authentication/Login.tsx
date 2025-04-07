import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import InputPassword from "../components/inputFields/InputPassword";
// import LoginArt from "../../assets/images/login/login-v3.webp";
// import DJFYText from "../../assets/images/logo/djfy-text.webp";
import validate from "validate.js";
import { requiredSchema } from "../Schema/Schema";
import { useState, useEffect, useContext } from "react";
import InputField from "../components/inputFields/InputField";
// import {loginAdmin} from "./api/index";
import { toast } from "react-toastify";
import Context from "../components/context";
const Login = () => {
  const navigate = useNavigate();
  const { EmaiDB, setEmailDB, PasswordDB, setPasswordDB } = useContext(Context);
  const initialState = {
    isValid: false,
    touched: {},
    errors: {},
    values: {
      email: "",
      password: "",
    },
  };
  const [formState, setFormState] = useState({ ...initialState });
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") ? true : false
  );
  const schema = {
    email: {
      presence: { allowEmpty: false, message: "or UserName is required" },
    },
    password: requiredSchema,
  };
  useEffect(() => {
    // Reset form state when component mounts
    // setFormState({ ...initialState });

    // Optionally clear localStorage if not "remember me"

    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }, []);
  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values, formState.isValid]);

  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);
  const displayErrorMessage = function (msg) {
    if (msg) {
      if (typeof msg === "object") {
        if (msg.length == 1) {
          return msg[0];
        }
        return msg[0].substring(0, msg[0].indexOf("."));
      }
    }
    return msg;
  };
  const handleChangeEmail = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        email: event.target.value,
      },
      touched: {
        ...formState.touched,
        email: true,
      },
    }));
  };
  const handleChangePassword = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        password: event.target.value,
      },
      touched: {
        ...formState.touched,
        password: true,
      },
    }));
  };
  useEffect(() => {
    console.log(formState);
  }, [formState]);
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("email", formState.values.email);
    localStorage.setItem("password", formState.values.password);
    toast("succesful login", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "djfy-toast border-gradient",
    });
    setPasswordDB(localStorage.getItem("password"));
    setEmailDB(localStorage.getItem("email"));
    if (formState.values.email && formState.values.password) {
      navigate("/mainPage");
    }
  };

  const handleRemeberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className="login-container container mx-auto">
      <div className="grid  grid-cols-4 p-4 login-wrapper w-full mx-auto content-center">
        <div className="col-span-1 hidden sm:flex"></div>
        <div className="col-span-4 sm:col-span-2  flex flex-col justify-center items-center gap-3 p-8 lg:p-16 bg-[#ff9933]">
          <div className="flex flex-col gap-1 w-full mb-8">
            <div className="text-sm lg:text-sm text-[#121212]">
              Please sign-in to your account
            </div>
          </div>

          <form
            className="flex flex-col gap-5 w-full mb-8"
            // onSubmit={handleSubmit}
          >
            <InputField
              placeholder={"Enter your Email or Username"}
              label={"Email or Username"}
              error={hasError("email")}
              errorMsg={displayErrorMessage(formState.errors.email)}
              value={formState.values.email || ""}
              onChange={handleChangeEmail}
            />

            <InputPassword
              label={"Password"}
              placeholder={"Enter your Password"}
              error={hasError("password")}
              errorMsg={displayErrorMessage(formState.errors.password)}
              forgotPassword={true}
              visible={false}
              value={formState.values.password || ""}
              onChange={handleChangePassword}
            />

            <button
              type="submit"
              className={` rounded-lg w-[140px] h-[36px] bg-[#121212] text-white`}
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </form>
        </div>
        <div className="col-span-1 hidden sm:flex"></div>
      </div>
    </div>
  );
};

export default Login;
