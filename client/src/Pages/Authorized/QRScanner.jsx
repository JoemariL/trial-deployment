import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { QrReader } from "react-qr-reader";
import useAuth from "../../hooks/useAuth";
import { scanQR } from "../../actions/userActions";
import { getHdfDay } from "../../actions/userActions";
import { Formbar } from "../../Components/ui";
import { Input, Button } from "../../Components/commons";

function QRScanner() {
  const navigate = useNavigate();

  const { auth } = useAuth();

  const [step, setstep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState("")

  useEffect(() => {
    (async function () {
      const user = await getHdfDay();
      if (!user || user.length === 0) {
        localStorage.setItem("hdf", null);
      } else {
        localStorage.setItem("hdf", user[0]._id);
      }
    })();
  }, []);

  const handleSubmitQR = async (qrCode) => {
    const payload = {
      destination,
      qrCode
    };

    const response = await scanQR(payload);
    // TODO: Success message.
    if (response.hasOwnProperty("message")) {
      console.log(response.message);
    } else {
      navigate("/qr-scanner/success");
    }
  };

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
            fixedTop
            onReturnClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          />

          <form className="mx-5 py-20 flex flex-col space-y-10 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96" onSubmit={nextStep}>
            <div>
              <span className="text-lg">
                Where will you go within the campus?
              </span>
              <Input
                placeholder="Enter your Destination"
                id="deptDestination"
                name="deptDestination"
                type="text"
                subtitle="D522 Lab, Registrar, etc."
                required
                value={destination}
                onChange={(e) => { setDestination(e.target.value) }}
              />
            </div>

            <Button
              label="Next"
              type="submit"
              loading={isLoading}
            />
          </form>
        </div>
      );

    case 2:
      return (
        <div className="relative text-sm ... sm:text-base">
          <div className="mx-5 py-10 ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
            <div className="py-5 px-1 rounded bg-slate-100">
              <div className="text-center">
                <span>Align QR Code to scan.</span>
              </div>

              <QrReader
                scanDelay={500}
                constraints={{ facingMode: "environment" }}
                onResult={(result, error) => {
                  if (!!result) {
                    handleSubmitQR(result?.text);
                  }
                }}
                style={{ width: "400px" }}
              />
            </div>

            <div className="p-16">
              <Button
                buttonStyle="secondary"
                label="Cancel"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("hdf");
                  navigate("/main");
                }}
                roundedFull
              />
            </div>
          </div>
        </div>
      );
    default:
      return <div className="text-sm ... sm:text-base"></div>;
  }
}

export default QRScanner;
