import React, {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../components/inputFields/InputPassword";
import InputField from "../components/inputFields/InputField";
import validate from "validate.js";
import { requiredSchema } from "../Schema/Schema";
import { toast } from "react-toastify";
import Context from "../components/context";


interface AuthContextType {
  EmailDB: string;
  setEmailDB: (email: string) => void;
  PasswordDB: string;
  setPasswordDB: (password: string) => void;
}

interface FormState {
  isValid: boolean;
  touched: { [key: string]: boolean };
  errors: { [key: string]: string[] | undefined };
  values: { email: string; password: string };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(Context) as AuthContextType;

  const initialState: FormState = {
    isValid: false,
    touched: {},
    errors: {},
    values: {
      email: "",
      password: "",
    },
  };

  const [formState, setFormState] = useState<FormState>({ ...initialState });
  const [rememberMe, setRememberMe] = useState<boolean>(
    localStorage.getItem("rememberMe") ? true : false
  );

  const schema = {
    email: {
      presence: { allowEmpty: false, message: "or UserName is required" },
    },
    password: requiredSchema,
  };

  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((prev) => ({
      ...prev,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const hasError = (field: string): string => {
    return formState.touched[field] && formState.errors[field] ? "true" : "";
  };

  const displayErrorMessage = (msg: string[] | undefined): string => {
    return msg?.[0]?.split(".")[0] ?? "";
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const value = event.target.value;
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, email: value },
      touched: { ...prev.touched, email: true },
    }));
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const value = event.target.value;
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, password: value },
      touched: { ...prev.touched, password: true },
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    localStorage.setItem("email", formState.values.email);
    localStorage.setItem("password", formState.values.password);

    toast("Successful login", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "djfy-toast border-gradient",
    });

    const getPass = localStorage.getItem("password");
    const getMail = localStorage.getItem("email");

    if (getPass) context.setPasswordDB(getPass);
    if (getMail) context.setEmailDB(getMail);

    if (formState.values.email && formState.values.password) {
      navigate("/mainPage");
    }
  };

  const handleRememberMe = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className="login-container container mx-auto">
      <div className="grid grid-cols-4 p-4 login-wrapper w-full mx-auto content-center">
        <div className="col-span-1 hidden sm:flex"></div>
        <div className="col-span-4 sm:col-span-2 flex flex-col justify-center items-center gap-3 p-8 lg:p-16 bg-[#ff9933]">
          <div className="flex flex-col gap-1 w-full mb-8">
            <div className="text-sm lg:text-sm text-[#121212]">
              Please sign-in to your account
            </div>
          </div>
          <form className="flex flex-col gap-5 w-full mb-8">
            <InputField
              placeholder="Enter your Email or Username"
              label="Email or Username"
              error={hasError("email")}
              errorMsg={displayErrorMessage(formState.errors.email)}
              value={formState.values.email}
              onChange={handleChangeEmail}
            />
            <InputPassword
              label="Password"
              placeholder="Enter your Password"
              error={hasError("password")}
              errorMsg={displayErrorMessage(formState.errors.password)}
              forgotPassword={true}
              visible={false}
              value={formState.values.password}
              onChange={handleChangePassword}
            />
            <div className="flex items-center justify-between">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />{" "}
                Remember Me
              </label>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-black text-white py-2 px-4 rounded"
            >
              Login
            </button>
          </form>
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
