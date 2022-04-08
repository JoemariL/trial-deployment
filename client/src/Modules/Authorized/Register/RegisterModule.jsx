import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../actions/authActions";
import useForm from "../../../hooks/useForm";
import {
  RegisterFormInitialState,
  RegisterFormValidations,
} from "./register-form";
import { Select, Input, Button, Checkbox } from "../../../Components/commons";

const userTypes = ["STUDENT", "EMPLOYEE"];

const RegisterModule = () => {
  const {
    changeHandler,
    formValues,
    setFormErrors,
    formErrors,
    isFormValid,
    inputTouched,
  } = useForm(RegisterFormInitialState, RegisterFormValidations);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await register(formValues);

    // TODO: Success message.
    if (response.hasOwnProperty("message")) {
      setFormErrors({ email: response?.message });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert("Register successful!");
      navigate("/login");
    }
  };

  return (
    <>
      <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3">
          <span className="text-lg">What are you?</span>
          <Select
            name="userType"
            asFormInput
            items={userTypes}
            subtitle="Please choose your appropriate type as user of this application."
            onChange={changeHandler}
          />
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">
            BASIC USER INFORMATION
          </span>

          <div>
            <Input
              placeholder="Enter your First Name"
              id="firstName"
              name="firstName"
              type="text"
              required
              error={inputTouched.firstName && formErrors.firstName}
              onChange={changeHandler}
            />

            <Input
              placeholder="Enter your Last Name"
              id="lastName"
              name="lastName"
              type="text"
              required
              error={inputTouched.lastName && formErrors.lastName}
              onChange={changeHandler}
            />

            <Input
              placeholder="Enter your Age"
              id="age"
              name="age"
              type="text"
              required
              error={inputTouched.age && formErrors.age}
              onChange={changeHandler}
            />
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">
            BASIC CONTACT INFORMATION
          </span>

          <div>
            <Input
              placeholder="Enter your Contact Number"
              id="contactNumber"
              name="contactNumber"
              type="text"
              required
              error={inputTouched.contactNumber && formErrors.contactNumber}
              onChange={changeHandler}
            />

            <Input
              placeholder="Enter Local Address"
              id="address"
              name="address"
              type="text"
              required
              error={inputTouched.address && formErrors.address}
              onChange={changeHandler}
            />
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">
            ACCOUNT INFORMATION
          </span>

          <div className="space-y-3">
            <Input
              placeholder="Enter your Email Address"
              id="email"
              name="email"
              type="text"
              subtitle="You can only use your university email: (@slu.edu.ph)."
              required
              error={inputTouched.email && formErrors.email}
              onChange={changeHandler}
            />

            <div className="flex flex-col space-y-3">
              <div>
                <Input
                  placeholder="Enter your Password"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  error={inputTouched.password && formErrors.password}
                  onChange={changeHandler}
                />

                <Input
                  placeholder="Confirm your Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  error={
                    inputTouched.confirmPassword && formErrors.confirmPassword
                  }
                  onChange={changeHandler}
                />
              </div>

              <Checkbox
                name="visiblePassword"
                id="visiblePassword"
                label="Show password"
                onChange={toggleShowPassword}
              />
            </div>
          </div>
        </div>

        <Button
          label="Register"
          type="submit"
          disabled={!isFormValid}
          loading={isLoading}
        />
      </form>
    </>
  );
};

export default RegisterModule;
