// src/components/inputFields/InputPassword.tsx

import React, { useState, ChangeEvent } from "react";

export interface InputPasswordProps {
  placeholder: string;
  label: string;
  error: string;
  errorMsg?: string;
  forgotPassword: boolean;
  visible: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  placeholder,
  label,
  error,
  errorMsg,
  forgotPassword,
  visible,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(visible);

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={`p-2 w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-2 top-2 text-sm"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {error && <span className="text-red-500 text-sm">{errorMsg}</span>}
      {forgotPassword && (
        <div className="text-sm text-blue-600 mt-1 cursor-pointer">
          Forgot Password?
        </div>
      )}
    </div>
  );
};

export default InputPassword;
