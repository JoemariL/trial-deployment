import React from "react";
import { useNavigate } from "react-router-dom";
import { AppLogo } from "../Components/ui";
import { Button } from "../Components/commons";

function Introduction() {
  const navigate = useNavigate();

  return (
    <div className="ease-in-out duration-300 sm:text-base sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
      <div className="min-h-screen flex flex-col justify-center items-center space-y-16">
        <AppLogo />

        <div className="w-full px-16 flex flex-col gap-y-3">
          <Button
            buttonStyle="primary"
            label="Login as User"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          />
          <Button
            secondary
            label="Continue as Guest"
            onClick={(e) => {
              e.preventDefault();
              navigate("/visitor/fillout");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Introduction;
