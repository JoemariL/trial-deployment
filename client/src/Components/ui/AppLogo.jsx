import { LogoSLU } from "../../assets";

const AppLogo = () => {
  return (
    <div className="flex flex-col gap-y-2 items-center text-center">
      <img
        className="h-auto w-32"
        src={LogoSLU}
        alt="slu triage application logo"
      />

      <p className="text-center">
        SAINT LOUIS UNIVERSITY <br />
        <span className="text-xl font-bold">TRIAGE APPLICATION</span>
      </p>
    </div>
  );
};

export default AppLogo;
