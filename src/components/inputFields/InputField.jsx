// ** Third Party Components
import PropTypes from "prop-types";

const InputField = (props) => {
  const { label, htmlFor, placeholder, error,errorMsg, value, onChange, textSize, height, className } = props;

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
        {label ? (
          <label className='' htmlFor={htmlFor}>
            {label}
          </label>
        ) : null}
      <div className='relative'>
        <input
          type={"text"}
          placeholder={placeholder}
          className={`w-full py-2 px-3 rounded-md bg-[#d9d9d940] text-white ${textSize} ${height} placeholder:text-[#ffffff80] ${
            error ? "border border-red-500" : ""
          }`}
          value={value}
          onChange={onChange}
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

InputField.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
};

InputField.defaultProps = {
  textSize : "text-sm",
  height: "h-[38px]"
};
