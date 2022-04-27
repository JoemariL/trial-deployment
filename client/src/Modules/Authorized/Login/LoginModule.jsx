import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import useAuth from "../../../hooks/useAuth";
import { login } from "../../../actions/authActions";
import { Input, Button } from "../../../Components/commons";

const LoginModule = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isMounted = useRef(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isMounted.current = true;
    const response = await login(email, password);

    // TODO: SUCCESS, ERROR, LOADING.
    if (response.hasOwnProperty("message")) {
      setError(response?.message);
    } else {
      setAuth({ access: response });
      navigate("/main", { replace: true });
      window.location.reload();
    }
    isMounted.current = false;
  };

  return (
    <>
      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Input
            placeholder="Enter your Email Address"
            id="emailAddress"
            name="emailAddres"
            type="email"
            onChange={handleEmail}
            error={error}
            required
          />

          <Input
            placeholder="Enter your Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            iconRight={
              <button type="button" onClick={toggleShowPassword}>
                {showPassword ? (
                  <VscEye className="h-6 w-6 mr-2 text-gray-500" />
                ) : (
                  <VscEyeClosed className="h-6 w-6 mr-2 text-gray-500" />
                )}
              </button>
            }
            onChange={handlePassword}
            required
          />
        </div>

        <Button label="Log In" type="submit" />
      </form>
    </>
  );
};

export default LoginModule;
