import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { QrReader } from "react-qr-reader";
import useAuth from "../../hooks/useAuth";
import { scanQR } from "../../actions/userActions";
import { getHdfDay } from "../../actions/userActions";
import { Button } from "../../Components/commons";

function QRScanner() {
  const navigate = useNavigate();

  const { auth } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const user = await getHdfDay();
      if (!user || user.length === 0) {
        localStorage.setItem("hdf", null);
      } else {
        localStorage.setItem("hdf", user[0]._id);
      }
    })();
  }, [auth]);

  const handleSubmitQR = async (qrCode) => {
    const hdfID = localStorage.getItem("hdf");
    const payload = {
      hdfID,
      qrCode,
    };

    const response = await scanQR(payload);
    // TODO: Success message.
    if (response.hasOwnProperty("message")) {
      console.log(response.message);
    } else {
      localStorage.removeItem("hdf");
      navigate("/qr-scanner/success")
    }
  };

  return (
    <div
      className={classnames(
        "relative text-sm ... sm:text-base",
        isLoading ? "blur-sm animate-pulse" : ""
      )}
    >
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
              navigate("/main");
            }}
            roundedFull
          />
        </div>
      </div>
    </div>
  );
}

export default QRScanner;
