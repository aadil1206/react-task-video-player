import React from 'react';



const InputField = (props) => {
  const {
    label,
    htmlFor,
    placeholder,
    error,
    errorMsg,
    value,
    onChange,
    textSize,
    height,
    className,
  } = props;

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label ? (
        <label className="text-[#121212]" htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          type={"text"}
          placeholder={placeholder}
          className={`w-full py-2 px-3 rounded-md bg-[#d9d9d940] text-[#121212] ${textSize} ${height} placeholder:text-[#ffffff80] ${
            error ? "border border-red-500" : ""
          }`}
          value={value}
          onChange={onChange}
          autoComplete="on"
        />
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
    </div>
  );
};

export default InputField;
