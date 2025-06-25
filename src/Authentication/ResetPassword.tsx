import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import React from "react";
import InputPassword from "../components/inputFields/InputPassword";
// import { resetPassword } from "./api/index";
import { toast } from "react-toastify";
import validate from "validate.js";

interface FormValues {
  token: string | null;
  password: string | null;
  confirm_password: string | null;
}

interface FormState {
  isValid: boolean;
  touched: { [key: string]: boolean };
  errors: { [key: string]: string[] };
  values: FormValues;
}

const ResetPassword = () => {
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();

  const initialState: FormState = {
    isValid: false,
    touched: {},
    errors: {},
    values: {
      token: queryParameters.get("token"),
      password: "",
      confirm_password: "",
    },
  };

  const [formState, setFormState] = useState<FormState>(initialState);

  const schema = {
    confirm_password: {
      equality: "password",
      presence: { allowEmpty: false, message: "is required." },
    },
    password: {
      presence: { allowEmpty: false, message: "is required." },
      format: {
        pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$",
        message:
          " needs at least one numeric digit, uppercase, lowercase letter and special character.",
      },
      length: {
        maximum: 30,
        minimum: 8,
        message: "must be at least 8 characters.",
      },
    },
  };

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const hasError = (field: keyof FormValues): boolean =>
    !!(formState.touched[field] && formState.errors[field]);

  const displayErrorMessage = (msg: any): string | undefined => {
    if (msg) {
      if (typeof msg === "object") {
        if (msg.length === 1) {
          return msg[0];
        }
        return msg[0].substring(0, msg[0].indexOf("."));
      }
    }
    return msg;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleChangeConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        confirm_password: event.target.value,
      },
      touched: {
        ...formState.touched,
        confirm_password: true,
      },
    }));
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="login-container container mx-auto">
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3 gap-4 login-wrapper w-full">
        <div className="col-span-3 lg:col-span-2 hidden lg:flex justify-center items-center w-full lg:p-16"></div>

        <div className="col-span-3 lg:col-span-1 flex flex-col justify-center items-center gap-3 p-8 lg:p-16 lg:bg-[#d9d9d940]">
          <div className="flex flex-col gap-1 w-full mb-5">
            <Link
              className="brand-logo mb-5"
              to="/"
              onClick={(e) => e.preventDefault()}
            ></Link>
            <div className="font-bold text-2xl">Reset Password! ✅</div>
            <div className="text-sm lg:text-sm">
              Enter New Password & Confirm Your Password To Login Again!!
            </div>
          </div>

          <form className="flex flex-col gap-5 w-full mb-8">
            <InputPassword
              label="New Password"
              placeholder="Enter new Password"
              error={hasError("password") ? "true" : ""}
              errorMsg={displayErrorMessage(formState.errors.password)}
              forgotPassword={false}
              visible={false}
              value={formState.values.password || ""}
              onChange={handleChange}
            />

            <InputPassword
              label="Confirm Password"
              placeholder="Enter confirm Password"
              error={hasError("confirm_password") ? "true" : ""}
              errorMsg={displayErrorMessage(formState.errors.confirm_password)}
              forgotPassword={false}
              visible={false}
              value={formState.values.confirm_password || ""}
              onChange={handleChangeConfirm}
            />

            <button
              disabled={!formState.isValid}
              className={`djfy-btn ${
                !formState.isValid ? "disabled" : ""
              } text-center py-2 rounded-lg`}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
