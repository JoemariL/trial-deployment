import classnames from "classnames";
import { BiLoaderAlt } from "react-icons/bi";

const Button = ({
  buttonStyle = "primary" || "secondary" || "light",
  label = "",
  type,
  disabled = false,
  onClick = () => {},
  loading = false,
  roundedFull = false,
  icon,
}) => {
  return (
    <>
      <button
        className={classnames(
          "h-12 w-full",
          disabled && "cursor-default opacity-70",
          roundedFull ? "rounded-full" : "rounded",
          buttonStyle === "secondary"
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
