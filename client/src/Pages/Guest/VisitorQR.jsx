import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { QrReader } from "react-qr-reader";
import { addVisitor } from "../../actions/visitorActions";
import { Button } from "../../Components/commons";
import { Success } from "../../Components/ui";

function VisitorQR() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [scanSuccessful, setScanSuccessful] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userVaccine = JSON.parse(localStorage.getItem("userVaccine"));
  const userHdf = JSON.parse(localStorage.getItem("userHDF"));

  const handleSubmitQR = async (qrCode) => {
    const payload = {
      qrCode,
      ...userInfo,
      ...userVaccine,
      ...userHdf,
    };
    await addVisitor(payload);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userVaccine");
    localStorage.removeItem("userHDF");
    setScanSuccessful(true);
  };

  return (
    <div
      className={classnames(
        "relative text-sm ... sm:text-base",
        isLoading ? "blur-sm animate-pulse" : ""
      )}
    >
      {scanSuccessful && (
        <Success
          message="Scan successful!"
          returnOnClick={(e) => {
            e.preventDefault();
            navigate("/visitor/main");
          }}
        />
      )}

      <div className="mx-5 py-10 ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <div className="p-5 rounded bg-slate-100">
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
              navigate("/visitor/main");
            }}
            roundedFull
          />
        </div>
      </div>
    </div>
  );
}

export default VisitorQR;
