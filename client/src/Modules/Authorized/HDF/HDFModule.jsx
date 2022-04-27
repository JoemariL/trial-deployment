import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { generateHdf } from "../../../actions/userActions";
import { HDFormInitialState } from "./hdf-form";
import { Button, RadioButton, Checkbox } from "../../../Components/commons";

const HDFModule = () => {
  const { changeHandler, formValues, isFormValid } =
    useForm(HDFormInitialState);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleRadio = (event) => {
    const value =
      event.target.value === "true"
        ? true
        : event.target.value === "false"
        ? false
        : null;

    const item = { target: { name: event.target.name, value: value } };
    changeHandler(item);
  };

  const handleCheck = (event) => {
    const value = event.target.checked ? true : false;

    const item = { target: { name: event.target.name, value: value } };
    changeHandler(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await generateHdf(formValues);

    // TODO: Success message.
    if (response.hasOwnProperty("message")) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      navigate("/result");
    }
  };

  return (
    <>
      <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
        <div>
          <p>
            <span className="text-lg font-bold">INSTRUCTION</span>
            <br />
            Answer the following questions truthfully.
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <p>
            In the past weeks, have you had any known &nbsp;
            <span className="text-lg">EXPOSURE</span>
            &nbsp; to confirmed COVID-19 patient?
          </p>

          <div className="flex flex-row space-x-5" onChange={handleRadio}>
            <RadioButton
              name="covidExposure"
              id="covidExposure"
              value={true}
              label="YES"
            />
            <RadioButton
              name="covidExposure"
              id="covidExposure"
              value={false}
              label="NO"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <p>
            Have you tested &nbsp;
            <span className="text-lg">POSITIVE</span>
            &nbsp; for COVID-19 in the last 30 days?
          </p>

          <div className="flex flex-row space-x-5" onChange={handleRadio}>
            <RadioButton
              name="covidPositive"
              id="covidPositive"
              value={true}
              label="YES"
            />
            <RadioButton
              name="covidPositive"
              id="covidPositive"
              value={false}
              label="NO"
            />
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-5">
          <p>
            <span className="text-lg font-bold">MEDICAL HISTORY</span> <br />
            Have you been sicked or experienced any of the following in the last
            14 days?
          </p>

          <div className="flex flex-col space-y-3" onChange={handleCheck}>
            <Checkbox name="fever" id="fever" label="Fever" value="FEVER" />
            <Checkbox name="cough" id="cough" label="Cough" value="COUGH" />
            <Checkbox name="cold" id="cold" label="Cold" value="COLD" />
            <Checkbox
              name="soreThroat"
              id="soreThroat"
              label="Sore Throat"
              value="SORE"
            />
            <Checkbox
              name="diffBreathing"
              id="diffBreathing"
              label="Difficulty Breathing"
              value="BREATHING"
            />
            <Checkbox
              name="diarrhea"
              id="diarrhea"
              label="Diarrhea"
              value="DIARRHEA"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <span className="text-lg">Are you pregnant?</span>

          <div className="flex flex-row space-x-5" onChange={handleRadio}>
            <RadioButton
              name="pregnant"
              id="pregnant"
              value={true}
              label="YES"
            />
            <RadioButton
              name="pregnant"
              id="pregnant"
              value={false}
              label="NO"
            />
            <RadioButton
              name="pregnant"
              id="pregnant"
              value="NOT APPLICABLE"
              label="NOT APPLICABLE"
            />
          </div>
        </div>

        <Button
          label="Submit"
          type="submit"
          disabled={!isFormValid}
          loading={isLoading}
        />
      </form>
    </>
  );
};

export default HDFModule;
