export const RegisterFormInitialState = {
  userType: "STUDENT",
  firstName: "",
  lastName: "",
  age: "",
  contactNumber: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterFormValidations = [
  ({ firstName }) =>
    isRequired(firstName) || { firstName: "First name is required." },
  ({ lastName }) =>
    isRequired(lastName) || { lastName: "Last name is required." },
  ({ age }) => isRequired(age) || { age: "Age is required" },
  ({ age }) => isValidNumber(age) && { age: "The age you entered is invalid." },
  ({ contactNumber }) =>
    isRequired(contactNumber) || {
      contactNumber: "Contact number is required.",
    },
  ({ address }) =>
    isRequired(address) || { address: "Local address is required." },
  ({ email }) => isRequired(email) || { email: "Email address is required." },
  ({ email }) =>
    isValidEmail(email) && {
      email:
        "The email you entered is invalid. Please use the university email: (@slu.edu.ph).",
    },
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

const isValidEmail = (value) => {
  const pattern = /^[a-zA-Z0-9.]+@slu\.edu.ph$/;
  if (value) return !pattern.test(value);
};

const isSamePassword = (value, equalValue) => {
  return value === equalValue;
};
