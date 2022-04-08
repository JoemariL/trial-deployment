import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import {
  VisitorFormInitialState,
  VisitorFormValidations,
} from "./visitor-form";
import { Input, Button } from "../../../Components/commons";

const VisitorModule = ({ onNext = () => {} }) => {
  const { changeHandler, setFormValues, formValues, formErrors, inputTouched } =
    useForm(VisitorFormInitialState, VisitorFormValidations);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    localStorage.setItem("userInfo", JSON.stringify(formValues));
    setIsLoading(false);
    onNext();
  };

  useEffect(() => {
    let guest = JSON.parse(localStorage.getItem("userInfo"));
    setFormValues(guest);
  }, [setFormValues]);

  return (
    <>
      <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">
            ENTER YOUR BASIC INFORMATION
          </span>

          <div>
            <Input
              placeholder="Enter your First Name"
              id="first_name"
              name="first_name"
              type="text"
              value={formValues?.first_name ? formValues.first_name : ""}
              required
              error={inputTouched.first_name && formErrors.first_name}
              onChange={changeHandler}
            />

            <Input
              placeholder="Enter your Last Name"
              id="last_name"
              name="last_name"
              type="text"
              value={formValues?.last_name ? formValues.last_name : ""}
              required
              error={inputTouched.last_name && formErrors.last_name}
              onChange={changeHandler}
            />

            <Input
              placeholder="Enter your Age"
              id="age"
              name="age"
              type="text"
              value={formValues?.age ? formValues.age : ""}
              required
              error={inputTouched.age && formErrors.age}
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">
            ENTER YOUR CONTACT INFORMATION
          </span>

          <div>
            <Input
              placeholder="Enter your Contact Number"
              id="contact_number"
              name="contact_number"
              type="text"
              value={
                formValues?.contact_number ? formValues.contact_number : ""
              }
              required
              error={inputTouched.contact_number && formErrors.contact_number}
              onChange={changeHandler}
            />

            <Input
              placeholder="Enter Local Address"
              id="home_address"
              name="home_address"
              type="text"
              value={formValues?.home_address ? formValues.home_address : ""}
              required
              error={inputTouched.home_address && formErrors.home_address}
              onChange={changeHandler}
            />
          </div>
        </div>

        <Button label="Next" type="submit" roundedFull loading={isLoading} />
      </form>
    </>
  );
};

export default VisitorModule;
