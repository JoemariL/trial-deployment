import React from "react";
import { useNavigate } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";
import { Button, Icon } from "../../Components/commons";

function VisitorQRSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="min-h-screen flex flex-col justify-center items-center gap-y-5">
        <div>
          <Icon
            background="rounded-full"
            className="bg-green-400 text-white"
            icon={<ImCheckmark className="h-10 w-10" />}
          />
        </div>

        <div>
          <p className="text-center">
            <span className="text-xl font-bold underline underline-offset-2 decoration-blue-900">
              QR CODE SCANNED SUCCESSFULLY!
            </span>
            <br />
            Your Health Declaration Form is now sent to the Triage Team of Saint
            Louis University.
          </p>
        </div>

        <div className="my-10 px-24 w-full">
          <Button
            type="button"
            label="Return"
            roundedFull
            onClick={(e) => {
              e.preventDefault();
              navigate("/visitor/main");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default VisitorQRSuccess;
