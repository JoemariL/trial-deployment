export const HDFormInitialState = {
  covidExposure: false,
  covidPositive: false,
  fever: false,
  cough: false,
  cold: false,
  soreThroat: false,
  diffBreathing: false,
  diarrhea: false,
  pregnant: "",
  deptDestination: "",
};

export const HDFormValidations = [
  ({ deptDestination }) =>
    isRequired(deptDestination) || {
      deptDestination: "Please enter your department or destination.",
    },
];

const isRequired = (value) => {
  return value !== null && value.trim().length > 0;
};
