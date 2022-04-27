import classnames from "classnames";
import { BiLoaderAlt } from "react-icons/bi";

const Button = ({
  label = "",
  type,
  disabled = false,
  secondary = false,
  roundedFull = false,
  loading = false,
  onClick = () => {},
  icon,
}) => {
  return (
    <>
      <button
        className={classnames(
          "p-3.5 w-full",
          disabled && "cursor-default opacity-20",
          roundedFull ? "rounded-full" : "rounded",
          secondary
            ? "bg-gray-600 text-white hover:bg-gray-400"
            : "bg-blue-900 text-white hover:bg-blue-800"
        )}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? (
          <div className="flex flex-row justify-center">
            <BiLoaderAlt className="h-6 w-6 text-white animate-spin" />
          </div>
        ) : (
          <div className="inline-flex items-center gap-x-3">
            {icon}
            {label}
          </div>
        )}
      </button>
    </>
  );
};

export default Button;
