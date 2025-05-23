import React, { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-sm">{label}</label>
      <input
        type="text"
        className={`p-2 border rounded ${error ? "border-red-500" : "border-gray-300"}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputField;
