import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { updateVaccine } from "../../../actions/userActions";
import useForm from "../../../hooks/useForm";
import { VaccineFormInitialState, VaccineFormValidations } from "./vaccine-form";
import { Input, Button, RadioButton } from "../../../Components/commons";
import { getUserData } from "../../../actions/userActions";

const VaccineModule = () => {
  const { changeHandler, formValues, setFormValues } = useForm(
    VaccineFormInitialState,
    VaccineFormValidations
  );

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const user = await getUserData()
      const vaccine = user.vaccination_details[0]
      if(vaccine) {
        setFormValues(vaccine)
      } else {
        setFormValues(VaccineFormInitialState)
      }
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    let { vaccine_status, vaccine_date: vaccineDate, vaccine_serial_no } = formValues;
    let vacDate = new Date(vaccineDate);

    if (vaccine_status === "NOT VACCINATED") {
      const response = await updateVaccine({ vaccine_status });

      if (response.hasOwnProperty("message")) {
        alert(response.message);
        setIsLoading(false);
      } else {
        alert("Your vaccine profile is updated!");
        setIsLoading(false);
        navigate("/vaccine");
      }
    } else {
      const response = await updateVaccine({ vaccine_status, vaccine_date: vacDate, vaccine_serial_no });

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
              name="vaccine_status"
              id="vaccine_status"
              value="FULLY VACCINATED"
              label="FULLY VACCINATED"
              checked={
                formValues?.vaccine_status === "FULLY VACCINATED" ? true : false
              }
            />
            <RadioButton
              name="vaccine_status"
              id="vaccine_status"
              value="PARTIALLY VACCINATED"
              label="PARTIALLY VACCINATED"
              checked={
                formValues?.vaccine_status === "PARTIALLY VACCINATED"
                  ? true
                  : false
              }
            />
            <RadioButton
              name="vaccine_status"
              id="vaccine_status"
              value="NOT VACCINATED"
              label="NOT VACCINATED"
              checked={
                formValues?.vaccine_status === "NOT VACCINATED" ? true : false
              }
            />
          </div>
        </div>

        <div
          className={classnames(
            "space-y-5",
            formValues?.vaccine_status === "NOT VACCINATED" ? "blur-sm" : ""
          )}
        >
          <div className="flex flex-col space-y-3">
            <p>
              WHEN IS YOUR &nbsp;
              <span className="font-bold">LAST DOSE</span>
              &nbsp; OF A COVID-19 VACCINE?
            </p>
            <Input
              id="vaccine_date"
              name="vaccine_date"
              type="date"
              required
              onChange={changeHandler}
              disabled={
                formValues?.vaccine_status === "NOT VACCINATED" ? true : false
              }
            />
          </div>

          <div className="flex flex-col">
            <span className="font-bold">VACCINATION SERIAL NO.</span>
            <Input
              id="vaccine_serial_no"
              name="vaccine_serial_no"
              type="text"
              required
              onChange={changeHandler}
              value={formValues?.vaccine_serial_no ? formValues.vaccine_serial_no : ""}
              disabled={
                formValues?.vaccine_status === "NOT VACCINATED" ? true : false
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
