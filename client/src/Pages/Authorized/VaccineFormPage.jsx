import React from "react";
import { useNavigate } from "react-router-dom";
import { VaccineModule } from "../../Modules/Authorized";
import { Formbar } from "../../Components/ui";

function VaccineFormPage() {
  const navigate = useNavigate();

  return (
    <div className="text-sm ... sm:text-base">
      <Formbar
        headerText="Vaccination Profile"
        fixedTop
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/vaccine");
        }}
      />

      <div className="mx-5 py-20 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <VaccineModule />
      </div>
    </div>
  );
}

export default VaccineFormPage;
