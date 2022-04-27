import React from "react";
import { useNavigate } from "react-router-dom";
import { Formbar } from "../../Components/ui";
import { UpdateProfileModule } from "../../Modules/Authorized";

function UpdateProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="text-sm ... sm:text-base">
      <Formbar
        headerText="Update profile"
        fixedTop
        onReturnClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      />

      <div className="mx-5 py-20 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <UpdateProfileModule />
      </div>
    </div>
  );
}

export default UpdateProfilePage;
