import React from "react";
import { useNavigate } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";
import { Button, Icon } from "../../Components/commons";

const Success = ({ route = "", header = "", message = "" }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed min-h-screen w-full z-50 flex flex-col justify-center items-center gap-y-5 border-2 bg-white border-slate-100">
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
            {header}
          </span>
          <br />
          {message}
        </p>
      </div>

      <div className="my-10 px-24 w-full">
        <Button
          type="button"
          label="Return"
          roundedFull
          onClick={(e) => {
            e.preventDefault();
            navigate(route);
          }}
        />
      </div>
    </div>
  );
};

export default Success;
