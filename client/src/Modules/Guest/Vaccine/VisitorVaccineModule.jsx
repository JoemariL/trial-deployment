import React, { useState, useEffect } from "react";
import classnames from "classnames";
import useForm from "../../../hooks/useForm";
import { VisitorVaccineFormInitialState } from "./visitor-vaccine-form";
import { Input, Button, RadioButton } from "../../../Components/commons";

const VisitorVaccineModule = ({ onNext = () => {} }) => {
  const { changeHandler, setFormValues, formValues } = useForm(
    VisitorVaccineFormInitialState
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const {
      vaccine_status,
      vaccine_date: vacDate,
      vaccine_serial_no,
    } = formValues;

    let vaccine_date = new Date(vacDate);

    if (vaccine_status === "NOT VACCINATED") {
      localStorage.setItem("userVaccine", JSON.stringify({ vaccine_status }));
      setIsLoading(false);
      onNext();
    } else {
      localStorage.setItem(
        "userVaccine",
        JSON.stringify({ vaccine_status, vaccine_date, vaccine_serial_no })
      );
      setIsLoading(false);
      onNext();
    }
  };

  useEffect(() => {
    let vaccine = JSON.parse(localStorage.getItem("userVaccine"))
      ? JSON.parse(localStorage.getItem("userVaccine"))
      : null;
    if (vaccine != null) {
      setFormValues(vaccine);
    }
  }, [setFormValues]);

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
              required
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
              required
            />
            <RadioButton
              name="vaccine_status"
              id="vaccine_status"
              value="NOT VACCINATED"
              label="NOT VACCINATED"
              checked={
                formValues?.vaccine_status === "NOT VACCINATED" ? true : false
              }
              required
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
              value={formValues?.vaccine_serial_no}
              required
              onChange={changeHandler}
              disabled={
                formValues?.vaccine_status === "NOT VACCINATED" ? true : false
              }
            />
          </div>
        </div>

        <Button label="Next" type="submit" loading={isLoading} />
      </form>
    </>
  );
};

export default VisitorVaccineModule;
