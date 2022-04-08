export const VisitorVaccineFormInitialState = {
  vaccine_status: "",
  vaccine_date: "",
  vaccine_serial_no: "",
};

export const VisitorVaccinFormValidations = [
  ({ vaccine_date }) =>
    isRequired(vaccine_date) || {
      vacDate: "Please enter your date of last dose of your vaccine.",
    },
  ({ vaccine_serial_no }) =>
    isRequired(vaccine_serial_no) || {
      vaccine_serial_no: "Please enter your vaccination card serial no.",
    },
];

const isRequired = (value) => {
  return value !== null && value.trim().length > 0;
};
