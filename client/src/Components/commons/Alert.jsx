import classnames from "classnames";

const Alert = ({
  header = "",
  message = "",
  info = false,
  warning = false,
  error = false,
}) => {
  return (
    <div
      className={classnames(
        "px-4 py-3 shadow-sm",
        info &&
          "bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900",
        warning &&
          "bg-orange-100 border-t-4 border-orange-500 rounded-b text-orange-900",
        error && "bg-red-100 border-t-4 border-red-500 rounded-b text-red-900"
      )}
      role="alert"
    >
      <div className="flex">
        <div>
          <p className="font-bold">{header}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
