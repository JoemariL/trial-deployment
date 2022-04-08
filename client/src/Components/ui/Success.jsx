import { ImCheckmark } from "react-icons/im";
import { Button, Icon } from "../commons";

const Success = ({ message = "", returnOnClick = () => {} }) => {
  return (
    <div className="absolute min-h-screen w-full z-50 bg-white">
      <div className="min-h-screen flex flex-col justify-center items-center gap-y-5">
        <div>
          <Icon
            background="rounded-full"
            className="bg-green-400 text-white"
            icon={<ImCheckmark className="h-10 w-10" />}
          />
        </div>

        <div>
          <span className="text-xl font-bold underline underline-offset-2 decoration-blue-900">
            {message}
          </span>
        </div>

        <div className="my-10 px-24 w-full">
          <Button
            type="button"
            label="Return"
            roundedFull
            onClick={returnOnClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Success;
