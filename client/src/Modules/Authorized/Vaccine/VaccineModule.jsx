import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { updateVaccine } from "../../../actions/userActions";
import useForm from "../../../hooks/useForm";
import { VaccineFormInitialState, VaccinFormValidations } from "./vaccine-form";
import { Input, Button, RadioButton } from "../../../Components/commons";

const VaccineModule = () => {
  const { changeHandler, formValues } = useForm(
    VaccineFormInitialState,
    VaccinFormValidations
  );

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    let { vacStatus, vacDate: vaccineDate, vacSerial } = formValues;
    let vacDate = new Date(vaccineDate);

    if (vacStatus === "NOT VACCINATED") {
      const response = await updateVaccine({ vacStatus });

      if (response.hasOwnProperty("message")) {
        alert(response.message);
        setIsLoading(false);
      } else {
        alert("Your vaccine profile is updated!");
        setIsLoading(false);
        navigate("/vaccine");
      }
    } else {
      const response = await updateVaccine({ vacStatus, vacDate, vacSerial });

      if (response.hasOwnProperty("message")) {
        alert(response.message);
        setIsLoading(false);
      } else {
        alert("Your vaccine profile is updated!");
        setIsLoading(false);
        navigate("/vaccine");
      }
    }
  };

  return (
    <>
      <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
        <div>
          <p>
            <span className="text-lg font-bold">INSTRUCTION</span>
            <br />
            Setup or update your vaccine profile truthfully.
          </p>
        </div>

        <div className="flex flex-col space-y-5">
          <span className="font-bold">VACCINATION STATUS</span>

          <div className="flex flex-col space-y-3" onChange={changeHandler}>
            <RadioButton
              name="vacStatus"
              id="vacStatus"
              value="FULLY VACCINATED"
              label="FULLY VACCINATED"
            />
            <RadioButton
              name="vacStatus"
              id="vacStatus"
              value="PARTIALLY VACCINATED"
              label="PARTIALLY VACCINATED"
            />
            <RadioButton
              name="vacStatus"
              id="vacStatus"
              value="NOT VACCINATED"
              label="NOT VACCINATED"
            />
          </div>
        </div>

        <div
          className={classnames(
            "space-y-5",
            formValues.vacStatus === "NOT VACCINATED" ? "blur-sm" : ""
          )}
        >
          <div className="flex flex-col space-y-3">
            <p>
              WHEN IS YOUR &nbsp;
              <span className="font-bold">LAST DOSE</span>
              &nbsp; OF A COVID-19 VACCINE?
            </p>
            <Input
              id="vacDate"
              name="vacDate"
              type="date"
              required
              onChange={changeHandler}
              disabled={
                formValues.vacStatus === "NOT VACCINATED" ? true : false
              }
            />
          </div>

          <div className="flex flex-col">
            <span className="font-bold">VACCINATION SERIAL NO.</span>
            <Input
              id="vacSerial"
              name="vacSerial"
              type="text"
              required
              onChange={changeHandler}
              disabled={
                formValues.vacStatus === "NOT VACCINATED" ? true : false
              }
            />
          </div>
        </div>

        <Button label="Save" type="submit" loading={isLoading} />
      </form>
    </>
  );
};

export default VaccineModule;
