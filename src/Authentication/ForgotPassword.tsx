import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/inputFields/InputField";
import validate from "validate.js";
import { IoIosArrowBack } from "react-icons/io";
import { emailSchema } from "../Schema/Schema";

import { toast } from "react-toastify";

interface FormValues {
  email: string;
}

interface FormState {
  isValid: boolean;
  touched: {
    [key: string]: boolean;
  };
  errors: {
    [key: string]: string[];
  };
  values: FormValues;
}

const ForgotPassword: React.FC = () => {
  const initialState: FormState = {
    isValid: false,
    touched: {},
    errors: {},
    values: { email: "" },
  };

  const [formState, setFormState] = useState<FormState>({ ...initialState });

  const schema = {
    email: emailSchema,
  };

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const hasError = (field: string): boolean =>
    !!(formState.touched[field] && formState.errors[field]);

  const displayErrorMessage = (msg: any): string => {
    if (msg) {
      if (typeof msg === "object") {
        if (msg.length === 1) {
          return msg[0];
        }
        return msg[0].substring(0, msg[0].indexOf(".")) || msg[0];
      }
    }
    return msg;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        email: event.target.value,
      },
      touched: {
        ...prevFormState.touched,
        email: true,
      },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="login-container container mx-auto">
      <div className="grid grid-cols-4 gap-4 login-wrapper w-full">
        <div className="col-span-1 hidden sm:flex"></div>
        <div className="sm:col-span-2 col-span-4 flex flex-col justify-center items-center gap-3 p-8 lg:p-16 lg:bg-[#d9d9d940]">
          <div className="flex flex-col gap-1 w-full mb-5">
            <Link
              className="brand-logo mb-5"
              to="/"
              onClick={(e) => e.preventDefault()}
            ></Link>
            <div className="font-bold text-2xl">Forgot Password? 🔒</div>
            <div className="text-sm lg:text-sm">
              Enter your email and we&apos;ll send you instructions to reset
              your password
            </div>
          </div>

          <form
            className="flex flex-col gap-5 w-full mb-8"
            onSubmit={handleSubmit}
          >
            <InputField
              placeholder="you@example.com"
              label="Email"
              error={
                hasError("email")
                  ? displayErrorMessage(formState.errors.email)
                  : ""
              }
              value={formState.values.email}
              onChange={handleChange}
            />

            <button
              type="submit"
              className={`djfy-btn ${
                !formState.isValid ? "disabled" : ""
              } text-center py-2 rounded-lg`}
              disabled={!formState.isValid}
            >
              Send Reset Link
            </button>
          </form>

          <Link
            to="/"
            className="text-center py-2 flex gap-2 justify-center items-center"
          >
            <IoIosArrowBack size={20} />
            Back to login
          </Link>
        </div>
        <div className="col-span-1 hidden sm:flex"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
