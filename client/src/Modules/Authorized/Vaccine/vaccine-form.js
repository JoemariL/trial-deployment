export const VaccineFormInitialState = {
  vacStatus: "",
  vacDate: "",
  vacSerial: "",
};

export const VaccinFormValidations = [
  ({ vacDate }) =>
    isRequired(vacDate) || {
      vacDate: "Please enter your date of last dose of your vaccine.",
    },
  ({ vacSerial }) =>
    isRequired(vacSerial) || {
      vacSerial: "Please enter your vaccination card serial no.",
    },
];

const isRequired = (value) => {
  return value !== null && value.trim().length > 0;
};
