import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { VisitorHDFormInitialState } from "./visitor-hdf-form";
import {
  Input,
  Button,
  RadioButton,
  Checkbox,
} from "../../../Components/commons";

const VisitorHDFModule = () => {
  const { changeHandler, setFormValues, formValues, isFormValid } = useForm(
    VisitorHDFormInitialState
  );

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

    const createdAt = new Date();
    const {
      covid_exposure,
      covid_positive,
      fever,
      cough,
      cold,
      sore_throat,
      diff_breathing,
      diarrhea,
      pregnant,
      destination,
    } = formValues;

    let allowed = true;

    if (
      covid_exposure ||
      covid_positive ||
      fever ||
      cough ||
      cold ||
      sore_throat ||
      diff_breathing ||
      diarrhea
    ) {
      allowed = false;
    }

    const payload = {
      covid_exposure,
      covid_positive,
      fever,
      cough,
      cold,
      sore_throat,
      diff_breathing,
      diarrhea,
      pregnant,
      destination,
      createdAt,
      allowed,
    };
    localStorage.setItem("userHDF", JSON.stringify(payload));
    setIsLoading(false);
    navigate("/visitor/main");
  };

  useEffect(() => {
    let hdf = JSON.parse(localStorage.getItem("userHDF"));
    if (hdf) {
      setFormValues(hdf);
    }
    // eslint-disable-next-line no-lone-blocks
    {
      setFormValues(formValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFormValues]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              name="covid_exposure"
              id="covid_exposure"
              value={true}
              label="YES"
              checked={formValues?.covid_exposure === true}
            />
            <RadioButton
              name="covid_exposure"
              id="covid_exposure"
              value={false}
              label="NO"
              checked={formValues?.covid_exposure === false}
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
              name="covid_positive"
              id="covid_positive"
              value={true}
              label="YES"
              checked={formValues?.covid_positive === true}
            />
            <RadioButton
              name="covid_positive"
              id="covid_positive"
              value={false}
              label="NO"
              checked={formValues?.covid_positive === false}
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
            <Checkbox
              name="fever"
              id="fever"
              label="Fever"
              value="FEVER"
              checked={!formValues?.fever ? false : true}
            />
            <Checkbox
              name="cough"
              id="cough"
              label="Cough"
              value="COUGH"
              checked={!formValues?.cough ? false : true}
            />
            <Checkbox
              name="cold"
              id="cold"
              label="Cold"
              value="COLD"
              checked={!formValues?.cold ? false : true}
            />
            <Checkbox
              name="sore_throat"
              id="sore_throat"
              label="Sore Throat"
              value="SORE"
              checked={!formValues?.sore_throat ? false : true}
            />
            <Checkbox
              name="diff_breathing"
              id="diff_breathing"
              label="Difficulty Breathing"
              value="BREATHING"
              checked={!formValues?.diff_breathing ? false : true}
            />
            <Checkbox
              name="diarrhea"
              id="diarrhea"
              label="Diarrhea"
              value="DIARRHEA"
              checked={!formValues?.diarrhea ? false : true}
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
              checked={formValues?.pregnant === true}
            />
            <RadioButton
              name="pregnant"
              id="pregnant"
              value={false}
              label="NO"
              checked={formValues?.pregnant === false}
            />
            <RadioButton
              name="pregnant"
              id="pregnant"
              value="NOT APPLICABLE"
              label="NOT APPLICABLE"
              checked={
                formValues?.pregnant === null ||
                formValues?.pregnant === undefined
              }
            />
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-3">
          <span className="text-lg">
            What is your department or destination?
          </span>

          <Input
            placeholder="Please enter your department or destination"
            id="destination"
            name="destination"
            type="text"
            subtitle="SAMCIS, SEA, etc."
            value={formValues?.destination ? formValues.destination : ""}
            onChange={changeHandler}
            required
          />
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

export default VisitorHDFModule;
