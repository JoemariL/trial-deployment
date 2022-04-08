import React from "react";
import { useNavigate } from "react-router-dom";
import { HDFModule } from "../../Modules/Authorized";
import { Formbar } from "../../Components/ui";

function HDFormPage() {
  const navigate = useNavigate();

  return (
    <div className="text-sm ... sm:text-base">
      <Formbar
        headerText="Fill out your HDF"
        fixedTop
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/hdf");
        }}
      />

      <div className="mx-5 py-20 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <HDFModule />
      </div>
    </div>
  );
}

export default HDFormPage;
