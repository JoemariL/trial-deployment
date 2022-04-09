export const VisitorHDFormInitialState = {
    covid_exposure: null,
    covid_positive: null,
    fever: false,
    cough: false,
    cold: false,
    sore_throat: false,
    diff_breathing: false,
    diarrhea: false,
    pregnant: "",
    destination: "",
  };
  
  export const VisitorHDFormValidations = [
    ({ destination }) =>
      isRequired(destination) || {
        destination: "Please enter your department or destination.",
      },
  ];
  
  const isRequired = (value) => {
    return value !== null && value.trim().length > 0;
  };
  