import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  VisitorModule,
  VisitorVaccineModule,
  VisitorHDFModule,
} from "../../Modules/Guest";
import { Formbar } from "../../Components/ui";

function VisitorFormPage() {
  const navigate = useNavigate();

  const [step, setstep] = useState(1);

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <div className="text-sm ... sm:text-base">
          <Formbar
            headerText="Basic Information"
            fixedTop
            onReturnClick={(e) => {
              e.preventDefault();
              navigate("/visitor/main");
            }}
          />

          <div className="mx-5 py-20 flex flex-col space-y-10 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
            <VisitorModule onNext={nextStep} />
            <div className="mx-16 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full ease-in-out "
                style={{ width: "33.33%" }}
              ></div>
              <div className="p-5 w-full text-center">
                <span>1 of 3</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="text-sm ... sm:text-base">
          <Formbar
            headerText="Vaccination Information"
            fixedTop
            onReturnClick={(e) => {
              e.preventDefault();
              prevStep();
            }}
          />

          <div className="mx-5 py-20 flex flex-col space-y-10 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
            <VisitorVaccineModule onNext={nextStep} />
            <div className="mx-16 bg-gray-200 rounded-full h-2.5 ">
              <div
                className="bg-blue-600 h-2.5 rounded-full ease-in-out "
                style={{ width: "66.66%" }}
              ></div>
              <div className="p-5 w-full text-center">
                <span>2 of 3</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="text-sm ... sm:text-base">
          <Formbar
            headerText="Health Declaration  Form"
            fixedTop
            onReturnClick={(e) => {
              e.preventDefault();
              prevStep();
            }}
          />

          <div className="mx-5 py-20 flex flex-col space-y-10 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
            <VisitorHDFModule />
            <div className="mx-16 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full ease-in-out"
                style={{ width: "100%" }}
              ></div>
              <div className="p-5 w-full text-center">
                <span>3 of 3</span>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return <div className="text-sm ... sm:text-base"></div>;
  }
}

export default VisitorFormPage;
