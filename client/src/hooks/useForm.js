import { useCallback, useState } from "react";

const useForm = (formState = {}, validations = []) => {
  // Validate the values on the form.
  const validate = useCallback((validations, values) => {
    const errors = validations
      .map((validation) => validation(values))
      .filter((validation) => typeof validation === "object");
    return {
      isValid: errors.length === 0,
      errors: errors.reduce((errors, error) => ({ ...errors, ...error }), {}), // Accumulate all errors.
    };
  }, []);

  const { isValid, errors } = validate(validations, formState);
  const [formValues, setFormValues] = useState(formState);
  const [formErrors, setFormErrors] = useState(errors);
  const [isFormValid, setIsFormValid] = useState(isValid);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [inputTouched, setInputTouched] = useState({});

  // Detect changes on the form.
  const changeHandler = useCallback(
    (event) => {
      const newValues = {
        ...formValues,
        [event.target.name]: event.target.value,
      };
      const { isValid, errors } = validate(validations, newValues);
      setFormValues(newValues);
      setIsFormValid(isValid);
      setFormErrors(errors);
      setInputTouched({ ...inputTouched, [event.target.name]: true });
      if (inputTouched) setIsFormTouched(true);
    },
    [formValues, validate, validations, inputTouched]
  );

  return {
    formValues,
    isFormValid,
    formErrors,
    isFormTouched,
    inputTouched,
    changeHandler,
    setFormValues,
    setInputTouched,
    setIsFormTouched,
    setIsFormValid,
    setFormErrors,
  };
};

export default useForm;
