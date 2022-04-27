export const UpdateProfileInitialState = {
  department: "",
  age: "",
  contactNumber: "",
  address: "",
  password: "",
  confirmPassword: "",
};

export const UpdateProfileValidations = [
  ({ age }) => isRequired(age) || { age: "Age is required" },
  ({ age }) => isValidNumber(age) && { age: "The age you entered is invalid." },
  ({ password }) =>
    isRequired(password) || { password: "Password is required." },
  ({ password, confirmPassword }) =>
    isSamePassword(password, confirmPassword) || {
      confirmPassword: "Your passwords did not match. Try again.",
    },
];

const isRequired = (value) => {
  return value !== null && value.trim().length > 0;
};

const isValidNumber = (value) => {
  const pattern = /^[0-9 -]+$/;
  if (value) return !pattern.test(value);
};

const isSamePassword = (value, equalValue) => {
  return value === equalValue;
};
