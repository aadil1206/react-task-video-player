// src/components/inputFields/InputField.tsx

import React, { ChangeEvent } from "react";

export interface InputFieldProps {
  placeholder: string;
  label: string;
  error: string;
  errorMsg?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  label,
  error,
  errorMsg,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}</label>
      <input
        className={`p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="text-red-500 text-sm">{errorMsg}</span>}
    </div>
  );
};

export default InputField;
