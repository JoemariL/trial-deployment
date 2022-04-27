import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formbar, Success } from "../../Components/ui";
import { RegisterModule } from "../../Modules/Authorized";

function Register() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const successPopUp = () => {
    setSuccess(!success);
  };

  return (
    <div className="text-sm ... sm:text-base">
      {success && (
        <Success
          header="SUCCESS"
          message="Your account has been successfully created!"
          route="/login"
        />
      )}

      <Formbar
        headerText="Create your account"
        fixedTop
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/login");
        }}
      />

      <div className="mx-5 py-20 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <RegisterModule onSuccess={successPopUp} />
      </div>
    </div>
  );
}

export default Register;
