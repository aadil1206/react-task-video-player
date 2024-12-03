const isRequiredErrorMessage = "is required.";
export const emailSchema = {
  presence: { allowEmpty: false, message: isRequiredErrorMessage },
  email: { message: "is not valid" },
};
export const passwordSchema = {
  presence: { allowEmpty: false, message: isRequiredErrorMessage },
  format: {
    pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$",
    message:
      " needs at least one numeric digit, uppercase , lowercase letter and special character .",
  },
};
export const requiredSchema = {
  presence: { allowEmpty: false, message: isRequiredErrorMessage },
};