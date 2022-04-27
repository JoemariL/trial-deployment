import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";

import { Select, Input, Button, Checkbox } from "../../../Components/commons";
import {
  getUserData,
  updateProfile,
  updatePassword,
} from "../../../actions/userActions";

const departmentNames = [
  "SAMCIS",
  "SAS",
  "SEA",
  "SNS",
  "SOL",
  "SOM",
  "SON",
  "STELA",
];

const UpdateProfileModule = () => {
  const [updateDept, setUpdateDept] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    (async function () {
      const user = await getUserData();
      if (user) {
        setUser(user);
        setAge(user.age);
        setNumber(user.contact_number);
        setAddress(user.home_address);
        setDepartment(user.department);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (oldPassword.trim() !== "") {
      const profilePayload = {
        age,
        contactNumber: number,
        homeAddress: address,
        department: department,
      };

      const passwordPayload = {
        oldPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      };

      const profileResponse = await updateProfile(profilePayload);
      const passwordResponse = await updatePassword(passwordPayload);

      //TODO: Message here
      if (profileResponse.hasOwnProperty("message")) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }

      //TODO: Message here
      if (passwordResponse.hasOwnProperty("message")) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      const payload = {
        age,
        contactNumber: number,
        homeAddress: address,
        department: department,
      };

      const response = await updateProfile(payload);
      //TODO: Message here
      if (response.hasOwnProperty("message")) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const toggleUpdateDept = () => {
    setUpdateDept(!updateDept);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3">
          <span className="text-lg">You are a/an</span>
          <Input
            id="userType"
            name="userType"
            type="text"
            disabled
            value={user.user_type ? user.user_type : ""}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <span className="text-lg">Department</span>
          {updateDept ? (
            <Select
              name="department"
              asFormInput
              items={departmentNames}
              subtitle="Select your new department here to update."
              onChange={(e) => setDepartment(e.target.value)}
            />
          ) : (
            <Input
              id="department"
              name="department"
              type="text"
              disabled
              value={department}
            />
          )}

          {updateDept ? (
            <Button label="Enter" onClick={toggleUpdateDept} />
          ) : (
            <Button label="Edit Department" onClick={toggleUpdateDept} />
          )}
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
              disabled
              value={user.first_name ? user.first_name : ""}
            />

            <Input
              placeholder="Enter your Last Name"
              id="lastName"
              name="lastName"
              type="text"
              disabled
              value={user.last_name ? user.last_name : ""}
            />

            <Input
              placeholder="Enter your Age"
              id="age"
              name="age"
              type="text"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
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
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />

            <Input
              placeholder="Enter Local Address"
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
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
              disabled
              value={user.email_address ? user.email_address : ""}
            />
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <span className="text-md font-bold text-gray-500">
            CHANGE PASSWORD
          </span>

          <div className="flex flex-col space-y-3">
            <div>
              <Input
                placeholder="Enter your Old Password"
                id="oldPassword"
                name="oldPassword"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </div>

            <div>
              <Input
                placeholder="Enter your New Password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />

              <Input
                placeholder="Confirm your New Password"
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
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

        <Button label="Save Changes" type="submit" loading={isLoading} />
      </form>
    </>
  );
};

export default UpdateProfileModule;
