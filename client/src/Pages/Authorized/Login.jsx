import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginModule } from "../../Modules/Authorized";
import { AppLogo, Formbar } from "../../Components/ui";
import { Button } from "../../Components/commons";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="text-sm ... sm:text-base">
      <Formbar
        headerText="User Log In"
        fixedTop
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      />

      <div className="mx-5 py-24 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <div className="flex flex-col gap-y-10">
          <AppLogo />

          <div className="flex flex-col space-y-2">
            <LoginModule />
            <Button
              label="Create an account"
              type="button"
              secondary
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
